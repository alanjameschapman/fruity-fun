// Wait for DOM to load then listen to button events.

document.addEventListener('DOMContentLoaded', function () {

    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function () {
            if (this.getAttribute('data-type') === 'submit') {
                let domMode = document.getElementsByClassName('answer-area')[0].firstChild;
                let gameMode = domMode.getAttribute('data-type');
                checkAnswers(gameMode);
            } else {
                let gameMode = this.getAttribute('data-type');
                runGame(gameMode);
            }
        });
    }
    runGame('normal');
});

/**
 * Creates random integers between 1 and 7 and assigns them to fruits; 2, 3, and 4 created for normal and Fruity respectively.
 * Creates random integers between 1 and 3 and assigns them to fruit multipliers. 2, 3, and 4 created for normal and Fruity respectively.
 * If answer of equation is negative, numbers will regenerate until it's positive. Once numbers are suitable, displayQuestion functions will execute.
 */
function runGame(gameMode) {

    let fruit1 = Math.floor(Math.random() * 7) + 1;
    let fruit2 = Math.floor(Math.random() * 7) + 1;

    let fruit1Multiple1 = Math.floor(Math.random() * 3) + 1;
    let fruit2Multiple1 = Math.floor(Math.random() * 3) + 1;
    let fruit1Multiple2 = Math.floor(Math.random() * 3) + 1;
    let fruit2Multiple2 = Math.floor(Math.random() * 3) + 1;

    if (gameMode === 'normal') {
        // if answer2 is negative then regenerate random numbers until answer2 is positive
        let answer2 = ((fruit1 * fruit1Multiple2) - (fruit2 * fruit2Multiple2));
        if (Math.sign(answer2) === -1) {
            runGame(gameMode);
        } else displayNormalQuestion(fruit1, fruit2, fruit1Multiple1, fruit2Multiple1, fruit1Multiple2, fruit2Multiple2);
    } else if (gameMode === 'fruity') {
        let fruit3 = Math.floor(Math.random() * 7) + 1;
        let fruit3Multiple1 = Math.floor(Math.random() * 3) + 1;
        let fruit3Multiple2 = Math.floor(Math.random() * 3) + 1;
        let fruit3Multiple3 = Math.floor(Math.random() * 3) + 1;
        let fruit1Multiple3 = Math.floor(Math.random() * 3) + 1;
        let fruit2Multiple3 = Math.floor(Math.random() * 3) + 1;

        // if answer3 is negative then regenerate random numbers until answer3 is positive
        let answer2 = (fruit1 * fruit1Multiple2) + (fruit2 * fruit2Multiple2) - (fruit3 * fruit3Multiple2);
        let answer3 = (fruit1 * fruit1Multiple3) - (fruit2 * fruit2Multiple3) - (fruit3 * fruit3Multiple3);
        if (Math.sign(answer2) === -1 || Math.sign(answer3) === -1) {
            runGame(gameMode);
        } else {
            displayFruityQuestion(fruit1, fruit2, fruit1Multiple1, fruit2Multiple1, fruit1Multiple2, fruit2Multiple2, fruit3, fruit3Multiple1, fruit3Multiple2, fruit3Multiple3, fruit1Multiple3, fruit2Multiple3);
        }
    } else {
        alert(`unknown gameMode ${gameMode}`);
        throw `unknown gameMode ${gameMode}. Abort mission!`;
    }
}

/**
 * Updates question-area html using template literals with structure and variables for NORMAL gameMode. Fruit numbers will be hidden from the user, instead showing fruit icons.
 */
function displayNormalQuestion(fruit1, fruit2, fruit1Multiple1, fruit2Multiple1, fruit1Multiple2, fruit2Multiple2) {

    let answer1 = fruit1 * fruit1Multiple1 + fruit2 * fruit2Multiple1;
    let answer2 = fruit1 * fruit1Multiple2 - fruit2 * fruit2Multiple2;

    let fruitEmoji1, fruitEmoji2;

    do {
        fruitEmoji1 = fruitEmoji();
        fruitEmoji2 = fruitEmoji();
    } while (fruitEmoji1 === fruitEmoji2);

    let NormalQuestion = document.getElementsByClassName('question-area')[0];
    NormalQuestion.innerHTML =

        `<div>
        <span id='fruit1' type='number' class='hidden'>${fruit1}</span>
        <span id='fruitEmoji1'>${generateEmoji(fruitEmoji1, fruit1Multiple1)} + </span>
        <span id='fruit2' type='number' class='hidden'>${fruit2}</span>
        <span id='fruitEmoji2'>${generateEmoji(fruitEmoji2, fruit2Multiple1)} = </span>
        <span id='answer1'>${answer1}</span>
    </div>

    <div>
        <span id='fruit1' type='number' class='hidden'>${fruit1}</span>
        <span id='fruitEmoji1'>${generateEmoji(fruitEmoji1, fruit1Multiple2)} - </span>
        <span id='fruit2' type='number' class='hidden'>${fruit2}</span>
        <span id='fruitEmoji2'>${generateEmoji(fruitEmoji2, fruit2Multiple2)} = </span>
        <span id='answer1'>${answer2}</span>
    </div>`;

    displayNormalAnswer(fruitEmoji1, fruitEmoji2);

}

