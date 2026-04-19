const playerData = {
    displayedBalance: 0,
    balance: 0
}

const questionData = {
    x: 0,
    y: 0
}

const gameSettingsData = {
    balanceTickDelayMilliseconds: 35,
    balanceFractionalChangeSpeed: 0.2
}

const gameStateData = {
    balanceIsUpdating: false
}

console.log("js is running");
console.log("adding event listener to input");
addEventListenerToInput();

console.log("generating question");
generateQuestion();

function changeBalance(delta){
    if(!Number.isInteger(delta)){
        return;
    }

    playerData.balance += delta;

    if(!gameStateData.balanceIsUpdating){
        gameStateData.balanceIsUpdating = true;

        const timer = setInterval(() => {
            if (playerData.displayedBalance == playerData.balance) {
                clearInterval(timer);
                gameStateData.balanceIsUpdating = false;
            } else {
                let balanceDifference = playerData.balance-playerData.displayedBalance;
                let balanceIncrement = Math.floor(balanceDifference*gameSettingsData.balanceFractionalChangeSpeed);
                if(balanceIncrement == 0){
                    balanceIncrement = 1;
                }
                playerData.displayedBalance += balanceIncrement;

                let balanceValueElement=document.getElementById("bank-balance-value");
                balanceValueElement.innerText = playerData.displayedBalance;
            }
        }, gameSettingsData.balanceTickDelayMilliseconds);
    }

    
}

function getInputValue() {
    let inputElement = document.getElementById("answer-input");
    let inputValueString = inputElement.value;
    return Number(inputValueString);
}

function clearInput() {
    let inputElement = document.getElementById("answer-input");
    inputElement.value = "";
}

function addEventListenerToInput(){
    let inputElement = document.getElementById("answer-input");

    inputElement.addEventListener("input", (event) => {
        if(questionData.x + questionData.y == getInputValue()){
            changeBalance(5000);
            console.log("New player balance: " + String(playerData.balance));
            console.log("Generating new question...");
            clearInput();
            generateQuestion();
        }
        else{
            console.log("Incorrect answer");
        }
        
        console.log("the input number is: " + String(getInputValue()));
    });
}

//makes the question and displays it to the screen
function generateQuestion() {
    questionData.x = randBetween(1,10);
    questionData.y = randBetween(1,10);
    let displayString = String(questionData.x) + "+" + String(questionData.y) + "=?";
    let questionDisplayElement = document.getElementById("card-question");

    questionDisplayElement.innerText = displayString;
}

//returns a random number between 'min' and 'max'
//if input is invalid it returns nothing
function randBetween(min, max) {
    if(!Number.isInteger(min) ||
       !Number.isInteger(max) ||
       min>max) {
        console.log("invalid input to randBetween");
    }

    return Math.floor(Math.random() * (max-min)) + min;
}

//link: https://danielvance1.github.io/no_framework_web_app/

