// change the type of the calclatuor
const changeStander = document.querySelector(".scinetific .sinceType");
const changesSince = document.querySelector(".stander .standerType");
const claculator = document.getElementById("body");
const body = document.getElementById("main");
const calcHeader = document.querySelector(".calc .header");

changesSince.addEventListener("click", () => {
    body.classList.remove("mainCalc");
    body.classList.add("sinceCalc");
    claculator.classList.remove("main");
    claculator.classList.add("since")
});
changeStander.addEventListener("click", () => {
    body.classList.remove("sinceCalc");
    body.classList.add("mainCalc");
    claculator.classList.remove("since");
    claculator.classList.add("main");
});

// calclatuor behivor
const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]")
const operationdisp = document.querySelector(".calc .opearations");
const result = document.querySelector(".calc .operatinReslut");
const clear = document.querySelectorAll(".CE");
const showpower = document.querySelector(".calc .header .pow");
const historyshow = document.querySelectorAll(".calc .history");
const clearHistory = document.querySelector(".historyRepo .header i");
const continer = document.querySelectorAll(".body .continer")
const Answers = document.querySelector(".historyRepo .body");
const rad = document.getElementById("Rad");
const deg = document.getElementById("Deg");
const closeModal = document.querySelector("#modal .heading button");

let power = document.getElementById("yvalue");
let base = document.getElementById("xvalue");
let firstAtempt = 1;
let repeat = 1

function clearScreen(event) {
    firstAtempt = 1;
    calcHeader.classList.remove("powerInput");
    event.addEventListener("click", () => {
        result.innerHTML = 0;
        operationdisp.innerHTML = "";
    });  
}

function showNum(event) {
    const value = event.getAttribute("data-number");
    if (operationdisp.innerHTML.includes("No answers Yet")) {
        operationdisp.innerHTML = "";
    }
    else if (operationdisp.innerHTML.includes("sin") || operationdisp.innerHTML.includes("cos") || operationdisp.innerHTML.includes("tan")){
        return;
    }
    else if (value === "." && result.innerHTML.toString().includes(".")) {
        return;
    } 
    else if (operationdisp.innerHTML.includes("=")) {
        return;
    } 
    else if (result.innerHTML === "0" || result.innerHTML == "") {
        result.innerHTML = "";
        result.innerHTML += value;
    } 
    else {
        result.innerHTML += value;   
    }   
}

function showAnswer () {
    const ans = document.querySelectorAll(".historyRepo .body .reslutContiner:last-of-type");
    if (!Answers.classList.contains("continer")) {
    operationdisp.innerHTML = `No answers Yet`;
    }
    else {
    result.innerHTML = ans[ans.length - 1].innerHTML; 
    }  
}

function powervalue(event) { 
    power.innerHTML = event.getAttribute("data-number"); 
    result.innerHTML = "";
}
function check() {
    if (result.innerHTML.toString() == "") {
        operationdisp.innerHTML = "invalid Input";
        result.innerHTML = ""
    }
}
function historyadd()  {
    Answers.classList.add("continer")
    let historycontiner = document.createElement("div");
    let creatediv1 = document.createElement("div");
    let creatediv2 = document.createElement("div");
    historycontiner.classList.add("continer");
    creatediv1.classList.add("operationContiner");
    creatediv2.classList.add("reslutContiner");
    historycontiner.appendChild(creatediv1);
    historycontiner.appendChild(creatediv2);
    Answers.appendChild(historycontiner);
    creatediv2.innerHTML = result.innerHTML;
    creatediv1.innerHTML = operationdisp.innerHTML;

    const continer = document.querySelectorAll(".body .continer")
    clearHistory.addEventListener("click" , () => {
        continer.forEach((content) => {
            content.remove();
        })
        Answers.classList.remove("continer");
    })
    
}

