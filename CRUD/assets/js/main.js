const comment = document.querySelector("#comment");
const userName = document.querySelector("#name");
const userEmail = document.querySelector("#email");
const commentBtn = document.querySelector(".submit");
const getComments = document.querySelector(".fetch");
const allComments = document.querySelector(".showComments");
const deleteButtons = document.querySelectorAll(".deleteButton");
const editButtons = document.querySelectorAll(".editButton");

let updateId;
let showAllComments = true;

const submitComment = async () => {
  if (commentBtn.textContent === "Submit") {
    if (comment.value === "" && userName.value === "" && userEmail.value === "")
      return;
    showAllComments = true;
    const response = await fetch("http://localhost:4000/comments", {
      method: "POST",
      body: JSON.stringify({
        name: userName.value,
        email: userEmail.value,
        body: comment.value,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    comment.value = "";
    userName.value = "";
    userEmail.value = "";
  } else if (commentBtn.textContent === "Update") {
    updateComment(updateId);
    showAllComments = true;
  }
};

const fetchComments = async () => {
  if (!showAllComments) return;
  showAllComments = false;
  const response = await fetch("http://localhost:4000/comments");
  const data = response.json();
  return data;
};

const deleteComment = async (id) => {
  console.log(id);
  const response = await fetch(`http://localhost:4000/comments/${id}`, {
    method: "DELETE",
  });

  const data = response.json();
  console.log(data);
};

const editComment = async (id) => {
  updateId = id;
  console.log(updateId);
  commentBtn.textContent = "Update";
  await fetch(`http://localhost:4000/comments/${id}`)
    .then((res) => {
      const data = res.json();
      data.then((comm) => {
        userEmail.value = comm.email;
        userName.value = comm.name;
        comment.value = comm.body;
      });
    })
    .catch((err) => {
      err.message;
    });
};

const updateComment = async (id) => {
  const response = await fetch(`http://localhost:4000/comments/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: userName.value,
      email: userEmail.value,
      body: comment.value,
    }),
  });
  const data = response.json();
  console.log(data);
};

const showComments = (comment) => {
  const divContainer = document.createElement("div");
  const divInfo = document.createElement("div");
  const divLeft = document.createElement("div");
  const divRight = document.createElement("div");
  const divActions = document.createElement("div");
  const h2 = document.createElement("h2");
  const label = document.createElement("label");
  const p = document.createElement("p");
  const icon = document.createElement("i");
  const editBtn = document.createElement("button");
  const delBtn = document.createElement("button");

  icon.className = "fas fa-user";
  divInfo.className = "d-flex";
  divRight.className = "rightSide mx-4";
  divLeft.className = "leftSide";
  divActions.className = "actions";
  editBtn.className = "editButton btn btn-secondary";
  delBtn.className = "deleteButton btn btn-danger mx-3";
  divContainer.className = "mb-4";

  h2.textContent = comment.name;
  p.textContent = comment.body;
  label.textContent = comment.email;
  delBtn.textContent = "delete";
  editBtn.textContent = "edit";

  delBtn.setAttribute("id", comment.id);
  editBtn.setAttribute("id", comment.id);

  divRight.append(h2, label, p);
  divLeft.appendChild(icon);
  divActions.append(editBtn, delBtn);
  divInfo.append(divLeft, divRight);
  divContainer.append(divInfo, divActions);

  delBtn.addEventListener("click", (e) => {
    console.log("it's clicked");
    deleteComment(e.target.id);
  });

  editBtn.addEventListener("click", (e) => {
    console.log("it's clicked");
    editComment(e.target.id);
  });

  return divContainer;
};

commentBtn.addEventListener("click", (e) => {
  e.preventDefault();
  submitComment();
});

getComments.addEventListener("click", (e) => {
  e.preventDefault();
  fetchComments()
    .then((res) =>
      res.map((comment) => allComments.appendChild(showComments(comment)))
    )
    .catch((error) => error.message);
});