/**
 * Updates answer-area html using template literals with structure for NORMAL gameMode.
 */
function displayNormalAnswer(fruitEmoji1, fruitEmoji2) {
    let NormalAnswer = document.getElementsByClassName('answer-area')[0];
    NormalAnswer.innerHTML =
        `<div data-type='normal'>
            <span id='fruit1Feedback'>
                ${fruitEmoji1}
            </span>
            <span><label for="guess1"></label><input name="guess1" id='guess1' type='number' min="1" max="7"/></span>
        </div>
        <div>
            <span id='fruit2Feedback'>
                ${fruitEmoji2}
            </span><label for="guess2"></label><input name="guess2" id='guess2' type='number' min="1" max="7"/></span>
        </div>`;

}

/**
 * Updates question-area html using template literals with structure and variables for FRUITY gameMode. Fruit numbers will be hidden from the user, instead showing fruit icons.
 */
function displayFruityQuestion(fruit1, fruit2, fruit1Multiple1, fruit2Multiple1, fruit1Multiple2, fruit2Multiple2, fruit3, fruit3Multiple1, fruit3Multiple2, fruit3Multiple3, fruit1Multiple3, fruit2Multiple3) {

    let answer1 = fruit1 * fruit1Multiple1 + fruit2 * fruit2Multiple1 + fruit3 * fruit3Multiple1;
    let answer2 = fruit1 * fruit1Multiple2 + fruit2 * fruit2Multiple2 - fruit3 * fruit3Multiple2;
    let answer3 = fruit1 * fruit1Multiple3 - fruit2 * fruit2Multiple3 - fruit3 * fruit3Multiple3;

    let fruitEmoji1, fruitEmoji2, fruitEmoji3;

    do {
        fruitEmoji1 = fruitEmoji();
        fruitEmoji2 = fruitEmoji();
        fruitEmoji3 = fruitEmoji();
    } while (fruitEmoji1 === fruitEmoji2 || fruitEmoji1 === fruitEmoji3 || fruitEmoji2 === fruitEmoji3);

    let fruityQuestion = document.getElementsByClassName('question-area')[0];
    fruityQuestion.innerHTML =

        `<div>
        <span id='fruit1' type='number' class='hidden'>${fruit1}</span>
        <span id='fruitEmoji1'>${generateEmoji(fruitEmoji1, fruit1Multiple1)} + </span>
        <span id='fruit2' type='number' class='hidden'>${fruit2}</span>
        <span id='fruitEmoji2'>${generateEmoji(fruitEmoji2, fruit2Multiple1)} + </span>
        <span id='fruit3' type='number' class='hidden'>${fruit3}</span>
        <span id='fruitEmoji3'>${generateEmoji(fruitEmoji3, fruit3Multiple1)} = </span>
        <span id='answer1'>${answer1}</span>
    </div>

    <div>
        <span id='fruit1' type='number' class='hidden'>${fruit1}</span>
        <span id='fruitEmoji1'>${generateEmoji(fruitEmoji1, fruit1Multiple2)} + </span>
        <span id='fruit2' type='number' class='hidden'>${fruit2}</span>
        <span>${generateEmoji(fruitEmoji2, fruit2Multiple2)} - </span>
        <span id='fruit3' type='number' class='hidden'>${fruit3}</span>
        <span>${generateEmoji(fruitEmoji3, fruit3Multiple2)} = </span>
        <span id='answer2'>${answer2}</span>
    </div>
    
    <div>
        <span id='fruit1' type='number' class='hidden'>${fruit1}</span>
        <span>${generateEmoji(fruitEmoji1, fruit1Multiple3)} - </span>
        <span id='fruit2' type='number' class='hidden'>${fruit2}</span>
        <span>${generateEmoji(fruitEmoji2, fruit2Multiple3)} - </span>
        <span id='fruit3' type='number' class='hidden'>${fruit3}</span>
        <span>${generateEmoji(fruitEmoji3, fruit3Multiple3)} = </span>
        <span id='answer3'>${answer3}</span>
    </div>`;

    displayFruityAnswer(fruitEmoji1, fruitEmoji2, fruitEmoji3);

}

