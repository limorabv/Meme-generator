'use strict'

var gCanvas;
var gCtx;

function init() {
    rendrImages()
}



function renderMeme(){
    var meme = getMeme();
    var memeImg = getImageById(meme.selectedImgId);
    var img = new Image()
    img.src = memeImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
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


function onAddText(e){
    console.log(e);
    var elInput = document.querySelector('.meme-txt');
    var txt = elInput.value;
    var lines = getLines();
    console.log("txt", txt);

    //if the user started writing new Line
    if(txt.length === 1 && e.inputType !== "deleteContentBackward"){
        setSelectedLine(lines.length);
        var coord;
        if (lines.length === 0) coord = {x: 50, y: 50}
        if (lines.length === 1) coord = {x: 50, y: gCanvas.height -50}
        var newLine = createLine(txt, coord);
        lines.push(newLine);
        renderMeme();

    //user is editing an existing line    
    } else {
        console.log("selected line", getSelectedLine());
        lines[getSelectedLine()].txt = txt;
        renderMeme();
    }
}



function onKeyDown(e){
    if (e.key === "Enter"){
        var elInput = document.querySelector('.meme-txt');
        elInput.value = '';
    }
}




function removeTxtFromLine(){
    // clearCanvas();
    // var img = getCurrImg();
    // drawImg(img.url);
    // var elInput = document.querySelector('.meme-txt')
    // var txt = elInput.value;
    // var line = addMemeLine(txt, 50, 50);
    // drawText(txt);
    // renderTxt();
    // drawImg(getImageById(gImgId.url));

}

function renderInput(){
    var elInput = document.querySelector('.meme-txt')
    var txt = elInput.value;
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    // You may clear part of the canvas
    // gCtx.clearRect(50, 50, 200, 200)
}




function drawText(line) {
    gCtx.lineWidth = '2'
    gCtx.strokeStyle = `${line.stroke}`;
    gCtx.fillStyle = `${line.color}`;
    gCtx.font = `${line.size}px Impact`;
    // gCtx.font = '40px Impact'
    gCtx.textAlign = 'left';
    gCtx.fillText(line.txt, line.coord.x, line.coord.y);
    gCtx.strokeText(line.txt, 50, 50);
}

function getYCoordsForLine(){
    var numOfLines = getLines().length;
    if (numOfLines === 0) return 50;
    if (numOfLines === 1) return gCanvas.height - 50;
}


function onSelectLine(){

}



function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.rect(x, y, 150, 150)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
    gCtx.fillStyle = 'orange'
    gCtx.fillRect(x, y, 150, 150)
}



// function drawImg(path) {
//     var img = new Image()
//     img.src = path;
//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
//         drewLines()
//     }
// }