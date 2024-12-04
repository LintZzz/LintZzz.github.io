const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];


let board;
let turn = 'X';
let win;

let scoreX = 0;
let scoreO = 0;


const squares = Array.from(document.querySelectorAll('#board div'));
const scoreBoard = document.createElement('div');
scoreBoard.id = "scoreboard";
document.body.insertBefore(scoreBoard, document.querySelector('h1').nextSibling);

document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);


function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });
        return winner ? winner : board.includes('') ? null : 'T';
};

function handleTurn() {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    
   
    if (board[idx] || win) return;
    
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    if (win) {
        updateScore(win);
    }
    render();
};

function init() {
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    win = null
    render();
};

function render() {
    board.forEach(function(mark, index) {
        squares[index].textContent = mark;
        
        squares[index].classList.remove('x', 'o');

        if (mark === 'X') {
            squares[index].classList.add('x'); 
        } else if (mark === 'O') {
            squares[index].classList.add('o'); 
        }
    });
    messages.textContent = win === 'T' ? `C'est un match nul !` : win ? `${win} Gagne le match!` : `C'est le tour des ${turn} !`;
};

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
    } else if (winner === 'O') {
        scoreO++;
    }
    displayScore();
}

function displayScore() {
    scoreBoard.textContent = `Score: X - ${scoreX} | O - ${scoreO}`;
}
init();

const modal = document.getElementById('popUp');
const overlay = document.getElementById('overlay');

window.addEventListener('load', () => {
  modal.showModal();  
  overlay.style.display = 'block';  
  document.body.style.overflow = 'hidden'; 
});
function fermerDialogue() {
  document.getElementById("popUp").close();
  overlay.style.display = 'none';  
  document.body.style.overflow = ''; 
}
function fermerPourToujours() {
  localStorage.setItem("dialogueFermé", "true");
  document.getElementById("popUp").close();
  overlay.style.display = 'none';  
  document.body.style.overflow = ''; 
}
window.onload = function() {
  if (localStorage.getItem("dialogueFermé") === "true") {
    document.getElementById("popUp").close();
    overlay.style.display = 'none';  
    document.body.style.overflow = '';
  }
};
