'use strict'

var gCanvas;
var gCtx;

function init() {
    console.log("init");
    rendrImages()
}


function rendrImages(){
    console.log("render");
    var images = getImagesForDispaly();
    console.log("images", images);
    var strImgHtmls = images.map ( img => `<img src = "${img.url}" onclick = "onImageSelected(${img.id})" >`)
    console.log(strImgHtmls.join(' '));
    document.querySelector('.images-container').innerHTML = strImgHtmls.join(' ');
}

function initCanvas(){
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
}


function onImageSelected(imgId){
    document.querySelector('.images-wrapper').hidden = true;
    document.querySelector('.editor').hidden = false;
    updateMemeImg(imgId);
    var img = getImageById(imgId);
    var path = img.url;
    drawImg(path);
    initCanvas()
}


function onAddText(){
    var elInput = document.querySelector('.meme-txt')
    var txt = elInput.value;
    var yCoord = getYCoordsForLine()
    var line = addMemeLine(txt, 50, yCoord);
    drawText(line);
    elInput.value = '';
}


function drawText(line) {
    // gCtx.lineWidth = '2'
    gCtx.strokeStyle = line.stroke;
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px Impact`;
    // gCtx.font = '40px Impact'
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
    
}



function drawImg(path) {
    var img = new Image()
    img.src = path;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}