// Wait for DOM to load then listen to button events.

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "submit") {
        const domMode =
          document.getElementsByClassName("answer-area")[0].firstChild;
        const gameMode = domMode.getAttribute("data-type");
        if (this.innerHTML === "Submit") {
          this.innerHTML = "Next";
          checkAnswers(gameMode);
        } else if (this.innerHTML === "Next") {
          this.innerHTML = "Submit";
          runGame(gameMode);
        }
      } else {
        const gameMode = this.getAttribute("data-type");
        runGame(gameMode);
      }
    });
  }
  runGame("normal");
});

/**
 * Creates random integers between 1 and 7 and assigns them to fruits; 2, 3, and 4 created for normal and Fruity respectively.
 * Creates random integers between 1 and 3 and assigns them to fruit multipliers. 2, 3, and 4 created for normal and Fruity respectively.
 * If answer of equation is negative, numbers will regenerate until it's positive. Once numbers are suitable, displayQuestion functions will execute.
 */
function runGame(gameMode) {
  const fruit1 = Math.floor(Math.random() * 7) + 1;
  const fruit2 = Math.floor(Math.random() * 7) + 1;

  const fruit1Multiple1 = Math.floor(Math.random() * 3) + 1;
  const fruit2Multiple1 = Math.floor(Math.random() * 3) + 1;
  const fruit1Multiple2 = Math.floor(Math.random() * 3) + 1;
  const fruit2Multiple2 = Math.floor(Math.random() * 3) + 1;

  if (gameMode === "normal") {
    // if answer2 is negative then regenerate random numbers until answer2 is positive
    const answer2 = fruit1 * fruit1Multiple2 - fruit2 * fruit2Multiple2;
    if (Math.sign(answer2) === -1) {
      runGame(gameMode);
    } else
      displayNormalQuestion(
        fruit1,
        fruit2,
        fruit1Multiple1,
        fruit2Multiple1,
        fruit1Multiple2,
        fruit2Multiple2
      );
  } else if (gameMode === "fruity") {
    const fruit3 = Math.floor(Math.random() * 7) + 1;
    const fruit3Multiple1 = Math.floor(Math.random() * 3) + 1;
    const fruit3Multiple2 = Math.floor(Math.random() * 3) + 1;
    const fruit3Multiple3 = Math.floor(Math.random() * 3) + 1;
    const fruit1Multiple3 = Math.floor(Math.random() * 3) + 1;
    const fruit2Multiple3 = Math.floor(Math.random() * 3) + 1;

    // if answer3 is negative then regenerate random numbers until answer3 is positive
    const answer2 =
      fruit1 * fruit1Multiple2 +
      fruit2 * fruit2Multiple2 -
      fruit3 * fruit3Multiple2;
    const answer3 =
      fruit1 * fruit1Multiple3 -
      fruit2 * fruit2Multiple3 -
      fruit3 * fruit3Multiple3;
    if (Math.sign(answer2) === -1 || Math.sign(answer3) === -1) {
      runGame(gameMode);
    } else {
      displayFruityQuestion(
        fruit1,
        fruit2,
        fruit1Multiple1,
        fruit2Multiple1,
        fruit1Multiple2,
        fruit2Multiple2,
        fruit3,
        fruit3Multiple1,
        fruit3Multiple2,
        fruit3Multiple3,
        fruit1Multiple3,
        fruit2Multiple3
      );
    }
  } else {
    throw new Error(
      `Unknown gameMode ${gameMode} encountered in runGame function.`
    );
  }

  // After the input boxes have been added, add the event listeners
  addEventListeners();
}

/**
 * Updates question-area html using template literals with structure and variables for NORMAL gameMode. Fruit numbers will be hidden from the user, instead showing fruit icons.
 */
