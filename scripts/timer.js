const timerElement = document.getElementById('countdown');
const drawTextElement = document.getElementById('item-text');
const drawNumElement = document.getElementById('item-num');

import data from "bundle-text:../scripts/classes.txt" // works!

let timeLeft = 10; 
let textNum = 1;
var items = [];
var itemID = -1;
var guessedNum = 1;

// load txt file 
const lines = data.split("\n");
for (const line of lines) {
    items.push(line);
}

function getRandomItem(){
    itemID = Math.floor(Math.random()*items.length);
    var item = items[itemID];
    return item;
}


function startTimer() {
    const intervalId = setInterval(() => {
    if (timeLeft > 0) {
        timerElement.textContent = timeLeft + ' seconds';
        timeLeft--;
    } else {
        if(guessedNum < 5){
            timeLeft = 10;
            guessedNum++;
            var itemToDraw = getRandomItem();
            setTextItem(itemToDraw);
            setItemNumText(guessedNum);
        }
        else{
            clearInterval(intervalId);
            timerElement.textContent = 'Time\'s up!';
        }
    }
    }, 1000);
}


function setTextItem(name){
    drawTextElement.textContent = name + " !";
}

function setItemNumText(num){
    drawNumElement.textContent = num;
}


startTimer();
var itemToDraw = getRandomItem();
setTextItem(itemToDraw);


export {items};