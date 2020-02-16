'use strict'
var isTypingLine = false;
var gCanvas;
var gCtx;





function init() {
    rendrImages()
    initSaved();
    initMeme();
}



function renderMeme(){
    var meme = getMeme();
    var memeImg = getImageById(meme.selectedImgId);
    var selectedLineIdx = meme.selectedLineIdx;
    var img = new Image()
    img.src = memeImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        if (selectedLineIdx > -1) editSelection(meme.lines[selectedLineIdx]);
        drawLines()
    }
    function drawLines(){
        if(meme.lines.length){
            meme.lines.map(line => {
                drawText(line)
            })
        }
    }
}


function editSelection(selectedLine){
    console.log(gCtx.measureText(selectedLine.txt))
    var x;
    if (selectedLine.align === 'right') x = selectedLine.coord.x - (gCtx.measureText(selectedLine.txt).width  +10);
    if (selectedLine.align === 'left') x =  selectedLine.coord.x -10;
    if (selectedLine.align === 'center') x =  selectedLine.coord.x - (gCtx.measureText(selectedLine.txt));

    var length = (selectedLine.txt.length === 1) ? 2 : selectedLine.txt.length;
    // var width = (length +2) *selectedLine.size/2.5 +5;
    drawRect (x, selectedLine.coord.y - selectedLine.size, gCtx.measureText(selectedLine.txt).width +30, selectedLine.size +10);
    var elInput = document.querySelector('.meme-txt');
    elInput.value = selectedLine.txt;
    isTypingLine = true;

}





function rendrImages(){
    document.querySelector('.images-wrapper').hidden = false;
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.saved-memes').style.display ='none';
    document.querySelector ('.main-nav .saved').classList.remove('active');
    document.querySelector ('.main-nav .gallery').classList.add('active');
    var images = getImagesForDispaly();
    var strImgHtmls = images.map ( img => `<img src = "${img.url}" onclick = "onImageSelected(${img.id})" >`)
    document.querySelector('.images-container').innerHTML = strImgHtmls.join(' ');
    initMeme();
}

function initCanvas(){
    gCanvas = document.getElementById('my-canvas')
    // var canvas = document.getElementById('responsive-canvas');
    var heightRatio = 1;
    gCanvas.height = gCanvas.width * heightRatio;
    gCtx = gCanvas.getContext('2d')
}


function onImageSelected(imgId){
    initMeme();
    document.querySelector('.images-wrapper').hidden = true;
    document.querySelector('.editor').style.display = 'flex';
    initCanvas();
    updateImg(imgId);
    renderMeme();
}


function onColorChange(){
    var color = document.querySelector('.color-picker').value;
    var lines = getLines();
    if (getSelectedLine() === -1) return;
    lines[getSelectedLine()].color = color;
    renderMeme();
}

function onFontsChange(){
    var font = document.querySelector('.fonts').value;
    console.log(font);
    var lines = getLines();
    if (getSelectedLine() === -1) return;
    lines[getSelectedLine()].font = font;
    renderMeme();
}


function onFontSizeChange(sign){
    var lines = getLines();
    if (getSelectedLine() === -1) return;
    lines[getSelectedLine()].size += (+sign) * 3;
    renderMeme();
}


function onAlignChange(direction){
    var lines = getLines();
    if (getSelectedLine() === -1) return;
    lines[getSelectedLine()].align = direction;
    if (direction === 'right') lines[getSelectedLine()].coord.x = gCanvas.width - 50;
    if (direction === 'left') lines[getSelectedLine()].coord.x = 50;
    if (direction === 'center') lines[getSelectedLine()].coord.x = gCanvas.width - gCanvas.width/2;
    renderMeme();
}

function onLineMove(sign){
    var lines = getLines();
    if (getSelectedLine() === -1) return;
    lines[getSelectedLine()].coord.y += (+sign) * 3;
    renderMeme();
}


function onDeleteLine (){
    deleteSelected();
    setSelectedLine(-1);
    renderMeme();
    isTypingLine = false;
}



function onAddText(e){
    var elInput = document.querySelector('.meme-txt');
    var txt = elInput.value;
    var lines = getLines();
    console.log(txt);

   
    //if the user started writing new Line
    if(!isTypingLine && getSelectedLine() === -1){
        setSelectedLine(lines.length)
        var coord;
        if (lines.length === 0) coord = {x: 50, y: 50}
        if (lines.length === 1) coord = {x: 50, y: gCanvas.height -50}
        if (lines.length > 1) coord = {x: 50, y: gCanvas.height / 2}
        var newLine = createLine(txt, coord);
        lines.push(newLine);
        renderMeme();
        isTypingLine = true;

    //user is editing an existing line    
    } else {
        lines[getSelectedLine()].txt = txt;
        renderMeme();
    }
}



function onKeyDown(e){
    if (e.key === "Enter"){
        var elInput = document.querySelector('.meme-txt');
        elInput.value = '';
        isTypingLine = false;
        setSelectedLine(-1);
        renderMeme();

    }
}



function onAddLine(){
    var elInput = document.querySelector('.meme-txt');
    elInput.value = '';
    isTypingLine = false;
    setSelectedLine(-1);
    renderMeme();

}


function onShare(elLink) {
    console.log("share");
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}


function onSave(){
    console.log("save");
    setSelectedLine(-1);
    renderMeme();
    var imgContent = gCanvas.toDataURL();
    save(imgContent)
}



function onDownload(elLink){
    let fakeLink = document.createElement('a')
    console.log("download");
    
    var imgContent = gCanvas.toDataURL();
    fakeLink.href = imgContent;
    
    fakeLink.download = 'myMeme.png';
    console.log(elLink.href);
    fakeLink.click();
}


function showSaved(){
    console.log("show saved")
    document.querySelector('.images-wrapper').hidden = true;
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.saved-memes').style.display ='flex';
    document.querySelector ('.main-nav .saved').classList.add('active');
    document.querySelector ('.main-nav .gallery').classList.remove('active');

    var savedImgs = getSavedImgs();
    console.log(savedImgs[0]);
    var savedImgsStr = savedImgs.map(data => 
        `<img src = "${data}" />`
    )
    savedImgsStr = savedImgsStr.join(' ')
    console.log(savedImgsStr);
    document.querySelector('.saved-memes').innerHTML = savedImgsStr;

}





function drawText(line) {
    
    gCtx.lineWidth = '2'
    gCtx.strokeStyle = `${line.stroke}`;
    gCtx.fillStyle = `${line.color}`;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = `${line.align}`;
    gCtx.fillText(line.txt, line.coord.x, line.coord.y);
    gCtx.strokeText(line.txt, line.coord.x, line.coord.y);
}

function getYCoordsForLine(){
    var numOfLines = getLines().length;
    if (numOfLines === 0) return 50;
    if (numOfLines === 1) return gCanvas.height - 50;
}


function onSelectLine(){
    var lines = getLines();
    var selectedLine = getSelectedLine();
    if (selectedLine +1 >= lines.length) setSelectedLine(0);
    else selectedLine = setSelectedLine(selectedLine + 1);
    var lines = getLines();
    var line = lines[selectedLine];
    console.log("lines" ,lines, "selectedLine", selectedLine);
    renderMeme();

}



function drawRect(x ,y, height, width) {
    gCtx.beginPath()
    gCtx.rect(x, y, height,  width)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
    // gCtx.fillStyle = 'orange'
    // gCtx.fillRect(50, 50, gCanvas.width, 50)
}


