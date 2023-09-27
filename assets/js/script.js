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
            }
        });
    }
});

function runGame() {

}

function calculateCorrectAnswer() {

}

function checkAnswers() {

}

function incrementCorrect() {

}

function incrementIncorrect() {

}

function displayEasyQuestion() {

}

function displayMediumQuestion() {

}

function displayHardQuestion() {

}