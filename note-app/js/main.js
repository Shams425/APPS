const noteContainer = document.querySelector(".showNote");
const userInput = document.querySelector(".userInput");

let allNotes = [];

function getNotes() {
  noteContainer.innerHTML = "";
  for (i in allNotes) {
    noteContainer.innerHTML += `<p class="mb-3">${allNotes[i]}</p>`;
  }
}

function addNote() {
  if (userInput.value == "") return;
  allNotes.push(userInput.value);
  getNotes();
  userInput.value = "";
}
