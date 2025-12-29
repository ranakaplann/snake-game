
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const gameWidth = canvas.width;
const gameHeight = canvas.height;
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
    {x: unitSize * 2, y:0},         //snake is an array of object 
    {x: unitSize, y:0},
    {x: 0, y:0}
]     

let gameOver = false;


window.onload = function () {
    resetButton.addEventListener("click" , pressToReset);
    placeFood();
    document.addEventListener("keydown", changeDirection); 
    setInterval(update, 1000/10);
}


function pressToReset(){
     // stop the game
    gameOver = false;

    // yönü başlangıca al
    speedX = unitSize;
    speedY = 0;

    // yılanı başa döndür
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize,     y: 0 },
        { x: 0,            y: 0 }
    ];

    // clean canvas 
    ctx.clearRect(0, 0, gameWidth, gameHeight);

    // place new food
    placeFood();

    // draw first frame
    drawSnake();
}


function changeDirection(e){
    if(e.code == "ArrowUp" && speedY !=unitSize){
        speedX = 0;
        speedY = -unitSize;
    }

    else if(e.code == "ArrowDown" && speedY != -unitSize){
        speedX = 0;
        speedY = +unitSize;
    }
    
    else if(e.code == "ArrowLeft" && speedX !=unitSize){
        speedX = -unitSize;
        speedY = 0;
    }

    else if(e.code == "ArrowRight" && speedX != -unitSize){
        speedX = +unitSize;
        speedY = 0;
    }
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
    }


    function drawFood(){
        ctx.fillStyle = foodColor;
        ctx.fillRect(foodX, foodY, unitSize, unitSize);  
    }
 

    function update() {
    if (gameOver) {
        alert("Game Over");
    }

    // new head coordinates
    const head = {
        x: snake[0].x + speedX,
        y: snake[0].y + speedY
    };

    //  out of bound control
    if (
        head.x < 0 ||
        head.x >= gameWidth ||
        head.y < 0 ||
        head.y >= gameHeight
    ) {
        gameOver = true;
        alert("Game Over");
    }

    //  Kendine çarpma kontrolü
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            alert("Game Over");
        }
    }

    //  Kafayı başa ekle
    snake.unshift(head);

    // Yemek yeme kontrolü
    if (head.x === foodX && head.y === foodY) {
        placeFood(); // uzama var  kuyruk silinmez
    } else {
        snake.pop(); // uzama yok  kuyruk silinir
    }

    // Ekranı temizle
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    drawFood();
    drawSnake();
}


 
 