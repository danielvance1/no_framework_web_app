const scrapBowlContents = []

var money = 0;
var seconds = 0;
var maxCentsPerHour = 0;
setupPage();

var timer = null;
function startInterval() {
    if(timerInterval) return;
    timerInterval = setInterval()
}

function startTimer(){
    seconds += 1;

    let hours = Math.floor(seconds/3600);
    let minutes = Math.floor((seconds-hours*3600)/60);
    let remainingSeconds = seconds-hours*3600-minutes*60;

    let centsPerHour = (seconds === 0 ? 0 : Math.floor((money/seconds)*3600))
    maxCentsPerHour=Math.max(centsPerHour, maxCentsPerHour);

    document.getElementById("time_spent").innerText = `${hours} hours, ${minutes} minutes, ${remainingSeconds} seconds`;
    document.getElementById("dollars_per_hour").innerText = `Dollars per hour: ${(centsPerHour/100).toFixed(2)}`;
    document.getElementById("maximum_pay").innerText = `MAXIMUM HOURLY WAGE: ${(maxCentsPerHour/100).toFixed(2)}`;
    setTimeout(startTimer, 1000);
}

function setupPage(){
    updateMoney(0);
    startTimer();
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addScrapPile(){
    for(var i = 0; i < 20; i++){
        addScrap();
    }
}

function updateMoney(delta){
    if(money+delta < 0){
        return;
    }

    money = money + delta;
    document.getElementById("money").innerText = `bank account: \$${(money/100).toFixed(2)}`;
}

function takeScrap(scrap){
    updateMoney(1);
    scrap.remove();
}

function addScrap(){
    const scrap = document.createElement("div");
    scrap.className = "scrap";
    scrap.draggable = "true";
    scrap.onclick = ()=>(takeScrap(scrap));

    const x = 150 + getRandomIntInclusive(-80, 80);
    const y = 150 + getRandomIntInclusive(-80, 80);
    const rotation = getRandomIntInclusive(0, 359);

    scrap.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

    scrap.id = "scrap" + scrapBowlContents.length;
    scrapBowlContents.push(scrap);

    document.getElementById("scrap_bowl").appendChild(scrap);
}

//link: https://danielvance1.github.io/no_framework_web_app/

