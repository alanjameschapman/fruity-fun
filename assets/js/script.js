// Wait for DOM to load then listen to button events.

document.addEventListener('DOMContentLoaded', function () {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function () {
            if (this.getAttribute('data-type') === 'submit') {
                checkAnswers();
            } else {
                let gameMode = this.getAttribute('data-type');
                // alert(`you clicked ${gameMode}`);
                runGame(gameMode);
            }
        });
    }
    runGame('easy');
});

function runGame(gameMode) {

    if (gameMode === 'easy') {
        displayEasyQuestion();

    } else {
        alert(`unknown gameMode ${gameMode}`);
        throw `unknown gameMode ${gameMode}. Abort mission!`;
    }
}

function checkAnswers() {
    let userGuess1 = parseInt(document.getElementById('guess1').value);
    let userGuess2 = parseInt(document.getElementById('guess2').value);

    let fruit1 = parseInt(document.getElementById('fruit1').innerText);
    let fruit2 = parseInt(document.getElementById('fruit2').innerText);

    let userAnswers = [userGuess1, userGuess2];
    let correctAnswers = [fruit1, fruit2];
    let isCorrect = true;

    if (userAnswers.length !== correctAnswers.length) {
        isCorrect = false;
    } else {
        // Loop through the arrays and compare each element
        for (let i = 0; i < userAnswers.length; i++) {
            if (userAnswers[i] !== correctAnswers[i]) {
                isCorrect = false;
                break; // Exit the loop if a mismatch is found
            }
        }
    }

    if (isCorrect) {
        alert('Well done champ!');
    } else {
        alert('Sorry, try again pal');
    }

}

function incrementCorrect() {

}

function incrementIncorrect() {

}
/**
 * Creates 2 random integers between 1 and 7 and assigns them to 2 fruits.
 * Creates 4 random integers between 1 and 3 and assigns them to fruit multiplier.
 * Edits question-area html with structure and variable for easy gameMode.
 */
function displayEasyQuestion() {
    let fruit1 = Math.floor(Math.random() * 7) + 1;
    let fruit2 = Math.floor(Math.random() * 7) + 1;

    let fruit1Multiple1 = Math.floor(Math.random() * 3) + 1;
    let fruit2Multiple1 = Math.floor(Math.random() * 3) + 1;
    let fruit1Multiple2 = Math.floor(Math.random() * 3) + 1;
    let fruit2Multiple2 = Math.floor(Math.random() * 3) + 1;

    // if answer2 is negative then regenerate random numbers until answer2 is positive
    if ((fruit1 * fruit1Multiple2) <= (fruit2 * fruit2Multiple2)) {
        displayEasyQuestion();
    } else {
        let answer1 = fruit1 * fruit1Multiple1 + fruit2 * fruit2Multiple1;
        let answer2 = fruit1 * fruit1Multiple2 - fruit2 * fruit2Multiple2;

        let easyQuestion = document.getElementsByClassName('question-area')[0];
        easyQuestion.innerHTML =
            `<div>
            <span id='fruit1' type='number'>${fruit1}</span>
            <span> x ${fruit1Multiple1} + </span>
            <span id='fruit2' type='number'>${fruit2}</span>
            <span> x ${fruit2Multiple1} = </span>
            <span id='answer1'>${answer1}</span>
            </div>

            <div>
            <span id='fruit1' type='number'>${fruit1}</span>
            <span> x ${fruit1Multiple2} - </span>
            <span id='fruit2' type='number'>${fruit2}</span>
            <span> x ${fruit2Multiple2} = </span>
            <span id='answer1'>${answer2}</span>
            </div>`;

        displayEasyAnswer();

    }

}

function displayEasyAnswer() {
    let easyAnswer = document.getElementsByClassName('answer-area')[0];
    easyAnswer.innerHTML =
        `<div>
            Fruit1 = 
            <input id='guess1' type='number' />
        </div>
        <div>
            Fruit2 = 
            <input id='guess2' type='number' />`;

    // return [fruit1, fruit2];
}

function displayMediumQuestion() {

}

function displayHardQuestion() {

};;

