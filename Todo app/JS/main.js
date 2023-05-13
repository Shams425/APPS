//Drage & drop
const todos = document.querySelectorAll(".taskAdded");
const taskes = document.querySelectorAll(".todo");
let TaskDraged = null;

todos.forEach((todo) => {
todo.addEventListener("dragstart", dragStart);
todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
    TaskDraged = this;
setTimeout(() => {
    this.style.display = "none";
    }, 0);
}

function dragEnd() {
    TaskDraged = null;
    setTimeout(() => {
    this.style.display = "flex";
    }, 0);
}

taskes.forEach((status) => {
status.addEventListener("dragover", dragOver);
status.addEventListener("dragenter", dragEnter);
status.addEventListener("dragleave", dragLeave);
status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
e.preventDefault();
}

function dragEnter() {
this.style.border = "1px dashed black";
}

function dragLeave() {
this.style.border = "none";
}

function dragDrop() {
this.style.border = "none";
this.appendChild(TaskDraged);
}

// create & add Elements
const input = document.querySelector(".modal .body input");
const taskadd = document.getElementById("plus");

taskadd.addEventListener("click" , create);
function create() {
    const taskName = input.value;
    const creatediv = document.createElement("div");
    const span = document.createElement("span");
    const createButton = document.createElement("button");
    const taskCloumn = document.querySelector(".continer  .task");

    creatediv.classList.add("taskAdded");
    creatediv.setAttribute("draggable" , "true");
    creatediv.setAttribute("id" , "addedTask");
    creatediv.appendChild(createButton);
    createButton.innerHTML = taskName;
    createButton.classList.add("doit");
    createButton.setAttribute("id","dragTask")
    creatediv.appendChild(span);
    span.classList.add("close");
    span.setAttribute("id" , "TaskClose");
    span.innerHTML = "&times";

    taskCloumn.appendChild(creatediv);

    document.querySelector(add.dataset.target).classList.remove("active");
    overlay.classList.remove("activeLay");
    input.value = "";

    span.addEventListener("click" , () => {
        span.parentElement.remove();
    });

    creatediv.addEventListener("dragstart", dragStart);
    creatediv.addEventListener("dragend", dragEnd);

}

//The UI buttons & added taskes
const add = document.querySelector("#add");
const modalClose = document.querySelector(".modal .header button");
const taskClose = document.querySelectorAll(".continer .close");
const overlay = document.querySelector(".overlay")

add.onclick = () => { 
    document.querySelector(add.dataset.target).classList.add("active");
    overlay.classList.add("activeLay");
    input.focus();
}
input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        taskadd.click();
    }
});

modalClose.addEventListener("click" , () => {
    document.querySelector(add.dataset.target).classList.remove("active");
    overlay.classList.remove("activeLay");
    input.value = "";
});
taskClose.forEach((close) => {
   close.addEventListener("click" , () => {
   const task = document.querySelector("#addedTask");
   task.style.display = "none"; 
})
    
});
window.onclick = (click) => {
    if(click.target.matches(".overlay")) {
        document.querySelector(add.dataset.target).classList.remove("active");
        overlay.classList.remove("activeLay");
        input.value = "";
    }
}
