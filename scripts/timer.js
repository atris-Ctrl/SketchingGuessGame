const timerElement = document.getElementById('countdown');
const drawTextElement = document.getElementById('item-text');
const drawNumElement = document.getElementById('item-num');

let timeLeft = 5; 
let textNum = 1;
var items = [];
function loadTxtFile(){
    let arr = [];
    fetch("../scripts/classes.txt")
        .then(response => response.text())
        .then(data => {
            const lines = data.replace(/\r/g, '').split('\n');
            items = lines.filter(line => line.trim('') !== '');
            console.log(items); 
            return items;
        })
        .catch(error => {
            console.error('Error loading the file:', error);
  });
  return arr;
}   


function startTimer() {
    const intervalId = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        timerElement.textContent = timeLeft + ' seconds';
    } else {
        clearInterval(intervalId);
        timerElement.textContent = 'Time\'s up!';
    }
    }, 1000);
}


function getTextItem(){
    drawTextElement.textContent = "Chicken";
}

function setItemNumText(){
    drawNumElement.textContent = 1;
}
startTimer();
getTextItem();
const drawArray = loadTxtFile();
console.log(items[0]);