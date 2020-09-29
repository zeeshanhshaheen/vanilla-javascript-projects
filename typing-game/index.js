const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

let randomWord;
let score = 0;
let time = 10;
let difficulity = localStorage.getItem('difficulity') !== null ?
    localStorage.getItem('difficulity') : 'medium';

difficultySelect.value = localStorage.getItem('difficulity') !== null ?
    localStorage.getItem('difficulity') : 'medium';

text.focus();

const timeIntervel = setInterval(updateTime, 1000);

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function addWordDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time === 0) {
        clearInterval(timeIntervel);
        gameOver();
    }
}

function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
  `;
    endgameEl.style.display = 'flex';
}

addWordDOM();

text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordDOM();
        updateScore();
        e.target.value = '';
        
        if (difficulity === 'hard') {
            time += 2;
        } else if (difficulity === 'medium') {
            time += 3;
        } else {
            time += 5;
        }

        updateTime();
    }
});

settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

settingsForm.addEventListener('change', e => {
    difficulity = e.target.value;
    localStorage.setItem('difficulity', difficulity);
})