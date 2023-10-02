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
    runGame('easy');
});

/**
 * Creates random integers between 1 and 7 and assigns them to fruits; 2, 3, and 4 created for easy, medium and Fruity respectively.
 * Creates random integers between 1 and 3 and assigns them to fruit multipliers. 2, 3, and 4 created for easy, medium and Fruity respectively.
 * If answer of equation is negative, numbers will regenerate until it's positive. Once numbers are suitable, displayQuestion functions will execute.
 */
function runGame(gameMode) {

    let fruit1 = Math.floor(Math.random() * 7) + 1;
    let fruit2 = Math.floor(Math.random() * 7) + 1;

    let fruit1Multiple1 = Math.floor(Math.random() * 3) + 1;
    let fruit2Multiple1 = Math.floor(Math.random() * 3) + 1;
    let fruit1Multiple2 = Math.floor(Math.random() * 3) + 1;
    let fruit2Multiple2 = Math.floor(Math.random() * 3) + 1;

    if (gameMode === 'easy') {
        // if answer2 is negative then regenerate random numbers until answer2 is positive
        let answer2 = ((fruit1 * fruit1Multiple2) <= (fruit2 * fruit2Multiple2));
        if (Math.sign(answer2) === -1) {
            runGame(gameMode);
        } else displayEasyQuestion(fruit1, fruit2, fruit1Multiple1, fruit2Multiple1, fruit1Multiple2, fruit2Multiple2);
    } else if (gameMode === 'medium') {
        let fruit3 = Math.floor(Math.random() * 7) + 1;
        let fruit1Multiple3 = Math.floor(Math.random() * 3) + 1;
        let fruit2Multiple3 = Math.floor(Math.random() * 3) + 1;
        let fruit3Multiple1 = Math.floor(Math.random() * 3) + 1;
        let fruit3Multiple2 = Math.floor(Math.random() * 3) + 1;
        let fruit3Multiple3 = Math.floor(Math.random() * 3) + 1;

        // if answer3 is negative then regenerate random numbers until answer3 is positive
        let answer3 = (((fruit1 * fruit1Multiple3) - (fruit2 * fruit2Multiple3)) - (fruit3 * fruit3Multiple3));
        if (Math.sign(answer3) === -1) {
            runGame('medium');
        } else {
            displayMediumQuestion(fruit1, fruit2, fruit1Multiple1, fruit2Multiple1, fruit1Multiple2, fruit2Multiple2, fruit3, fruit3Multiple1, fruit3Multiple2, fruit3Multiple3, fruit1Multiple3, fruit2Multiple3);
        }
    } else {
        alert(`unknown gameMode ${gameMode}`);
        throw `unknown gameMode ${gameMode}. Abort mission!`;
    }
}

/**
 * Updates question-area html using template literals with structure and variables for EASY gameMode. Fruit numbers will be hidden from the user, instead showing fruit icons.
 */
function displayEasyQuestion(fruit1, fruit2, fruit1Multiple1, fruit2Multiple1, fruit1Multiple2, fruit2Multiple2, gameMode) {

    let answer1 = fruit1 * fruit1Multiple1 + fruit2 * fruit2Multiple1;
    let answer2 = fruit1 * fruit1Multiple2 - fruit2 * fruit2Multiple2;

    let fruitEmoji1, fruitEmoji2;

    do {
        fruitEmoji1 = fruitEmoji();
        fruitEmoji2 = fruitEmoji();
    } while (fruitEmoji1 === fruitEmoji2);

    let easyQuestion = document.getElementsByClassName('question-area')[0];
    easyQuestion.innerHTML =

        `<div>
            <span id='fruit1' type='number' class='hidden'>${fruit1}</span>
            <span>${generateEmoji(fruitEmoji1, fruit1Multiple1)} + </span>
            <span class='hidden'>${fruit1Multiple1}</span>
            <span id='fruit2' type='number' class='hidden'>${fruit2}</span>
            <span>${generateEmoji(fruitEmoji2, fruit2Multiple1)} = </span>
            <span class='hidden'> x ${fruit2Multiple1}</span>
            <span id='answer1'>${answer1}</span>
            </div>

            <div>
            <span id='fruit1' type='number' class='hidden'>${fruit1}</span>
            <span>${generateEmoji(fruitEmoji1, fruit1Multiple2)} - </span>
            <span class='hidden'>${fruit1Multiple2}</span>
            <span id='fruit2' type='number' class='hidden'>${fruit2}</span>
            <span>${generateEmoji(fruitEmoji2, fruit2Multiple2)} = </span>
            <span class='hidden'>${fruit2Multiple2}</span>
            <span id='answer1'>${answer2}</span>
            </div>`;

    displayEasyAnswer(gameMode);
}

