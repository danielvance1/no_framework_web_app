const scrapBowlContents = []

var money = 0;
setupPage();


function setupPage(){
    updateMoney(0);
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