function displayNormalQuestion(
  fruit1,
  fruit2,
  fruit1Multiple1,
  fruit2Multiple1,
  fruit1Multiple2,
  fruit2Multiple2
) {
  const answer1 = fruit1 * fruit1Multiple1 + fruit2 * fruit2Multiple1;
  const answer2 = fruit1 * fruit1Multiple2 - fruit2 * fruit2Multiple2;

  let fruitEmoji1, fruitEmoji2;

  do {
    fruitEmoji1 = fruitEmoji();
    fruitEmoji2 = fruitEmoji();
  } while (fruitEmoji1 === fruitEmoji2);

  const NormalQuestion = document.getElementsByClassName("question-area")[0];
  NormalQuestion.innerHTML = `<div>
        <span id='fruit1' type='number' class='hidden'>${fruit1}</span>
        <span id='fruitEmoji1'>${generateEmoji(
          fruitEmoji1,
          fruit1Multiple1
        )} + </span>
        <span id='fruit2' type='number' class='hidden'>${fruit2}</span>
        <span id='fruitEmoji2'>${generateEmoji(
          fruitEmoji2,
          fruit2Multiple1
        )} = </span>
        <span id='answer1'>${answer1}</span>
    </div>

    <div>
        <span id='fruit1' type='number' class='hidden'>${fruit1}</span>
        <span id='fruitEmoji1'>${generateEmoji(
          fruitEmoji1,
          fruit1Multiple2
        )} - </span>
        <span id='fruit2' type='number' class='hidden'>${fruit2}</span>
        <span id='fruitEmoji2'>${generateEmoji(
          fruitEmoji2,
          fruit2Multiple2
        )} = </span>
        <span id='answer1'>${answer2}</span>
    </div>`;

  displayNormalAnswer(fruitEmoji1, fruitEmoji2);
}

/**
 * Updates answer-area html using template literals with structure for NORMAL gameMode.
 */
function displayNormalAnswer(fruitEmoji1, fruitEmoji2) {
  const NormalAnswer = document.getElementsByClassName("answer-area")[0];
  NormalAnswer.innerHTML = `<div data-type='normal'>
            <span id='fruit1Feedback'>
                ${fruitEmoji1}
            </span>
            <span>
                <button class="minus">-</button>
                <input aria-label='guess1' id='guess1' type='number' min="1" max="7" inputmode='numeric' required/>
                <button class="plus">+</button>
            </span>
        </div>
        <div>
            <span id='fruit2Feedback'>
                ${fruitEmoji2}   
            </span>
            <span>
                <button class="minus">-</button>
                <input aria-label='guess2' id='guess2' type='number' min="1" max="7" inputmode='numeric' required/>
                <button class="plus">+</button>    
            </span>
        </div>`;
}

/**
 * Updates question-area html using template literals with structure and variables for FRUITY gameMode. Fruit numbers will be hidden from the user, instead showing fruit icons.
 */