function factorial(n) {
    let factorial = 1;
    if (n === 0) {
        return (1);
    }
    else if (n < 0) {
        let newN = n * -1;
        if (n%2 == 0) {
            for (i = 1; i <= newN; i++) {
                factorial *= i;
            }
            return(factorial);
        }
        else {
            for (i = 1; i <= newN; i++) {
                factorial *= i;
            }
            return(factorial * -1);
        }
    }
    else {
        for (i = 1; i <= n; i++) {
            factorial *= i;
        }
        return(factorial);   
    }
    
}
function powery() {
    firstAtempt++;
    document.body.classList.add("active");
    power.focus();
    if (operationdisp.innerHTML == "") {
        window.addEventListener("keyup", (el) => {
            if (el.key === "Enter" || el.key === "Escape") {
                operationdisp.innerHTML = `(${base.value})<sup><sup>${power.value}</sup></sup>`;
                result.innerHTML = Math.pow(base.value,power.value);
                document.body.classList.remove("active");
            }
        });
        setTimeOut((historyadd()),10000);
    }
    else {  
        window.addEventListener("keyup", (el) => {
            if (el.key === "Enter" || el.key === "Escape") {
                operationdisp.innerHTML = `(${base.value})<sup><sup>${power.value}</sup></sup>`;
                result.innerHTML = Math.pow(base.value,power.value);
                document.body.classList.remove("active")
            }
        })
    }
    setTimeOut((historyadd()),10000);
}

function rooty() {
    base.value = "";
    power.value = "";
    firstAtempt++
    document.body.classList.add("active");
    power.focus();
    if (operationdisp.innerHTML == "") {
            if ((base.value) == "" && (power.value) == "") {
                power.value = "";
                base.value = "";
            } 
        window.addEventListener("keyup", (el) => {
            if (el.key === "Enter" || el.key === "Escape") {
                operationdisp.innerHTML = `${power.value}Yroot(${base.value})`;
                result.innerHTML = Math.pow(base.value,1/power.value);
                document.body.classList.remove("active")
            }
        })
    }
    else {
        window.addEventListener("keyup", (el) => {
            if (el.key === "Enter" || el.key === "Escape") {
                operationdisp.innerHTML += `${power.value}Yroot(${base.value})`;
                result.innerHTML += Math.pow(base.value,1/power.value);
                document.body.classList.remove("active")
            }
        })
    } 
    historyadd();
}

function bracketsCalc() {
    firstAtempt = 1;
    let content = operationdisp.innerHTML.toString();
    if (operationdisp.innerHTML.startsWith("(")) {
        if(operationdisp.innerHTML.includes("(") || (")")){
            let bracktesValue = content.slice(0 , content.indexOf(")")+1);
            result.innerHTML = eval(bracktesValue);
            firstAtempt++;
            console.log(bracktesValue);
        }
        else {
            let bracktesValue = content.slice(0 , content.indexOf(")"));
            result.innerHTML = eval(bracktesValue);
            firstAtempt++;
        }
    }
    else {
        if(operationdisp.innerHTML.includes("(") || (")")) {
            let bracktesValue = content.slice(0 , operationdisp.innerHTML.length -1);
            result.innerHTML = eval(bracktesValue);
            firstAtempt++;
            console.log(bracktesValue);
        }
        else {
            let bracktesValue = content.slice(0 , content.indexOf(")")+3);
        result.innerHTML = eval(bracktesValue);
        firstAtempt++;
        }
    }
}

