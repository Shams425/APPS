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
  haveItems = document.querySelectorAll(".addToNeed");
  needItem = `<li class="needItem">
                <p>${addItem.value}</p>
                <div class= "icons d-flex justify-content-between">
                <i class = "fas fa-check mx-3 addToHave"></i>
                <i class="fas fa-times remove"></i>
                </div>
              </li>`;

  needItemContainer.innerHTML += needItem;
  needItems = document.querySelectorAll(".addToHave");

  console.log(needItems);
  console.log(haveItems);

  addItem.value = "";
  addItem.focus();

  reSelectItems();

  //add the items to have list when click the check mark
  needItems.forEach((item) => {
    item.addEventListener("click", function () {
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
  needItems = document.querySelectorAll(".addToHave");
  haveItem = `<li class="needItem">
                <p>${addItem.value}</p>
                <div class= "icons d-flex justify-content-between">
                <i class="fas fa-recycle mx-3 addToNeed"></i>                      
                <i class="fas fa-times remove"></i>
                </div>
              </li>`;

  haveItemContainer.innerHTML += haveItem;
  haveItems = document.querySelectorAll(".addToNeed");
  console.log(haveItems);
  console.log(needItems);

  addItem.value = "";
  addItem.focus();

  reSelectItems();

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
  element.children[1].children[0].classList.remove("fa-check", "addToHave");
  element.children[1].children[0].classList.add("fa-recycle", "addToNeed");

  haveItemContainer.appendChild(element);
  haveItems = document.querySelectorAll(".addToNeed");
  console.log(haveItems);
  console.log(needItems);
}

function moveToNeed(element) {
  element = element.cloneNode(true);

  element.children[1].children[0].classList.add("fa-check", "addToHave");
  element.children[1].children[0].classList.remove("fa-recycle", "addToNeed");

  needItemContainer.appendChild(element);
  needItems = document.querySelectorAll(".addToHave");
  console.log(haveItems);
  console.log(needItems);
  reSelectItems();
}

function reSelectItems() {
  removeNeedItem = document.querySelectorAll(".remove");
  removeHaveItem = document.querySelectorAll(".remove");

  return [removeNeedItem, removeHaveItem];
}
