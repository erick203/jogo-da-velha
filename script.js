const Xclass = 'X' 
const Oclass = 'O'
let Xturn 
let gameActive = true 

const WINNING_COMBINATIONS = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]
]

const cells = document.querySelectorAll('.cell')
const board = document.querySelector('#board')

const gameEndTextElement = document.querySelector('[data-game-end-message]') 
const gameEndElement = document.querySelector('#gameEndMessage')

const restartButton = document.querySelector('#restartButton') 

startGame()

function startGame(){
    Xturn = true
    gameActive = true
    
    board.classList.remove(Oclass)
    board.classList.add(Xclass)
    
    gameEndElement.classList.remove('show') 
    
    // 3. Prepara as células
    cells.forEach((cell, index) => {
        cell.classList.remove(Xclass)
        cell.classList.remove(Oclass) 
        
        cell.removeEventListener('click', handleClick)
        
        cell.addEventListener('click', handleClick, { once: true }) 
    })
    
    restartButton.addEventListener('click', startGame)

    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.classList.remove('end');
    }
}

function handleClick(e) {
    if (!gameActive) return 

    const cell = e.target
    const currentClass = Xturn ? Xclass : Oclass
   
    placeMark(cell, currentClass)

    if (checkWin(currentClass)) {
        endGame(false, currentClass) 
    } else if (isDraw()) {
        endGame(true)
    } else {
      
        swapTurns()
        setBoardHoverClass()
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    Xturn = !Xturn
}

function setBoardHoverClass() {
    board.classList.remove(Xclass)
    board.classList.remove(Oclass)
    if (Xturn) {
        board.classList.add(Xclass)
    } else {
        board.classList.add(Oclass)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(Xclass) || cell.classList.contains(Oclass)
    })
}

function endGame(draw, winningClass) {
    gameActive = false
    if (draw) {
        gameEndTextElement.innerText = 'Empate!'
    } else {
        gameEndTextElement.innerText = `${winningClass} Venceu!`
    }
    
    gameEndElement.classList.add('show')
}
