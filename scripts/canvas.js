import {predictImg} from "./ai.js"
const canvasContainer = document.getElementById('canvas-container'); 
const canvas = document.getElementById('sketchCanvas');
const submitBtn = document.getElementById('submitBtn');
const guessResult = document.getElementById('guessResult');
const eraserBtn = document.getElementById('eraser');
const penBtn = document.getElementById('pen');
const penSizeIndicator = document.getElementById("penSize");
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById("clearBtn");

let mode = "pen";
let drawing = false;
let lineWidth = 5;
var coordsXY = [];

function clear(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    coordsXY = [];
}


clearBtn.addEventListener('click',()=>{
    clear();
})
// canvas 
canvas.addEventListener('mouseover',(e) => {
    updatePenSizeIndicator(e.clientX , e.clientY , ctx.lineWidth);
});

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath(); // Start a new path
    ctx.strokeStyle = 'black';
    ctx.globalCompositeOperation="source-over";
    
    const offsetX = e.clientX - canvasContainer.getBoundingClientRect().left;
    const offsetY = e.clientY - canvasContainer.getBoundingClientRect().top;
    drawSketch(offsetX, offsetY);
});

canvas.addEventListener('mousemove', (e) => {
    penSizeIndicator.style.left = e.clientX+ "px";
    penSizeIndicator.style.top = e.clientY + "px";
    if (!drawing) return;
    ctx.strokeStyle = 'black';

    const offsetX = e.clientX - canvasContainer.getBoundingClientRect().left;
    const offsetY = e.clientY - canvasContainer.getBoundingClientRect().top;
    drawSketch(offsetX, offsetY);    

});
canvas.addEventListener('mouseout',() => {
    penSizeIndicator.style.display = 'none';
})

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath(); // Close the current path
    // var coords = getMinBox();
    // const imageData = ctx.getImageData(coords.min.x,coords.min.y,
    //         coords.max.x,coords.max.y);
    // coordsXY = [];
    // var res = predictImg(imageData);
    // guessResult.textContent = `AI Guess: ${res}`;
});



function drawSketch(x, y) {
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    const offsetX = x + canvasContainer.getBoundingClientRect().left;
    const offsetY = y + canvasContainer.getBoundingClientRect().top;
    coordsXY.push({x: x, y: y});
    updatePenSizeIndicator(offsetX, offsetY ,ctx.lineWidth);
}


function getMinBox(){
    var coorX = coordsXY.map(function(coor) {return coor.x});
    var coorY = coordsXY.map(function(coor) {return coor.y});
    //find top left corner 
    var min_coords = {
     x : Math.min.apply(null, coorX),
     y : Math.min.apply(null, coorY)
    }
    //find right bottom corner 
    var max_coords = {
     x : Math.max.apply(null, coorX),
     y : Math.max.apply(null, coorY)
    }
    return {
     min : min_coords,
     max : max_coords
    }
 }

submitBtn.addEventListener('click', () => {
    var coords = getMinBox();
    const imageData = ctx.getImageData(coords.min.x,coords.min.y,
            coords.max.x,coords.max.y);
    coordsXY = [];
    var res = predictImg(imageData);
    guessResult.textContent = `AI Guess: ${res}`;
    clear();
});

eraserBtn.addEventListener('click',() => {
    mode = "eraser";
})

penBtn.addEventListener('click',() => {
    mode = "pen";
})

const penSizeSlider = document.getElementById('size-slider');

penSizeSlider.addEventListener('input', ()=>{
    updatePenSize(penSizeSlider.value);
})

function updatePenSize(val){
    lineWidth = val;
    ctx.lineWidth = val;
    penSizeIndicator.style.width = `${val}px`;
    penSizeIndicator.style.height = `${val}px`;
}

function updatePenSizeIndicator(x,y,size){
    penSizeIndicator.style.width = `${size}px`;
    penSizeIndicator.style.height = `${size}px`;
    penSizeIndicator.style.left = `${x+size*2} px`;
    penSizeIndicator.style.top = `${y+size*2} px`;
    penSizeIndicator.style.display = 'block'
}

// Get the eraser image and the slider container
const eraserImage = document.getElementById('eraser');
const sliderContainer = document.querySelector('.size-container');

// Show the slider container when hovering over the eraser image
eraserImage.addEventListener('mouseover', () => {
  sliderContainer.style.display = 'block';
});

// Hide the slider container when the mouse leaves the eraser image
eraserImage.addEventListener('mouseout', () => {
  sliderContainer.style.display = 'none';
});