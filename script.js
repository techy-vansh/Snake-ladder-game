let rollingSound = new Audio('audio/rolling.mp3');
let winSound = new Audio('audio/win.mp3');
let snakebit = new Audio('audio/audio_snake.mp3')
let ladder = new Audio('audio/audio_ladder.mp3')
let roll;
let currentp;
let counterTurn = document.createElement("div");
let container = document.querySelector(".container");
let positionRed = document.createElement("div");
let positionblue = document.createElement("div");
let playerToken;
let board = document.querySelector(".board");
let cells = document.querySelectorAll(".cell");
let diceNo = document.querySelector(".diceNo");
let diceBtn = document.querySelector(".btn5");
let counter1 = document.querySelector(".counter1");
let counter2 = document.querySelector(".counter2");
let diceBox = document.querySelector(".diceBox");
let restartGame = document.querySelector(".reset"); 
let counters = document.querySelector(".counters")

let turn = -1;
let playerPosition1 = 0;
let playerPosition2 = 0;
const snakes = {
    51: 10, 38: 20, 76: 54, 91: 73, 97: 61
};

const ladders = {
    5: 58, 14: 49, 53: 72, 64: 83
};

async function moveCounter(counter, startPosition, endPosition) {
    for (let pos = startPosition + 1; pos <= endPosition; pos++) {
        const square = Array.from(cells).find(cell => cell.innerText == pos);
        
        if (square) {
            square.appendChild(counter);
            await new Promise(resolve => setTimeout(resolve, 200)); // Delay of 300ms
        }
         diceBtn.disabled = true;
    }
     diceBtn.disabled = false;
}

function playerSet1(square) {

    // indicate whose turn
    counterTurn.innerText = "Blue counter turn";
    counterTurn.style.fontSize = "21px";
    counterTurn.style.color = "#191970";
    counterTurn.style.marginLeft = "49px";
    
    if (!diceBox.contains(counterTurn)) {
        diceBox.appendChild(counterTurn);
        diceBox.prepend(counterTurn);
    }
    
    // display the current position of counters
    if (!container.contains(positionRed)) {
        container.appendChild(positionRed);
        container.prepend(positionRed);
    }

    positionRed.innerText = "Position of Red counter :- " + square.innerText;
    positionRed.style.fontSize = "20px";
    positionRed.style.marginTop = "20px";
    positionRed.style.color = "#6a7399";
}

function playerSet2(square) {

     
    // show whose turn
    counterTurn.innerText = "Red counter turn";
    counterTurn.style.fontSize = "21px";
    counterTurn.style.color = "#ee3d3d";
    counterTurn.style.marginLeft = "49px";

    if (!diceBox.contains(counterTurn)) {
        diceBox.appendChild(counterTurn);
        diceBox.prepend(counterTurn);
    }

    // show current position of counter
    if (!container.contains(positionblue)) {
        container.appendChild(positionblue);
        container.prepend(positionblue);
    }
    positionblue.innerText = "Position of Blue counter :- " + square.innerText;
    positionblue.style.fontSize = "20px";
    positionblue.style.color = "#6a7399";
}

async function updatePlayer1(roll) {

      if(counterTurn.style.display === "none" ||
        positionRed.style.display === "none"){
        counterTurn.style.display = "block" 
        positionRed.style.display = "block"
              
    }

    playerPosition1 += roll;
    if (playerPosition1 > 100) {
        playerPosition1 -= roll; 
        alert(`Red counter needs ${100 - playerPosition1} to reach 100!`);
        return;
    }

    // Move the counter step by step
    await moveCounter(counter1, playerPosition1 - roll, playerPosition1);

    // Check ladders
    if (ladders[playerPosition1]) {
        alert("Red counter climbed a ladder!");
        playerPosition1 = ladders[playerPosition1];
        cells.forEach((square)=>{
        if(square.innerText ==playerPosition1)
        square.appendChild(counter1);
     });
     ladder.play();
    }

    // Check snakes
    if (snakes[playerPosition1]) {
        alert("Oops! Red counter hit a snake!");
        playerPosition1 = snakes[playerPosition1];
        cells.forEach((square)=>{
        if(square.innerText ==playerPosition1)
        square.appendChild(counter1);
     });
     snakebit.play();
    }

    if (playerPosition1 === 100) {
        winSound.play();
        alert("🎉 Congratulations! Red counter reached 100!");
        diceBtn.disabled = true;
    }

    // Update the display
    cells.forEach((square) => {
        if (square.innerText == playerPosition1) playerSet1(square);
    });
}

async function updatePlayer2(roll) {

    if(counterTurn.style.display === "none" ||
        positionblue.style.display === "none"){
        counterTurn.style.display = "block" 
        positionblue.style.display = "block";
            
    }

    playerPosition2 += roll;
    if (playerPosition2 > 100) {
        playerPosition2 -= roll; 
        alert(`Blue counter needs ${100 - playerPosition2} to reach 100!`);
        return;
    }

    // Move the counter step by step
    await moveCounter(counter2, playerPosition2 - roll, playerPosition2);

    

    // Check ladders
    if (ladders[playerPosition2]) {
        alert("Blue counter climbed a ladder!");
        playerPosition2 = ladders[playerPosition2];
        cells.forEach((square)=>{
        if(square.innerText ==playerPosition2)
        square.appendChild(counter2);
     });
     ladder.play();
    }

    // Check snakes
    if (snakes[playerPosition2]) {
        alert("Oops! Blue counter hit a snake!");
        playerPosition2 = snakes[playerPosition2];
        cells.forEach((square)=>{
        if(square.innerText ==playerPosition2)
        square.appendChild(counter2);
     });
       snakebit.play();
    }

    if (playerPosition2 === 100) {
        winSound.play();
        alert("🎉 Congratulations! Blue counter won the Game!");
        diceBtn.disabled = true;
    }

     // Update the display
    cells.forEach((square) => {
        if (square.innerText == playerPosition2) playerSet2(square);
    });
   
}

function rollDice() {
    rollingSound.play();
    roll = Math.floor(Math.random() * 6) + 1;
    diceNo.innerText = roll;
    turn++;
    if (turn % 2 === 0) {
        updatePlayer1(roll);
    } else {
        updatePlayer2(roll);
    }
}

function playAgain(){
   counters.appendChild(counter1)
   counters.appendChild(counter2)
   playerPosition1 = 0;
   playerPosition2 = 0;
   diceNo.innerText = "--";
   positionRed.innerText = "";
   positionRed.innerText = "";
   positionRed.style.display = "none";
   positionblue.style.display = "none";
   counterTurn.style.display = "none";

}

diceBtn.addEventListener('click', rollDice);
restartGame.addEventListener('click', playAgain);