function displayFruityQuestion(
  fruit1,
  fruit2,
  fruit1Multiple1,
  fruit2Multiple1,
  fruit1Multiple2,
  fruit2Multiple2,
  fruit3,
  fruit3Multiple1,
  fruit3Multiple2,
  fruit3Multiple3,
  fruit1Multiple3,
  fruit2Multiple3
) {
  const answer1 =
    fruit1 * fruit1Multiple1 +
    fruit2 * fruit2Multiple1 +
    fruit3 * fruit3Multiple1;
  const answer2 =
    fruit1 * fruit1Multiple2 +
    fruit2 * fruit2Multiple2 -
    fruit3 * fruit3Multiple2;
  const answer3 =
    fruit1 * fruit1Multiple3 -
    fruit2 * fruit2Multiple3 -
    fruit3 * fruit3Multiple3;

  let fruitEmoji1, fruitEmoji2, fruitEmoji3;

  do {
    fruitEmoji1 = fruitEmoji();
    fruitEmoji2 = fruitEmoji();
    fruitEmoji3 = fruitEmoji();
  } while (
    fruitEmoji1 === fruitEmoji2 ||
    fruitEmoji1 === fruitEmoji3 ||
    fruitEmoji2 === fruitEmoji3
  );

  const fruityQuestion = document.getElementsByClassName("question-area")[0];
  fruityQuestion.innerHTML = `<div>
        <span id='fruit1' type='number' class='hidden'>${fruit1}</span>
        <span id='fruitEmoji1'>${generateEmoji(
          fruitEmoji1,
          fruit1Multiple1
        )} + </span>
        <span id='fruit2' type='number' class='hidden'>${fruit2}</span>
        <span id='fruitEmoji2'>${generateEmoji(
          fruitEmoji2,
          fruit2Multiple1
        )} + </span>
        <span id='fruit3' type='number' class='hidden'>${fruit3}</span>
        <span id='fruitEmoji3'>${generateEmoji(
          fruitEmoji3,
          fruit3Multiple1
        )} = </span>
        <span id='answer1'>${answer1}</span>
    </div>

    <div>
        <span id='fruit1' type='number' class='hidden'>${fruit1}</span>
        <span id='fruitEmoji1'>${generateEmoji(
          fruitEmoji1,
          fruit1Multiple2
        )} + </span>
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
  const fruityAnswer = document.getElementsByClassName("answer-area")[0];
  fruityAnswer.innerHTML = `<div data-type='fruity'>
            <span id='fruit1Feedback'>
                ${fruitEmoji1}
            </span>
            <span>
                <button class="minus">-</button>
                <input aria-label='guess1' id='guess1' type='number' min="1" max="7" inputmode='numeric' required/>
                <button class="plus">+</button>
            </span>
        </div>
        <div>
            <span id='fruit2Feedback'>
                ${fruitEmoji2}
            </span>
            <span>
                <button class="minus">-</button>
                <input aria-label='guess2' id='guess2' type='number' min="1" max="7" inputmode='numeric' required/>
                <button class="plus">+</button>
            </span>
        </div>
        <div>
            <span id='fruit3Feedback'>
                ${fruitEmoji3}
            </span>
            <span>
                <button class="minus">-</button>
                <input aria-label='guess3' id='guess3' type='number' min="1" max="7" inputmode='numeric' required/>
                <button class="plus">+</button>
            </span>
            </div>
        </div>`;
}

/**
 * Gets user guesses and fruit values from the DOM and compares the two arrays. If they match, execute incrementCorrect(), else execute incrementIncorrect().
 */
function checkAnswers(gameMode) {
  const userGuess1 = parseInt(document.getElementById("guess1").value);
  const userGuess2 = parseInt(document.getElementById("guess2").value);

  // Check if either guess is empty and update feedback area then return early if so
  if (!userGuess1 || !userGuess2) {
    const feedback = document.getElementsByClassName("feedback-area")[0];
    feedback.innerHTML =
      "<h2 style='color:red;'>Please enter integers between 1-7 in each box. Blanks not allowed.</h2>";
    return;
  }

  const fruit1 = parseInt(document.getElementById("fruit1").innerText);
  const fruit2 = parseInt(document.getElementById("fruit2").innerText);

  if (gameMode === "normal") {
    userAnswers = [userGuess1, userGuess2];
    correctAnswers = [fruit1, fruit2];
  } else {
    const userGuess3 = parseInt(document.getElementById("guess3").value);
    const fruit3 = parseInt(document.getElementById("fruit3").innerText);
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

/** Gets old correct score and increments by 1*/
function incrementCorrect() {
  let oldScore = parseInt(document.getElementById("correct").innerText);
  document.getElementById("correct").innerText = ++oldScore;
}

/** Gets old incorrect score and increments by 1*/
function incrementIncorrect() {
  let oldScore = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerText = ++oldScore;
}

/** Creates an array of fruit and returns one at random for use in displayAnswer functions. */
function fruitEmoji() {
  emojiArray = [
    "&#127815",
    "&#127820",
    "&#127821",
    "&#127823",
    "&#127824",
    "&#127827",
    "&#129373",
  ];
  randomChoice = Math.floor(Math.random() * emojiArray.length);
  return emojiArray[randomChoice];
}

/** Takes an emoji, creates a string of them (determined by value of fruitMultiple) and returns to displayAnswer */
function generateEmoji(emoji, count) {
  let emojiString = "";
  for (let i = 0; i < count; i++) {
    emojiString += emoji;
  }
  return emojiString;
}

/** Gets user guesses, fruit emojis, and answers and provides feedback to user with template literals. */
function userFeedback(gameMode) {
  const userGuess1 = parseInt(document.getElementById("guess1").value);
  const userGuess2 = parseInt(document.getElementById("guess2").value);

  const feedback = document.getElementsByClassName("feedback-area")[0];

  // Validate userGuess1 and userGuess2
  if (isNaN(userGuess1) || isNaN(userGuess2)) {
    feedback.innerHTML =
      "<h2 style='color:red;'>Please enter integers between 1-7 in each box. Blanks not allowed.</h2>";
    return;
  }

  const fruitEmoji1 = document.getElementById("fruit1Feedback").innerText;
  const fruitEmoji2 = document.getElementById("fruit2Feedback").innerText;

  const fruit1 = document.getElementById("fruit1").innerText;
  const fruit2 = document.getElementById("fruit2").innerText;

  if (gameMode === "normal") {
    feedback.innerHTML = `<h2>Feedback:</h2>
            <div>
            For ${fruitEmoji1}, you guessed ${userGuess1}. The anwer was ${fruit1}.
            </div>
            <div>For ${fruitEmoji2}, you guessed ${userGuess2}. The anwer was ${fruit2}.
            </div>`;
  } else {
    const userGuess3 = parseInt(document.getElementById("guess3").value);

    // Validate userGuess3
    if (isNaN(userGuess3)) {
      feedback.innerHTML =
        "<h2 style='color:red;'>Please enter integers between 1-7 in each box. Blanks not allowed.</h2>";
      return;
    }

    const fruitEmoji3 = document.getElementById("fruit3Feedback").innerText;
    const fruit3 = document.getElementById("fruit3").innerText;

    feedback.innerHTML = `<h2>Feedback:</h2>
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
}

