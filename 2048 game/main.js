const showCols = document.querySelectorAll(".col");
const userSelect = document.querySelectorAll(".userSelect .columns .select");
const nextNumBtn = document.querySelectorAll(".showNextNumbers .numCube");
const userBtn = document.querySelectorAll(".col-user");
const showScore = document.querySelector(".score");

let nextRandNums = [];
let userScore = 0;
let cubeValue = 0;
let allColumns = {
  col1: [],
  col2: [],
  col3: [],
  col4: [],
  col5: [],
};

// =========================================================================================
// game functionality

//show number when mouse is over
userBtn.forEach((btn) => {
  btn.addEventListener("mouseover", (el) => {
    el.target.textContent = nextRandNums[nextRandNums.length - 1];
  });

  btn.addEventListener("mouseout", (el) => {
    el.target.textContent = "";
  });
});

function calcScore(num) {
  userScore += parseInt(num);
  showScore.textContent = "";
  showScore.textContent += userScore;
}

function getRandNum() {
  // return Math.pow(2, Math.floor(Math.random() * 5) + 1);
  return 4;
}

function showNextNumber() {
  nextNumBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      createNumCube(e.target.textContent);
    });
  });
}

function createNumCube() {
  const div = document.createElement("div");
  div.className = "numCube";
  div.textContent = nextNumBtn[nextNumBtn.length - 1].textContent;

  nextRandNums.pop();
  nextRandNums.unshift(getRandNum());

  nextNumBtn.forEach((btn, index) => {
    btn.textContent = nextRandNums[index];
  });

  return div;
}

//get the whole numbers in a column and adding it to it's target col Object
function getColData(num) {
  allColumns[`col${num}`] = [];
  showCols[parseInt(num) - 1].childNodes.forEach((col) => {
    allColumns[`col${num}`].push(parseInt(col.textContent));
  });
  meargeColNum(num);
}

// mearge the number of the col array
function meargeColNum(col) {
  if (allColumns[`col${col}`].length <= 1) return;

  allColumns[`col${col}`].reduce((_, nex, index) => {
    if (nex === allColumns[`col${col}`][index - 1]) {
      cubeValue = parseInt(nex) * 2;

      allColumns[`col${col}`][allColumns[`col${col}`].length - 2] = cubeValue;

      allColumns[`col${col}`].pop();

      meargeCube(cubeValue, col);
    }
  });
  // rowMearge(col, cubeValue);
}

// mearge the cubes of the col
function meargeCube(colValue, colNum) {
  //remove the last cube
  showCols[parseInt(colNum) - 1].childNodes[
    showCols[parseInt(colNum) - 1].childNodes.length - 1
  ].remove();

  //channing the last cube number to the mearged value
  showCols[parseInt(colNum) - 1].childNodes[
    showCols[parseInt(colNum) - 1].childNodes.length - 1
  ].textContent = colValue;

  calcScore(colValue);
  meargeColNum(colNum);
}

// function rowMearge(col, val) {
//   let rowIndex = parseInt(allColumns[`col${col}`].length - 1);
//   let meargeVal = 0;
//   if (parseInt(col) === 0) col = 1;

//   if (parseInt(col) <= 1) {
//     if (
//       allColumns[`col${col}`][rowIndex] ===
//       allColumns[`col${parseInt(col) + 1}`][rowIndex]
//     ) {
//       meargeVal = parseInt(allColumns[`col${parseInt(col)}`][rowIndex]) * 2;

//       showCols[parseInt(col)].childNodes[rowIndex].textContent = meargeVal;
//       console.log(col);

//       showCols[parseInt(col) - 1].childNodes[rowIndex].remove();
//     }
//   } else if (parseInt(col) > 3) {
//     if (
//       allColumns[`col${col}`][rowIndex] ===
//       allColumns[`col${parseInt(col) - 1}`][rowIndex]
//     ) {
//       meargeVal = parseInt(allColumns[`col${parseInt(col)}`][rowIndex]) * 2;

//       showCols[parseInt(col)].childNodes[rowIndex].textContent = meargeVal;
//       console.log(col);

//       showCols[parseInt(col) - 1].childNodes[rowIndex].remove();
//     }
//   } else if (
//     allColumns[`col${col}`][rowIndex] ===
//       allColumns[`col${parseInt(col) + 1}`][rowIndex] ||
//     allColumns[`col${col}`][rowIndex] ===
//       allColumns[`col${parseInt(col) - 1}`][rowIndex]
//   ) {
//     meargeVal = parseInt(allColumns[`col${parseInt(col)}`][rowIndex]) * 2;

//     showCols[parseInt(col)].childNodes[rowIndex].textContent = meargeVal;
//     console.log(col);

//     showCols[parseInt(col) - 1].childNodes[rowIndex].remove();
//   }
// }

// =========================================================================================
// game start
window.addEventListener("load", () => {
  for (i = 0; i < 3; i++) {
    nextRandNums.push(getRandNum());
  }

  nextNumBtn.forEach((btn, index) => {
    btn.textContent = nextRandNums[index];
    // rowMearge(index);
  });
});

userBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    showCols[e.target.id - 1].appendChild(createNumCube());
    getColData(e.target.id);
  });
});