/**
 * Updates answer-area html using template literals with structure for EASY gameMode.
 */
function displayEasyAnswer() {
    let easyAnswer = document.getElementsByClassName('answer-area')[0];
    easyAnswer.innerHTML =
        `<div data-type='easy'>
            Fruit1 = 
            <input id='guess1' type='number' />
        </div>
        <div>
            Fruit2 = 
            <input id='guess2' type='number' />
        </div>`;

}

/**
 * Updates question-area html using template literals with structure and variables for MEDIUM gameMode. Fruit numbers will be hidden from the user, instead showing fruit icons.
 */
function displayMediumQuestion(fruit1, fruit2, fruit1Multiple1, fruit2Multiple1, fruit1Multiple2, fruit2Multiple2, fruit3, fruit3Multiple1, fruit3Multiple2, fruit3Multiple3, fruit1Multiple3, fruit2Multiple3) {

    let answer1 = fruit1 * fruit1Multiple1 + fruit2 * fruit2Multiple1 + fruit3 * fruit3Multiple1;
    let answer2 = fruit1 * fruit1Multiple2 + fruit2 * fruit2Multiple2 - fruit3 * fruit3Multiple2;
    let answer3 = fruit1 * fruit1Multiple3 - fruit2 * fruit2Multiple3 - fruit3 * fruit3Multiple3;

    let mediumQuestion = document.getElementsByClassName('question-area')[0];
    mediumQuestion.innerHTML =
        `<div>
            <span id='fruit1' type='number'>${fruit1}</span>
            <span> x ${fruit1Multiple1} + </span>
            <span id='fruit2' type='number'>${fruit2}</span>
            <span> x ${fruit2Multiple1} + </span>
            <span id='fruit3' type='number'>${fruit3}</span>
            <span> x ${fruit3Multiple1} = </span>
            <span id='answer1'>${answer1}</span>
            </div>

            <div>
            <span id='fruit1' type='number'>${fruit1}</span>
            <span> x ${fruit1Multiple2} + </span>
            <span id='fruit2' type='number'>${fruit2}</span>
            <span> x ${fruit2Multiple2} - </span>
            <span id='fruit3' type='number'>${fruit3}</span>
            <span> x ${fruit3Multiple2} = </span>
            <span id='answer2'>${answer2}</span>
            </div>
            
            <div>
            <span id='fruit1' type='number'>${fruit1}</span>
            <span> x ${fruit1Multiple3} - </span>
            <span id='fruit2' type='number'>${fruit2}</span>
            <span> x ${fruit2Multiple3} - </span>
            <span id='fruit3' type='number'>${fruit3}</span>
            <span> x ${fruit3Multiple3} = </span>
            <span id='answer3'>${answer3}</span>
            </div>`;

    displayMediumAnswer();

}

/**
 * Updates answer-area html using template literals with structure for MEDIUM gameMode.
 */
function displayMediumAnswer() {
    let mediumAnswer = document.getElementsByClassName('answer-area')[0];
    mediumAnswer.innerHTML =
        `<div data-type='medium'>
            Fruit1 = 
            <input id='guess1' type='number' />
        </div>
        <div>
            Fruit2 = 
            <input id='guess2' type='number' />
        </div>
        <div>
            fruit3 = 
            <input id='guess3' type='number' />
        </div>`;

}
/**
 * Updates question-area html using template literals with structure and variables for FRUITY gameMode. Fruit numbers will be hidden from the user, instead showing fruit icons.
 */
function displayFruityQuestion() {

}

/**
 * Updates answer-area html using template literals with structure for FRUITY gameMode.
 */
function displayFruityAnswer() {

}

/**
 * Gets user guesses and fruit values from the DOM and compares the two arrays. If they match, execute incrementCorrect(), else execute incrementIncorrect(). 
 */
function checkAnswers(gameMode) {
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
        incrementCorrect();
        runGame(gameMode);
    } else {
        alert('Sorry, try again pal');
        incrementIncorrect();
        runGame(gameMode);
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