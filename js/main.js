'use strict'
var isTypingLine = false;
var gCanvas;
var gCtx;
function init() {
    rendrImages()
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
    var length = (selectedLine.txt.length === 1) ? 2 : selectedLine.txt.length;
    var width = (length +2) *selectedLine.size/2.5 +5;
    drawRect (selectedLine.coord.x -10, selectedLine.coord.y - selectedLine.size, width, selectedLine.size +10);
    var elInput = document.querySelector('.meme-txt');
    elInput.value = selectedLine.txt;
    isTypingLine = true;

}





function rendrImages(){
    var images = getImagesForDispaly();
    var strImgHtmls = images.map ( img => `<img src = "${img.url}" onclick = "onImageSelected(${img.id})" >`)
    document.querySelector('.images-container').innerHTML = strImgHtmls.join(' ');
}

function initCanvas(){
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
}


function onImageSelected(imgId){
    document.querySelector('.images-wrapper').hidden = true;
    document.querySelector('.editor').hidden = false;
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





function drawText(line) {
    gCtx.lineWidth = '2'
    gCtx.strokeStyle = `${line.stroke}`;
    gCtx.fillStyle = `${line.color}`;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = 'left';
    gCtx.fillText(line.txt, line.coord.x, line.coord.y);
    gCtx.strokeText(line.txt, line.coord.x, line.coord.y);
}

function getYCoordsForLine(){
    var numOfLines = getLines().length;
    if (numOfLines === 0) return 50;
    if (numOfLines === 1) return gCanvas.height - 50;
}


function onSelectLine(){
    var selectedLine = getSelectedLine();
    selectedLine = setSelectedLine(selectedLine + 1);
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


