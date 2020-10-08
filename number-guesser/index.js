
/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

let min = 1,
    max = 10,
    winningNum = getWinningNUm(min, max),
    guessesLeft = 3;

const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value)
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    if (guess === winningNum) {
        // disable input
        guessInput.disabled = true;
        guessInput.style.borderColor = 'green';
        setMessage(`YOU WIN ${winningNum} is correct`, 'green');
        guessBtn.value = 'Play Again';
        guessBtn.className += 'play-again';
    } else {
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            guessInput.disabled = true;
            guessInput.style.borderColor = 'red';
            setMessage(`Game Over! The correct number was ${winningNum}`, 'red');
            guessBtn.value = 'Play Again';
            guessBtn.className += 'play-again';
        } else {
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is not correct. Only ${guessesLeft} guesses left`, 'red');
        }
    }
});

function getWinningNUm(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)+min));
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
