// Wait for DOM to load then listen to button events.

document.addEventListener('DOMContentLoaded', function () {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function () {
            if (this.getAttribute('data-type') === 'submit') {
                alert('Submission!');
            } else {
                let gameMode = this.getAttribute('data-type');
                alert(`you clicked ${gameMode}`);
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

function calculateCorrectAnswer() {

}

function checkAnswers() {

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
            `<div><span>(${fruit1} x ${fruit1Multiple1}) </span> + <span>(${fruit2} x ${fruit2Multiple1})</span> = <span>${answer1}</span></div>
        <div><span>(${fruit1} x ${fruit1Multiple2}) </span> - <span>(${fruit2} x ${fruit2Multiple2})</span> = <span>${answer2}</span></div>`;
    }
    displayEasyAnswer();
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
        <input id='guess1' type='number' />
        <div>
        <button data-type="submit">Submit</button>
        </div>`;
}

function displayMediumQuestion() {

}

function displayHardQuestion() {

};;

