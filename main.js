const smlPageCont = document.querySelector(".pagesCont");
const smlPage = document.querySelector(".pagesmall");
const showTips = document.querySelectorAll(".showTip");
const tips = document.querySelectorAll(".tip");

const pages = document.querySelectorAll(".pages .page")
const pageNum = document.querySelectorAll(".pageNum")
const nextbtns = document.querySelectorAll(".next")
const backbtns = document.querySelectorAll(".back")

let index = 0;
nextbtns.forEach((nextbtn) => {
    nextbtn.addEventListener("click", function() {
        index++;
        if (index > pages.length - 1) index = 0;
        pages.forEach( function(page)  {
            page.classList.remove("active");
        })
        pages[index].classList.add("active");
        pageNum[index].innerHTML = `${index + 1}`;
    })
})

backbtns.forEach((backbtn) => {
    backbtn.addEventListener("click", function() {
        index--;
        if (index < 0) index = pages.length - 1;
        pages.forEach( function(page)  {
            page.classList.remove("active");
        })
        pages[index].classList.add("active");
        index = this.getAttribute("data-number");
        pageNum[index].innerHTML = `${index}`;
    })
})

showTips.forEach((showTip)=> {
    showTip.addEventListener("click", () => {
    tips.forEach((tip) => {
        tip.classList.toggle("show");
        })
    })
})

/*

*/
function findLongest(str) {
    // most text will not end with space so we must add space to last word
    str+= " "; //we add a space to the last word so that the condition (line 53) bellow continure to last word
    let allwords = [];
    let singleWord = ''
    let longestWord = ''
    // loop to itrate throught the text given as parameter
    for (i = 0; i < str.length; i++) {
        // the loop will contuine intell it found space
        if(str[i] !== " ") {
            singleWord += str[i]
        }
        // after we found the space we add this word to the array and return the variable againg to empty charcter
        else {
            allwords.push(singleWord);
            singleWord = ''
        }
    }
    // now we have an array with all the words in the text giving so we make a loop to each one comparing the length of each one 
    for (i = 0; i < allwords.length; i++) {
        if (allwords[i].length > longestWord.length) {
            longestWord = allwords[i]
        }
    }
    return longestWord
}
console.log(findLongest("hello world we coding using javascript")) // javascript




// advance code using the bulit in javascript function 
function findTheLongest(str) {
    let words = str.split(" ");
    let longWord = ''
    words.map((word) => {
        if (word.length > longWord.length) {
            longWord = word
        }
    })
    return longWord
}

console.log(findTheLongest("hellot world you are conding using javascript"))