/**
 * Updates answer-area html using template literals with structure for FRUITY gameMode.
 */
function displayFruityAnswer(fruitEmoji1, fruitEmoji2, fruitEmoji3) {
    let fruityAnswer = document.getElementsByClassName('answer-area')[0];
    fruityAnswer.innerHTML =
        `<div data-type='fruity'>
            <span id='fruit1Feedback'>
                ${fruitEmoji1}
            </span>
            <span><label for="guess1"><input name="guess1" id='guess1' type='number' min="1" max="7"/></span>
        </div>
        <div>
            <span id='fruit2Feedback'>
                ${fruitEmoji2}
            </span>
            <span><label for="guess2"><input name="guess2" id='guess2' type='number' min="1" max="7"/></span>
        </div>
        <div>
            <span id='fruit3Feedback'>
                ${fruitEmoji3}
            </span>
            <span><label for="guess3"><input name="guess3" id='guess3' type='number' min="1" max="7"/></span>
            </div>
        </div>`;

}

/**
 * Gets user guesses and fruit values from the DOM and compares the two arrays. If they match, execute incrementCorrect(), else execute incrementIncorrect(). 
 */
function checkAnswers(gameMode) {
    let userGuess1 = parseInt(document.getElementById('guess1').value);
    let userGuess2 = parseInt(document.getElementById('guess2').value);

    let fruit1 = parseInt(document.getElementById('fruit1').innerText);
    let fruit2 = parseInt(document.getElementById('fruit2').innerText);

    if (gameMode === 'normal') {
        userAnswers = [userGuess1, userGuess2];
        correctAnswers = [fruit1, fruit2];
    } else {
        let userGuess3 = parseInt(document.getElementById('guess3').value);
        let fruit3 = parseInt(document.getElementById('fruit3').innerText);
        userAnswers = [userGuess1, userGuess2, userGuess3];
        correctAnswers = [fruit1, fruit2, fruit3];
    }

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
        userFeedback(gameMode);
        incrementCorrect();
    } else {
        userFeedback(gameMode);
        incrementIncorrect();
    }

}

function incrementCorrect() {
    let oldScore = parseInt(document.getElementById("correct").innerText);
    document.getElementById("correct").innerText = ++oldScore;
}

function incrementIncorrect() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

/** Creates an array of fruit and returns one at random for use in displayAnswer functions. */
function fruitEmoji() {
    emojiArray = ['&#127815', '&#127820', '&#127821', '&#127823', '&#127824', '&#127827', '&#129373'];
    randomChoice = Math.floor(Math.random() * emojiArray.length);
    return emojiArray[randomChoice];
}

/** Takes an emoji, creates a string of them (determined by value of fruitMultiple) and returns to displayAnswer */
function generateEmoji(emoji, count) {
    let emojiString = '';
    for (let i = 0; i < count; i++) {
        emojiString += emoji;
    }
    return emojiString;
}

function userFeedback(gameMode) {

    let userGuess1 = parseInt(document.getElementById('guess1').value);
    let userGuess2 = parseInt(document.getElementById('guess2').value);

    let fruitEmoji1 = document.getElementById('fruit1Feedback').innerText;
    let fruitEmoji2 = document.getElementById('fruit2Feedback').innerText;

    let fruit1 = document.getElementById('fruit1').innerText;
    let fruit2 = document.getElementById('fruit2').innerText;

    if (gameMode === 'normal') {
        let feedback = document.getElementsByClassName('feedback-area')[0];
        feedback.innerHTML =
            `<h1>Feedback:</h1>
            <div>
            For ${fruitEmoji1}, you guessed ${userGuess1}. The anwer was ${fruit1}.
            </div>
            <div>For ${fruitEmoji2}, you guessed ${userGuess2}. The anwer was ${fruit2}.
            </div>`;
    } else {
        let userGuess3 = parseInt(document.getElementById('guess3').value);
        let fruitEmoji3 = document.getElementById('fruit3Feedback').innerText;
        let fruit3 = document.getElementById('fruit3').innerText;

        let feedback = document.getElementsByClassName('feedback-area')[0];
        feedback.innerHTML =
            `<h1>Feedback:</h1>
            <div>
            For ${fruitEmoji1}, you guessed ${userGuess1}. The anwer was ${fruit1}.
            </div>
        
            <div> 
             For ${fruitEmoji2}, you guessed ${userGuess2}. The anwer was ${fruit2}.
            </div>
        
            <div>
            For ${fruitEmoji3}, you guessed ${userGuess3}. The anwer was ${fruit3}.
            </div>`;
    }
};;