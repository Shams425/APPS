const smlPageCont = document.querySelector(".pagesCont");
const smlPage = document.querySelector(".pagesmall");
const showTips = document.querySelectorAll(".showTip");
const tips = document.querySelectorAll(".tip");

const pages = document.querySelectorAll(".pages .page");
const pageNum = document.querySelectorAll(".pageNum");
const nextbtns = document.querySelectorAll(".next");
const backbtns = document.querySelectorAll(".back");

let index = 0;
nextbtns.forEach((nextbtn) => {
  nextbtn.addEventListener("click", function () {
    index++;
    pages.forEach(function (page) {
      page.classList.remove("active");
    });
    if (index > pages.length - 1) {
      index = 0;
      pages[index].classList.add("active");
      pageNum[index].innerHTML = `${index + 1}`;
    } else {
      pages[index].classList.add("active");
      pageNum[index].innerHTML = `${index + 1}`;
    }
  });
});

backbtns.forEach((backbtn) => {
  backbtn.addEventListener("click", function () {
    index--;
    pages.forEach(function (page) {
      page.classList.remove("active");
    });
    if (index < 0) {
      index = pages.length - 1;
      pages[index].classList.add("active");
      pageNum[index].innerHTML = `${index + 1}`;
    } else {
      pages[index].classList.add("active");
      pageNum[index].innerHTML = `${index + 1}`;
    }
  });
});

showTips.forEach((showTip) => {
  showTip.addEventListener("click", () => {
    tips.forEach((tip) => {
      tip.classList.toggle("show");
    });
  });
});