function addEventListeners() {
  let guess1 = document.getElementById("guess1");
  let guess2 = document.getElementById("guess2");
  let guess3 = document.getElementById("guess3");
  let submitButton = document.querySelector('[data-type="submit"]');

  function checkInput() {
    let feedbackArea = document.querySelector(".feedback-area");

    if (
      guess1.value === "" ||
      guess2.value === "" ||
      (guess3 && guess3.value === "")
    ) {
      submitButton.disabled = true;
      feedbackArea.innerHTML =
        '<h2>Feedback:</h2><div class="error-message">Please enter your guesses in all fields before submitting.</div>';
    } else {
      submitButton.disabled = false;
      feedbackArea.innerHTML = "<h2>Feedback:</h2>";
    }
  }

  guess1.addEventListener("input", checkInput);
  guess2.addEventListener("input", checkInput);
  if (guess3) {
    guess3.addEventListener("input", checkInput);
  }

  // Initialize the submit button state
  checkInput();
}

// Minus and plus buttons for input fields
let minusButtons = document.querySelectorAll(".minus");
let plusButtons = document.querySelectorAll(".plus");

minusButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      let input = document.getElementById(`guess${index + 1}`);
      let inputValue = parseInt(input.value, 10);
      if (inputValue > 1) {
        input.value = inputValue - 1;
      }
    });
  });
  
  plusButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      let input = document.getElementById(`guess${index + 1}`);
      let inputValue = parseInt(input.value, 10);
      if (inputValue < 10) {
        input.value = inputValue + 1;
      }
    });
  });
