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
  renderBooks(myLibrary);
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
  const hasRead = document.querySelector("#has_read").checked;
  console.log(hasRead);
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
  return messages.length === 0;
}

function renderBooks(myLibrary) {
  const wishlist = document.querySelector(".wishlist-books-container");
  const completed = document.querySelector(".completed-books-container");
  wishlist.innerHTML = "";
  completed.innerHTML = "";
  for (const book of myLibrary) {
    if (book.hasRead) {
      completed.appendChild(createBookElement(book));
    } else {
      wishlist.appendChild(createBookElement(book));
    }
  }
}

function createBookElement(book) {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");

  // Add book title to book
  const bookTitleDiv = document.createElement("div");
  bookTitleDiv.classList.add("book-title");

  const bookTitleArray = book.name.split(" ");
  const titleLastWord = bookTitleArray[bookTitleArray.length - 1];
  const titleLeadingWords = bookTitleArray.slice(0, -1).join(" ");

  // "To Kill A Mocking" as its own text node, sibling to the span below
  bookTitleDiv.appendChild(document.createTextNode(titleLeadingWords));

  const titleNoBreakSpan = document.createElement("span");
  titleNoBreakSpan.classList.add("no-break");
  titleNoBreakSpan.appendChild(document.createTextNode(titleLastWord + " ")); // "Bird" as text, not textContent

  const titleAttrDescSpan = document.createElement("span");
  titleAttrDescSpan.classList.add("attr-desc");
  titleAttrDescSpan.textContent = "📖Title"; // fine to use textContent here — this span has no other children

  titleNoBreakSpan.appendChild(titleAttrDescSpan);
  bookTitleDiv.appendChild(titleNoBreakSpan);

  // Add book author to book
  const bookAuthorDiv = document.createElement("div");
  bookAuthorDiv.classList.add("book-author");

  const bookAuthorArray = book.author.split(" ");
  const authorLastWord = bookAuthorArray.slice(-1);
  const authorLeadingWords = bookAuthorArray.slice(0, -1).join(" ");

  const bookAuthorNameItalicize = document.createElement("i");
  bookAuthorNameItalicize.appendChild(document.createTextNode(authorLeadingWords + " "));

  const authorNoBreakSpan = document.createElement("span");
  authorNoBreakSpan.classList.add("no-break");
  authorNoBreakSpan.appendChild(document.createTextNode(authorLastWord));

  const authorAttrDesc = document.createElement("span");
  authorAttrDesc.classList.add("attr-desc");
  authorAttrDesc.textContent = "🖊️Author";

  authorNoBreakSpan.appendChild(authorAttrDesc);
  bookAuthorNameItalicize.appendChild(authorNoBreakSpan);
  bookAuthorDiv.appendChild(bookAuthorNameItalicize);

  // Add book pages to book
  const bookPagesDiv = document.createElement("div");
  bookPagesDiv.classList.add("book-pages");
  bookPagesDiv.textContent = book.pages;

  const pagesAttrDesc = document.createElement("span");
  pagesAttrDesc.classList.add("attr-desc");
  pagesAttrDesc.textContent = "📄Pages";
  bookPagesDiv.appendChild(pagesAttrDesc);

  // Add book year to book
  const bookYearDiv = document.createElement("div");
  bookYearDiv.classList.add("book-year-published");
  bookYearDiv.textContent = book.yearPublished;

  const yearAttrDesc = document.createElement("span");
  yearAttrDesc.classList.add("attr-desc");
  yearAttrDesc.textContent = "🗓️Year";
  bookYearDiv.appendChild(yearAttrDesc);

  bookDiv.appendChild(bookTitleDiv);
  bookDiv.appendChild(bookAuthorDiv);
  bookDiv.appendChild(bookPagesDiv);
  bookDiv.appendChild(bookYearDiv);

  const bookBtns = document.createElement("div");
  bookBtns.classList.add("book-btns");
  const hasReadBook = document.createElement("div");
  if (book.hasRead) {
    hasReadBook.classList.add("read-book-btn");
    hasReadBook.textContent = "Read";
  } else {
    hasReadBook.classList.add("unread-book-btn");
    hasReadBook.textContent = "Unread";
  }

  const removeBookBtn = document.createElement("div");
  removeBookBtn.classList.add("remove-book-btn");
  removeBookBtn.textContent = "X";

  bookBtns.appendChild(hasReadBook);
  bookBtns.appendChild(removeBookBtn);

  bookDiv.appendChild(bookBtns);
  return bookDiv;
}
