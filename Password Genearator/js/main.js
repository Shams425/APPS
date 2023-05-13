const passLength = document.getElementById("passwordLength");
const showLength = document.querySelector(".showLength");
const numCheck = document.getElementById("numberCheck");
const charCheck = document.getElementById("charCheck");
const passBtn = document.getElementById("generate");
const passwordField = document.getElementById("password");
const copyNotification = document.querySelector(".notification");

let numCheckValue = false;
let charCheckValue = false;

passLength.addEventListener("input", () => {
  showLength.textContent = passLength.value;
});

numCheck.addEventListener("click", () => {
  numCheckValue === true ? (numCheckValue = false) : (numCheckValue = true);
});

charCheck.addEventListener("click", () => {
  charCheckValue === true ? (charCheckValue = false) : (charCheckValue = true);
});

function passGen() {
  let password = "";
  let letters = "abcdefghijklmnopqrstvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ";
  let num = "1234567890";
  let char = "!@#$%^&*";

  numCheckValue === true ? (letters = letters + num) : (letters = letters);
  charCheckValue === true ? (letters = letters + char) : (letters = letters);

  for (i = 0; i < passLength.value; i++) {
    let rand = Math.floor(Math.random() * letters.length);
    password += letters.slice(rand, rand + 1);
  }
  passwordField.value = password;
}

function copy() {
  if (passwordField.value === "") return;
  navigator.clipboard.writeText(passwordField.value);
  copyNotification.classList.add("active");

  setTimeout(() => {
    copyNotification.classList.remove("active");
  }, 3000);
}