function calculate() {
    Answers.classList.add("continer");
    firstAtempt = 2;
    const operation = operationdisp.innerHTML.toString();
    let number1 = parseFloat(operationdisp.innerHTML);
    let number2 = parseFloat(result.innerHTML);
    if (isNaN(number1) || isNaN(number2)) {
        return;
    }
    if(operationdisp.innerHTML.includes("="))  {
        return;
    }
    if (operation.includes("+")) {
        operationdisp.innerHTML = `${number1} + ${number2} =`;
        result.innerHTML = number1 + number2;
    }
    else if (operation.includes("-")) {
        operationdisp.innerHTML = `${number1} - ${number2} =`;
        result.innerHTML = number1 - number2;
    }
    else if (operation.includes("*")) {
        operationdisp.innerHTML = `${number1} * ${number2} =`;
        result.innerHTML = number1 * number2;
    }
    else if (operation.includes("/")) {
        operationdisp.innerHTML = `${number1} / ${number2} =`;
        result.innerHTML = number1 / number2;
    }
    else if (operation.includes("%")) {
        operationdisp.innerHTML = `${number1} % ${number2} =`;
        result.innerHTML = number1 % number2;
    }
    else {
        operationdisp.innerHTML = "invild input";
        result.innerHTML = 0;
        }
    }

