const myLibrary = [];

// Constructor
function Book(name, author, pages, yearPublished, hasRead) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.yearPublished = yearPublished;
  this.hasRead = hasRead;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, pages, yearPublished, hasRead) {
  const createBook = new Book(name, author, pages, yearPublished, hasRead);
  myLibrary.push(createBook);
}

addBookToLibrary("The Starless Sea", "Erin Morgenstern", 498, 2019, false);
addBookToLibrary("Goldenhand", "Garth Nix", 421, 2016, false);
addBookToLibrary("People We Meet On Vacation", "Emily Henry", 384, 2021, true);

const dialog = document.querySelector("dialog");
const form = document.querySelector("#book");
const errorDiv = document.querySelector(".form-error");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateForm()) {
    return;
  }
  const bookInput = document.querySelector("#book_name").value;
  const authorInput = document.querySelector("#author_name").value;
  const pageInput = document.querySelector("#page_count").value;
  const yearInput = document.querySelector("#year_published").value;
  const hasRead = document.querySelector("#has_read").value;
  addBookToLibrary(bookInput, authorInput, pageInput, yearInput, hasRead);
  dialog.close();
  console.log(myLibrary);
  clearForm();
});

const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", (event) => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

function clearForm() {
  document.getElementById("book").reset();
}

function validateForm(e) {
  const inputs = [
    { el: document.querySelector("#book_name"), label: "Please set a book title." },
    { el: document.querySelector("#author_name"), label: "Please set an author name." },
    { el: document.querySelector("#page_count"), label: "Set a page count 1-99,999" },
    { el: document.querySelector("#year_published"), label: "Please set a year published 0-9999" },
  ];

  const messages = [];

  for (const { el, label } of inputs) {
    if (!el.checkValidity()) {
      messages.push(label);
    }
  }
  errorDiv.textContent = messages[0];
  console.log(messages);
  return messages.length === 0;
}
