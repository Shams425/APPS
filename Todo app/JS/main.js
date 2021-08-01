//Drage & drop
const todos = document.querySelectorAll(".taskAdded");
const all_status = document.querySelectorAll(".continer .todo");
let draggableTodo = null;

todos.forEach((todo) => {
todo.addEventListener("dragstart", dragStart);
todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
draggableTodo = this;
setTimeout(() => {
    this.style.display = "none";
    }, 0);
    console.log(draggableTodo);
}

function dragEnd() {
draggableTodo = null;
setTimeout(() => {
    this.style.display = "flex";
    }, 0);
}

all_status.forEach((status) => {
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
this.appendChild(draggableTodo);
}
console.log(draggableTodo);

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
    creatediv;
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
    //Drage & drop
const todos = document.querySelectorAll(".taskAdded");
const all_status = document.querySelectorAll(".continer  .todo");
let draggableTodo = null;

todos.forEach((todo) => {
todo.addEventListener("dragstart", dragStart);
todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
draggableTodo = this;
setTimeout(() => {
    this.style.display = "none";
    }, 0);
    console.log(draggableTodo);
}

function dragEnd() {
draggableTodo = null;
setTimeout(() => {
    this.style.display = "flex";
    }, 0);
}

all_status.forEach((status) => {
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
this.appendChild(draggableTodo);
    }
}

const add = document.querySelector("#add");
const modalClose = document.querySelector(".modal .header button");
const taskClose = document.querySelector(".continer .close");
const overlay = document.querySelector(".overlay")

add.onclick = () => {
    document.querySelector(add.dataset.target).classList.add("active");
    overlay.classList.add("activeLay");
};

modalClose.addEventListener("click" , () => {
    document.querySelector(add.dataset.target).classList.remove("active");
    overlay.classList.remove("activeLay");
    input.value = "";
});
taskClose.addEventListener("click" , () => {
    const task = document.querySelector("#addedTask");
    task.style.display = "none";
});
window.onclick = (click) => {
    if(click.target.matches(".overlay")) {
        document.querySelector(add.dataset.target).classList.remove("active");
        overlay.classList.remove("activeLay");
        input.value = "";
    }
}
