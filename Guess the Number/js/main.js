//selection for the guess
const guessStatus = document.querySelector(".guessStatus");
const guessButton = document.querySelector("#guessBtn");
const guessRange = document.querySelector(".guessRange");
const guessAttempts = document.querySelectorAll(".attemptNum");
const prevAttempts = document.querySelector(".accordion-body");
let guessRangeValue;
let guessAttemptsValue;

// UI selection
const userGuess = document.querySelector(".userNumber");
const showCorrectGuess = document.querySelector(".result");
const showAttemptRange = document.querySelector(".maxGuess");
const showAttemptNum = document.querySelector(".attemptNum");
const playAgainBtn = document.querySelector(".playAgain");
const gameSetting = document.querySelector(".gameSettings");
const settingBtn = document.querySelector(".bi-gear");
const settingIcon = document.querySelector(".bi-gear svg");
const guessTip = document.querySelector(".alert");

//Modal selection
const modalButton = document.querySelector(".modalBtn"); //this button is hidden and will be trigger to show game final result
const winModal = document.querySelector(".modal");
const statusModalHeader = document.querySelector(".modal-title");
const statusModalBody = document.querySelector(".modal-body");
const closeModal = document.querySelector(".btn-close");

let userAttempts;

// The Guess Answer
let correctGuess;

/** *********************
 *** before game start
 *************************/

//prepare the guess
function getGameValues() {
  guessRangeValue = parseInt(
    guessRange.options[guessRange.selectedIndex].value
  );

  for (i in guessAttempts) {
    if (guessAttempts[i].checked) {
      guessAttemptsValue = parseInt(guessAttempts[i].value);
    }
  }
  showAttemptNum.innerHTML = guessAttemptsValue;
  showAttemptRange.innerHTML = guessRangeValue;
  userAttempts = parseInt(showAttemptNum.innerHTML);
  correctGuess = Math.floor(Math.random() * guessRangeValue);
}

//handle the user guess
function doGuess() {
  if (correctGuess === 0) correctGuess + 1;
  if (userGuess === "") return;
  if (!parseInt(userGuess.value)) {
    alert("Please Enter A Number");
    userGuess.value = "";
    return;
  }

  let userTry = parseInt(userGuess.value);
  userAttempts -= 1;
  showAttemptNum.innerHTML = userAttempts;

  guessCheck(userTry);
  userGuess.value = "";
  userGuess.focus();

  //console.log(correctGuess);  uncomment this to check the game for testing
}

function guessCheck(attempt) {
  if (userAttempts < 1) {
    statusModalHeader.innerHTML = "You Lose";
    statusModalBody.innerHTML = `<p>You didn't guess it!!! <br> ${correctGuess} was the right guess</P>`;

    modalButton.click();
    guessButton.setAttribute("disabled", true);

    playAgainBtn.classList.add("active");
    window.addEventListener("keyup", (el) => {
      if (el.key == "Escape") {
        playAgain();
        closeModal.click();
      }
    });
  }

  if (attempt > correctGuess) {
    prevAttempts.innerHTML += `<p>${attempt}</p>`;
    guessStatus.innerHTML = "it's to high";

    guessTip.classList.add("active");
    setTimeout(() => {
      guessTip.classList.remove("active");
    }, 2000);
  } else if (attempt < correctGuess) {
    prevAttempts.innerHTML += `<p>${attempt}</p>`;
    guessStatus.innerHTML = "it's to low";

    guessTip.classList.add("active");
    setTimeout(() => {
      guessTip.classList.remove("active");
    }, 2000);
  } else {
    statusModalHeader.innerHTML = "You Win";
    statusModalBody.innerHTML = `<p>You Guess it right!!!</P>`;

    prevAttempts.innerHTML += `<p class="bg-success text-light">${attempt}</p>`;
    showCorrectGuess.innerHTML = attempt;

    modalButton.click();
    guessButton.setAttribute("disabled", true);

    playAgainBtn.classList.add("active");
    setTimeout(() => {
      guessTip.classList.remove("active");
    }, 2000);
  }
}

// play again button
function playAgain() {
  userGuess.focus();
  getGameValues();

  playAgainBtn.classList.remove("active");
  guessButton.removeAttribute("disabled");
  prevAttempts.innerHTML = "";
}

//save changes button
function saveChanges() {
  getGameValues();
  showAttemptNum.innerHTML = guessAttemptsValue;
  showAttemptRange.innerHTML = guessRangeValue;
  settingBtn.classList.remove("rotate");
  gameSetting.classList.remove("active");
  playAgainBtn.classList.remove("active");
  prevAttempts.innerHTML = "";
  guessButton.removeAttribute("disabled");

  correctGuess = Math.floor(Math.random() * guessRangeValue);
}

//show settings
function showSettings(click) {
  if (
    click.target.matches(".settings-icon") ||
    click.target.matches(".settings-icon svg") ||
    click.target.matches(".settings-icon path")
  ) {
    settingBtn.classList.toggle("rotate");
    gameSetting.classList.toggle("active");
  } else return;
}

//handle UX stuff
function guessTrigger(press) {
  userGuess.focus();
  if (press.key === "Enter") {
    guessButton.click();
  } else return;
}

function EasyRemoveSettings(click) {
  if (
    !click.target.matches(".gameSettings") &&
    !click.target.matches(".gameSettings label") &&
    !click.target.matches(".gameSettings select") &&
    !click.target.matches(".gameSettings h2") &&
    !click.target.matches(".gameSettings .settings") &&
    !click.target.matches(".gameSettings form") &&
    !click.target.matches(".gameSettings .attemptsNum") &&
    !click.target.matches(".gameSettings .attemptRange") &&
    !click.target.matches(".bi-gear") &&
    !click.target.matches(".attemptsNum") &&
    !click.target.matches(".attemptNum") &&
    !click.target.matches(".save")
  ) {
    settingBtn.classList.remove("rotate");
    gameSetting.classList.remove("active");
  }
  window.addEventListener("keyup", (el) => {
    if (el.key == "Escape") {
      settingBtn.classList.remove("rotate");
      gameSetting.classList.remove("active");
    }
  });
}

/** *********************
 *** game start
 *************************/
userGuess.focus();
getGameValues();

window.addEventListener("click", (clk) => {
  showSettings(clk);
  EasyRemoveSettings(clk);
});

window.addEventListener("keyup", (btn) => {
  guessTrigger(btn);
});
