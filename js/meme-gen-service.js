gImgId = 4;
var gImgs = [
            {id: 1, url: 'img/1.jpg', keywords: ['happy']},
            {id: 2, url: 'img/2.jpg', keywords: ['happy']},
            {id: 3, url: 'img/3.jpg', keywords: ['happy']},
            {id: 4, url: 'img/4.jpg', keywords: ['happy']},
            {id: 5, url: 'img/5.jpg', keywords: ['happy']},
            {id: 6, url: 'img/6.jpg', keywords: ['happy']},
            {id: 7, url: 'img/7.jpg', keywords: ['happy']},
            {id: 8, url: 'img/8.jpg', keywords: ['happy']},
            {id: 9, url: 'img/9.jpg', keywords: ['happy']},
            {id: 10, url: 'img/10.jpg', keywords: ['happy']},
            {id: 11, url: 'img/11.jpg', keywords: ['happy']},
            {id: 12, url: 'img/12.jpg', keywords: ['happy']},
            {id: 13, url: 'img/13.jpg', keywords: ['happy']},
            {id: 14, url: 'img/14.jpg', keywords: ['happy']},
            {id: 15, url: 'img/15.jpg', keywords: ['happy']},
            {id: 16, url: 'img/16.jpg', keywords: ['happy']},
            {id: 17, url: 'img/17.jpg', keywords: ['happy']}



        ];

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: -1,
    lines: []
    }           




function getMeme(){
    return gMeme;
}    

function getImageById(id){
    return gImgs.find (img => img.id === id);
}


function getLines(){
    return gMeme.lines;
}



function updateImg(id){
    gMeme.selectedImgId = id;
    gImgId = id;
}



function getCurrImg(){
    return getImageById(gImgId);
}


function setSelectedLine(LineIdx){
    gMeme.selectedLineIdx = LineIdx;
    return gMeme.selectedLineIdx;
}


function  deleteSelected(){
    var lines = getLines();
    lines.splice(gMeme.selectedLineIdx,1);
}


function getSelectedLine() {
    return gMeme.selectedLineIdx;
}

function addMemeLine(text, x, y){
    var newLine = createLine(text,x,y);
    gMeme.lines.push(newLine);
    return newLine;
}



function createLine(text, coord, font = 'Impact', align = 'left'){
    return {
        coord: coord,
        txt: text,
        size: 40,
        align:'left',
        color: 'white',
        stroke: 'black',
        font: font,
        align: align
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
