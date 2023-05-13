const userSelect = document.querySelectorAll(".userSelection .select");
const showComSelect = document.querySelectorAll(".Computer .select");
const userSelectContainer = document.querySelector(".User");
const playerContainer = document.querySelector(".UserWins");
const comContainer = document.querySelector(".ComWins");
const tieContainer = document.querySelector(".Ties");
const totalGamesContainer = document.querySelector(".totalGames");

//modal selection
const modalHeader = document.querySelector(".modal-title");
const modalBody = document.querySelector(".modal-body");
const showResultBtn = document.querySelector(".resultModal"); //this button is hidden and will be trigger to show the game result

let showUserSelect;
let userWins = 0;
let comWins = 0;
let ties = 0;
let totalGames = 0;

userSelect.forEach((select) => {
  //show the user select
  select.addEventListener("click", function () {
    showUserSelect = this.cloneNode(true);
    userSelectContainer.innerHTML = "";
    userSelectContainer.appendChild(showUserSelect);
    setTimeout(() => {
      showUserSelect.classList.add("show");
    }, 100);
  });
});

function playGame() {
  if (userSelectContainer.innerHTML === "") {
    alert("Please Make Selection!!!");
    return;
  }

  let comSelect = Math.floor(Math.random() * 3);

  // show the computer select
  showComSelect.forEach((select) => {
    select.classList.remove("show");
  });

  showComSelect[comSelect].classList.add("show");
  check(showUserSelect, showComSelect[comSelect]);
}

function check(player, com) {
  //if the game is tie
  if (
    (player.id === "scissor" && com.id === "comScissor") ||
    (player.id === "paper" && com.id === "comPaper") ||
    (player.id === "rock" && com.id === "comRock")
  ) {
    ties += 1;
    gameStats(userWins, comWins, ties);
    showTieResult();
  }

  //check win lose probability
  if (player.id === "scissor" && com.id === "comPaper") {
    userWins += 1;
    gameStats(userWins, comWins, ties);
    showWinResult();
  }
  if (player.id === "scissor" && com.id === "comRock") {
    comWins += 1;
    gameStats(userWins, comWins, ties);
    showLoseResult();
  }
  if (player.id === "paper" && com.id === "comScissor") {
    comWins += 1;
    gameStats(userWins, comWins, ties);
    showLoseResult();
  }
  if (player.id === "paper" && com.id === "comRock") {
    userWins += 1;
    gameStats(userWins, comWins, ties);
    showWinResult();
  }
  if (player.id === "rock" && com.id === "comScissor") {
    userWins += 1;
    gameStats(userWins, comWins, ties);
    showWinResult();
  }
  if (player.id === "rock" && com.id === "comPaper") {
    comWins += 1;
    gameStats(userWins, comWins, ties);
    showLoseResult();
  }
}

function gameStats(user, com, tie) {
  totalGames = user + com + tie;
  playerContainer.innerHTML = user;
  comContainer.innerHTML = com;
  tieContainer.innerHTML = tie;
  totalGamesContainer.innerHTML = totalGames;
}

function showWinResult() {
  modalHeader.innerHTML = "you win";
  modalBody.innerHTML = "play again";
  showResultBtn.click();
}

function showLoseResult() {
  modalHeader.innerHTML = "you lose";
  modalBody.innerHTML = "play again";
  showResultBtn.click();
}

function showTieResult() {
  modalHeader.innerHTML = "Tie";
  modalBody.innerHTML = "play again";
  showResultBtn.click();
}

function endGame() {
  setTimeout(() => {
    showUserSelect.classList.remove("show");
  }, 100);

  userSelectContainer.innerHTML = "";

  showComSelect.forEach((sel) => {
    sel.classList.remove("show");
  });
}
