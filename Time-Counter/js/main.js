const timeContainer = document.querySelector(".timeContainer");
const minutesInput = document.querySelector(".minutesInput");
const secondsInput = document.querySelector(".secondsInput");
const startButton = document.querySelector(".counterStart");
const pauseButton = document.querySelector(".counterPause");

let allSeconds = [];
let allMinutes = [];
let secondsValue;
let minutes;
let timeCheck;
let pause = true;

for (i = 59; i > 0; i--) {
  i < 10 ? allSeconds.push(`0${i}`) : allSeconds.push(i);
}

for (i = 0; i < 60; i++) {
  i < 10 ? allMinutes.push(`0${i}`) : allMinutes.push(i);
}

window.onload = () => {
  secondsValue = secondsInput.options[secondsInput.selectedIndex].value;
  minutes = minutesInput.options[minutesInput.selectedIndex].value;
  timeContainer.innerHTML = `${
    minutesInput.options[minutesInput.selectedIndex].value
  } : ${secondsInput.options[secondsInput.selectedIndex].value} `;

  pauseButton.setAttribute("disabled", true);
};

minutesInput.innerHTML = allMinutes.map(
  (val) => `<option value=${val}>${val}</option>`
);

secondsInput.innerHTML = allSeconds.map(
  (val) => `<option value=${val}>${val}</option>`
);

function timerStart() {
  startButton.setAttribute("disabled", true);
  secondsInput.setAttribute("disabled", true);
  minutesInput.setAttribute("disabled", true);
  pauseButton.removeAttribute("disabled");

  getValues();
  timeCheck = setInterval(() => {
    setValues(timeCheck);
  }, 50);
}

function setValues(time) {
  let remMinutes = minutes % 60;
  let remSeconds = secondsValue % 60;
  if (remMinutes >= 0) {
    secondsValue = secondsValue - 1;
    if (secondsValue < 1) {
      secondsValue = 59;
      minutes = minutes - 1;
    }
    if (remSeconds < 10) {
      timeContainer.innerHTML = `${remMinutes} : 0${remSeconds}`;
      if (remMinutes < 10) {
        timeContainer.innerHTML = `0${remMinutes} : 0${remSeconds}`;
      }
    } else {
      if (remMinutes < 10) {
        timeContainer.innerHTML = `0${remMinutes} : ${remSeconds}`;
      } else {
        timeContainer.innerHTML = `${remMinutes} : ${remSeconds}`;
      }
    }
  } else {
    clearInterval(time);
    timeContainer.innerHTML = `Times UP!!!`;
    secondsValue = parseInt(secondsInput.value);
    pauseButton.setAttribute("disabled", true);
    startButton.removeAttribute("disabled");
    secondsInput.removeAttribute("disabled");
    minutesInput.removeAttribute("disabled");
  }
}

function getValues() {
  timeContainer.innerHTML = `${
    minutesInput.options[minutesInput.selectedIndex].value
  } : ${secondsInput.options[secondsInput.selectedIndex].value} `;

  secondsValue = parseInt(secondsInput.value);
  minutes = parseInt(minutesInput.value);
}

function timerStop() {
  if (pause) {
    clearInterval(timeCheck);
    secondsInput.removeAttribute("disabled");
    minutesInput.removeAttribute("disabled");
    pause = false;
    pauseButton.innerHTML = "play";
  } else {
    clearInterval(timeCheck);
    timeCheck = setInterval(() => {
      setValues(timeCheck);
    }, 50);
    pause = true;
    pauseButton.innerHTML = "pause";
    secondsInput.setAttribute("disabled", true);
    minutesInput.setAttribute("disabled", true);
  }
}
