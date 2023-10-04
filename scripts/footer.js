// import * as ai from "ai.js";
const canvasContainer = document.getElementById('canvas-container'); 
const canvas = document.getElementById('sketchCanvas');
const submitBtn = document.getElementById('submitBtn');
const guessResult = document.getElementById('guessResult');
const eraserBtn = document.getElementById('eraser');
const penBtn = document.getElementById('pen');
const penSizeIndicator = document.getElementById("penSize");
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById("clearBtn");

let mode = "pen"
let drawing = false;
let lineWidth = 5;

clearBtn.addEventListener('click',()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})
console.log(canvas.offsetLeft,canvas.offsetTop);
// canvas 
canvas.addEventListener('mouseover',(e) => {
    updatePenSizeIndicator(e.clientX , e.clientY , ctx.lineWidth);
});

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath(); // Start a new path
    if(mode == "pen"){
        ctx.strokeStyle = 'black';
        ctx.globalCompositeOperation="source-over";
    }
    else if(mode == "eraser"){
        ctx.globalCompositeOperation="destination-out";
        ctx.strokeStyle = 'white';
    }
    const offsetX = e.clientX - canvasContainer.getBoundingClientRect().left;
    const offsetY = e.clientY - canvasContainer.getBoundingClientRect().top;
    drawSketch(offsetX, offsetY);
});

canvas.addEventListener('mousemove', (e) => {
    penSizeIndicator.style.left = e.clientX+ "px";
    penSizeIndicator.style.top = e.clientY + "px";
    if (!drawing) return;
    if(mode == "pen"){
        ctx.strokeStyle = 'black';
        ctx.globalCompositeOperation="source-over";
    }
    else if(mode == "eraser"){
        ctx.globalCompositeOperation="destination-out";
        ctx.strokeStyle = 'white';
    }
    const offsetX = e.clientX - canvasContainer.getBoundingClientRect().left;
    const offsetY = e.clientY - canvasContainer.getBoundingClientRect().top;
    drawSketch(offsetX, offsetY);    

});
canvas.addEventListener('mouseout',()=>{
    penSizeIndicator.style.display = 'none';
})

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath(); // Close the current path
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
    updatePenSizeIndicator(offsetX, offsetY ,ctx.lineWidth);
}


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

submitBtn.addEventListener('click', () => {
    const dpi = window.devicePixelRatio;
    const imgData = canvas.getImageData(mbb.min.x * dpi, mbb.min.y * dpi,
						       (mbb.max.x - mbb.min.x) * dpi, (mbb.max.y - mbb.min.y) * dpi);
    console.log(imgData);
    sendToAIService(imgData);
});

// ai 400 x 400 canvas 
function sendToAIService(imageData) {


}

function displayGuess(guess) {
    guessResult.textContent = `AI Guess: ${guess}`;
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