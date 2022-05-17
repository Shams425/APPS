const addItem = document.querySelector(".items");

const needItemContainer = document.querySelector(".needItemsContainer");
const haveItemContainer = document.querySelector(".haveItemsContainer");

const needBtn = document.querySelector(".needList");
const haveBtn = document.querySelector(".haveList");

let haveItems;
let removeHaveItem;

let needItems;
let removeNeedItem;

let needItem;

let haveItem;

function addToNeed() {
  if (addItem.value === "") return;
  needItem = `<li class="needItem">
                <p>${addItem.value}</p>
                <div class= "icons d-flex justify-content-between">
                  <i class = "fas fa-check mx-3 addToHave"></i>
                  <i class="fas fa-times remove"></i>
                </div>
              </li>`;

  needItemContainer.innerHTML += needItem;

  getAllValues();

  addItem.value = "";
  addItem.focus();

  needItems.forEach((item) => {
    item.addEventListener("click", function () {
      console.log("it's working");
      moveToHave(this.parentElement.parentElement);
      this.parentElement.parentElement.remove();
    });
  });

  removeNeedItem.forEach((item) => {
    item.addEventListener("click", function () {
      this.parentElement.parentElement.remove();
    });
  });
}

function addToHave() {
  if (addItem.value === "") return;
  haveItem = `<li class="needItem">
              <p>${addItem.value}</p>
              <div class= "icons d-flex justify-content-between">
                <i class="fas fa-recycle mx-3 addToNeed"></i>                      
                <i class="fas fa-times remove"></i>
              </div>
            </li>`;

  haveItemContainer.innerHTML += haveItem;

  getAllValues();
  console.log(getAllValues());

  addItem.value = "";
  addItem.focus();

  haveItems.forEach((item) => {
    item.addEventListener("click", function () {
      moveToNeed(this.parentElement.parentElement);
      this.parentElement.parentElement.remove();
    });
  });

  removeHaveItem.forEach((item) => {
    item.addEventListener("click", function () {
      this.parentElement.parentElement.remove();
    });
  });
}

function moveToHave(element) {
  element = element.cloneNode(true);
  element.children[1].children[0].classList.remove("fa-check");
  element.children[1].children[0].classList.remove("addToHave");
  element.children[1].children[0].classList.add("fa-recycle");
  element.children[1].children[0].classList.add("addToNeed");

  haveItemContainer.appendChild(element);
  getAllValues();
  haveBtn.click();
}

function moveToNeed(element) {
  element = element.cloneNode(true);

  element.children[1].children[0].classList.add("fa-check");
  element.children[1].children[0].classList.add("addToHave");
  element.children[1].children[0].classList.remove("fa-recycle");
  element.children[1].children[0].classList.remove("addToNeed");

  needItemContainer.appendChild(element);
  getAllValues();
  needBtn.click();
}

function getAllValues() {
  needItems = document.querySelectorAll(".addToHave");
  removeNeedItem = document.querySelectorAll(".remove");
  haveItems = document.querySelectorAll(".addToNeed");
  removeHaveItem = document.querySelectorAll(".remove");

  return { needItems, removeNeedItem, haveItems, removeHaveItem };
}

window.addEventListener("click", () => getAllValues());
