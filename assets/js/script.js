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
/**
 * Creates 4 random integers between 1 and 7 and assigns them to 4 fruits.
 * fruit3 and fruit4 will only be used in medium and Fruity! games respectively.
 * Assigning these fruits 
 */
function runGame() {
    let fruit1 = Math.floor(Math.random() * 7) + 1;
    let fruit2 = Math.floor(Math.random() * 7) + 1;
    let fruit3 = Math.floor(Math.random() * 7) + 1;
    let fruit4 = Math.floor(Math.random() * 7) + 1;

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