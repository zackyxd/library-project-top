const myLibrary = [];

// Constructor
function Book(name, author, datePublished) {
  this.name = name;
  this.author = author;
  this.datePublished = datePublished;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, datePublished) {
  const createBook = new Book(name, author, datePublished);
  myLibrary.push(createBook);
}
