const banner = document.getElementById("banner");
const hideButton = document.getElementById("hideButton");
var dialogueBox = document.getElementById("dialogue-box");
const textElement = document.getElementById("dialogue");
const chickenBun = document.getElementById("game-dialogue");
const content1 = document.getElementById("content1");
var introPage = 0;
const texts = ["Hello World", "I is Chicken Bun!","Me want to play a game!", "Thanks for applying to my fashion company"]
var text = texts[0];
let textInd = 0;
let textsInd = 0;

banner.style.transform = "translateY(0)";

hideButton.addEventListener("click", () => {
    if(introPage == 0){
        hideButton.textContent = "READY TO PLAY";
        content1.style.display = "none";
        chickenBun.style.display = "block";
    }
    else{
    banner.style.transform = "translateY(-100%)";
    }
    introPage++;
});



dialogueBox.addEventListener("mousedown",()=>{
    textsInd++;
    textInd = 0;
    text = texts[textsInd];
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
function hell(){
    console.log("fnjanj");
}
export {hell};