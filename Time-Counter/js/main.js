const timeContainer = document.querySelector(".timeContainer");
const minutesInput = document.querySelector(".minutesInput");
const secondsInput = document.querySelector(".secondsInput");
let allSeconds = [];
let allMinutes = [];

for (i = 59; i > 0; i--) {
  allSeconds.push(i);
}

for (i = 1; i < 60; i++) {
  allMinutes.push(i);
}

window.onload = () => {
  timeContainer.innerHTML = `${
    minutesInput.options[minutesInput.selectedIndex].value
  } : ${secondsInput.options[secondsInput.selectedIndex].value} `;
};

minutesInput.innerHTML = allMinutes.map(
  (val) => `<option value=${val}>${val}</option>`
);

secondsInput.innerHTML = allSeconds.map(
  (val) => `<option value=${val}>${val}</option>`
);

function timerStart() {
  let timeCheck = setInterval(() => {
    setValues(timeCheck);
  }, 1000);
}

let secondsValue;
let minutes;
function setValues(time) {
  let remMinutes = minutes % 60;
  let remSeconds = secondsValue % 60;
  if (remMinutes >= 0) {
    secondsValue = secondsValue - 1;
    if (secondsValue < 1) {
      secondsValue = 59;
      minutes = minutes - 1;
    }
    secondsValue < 10
      ? (timeContainer.innerHTML = `${remMinutes} : 0${remSeconds}`)
      : minutes < 10
      ? (timeContainer.innerHTML = `0${remMinutes} : ${remSeconds}`)
      : (timeContainer.innerHTML = `${remMinutes} : ${remSeconds}`);
  } else {
    clearInterval(time);
    timeContainer.innerHTML = `Times UP!!!`;
    secondsValue = parseInt(secondsInput.value);
  }
}

function getValues() {
  timeContainer.innerHTML = `${
    minutesInput.options[minutesInput.selectedIndex].value
  } : ${secondsInput.options[secondsInput.selectedIndex].value} `;

  secondsValue = parseInt(secondsInput.value);
  minutes = parseInt(minutesInput.value);
}
