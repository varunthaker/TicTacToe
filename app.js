const X_class = "x"
const Circle_class = "circle"
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winMessage = document.querySelector("[message-text]");
const restartButton = document.getElementById('restart')


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

if(checkWin(currentClass)){
    endGame(false);
} else if (isDraw()){
    endGame(true)
} else {
    swapTurn();
    hoverEffect();
}

checkWin()

}

function isDraw() {
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_class) || cell.classList.contains(Circle_class)

    })
}

function endGame(draw){

    if(draw){
        winMessage.innerText= "Game Draw!"
        
    } else {
        winMessage.innerText = `${circleTurn ? "O" : "X"} Wins!`
    }

    winMessage.classList.add('show')
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurn() {
    circleTurn=!circleTurn
}

function hoverEffect(){
    board.classList.remove(X_class);
    board.classList.remove(Circle_class)

    if(circleTurn) {
        board.classList.add(Circle_class)
    } else {
        board.classList.add(X_class)
    }

}


function checkWin(currentClass){

    return winningCombinations.some(combination =>{
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)

        })
    })

}




