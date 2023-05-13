// book class: To Represents a book
class Book {
  //constructor is a method will run automatically every time the book class is called to create object or any thing..... as you know

  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class: To handle UI tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#data-show");
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td>
      <button class="delete btn btn-danger btn-sm">X</button>
    </td>`;

    list.appendChild(row);
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    const container = document.querySelector(".container");

    div.className = `mt-4 alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    container.appendChild(div);

    // remove the alert after 2 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static deleteBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
    }
  }
}

//store class: To handle storage
class Store {
  static getBooks() {
    //local storage can't store object it's only store string
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Event: Display books
document.addEventListener("DOMContentLoaded", UI.displayBooks());

//Event: add a book
document.querySelector("#formBook").addEventListener("submit", (e) => {
  //prevent actual submit
  e.preventDefault();

  //get the value from the form
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //check for validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instantiate book object form the Book class
    const book = new Book(title, author, isbn);

    // add book to UI
    UI.addBookToList(book);

    //add book to local storage
    Store.addBook(book);

    // clear fields after submit
    UI.clearFields();

    //show success message
    UI.showAlert("Your book has been added", "success");
  }
});

//Event: Remove a book
document.querySelector(".show-data").addEventListener("click", (e) => {
  //remove book from UI
  UI.deleteBook(e.target);

  //show message for deleted book
  UI.showAlert("The Book has been Deleted", "danger");

  //remove book from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
