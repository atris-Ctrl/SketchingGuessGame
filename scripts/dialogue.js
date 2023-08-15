//Typing text
var dialogueBox = document.getElementById("dialogue-box");
const textElement = document.getElementById("dialogue");
const texts = ["Hello World", "I is Chicken Bun!","Me want to play a game!", "Thanks for applying to my fashion company"]
var text = texts[0];
let textInd = 0;
let textsInd = 0;

dialogueBox.addEventListener("mousedown",()=>{
    textsInd++;
    textInd = 0;
    text = texts[textsInd]
    typingEffect();
})

function typingEffect(){
    textElement.textContent = text.slice(0,textInd);
    textInd++;
    
    if(textInd <= text.length){
        setTimeout(typingEffect,75);
    }
}

typingEffect(text);