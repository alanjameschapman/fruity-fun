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
/**
 * Creates 4 random integers between 1 and 7 and assigns them to 4 fruits.
 * strawberry and pear will only be used in medium and Fruity! games respectively.
 */
function runGame(gameMode) {
    let banana = Math.floor(Math.random() * 7) + 1;
    let orange = Math.floor(Math.random() * 7) + 1;
    let strawberry = Math.floor(Math.random() * 7) + 1;
    let pear = Math.floor(Math.random() * 7) + 1;

    if (gameMode === 'easy') {
        displayEasyQuestion(banana, orange);
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

function displayEasyQuestion() {
    let banana = Math.floor(Math.random() * 7) + 1;
    let orange = Math.floor(Math.random() * 7) + 1;
    let bananaMultiple = Math.floor(Math.random() * 3) + 1;
    let orangeMultiple = Math.floor(Math.random() * 3) + 1;
    console.log(banana);
    console.log(orange);

    let easyHtml = document.getElementsByClassName('question-area')[0];
    easyHtml.innerHTML = `<div><span>${bananaMultiple} </span> + <span>${orangeMultiple}</span> = <span>${banana * bananaMultiple + orange * orangeMultiple}</span></div>
    <div><span>${bananaMultiple} </span> - <span>${orangeMultiple}</span> = <span>${banana * bananaMultiple - orange * orangeMultiple}</span></div>`;

}

function displayMediumQuestion() {

}

function displayHardQuestion() {

};;