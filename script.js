//Initial snake position
let inputDir = {x:0, y:0}
//sounds 
const foodsound = new Audio('food.wav');
const gameoversound = new Audio('gameover.wav');
const movesound = new Audio('movesound.mp3');
const gamebacksound = new Audio('background_music.mp3');
let board = document.getElementById("board");
let speed = 12;
let lastPaintTime =0;
let score =0;

let snakearr = [{x:13, y:15}];
//first element of snake array is the head.
let food = {x: 5, y: 4};



function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
        //If the time elapsed > 0.5 sec then only rerender. 
    }
    lastPaintTime = ctime;
    gameEngine();
    //to display and update the snake. 
}




function isCollide(arr){
    //if the snake bumps into the wall
    if(arr[0].x <=0||arr[0].x>=30||arr[0].y<=0||arr[0].y>=30){
        return true;
    }

    //if snake bumps into itself
    //if the head of the snake which is arr[0] becomes equal to any of the snake element.
    for(let i=1;i<arr.length;i++){
        if(arr[i].x===arr[0].x && arr[i].y===arr[0].y){
            return true;
        }
    }
    return false;
}

function gameEngine(){
    //Updating the snake position Game over part
    if(isCollide(snakearr)){
        gameoversound.play();
        gamebacksound.pause();
        inputDir = {x:0, y:0};
        alert('GameOver....Press any key to start the game');
        snakearr = [{x:13, y:15}];
        score =0;


    }
    //to replace the food after eating the food. Also increment the food.
    //It will happen when head coordinate snakearr[0] and food coordintes match
    if(snakearr[0].x ===food.x && snakearr[0].y ===food.y){
        foodsound.play();
        score = score+1;
        snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y});
        //upating head
        //unshift() method adds new items to the beginning of an array
        let a =2;
        let b = 28;
        //to generate random number between a and b
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}

    }

    //code to move the snake

    //move snake 1 step ahead 
    for (let i = snakearr.length - 2; i>=0; i--) { 
        snakearr[i+1] = {...snakearr[i]};
    }
    //add inputdirection to head
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;


    //Display the snake 
    board.innerHTML = "";
    snakearr.forEach((e, index)=>{
        snakeElem = document.createElement('div');
        snakeElem.style.gridRowStart = e.y;
        snakeElem.style.gridColumnStart = e.x;
        
        if(index===0){
            snakeElem.classList.add('head');
        }
        else{
            snakeElem.classList.add('snake');
        }
        
        board.appendChild(snakeElem);
    }) ;
    //Display the food. 
    
    foodElem = document.createElement('div');
    foodElem.style.gridRowStart = food.y;
    foodElem.style.gridColumnStart = food.x;
    foodElem.classList.add('food');
    board.appendChild(foodElem);
}

window.requestAnimationFrame(main);

window.addEventListener('keydown',e =>{
    inputDir = {x:0, y:1};//input direction
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})
