
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const gameWidth = board.width;
const gameHeight = board.height;
const unitSize = 17;
const foodColor = "red";
const snakeColor = "green";
let speedX = unitSize;
let speedY = 0;
let foodX;
let foodY;

let snake= [
    {x: unitSize * 4, y:0},
    {x: unitSize * 3, y:0},
    {x: unitSize * 2, y:0},         //snake is an array of object. //
    {x: unitSize, y:0},
    {x: 0, y:0}
]     



// document.addEventListener("keydown", changeDirection()); //
resetButton.addEventListener("click" , pressToReset);
placeFood();
drawSnake();




function pressToReset(){
    var x = document.getElementById("resetButton");
    x.autofocus = true;
    
}

/*function changeDirection(event){
    switch(event.key){
        case "ArrowUp":

        case "ArrowDown":

        case "ArrowRight":

        case "ArrowLeft":
    }
} */

function moveSnake(){

 
}

function drawSnake(){
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillStyle = snakeColor;

    snake.forEach(snakePart => { 
            ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
            ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);})
}

function placeFood(){
    function randomFood(min, max){
        const randomNumber = Math.floor((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randomNumber;
    }
    foodX = randomFood(0, gameHeight - unitSize);
    foodY = randomFood(0, gameHeight - unitSize);
    drawFood();
    
    function drawFood(){
        ctx.fillStyle = foodColor;
        ctx.fillRect(foodX, foodY, unitSize, unitSize);  
        }
    }

 