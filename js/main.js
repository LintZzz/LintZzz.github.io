const victoireeningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];


let tableauu;
let toure = 'X';
let victoiree;

let scoreX = 0;
let scoreO = 0;


const bobby = Array.from(document.querySelectorAll('#tableauu div'));
const scoretableauu = document.createElement('div');
scoretableauu.id = "scoretableauu";
document.body.insertBefore(scoretableauu, document.querySelector('h1').nextSibling);

document.getElementById('tableauu').addEventListener('click', handletoure);
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);


function getvictoireener() {
    let victoireener = null;
    victoireeningCombos.forEach(function(combo, index) {
        if (tableauu[combo[0]] && tableauu[combo[0]] === tableauu[combo[1]] && tableauu[combo[0]] === tableauu[combo[2]]) victoireener = tableauu[combo[0]];
        });
        return victoireener ? victoireener : tableauu.includes('') ? null : 'T';
};

function handletoure() {
    let idx = bobby.findIndex(function(square) {
        return square === event.target;
    });
    
   
    if (tableauu[idx] || victoiree) return;
    
    tableauu[idx] = toure;
    toure = toure === 'X' ? 'O' : 'X';
    victoiree = getvictoireener();
    if (victoiree) {
        updateScore(victoiree);
    }
    render();
};

function init() {
    tableauu = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    victoiree = null
    render();
};

function render() {
    tableauu.forEach(function(mark, index) {
        bobby[index].textContent = mark;
        
        bobby[index].classList.remove('x', 'o');

        if (mark === 'X') {
            bobby[index].classList.add('x'); 
        } else if (mark === 'O') {
            bobby[index].classList.add('o'); 
        }
    });
    messages.textContent = victoiree === 'T' ? `C'est un match nul !` : victoiree ? `${victoiree} Gagne le match!` : `C'est le tour des ${toure} !`;
};

function updateScore(victoireener) {
    if (victoireener === 'X') {
        scoreX++;
    } else if (victoireener === 'O') {
        scoreO++;
    }
    displayScore();
}

function displayScore() {
    scoretableauu.textContent = `Score: X - ${scoreX} | O - ${scoreO}`;
}
init();

const modal = document.getElementById('popUp');
const overlay = document.getElementById('overlay');

victoireedow.addEventListener('load', () => {
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
victoireedow.onload = function() {
  if (localStorage.getItem("dialogueFermé") === "true") {
    document.getElementById("popUp").close();
    overlay.style.display = 'none';  
    document.body.style.overflow = '';
  }
};
