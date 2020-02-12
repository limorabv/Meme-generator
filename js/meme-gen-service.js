gImgId = 4;
var gImgs = [
            {id: 1, url: 'img/1.jpg', keywords: ['happy']},
            {id: 2, url: 'img/2.jpg', keywords: ['happy']},
            {id: 3, url: 'img/3.jpg', keywords: ['happy']},
            {id: 4, url: 'img/4.jpg', keywords: ['happy']},
            ];

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: []
    }           



function getImageById(id){
    return gImgs.find (img => img.id === id);
}


function getLines(){
    return gMeme.lines;
}

function updateMemeImg(id){
    gMeme.selectedImgId = id;
}


function addMemeLine(text, x, y){
    var newLine = createLine(text,x,y);
    gMeme.lines.push(newLine);
    return newLine;
}

function createLine(text, x, y){
    return {
        coord: {x:x, y:y},
        txt: text,
        size: 30,
        align:'left',
        color: 'white',
        stroke: 'black'
    }
}



function getImagesForDispaly(){
    return gImgs;
}




function createImage(path, keywords){
    return {
        id: id,
        url: path,
        keywords: keywords
    }
}
