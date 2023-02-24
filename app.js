const X_class = "x"
const Circle_class = "circle"
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winMessage = document.querySelector("[message-text]");
const restartButton = document.getElementById('restart')

const winSound = new Audio("Sound/Win.wav");
const drawSound = new Audio("Sound/draw.wav");


const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let circleTurn;


startGame()

function startGame(){

    circleTurn=false

    for (cell of cellElements){

        cell.classList.remove(X_class)
        cell.classList.remove(Circle_class)
        winMessage.innerText = ""
        cell.removeEventListener('click', handleClick)
        cell.addEventListener("click", handleClick, {once: true})
    }
    hoverEffect()
    winMessage.classList.remove('show')

}

restartButton.addEventListener('click', startGame)


function handleClick (e){

//placeMark

const cell=e.target;
const currentClass = circleTurn ? Circle_class: X_class

placeMark(cell, currentClass)

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

// Swap Turn

function swapTurn() {
    circleTurn=!circleTurn
}

if(checkWin(currentClass)){
    endGame(false); // end game false decides win for X or O and display the message
        
} else if (isDraw()){  //check for Draw
    endGame(true) // display message for Draw
    
} else {
    swapTurn();
    hoverEffect();
}

checkWin()

}

// Check for Draw & gives true or false
function isDraw() {
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_class) || cell.classList.contains(Circle_class)

    })
}

function endGame(draw){

    if(draw){
        winMessage.innerText= "Game Draw!"
        drawSound.play();
        // To remove Hover effect
        board.classList.remove(X_class);
        board.classList.remove(Circle_class)
        

    } else {
    
        winMessage.innerText = `${circleTurn ? "O" : "X"} Wins!`
        winSound.play();
        // To remove Hover effect
        board.classList.remove(X_class);
        board.classList.remove(Circle_class)
    }

    winMessage.classList.add('show')
}


//Decides hover effect for next move/class
function hoverEffect(){

    //removes all class for hover on board
    board.classList.remove(X_class);
    board.classList.remove(Circle_class)

    if(circleTurn) {
        board.classList.add(Circle_class)
    } else {
        board.classList.add(X_class)
    }

}

// Check for win, True or False
function checkWin(currentClass){

    return winningCombinations.some(combination =>{
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)

        })
    })

}




