//selection the columns
const showCol = document.querySelectorAll(".col");
const userSelect = document.querySelectorAll(".userSelect .columns .select")[
  Math.floor(document.querySelectorAll(".select").length / 2)
];
let allColumns = {
  col1: [],
  col2: [],
  col3: [],
  col4: [],
  col5: [],
};

//game functionality
function getRandNum() {
  return Math.pow(2, Math.floor(Math.random() * 5) + 1);
  // return 8;
}

function createUserCube() {
  let randNum = getRandNum();
  const div = document.createElement("div");
  div.className = "userInput";
  div.textContent = randNum;

  userSelect.appendChild(div);

  div.addEventListener("click", (e) => {
    createNumCube(randNum);
  });
}

function createNumCube(num) {
  const div = document.createElement("div");
  div.className = "numCube";
  div.textContent = num;

  return div;
}

function getColData(num) {
  allColumns[`col${num}`] = [];
  showCol[parseInt(num) - 1].childNodes.forEach((col) => {
    allColumns[`col${num}`].push(col.textContent);
  });
  meargeColNum(num);

  console.log(allColumns[`col${num}`]);
}

function meargeColNum(col) {
  if (allColumns[`col${col}`].length < 1) return;

  if (
    allColumns[`col${col}`][allColumns[`col${col}`].length - 1] ===
    allColumns[`col${col}`][allColumns[`col${col}`].length - 2]
  ) {
    let cubeValue =
      parseInt(allColumns[`col${col}`][allColumns[`col${col}`].length - 1]) * 2;

    allColumns[`col${col}`][allColumns[`col${col}`].length - 2] = cubeValue;

    allColumns[`col${col}`].pop();

    meargeCube(col, cubeValue);
  }
}

function meargeCube(colNum, colValue) {
  showCol[parseInt(colNum) - 1].childNodes[
    showCol[parseInt(colNum) - 1].childNodes.length - 1
  ].remove();
  showCol[parseInt(colNum) - 1].childNodes[
    showCol[parseInt(colNum) - 1].childNodes.length - 1
  ].textContent = colValue;
}

// showCol[0].parentElement
//user select actions
const userBtn = document.querySelectorAll(".col-user");

userBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.hasAttribute("id")) {
      console.log("it's working");
      showCol[e.target.id - 1].appendChild(createNumCube());
      getColData(e.target.id);
    } else {
      console.log(e.target.parentElement);
      showCol[e.target.parentElement.id - 1].appendChild(createNumCube());
      getColData(e.target.id);
    }
  });
});

// game start
window.addEventListener("load", () => {
  createUserCube();
});
