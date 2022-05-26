const sounds = document.querySelectorAll(".beats audio");
const soundBtn = document.querySelectorAll(".beats div");
const animContainer = document.querySelector(".showAnimation");
const bubbleColors = [
  "dark",
  "info",
  "primary",
  "secondary",
  "success",
  "warning",
];

soundBtn.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    sounds[index].currentTime = 0;
    sounds[index].play();
    creatBubbles(index);
  });
});

function creatBubbles(i) {
  const bubbles = document.createElement("span");
  animContainer.appendChild(bubbles);
  bubbles.style.animation = `soundPlay 1s ease`;
  bubbles.classList.add(`bg-${bubbleColors[i]}`);

  bubbles.addEventListener("animationend", function () {
    animContainer.removeChild(this);
  });
}