function showOperation(event) {
    let operation = event.getAttribute("data-operation"); 
    let update;
    
    switch (operation) {
        case "plus":
            update = result.innerHTML;
            if (firstAtempt > 1) {
                operationdisp.innerHTML = `${result.innerHTML} + `;
                result.innerHTML = 0;
                
            }
            else {
               operationdisp.innerHTML += `${update} + `;
               result.innerHTML = 0;
               firstAtempt = firstAtempt + 1;
            }
            if (firstAtempt > 3) {
                calculate();
            }
            console.log(firstAtempt);
            check();
        break; 
        case "minus":
            update = result.innerHTML;
            if (firstAtempt > 1) {
                operationdisp.innerHTML = `${result.innerHTML} - `;
                result.innerHTML = 0
            }
            else if (update == "") {
                operationdisp.innerHTML += ` - `;
                result.innerHTML = 0 
            }
            else {
               operationdisp.innerHTML += `${update} - `
                result.innerHTML = 0 
                firstAtempt++;
            }
            check();
            break;
        case "multiply":
            update = result.innerHTML;
            if (firstAtempt > 1) {
                operationdisp.innerHTML = `${result.innerHTML} * `;
                result.innerHTML = 0;
            }
            else if (update == "") {
                operationdisp.innerHTML += ` * `;
                result.innerHTML = 0; 
                firstAtempt++;
            }
            else {
               operationdisp.innerHTML += `${update} * `
                result.innerHTML = 0;
                firstAtempt++;
            }
            check()
            break;
        case "divide":
            update = result.innerHTML;
            if (firstAtempt > 1) {
                operationdisp.innerHTML = `${result.innerHTML} / `;
                result.innerHTML = 0;
            }
            else if (operationdisp == "") {
                operationdisp.innerHTML += ` / `;
                result.innerHTML = 0; 
                firstAtempt++;
            }
            else {
               operationdisp.innerHTML += `${update} / `
                result.innerHTML = 0; 
                firstAtempt++;
            }
            check()
            break;
        case "power2":
            update = result.innerHTML;
            if (firstAtempt > 1) {
                if (operationdisp.innerHTML !== "" && !operationdisp.innerHTML.includes("=")) {
                    if(operationdisp.innerHTML.includes(`<sup><sup>2</sup></sup>`)) {
                        operationdisp.innerHTML = `(${result.innerHTML})<sup><sup>2</sup></sup>`;
                        result.innerHTML = Math.pow(result.innerHTML,2);
                        firstAtempt++;
                }
                else {
                    operationdisp.innerHTML += `(${update})<sup><sup>2</sup></sup>`; 
                    result.innerHTML = Math.pow(result.innerHTML,2); 
                    }  
                }
                
            else {
                operationdisp.innerHTML = `(${update})<sup><sup>2</sup></sup> =`;
                result.innerHTML = Math.pow(result.innerHTML,2);
            }
            
        }
        else {
            operationdisp.innerHTML += `(${update})<sup><sup>2</sup></sup>`;
            result.innerHTML = Math.pow(result.innerHTML,2); 
            firstAtempt++;    
        }
            check();
            historyadd();
            break;
        case "power3":
            update = result.innerHTML;
            update = result.innerHTML;
            if (firstAtempt > 1) {
                if (operationdisp.innerHTML !== "" && !operationdisp.innerHTML.includes("=")) {
                    if(operationdisp.innerHTML.includes(`<sup><sup>3</sup></sup>`)) {
                        operationdisp.innerHTML = `(${result.innerHTML})<sup><sup>3</sup></sup>`;
                        result.innerHTML = Math.pow(result.innerHTML,3);
                        firstAtempt++;
                }
                else {
                    operationdisp.innerHTML += `(${update})<sup><sup>3</sup></sup>`; 
                    result.innerHTML = Math.pow(result.innerHTML,3); 
                    }  
                }
                
            else {
                operationdisp.innerHTML = `(${update})<sup><sup>3</sup></sup> =`;
                result.innerHTML = Math.pow(result.innerHTML,3);
            }
            
        }
        else {
            operationdisp.innerHTML += `(${update})<sup><sup>3</sup></sup>`;
            result.innerHTML = Math.pow(result.innerHTML,3); 
            firstAtempt++;    
        }
            check();
            historyadd();
            break;
        case "power10":
            update = result.innerHTML
            if (firstAtempt > 1) {
                if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `10<sup><sup>${update}</sup></sup>`;
                    result.innerHTML = Math.pow(10,update);    
                    }
                else {
                    operationdisp.innerHTML = `10<sup><sup>${update}</sup></sup> =`;
                    result.innerHTML = Math.pow(10,update); 
                }
                
            }
            else {
                operationdisp.innerHTML += `10<sup><sup>${update}</sup></sup> =`;
                result.innerHTML = Math.pow(10,update);   
                firstAtempt++; 
            } 
            break;
        case "powery":
            powery();
            break;
        case ("exp"):
            update = result.innerHTML;
                if (firstAtempt > 1) {
                    if (operationdisp.innerHTML !== "") {
                        operationdisp.innerHTML += `(e)<sup><sup>${update}</sup></sup>`; 
                        result.innerHTML = Math.exp(update); 
                        }
                    else {
                        operationdisp.innerHTML = `(e)<sup><sup>${update}</sup></sup>`;
                        result.innerHTML = Math.exp(update); 
                    }
                    
                }
                else {
                    operationdisp.innerHTML += `(e)<sup><sup>${update}</sup></sup> =`
                    result.innerHTML = Math.exp(update); 
                    firstAtempt++; 
                }
            break;
        case ("ln"):
            update = result.innerHTML;
                if (firstAtempt > 1) {
                    if (operationdisp.innerHTML !== "") {
                        operationdisp.innerHTML += `ln(${update})`; 
                        result.innerHTML = Math.log(update); 
                        }
                    else {
                        operationdisp.innerHTML = `ln(${update})`;
                        result.innerHTML = Math.log(update); 
                    }
                    
                }
                else {
                    operationdisp.innerHTML += `ln(${update}) =`
                    result.innerHTML = Math.log(update); 
                    firstAtempt++; 
                }
            historyadd()
            break;
        case ("factorial"):
            update = result.innerHTML;
                if (firstAtempt > 1) {
                    if (operationdisp.innerHTML !== "") {
                        operationdisp.innerHTML += `(${update})!`; 
                        result.innerHTML = factorial(update); 
                        }
                    else {
                        operationdisp.innerHTML = `(${update})!`;
                        result.innerHTML = factorial(update); 
                    }
                    
                }
                else {
                    operationdisp.innerHTML += `(${update})! =`
                    result.innerHTML = factorial(update); 
                    firstAtempt++; 
                }
            historyadd()
            break;
        case ("log"):
            update = result.innerHTML;
                if (firstAtempt > 1) {
                    if (operationdisp.innerHTML !== "") {
                        operationdisp.innerHTML += `log(${update})`; 
                        result.innerHTML = Math.log10(update); 
                        }
                    else {
                        operationdisp.innerHTML = `log(${update}) =`;
                        result.innerHTML = Math.log10(update); 
                    }
                    
                }
                else {
                    operationdisp.innerHTML += `log(${update}) =`;
                    result.innerHTML = Math.log10(update); 
                    firstAtempt++; 
                }
            historyadd()
            break;
        case "pi":
            update = result.innerHTML
            if (firstAtempt > 1) {
                if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `${update}&pi; `;
                    result.innerHTML = update * Math.PI;   
                    }
                else {
                    operationdisp.innerHTML = `&pi; =`;
                    result.innerHTML = Math.PI; 
                }
                
            }
            else {
                operationdisp.innerHTML += `${update}&pi;`;
                result.innerHTML = (update) * Math.PI;  
                firstAtempt++; 
            } 
            historyadd()
            break;
        case "divby1":
            update = result.innerHTML;
            if (firstAtempt > 1) {
                if (operationdisp.innerHTML.includes("=")) {
                    operationdisp.innerHTML = "";
                    operationdisp.innerHTML = `1 / ${update} = `
                    result.innerHTML = 1 / update;
                }
                else {
                    result.innerHTML = 1 / update;
                }
                
            }
            else {
                operationdisp.innerHTML = `1 / ${update} = `
                result.innerHTML = 1 / update;
                firstAtempt++;
            }
            check()
            historyadd()
            break;
        case "plus-minus":
            if (result.innerHTML.toString().includes("-")) {
                update = result.innerHTML.toString().slice(1,result.innerHTML.length);
                result.innerHTML = update;
            }
            else {
                update = result.innerHTML;
                update = `-${result.innerHTML}`;
                result.innerHTML = update;
                firstAtempt++;
            }
            check()
            break;
        case "root":
            update = result.innerHTML;
            if (firstAtempt > 1) {
                if (operationdisp.innerHTML !== "" && !operationdisp.innerHTML.includes("=")) {
                    if(operationdisp.innerHTML.includes("sqrt")) {
                        operationdisp.innerHTML = `sqrt(${result.innerHTML})`;
                        result.innerHTML = Math.sqrt(result.innerHTML);
                        firstAtempt++;
                    }
                    else {
                        operationdisp.innerHTML += `sqrt(${update})`; 
                        result.innerHTML = Math.sqrt(update); 
                        }  
                    }
                    
                else {
                    operationdisp.innerHTML = `sqrt(${update}) =`;
                    result.innerHTML = Math.sqrt(update); 
                }
                
            }
            else {
                operationdisp.innerHTML += `sqrt(${update}) `;
                result.innerHTML = Math.sqrt(update); 
                firstAtempt++; 
                
            }
            check()
            historyadd()
            break;
        case "rooty":
            update = result.innerHTML;
            rooty(update);
            check()
            break;
        case "mode":
            update = result.innerHTML;
            if (firstAtempt > 1) {
                operationdisp.innerHTML = `${result.innerHTML} %  `;
                result.innerHTML = 0;
            }
            else {
                operationdisp.innerHTML += `${update} %  `
                result.innerHTML = 0;
                firstAtempt++;
            }
            check()
            break;
        case "sin":
            update = result.innerHTML;
            if (deg.classList.contains("active")) {
                if (repeat > 1 ) {
                    operationdisp.innerHTML = `sin(${result.innerHTML})`;
                    result.innerHTML = Math.sin(update * Math.PI / 180).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `sin(${update})` 
                    result.innerHTML = (Math.sin(update * Math.PI / 180)).toFixed(1);
                    repeat++;
                    }
                else {
                    operationdisp.innerHTML = `sin(${update})`;
                    result.innerHTML = (Math.sin(update * Math.PI / 180)).toFixed(1);
                    repeat++;
                    historyadd();
                }
                
            }
            else {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `sin(${result.innerHTML})`;
                    result.innerHTML = Math.sin(update ).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    if (isNaN(operationdisp.innerHTML)) {
                        result.innerHTML = (Math.sin(update)).toFixed(1);
                        operationdisp.innerHTML += `sin(${update})`
                    }
                    else  {
                       operationdisp.innerHTML += `sin(${update})` 
                    result.innerHTML = (Math.sin(update)).toFixed(1); 
                    }
                    
                }
                else {
                    operationdisp.innerHTML = `sin(${update})`;
                    result.innerHTML = (Math.sin(update)).toFixed(1);
                    historyadd();
                }
            }
            break;
        case "cos":
            update = result.innerHTML;
            if (deg.classList.contains("active")) {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `cos(${result.innerHTML})`;
                    result.innerHTML = Math.cos(update * Math.PI / 180).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `cos(${update})` 
                    result.innerHTML = (Math.cos(update * Math.PI / 180)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `cos(${update})`;
                    result.innerHTML = (Math.cos(update * Math.PI / 180)).toFixed(1);  
                    historyadd();
                }
            }
            else {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `cos(${result.innerHTML})`;
                    result.innerHTML = Math.cos(update ).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `cos(${update})` 
                    result.innerHTML = (Math.cos(update)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `cos(${update})`;
                    result.innerHTML = (Math.cos(update)).toFixed(1);
                    historyadd();  
                }
            }
            break;
        case "tan":
            update = result.innerHTML;
            if (deg.classList.contains("active")) {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `tan(${result.innerHTML})`;
                    result.innerHTML = Math.tan(update * Math.PI / 180).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `tan(${update})` 
                    result.innerHTML = (Math.tan(update * 180 / Math.PI)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `tan(${update})`;
                    result.innerHTML = (Math.tan(update * Math.PI / 180)).toFixed(1);
                    historyadd();  
                }
            }
            else {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `tan(${result.innerHTML})`;
                    result.innerHTML = Math.tan(update ).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `tan(${update})` 
                    result.innerHTML = (Math.tan(update)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `tan(${update})`;
                    result.innerHTML = (Math.tan(update)).toFixed(1); 
                    historyadd();  
                }
            }
            break;
        case "asin":
            update = result.innerHTML;
            if (deg.classList.contains("active")) {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `sin(${result.innerHTML})`;
                    result.innerHTML = Math.asin(update * Math.PI / 180).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `asin(${update})` 
                    result.innerHTML = (Math.asin(update * Math.PI / 180)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `asin(${update})<sup><sup>-1</sup><sup>`;
                    result.innerHTML = (Math.asin(update * Math.PI / 180)).toFixed(1); 
                    historyadd();
                }
            }
            else {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `sin(${result.innerHTML})`;
                    result.innerHTML = Math.asin(update ).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `asin(${update})`; 
                    result.innerHTML = (Math.asin(update)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `asin(${update})<sup><sup>-1</sup><sup>`;
                    result.innerHTML = (Math.asin(update)).toFixed(1);
                    historyadd(); 
                }
            }
            break;
        case "acos":
            update = result.innerHTML;
            if (deg.classList.contains("active")) {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `cos(${result.innerHTML})`;
                    result.innerHTML = Math.acos(update * Math.PI / 180).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `acos(${update})` 
                    result.innerHTML = (Math.acos(update * Math.PI / 180)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `acos(${update})<sup><sup>-1</sup><sup>`;
                    result.innerHTML = (Math.acos(update * Math.PI / 180)).toFixed(1); 
                    historyadd();
                }
            }
            else {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `cos(${result.innerHTML})`;
                    result.innerHTML = Math.acos(update ).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `acos(${update})` 
                    result.innerHTML = (Math.acos(update)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `acos(${update})<sup><sup>-1</sup><sup>`;
                    result.innerHTML = (Math.acos(update)).toFixed(1);
                    historyadd(); 
                }
            }
            
            break;
        case "atan":
            update = result.innerHTML;
            if (deg.classList.contains("active")) {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `tan(${result.innerHTML})`;
                    result.innerHTML = Math.atan(update * Math.PI / 180).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `atan(${update})` 
                    result.innerHTML = (Math.atan(update * Math.PI / 180)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `atan(${update})<sup><sup>-1</sup><sup>`;
                    result.innerHTML = (Math.atan(update * Math.PI / 180)).toFixed(1); 
                    historyadd();
                }
            }
            else {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `tan(${result.innerHTML})`;
                    result.innerHTML = Math.atan(update ).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `atan(${update})` 
                    result.innerHTML = (Math.atan(update)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `atan(${update})<sup><sup>-1</sup><sup>`;
                    result.innerHTML = (Math.atan(update)).toFixed(1);
                    historyadd(); 
                }
            }
            break;
        case "sinh":
            update = result.innerHTML;
            if (deg.classList.contains("active")) {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `sinh(${result.innerHTML})`;
                    result.innerHTML = Math.sinh(update * Math.PI / 180).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `sinh(${update})` 
                    result.innerHTML = (Math.sinh(update * Math.PI / 180)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `sinh(${update})`;
                    result.innerHTML = (Math.sinh(update * Math.PI / 180)).toFixed(1); 
                    historyadd();
                }
            }
            else {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `sinh(${result.innerHTML})`;
                    result.innerHTML = Math.sinh(update).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `sinh(${update})` 
                    result.innerHTML = (Math.sinh(update)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `sinh(${update})`;
                    result.innerHTML = (Math.sinh(update)).toFixed(1); 
                    historyadd();
                }
            }
            break;
        case "cosh":
            update = result.innerHTML;
            if (deg.classList.contains("active")) {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `cosh(${result.innerHTML})`;
                    result.innerHTML = Math.cosh(update * Math.PI / 180).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `cosh(${update})` 
                    result.innerHTML = (Math.cosh(update * Math.PI / 180)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `cosh(${update})`;
                    result.innerHTML = (Math.cosh(update * Math.PI / 180)).toFixed(1);
                    historyadd();
                }
            }
            else {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `cosh(${result.innerHTML})`;
                    result.innerHTML = Math.cosh(update).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `cosh(${update})` 
                    result.innerHTML = (Math.cosh(update)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `cosh(${update})`;
                    result.innerHTML = (Math.cosh(update)).toFixed(1);
                    historyadd();
                }
            }
            break;
        case "tanh":
            update = result.innerHTML;
            if (deg.classList.contains("active")) {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `tanh(${result.innerHTML})`;
                    result.innerHTML = Math.tanh(update * Math.PI / 180).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `tanh(${update})` 
                    result.innerHTML = (Math.tanh(update * 180 / Math.PI)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `tanh(${update})`;
                    result.innerHTML = (Math.tanh(update * Math.PI / 180)).toFixed(1); 
                    historyadd();
                }
            }
            else {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `tanh(${result.innerHTML})`;
                    result.innerHTML = Math.tanh(update).toFixed(1);
                    historyadd();
                }
                else if (operationdisp.innerHTML !== "") {
                    operationdisp.innerHTML += `tanh(${update})` 
                    result.innerHTML = (Math.tanh(update)).toFixed(1);
                }
                else {
                    operationdisp.innerHTML = `tanh(${update})`;
                    result.innerHTML = (Math.tanh(update)).toFixed(1); 
                    historyadd();
                } 
            }
            break;
        case "asinh":
            update = result.innerHTML;
            if (operationdisp.innerHTML !== "") {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `sinh(${result.innerHTML})`;
                    result.innerHTML = Math.asinh(update).toFixed(1);
                    historyadd();
                }
                operationdisp.innerHTML += `sinh(${update})<sup><sup>-1</sup></sup>` 
                result.innerHTML = (Math.asinh(update)).toFixed(1);
            }
            else {
                operationdisp.innerHTML = `sinh(${update})<sup><sup>-1</sup></sup>`;
                result.innerHTML = (Math.asinh(update)).toFixed(1);
                historyadd(); 
            }
            break;
        case "acosh":
            update = result.innerHTML;
            if (operationdisp.innerHTML !== "") {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `cosh(${result.innerHTML})`;
                    result.innerHTML = Math.acosh(update).toFixed(1);
                    historyadd();
                }
                operationdisp.innerHTML += `cosh(${update})<sup><sup>-1</sup></sup>` 
                result.innerHTML = (Math.acosh(update)).toFixed(1);
            }
            else {
                operationdisp.innerHTML = `cosh(${update})<sup><sup>-1</sup></sup>`;
                result.innerHTML = (Math.acosh(update)).toFixed(1);
                historyadd();
            }
            break;
        case "atanh":
            update = result.innerHTML;
            if (operationdisp.innerHTML !== "") {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `tanh(${result.innerHTML})`;
                    result.innerHTML = Math.atanh(update).toFixed(1);
                    historyadd();
                }
                operationdisp.innerHTML += `tanh(${update})<sup><sup>-1</sup></sup>` 
                result.innerHTML = (Math.atanh(update)).toFixed(1);
            }
            else {
                if (operationdisp.innerHTML.includes("sin()sin") || ("cos()cos") || ("tan()tan")) {
                    operationdisp.innerHTML = `tanh(${result.innerHTML})`;
                    result.innerHTML = Math.atanh(update)
                }
                operationdisp.innerHTML = `tanh(${update})<sup><sup>-1</sup></sup>`;
                result.innerHTML = (Math.atanh(update)).toFixed(1); 
                historyadd();
            }
            break;
        case "left-bracktes":
            firstAtempt = 1;
            operationdisp.innerHTML += "(";
            console.log(operationdisp.innerHTML);
            result.innerHTML = 0
            
            break;
        case "right-brackets":
            operationdisp.innerHTML += result.innerHTML;
            operationdisp.innerHTML += ")";
            bracketsCalc();
            break;
        case  "backspace":
            if (operationdisp.innerHTML.includes("=") || operationdisp.innerHTML.includes("(")) {
                return;
            }
            result.innerHTML = result.innerHTML.toString().slice(0,(result.innerHTML.length - 1))
            if(result.innerHTML == "") {
                result.innerHTML = 0;
            }
            break;
        case "Ans":
            showAnswer();
            break;
        case "equals":
            calculate();
            historyadd();
            break;
        default:
            return;
    }
}

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        showNum(number);   
    })
})

clear.forEach((cls) => {
    clearScreen(cls); 
})

operations.forEach((opertaion) => {
    opertaion.addEventListener("click", () => {
        showOperation(opertaion);
    })
})

historyshow.forEach((show) => {
    show.addEventListener("click", () => {
        document.body.classList.toggle("show");  
    })
    window.addEventListener ("keyup" ,(el) => { 
        if(el.key == "Escape") {
            document.body.classList.remove("show"); 
        }
    })
})
window.onclick = (el) => {
    if(!el.target.matches(".historyRepo") && !el.target.matches("button") && (!el.target.matches(".historyRepo .header i"))) {
        document.body.classList.remove("show");
    }
    if (el.target.matches(".overlay")) {
        document.body.classList.remove("active");
    }
}
rad.addEventListener("click", () => {
    deg.classList.remove("active");
    rad.classList.add("active");
    operationdisp.innerHTML = "";
    result.innerHTML = 0;
});
deg.addEventListener("click", () => {
    rad.classList.remove("active");
    deg.classList.add("active");
    operationdisp.innerHTML = "";
    result.innerHTML = 0;
});

closeModal.addEventListener("click", () => {
    document.body.classList.remove("active");
});
