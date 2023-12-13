const myLibrary = [];

const dialog = document.querySelector(".form-dialog");
const addBookBtn = document.querySelector(".btn.add-book");
const submitBtn = document.querySelector(".form-dialog .btn");
const bookContainer = document.querySelector(".book-grid");
const displayBookCount = document.querySelector(".header .btn");
const bookName = document.querySelector("#book-name");
const author = document.querySelector("#author-name");
const pages = document.querySelector("#pages");
const checkbox = document.querySelector("#read-status");

let bookCount = 0;

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateForm()) {
    addBookToLibrary();
    dialog.close();
  }
  //form reset
  document.querySelector(".form-dialog form").reset();
});

function validateForm() {
  // Basic form validation, you can add more checks if needed
  if (
    bookName.value.trim() === "" ||
    author.value.trim() === "" ||
    isNaN(pages.value) ||
    pages.value <= 0
  ) {
    alert("Please fill in valid book details.");
    return false;
  } else if (pages.value > 10000) {
    alert("Add a page no below 10000.");
    return false;
  }
  return true;
}


//book constructor
class Book {
  constructor (bookName, author , pages, readStatus) {
    this.bookName = bookName;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus === true ? "Read" : "Not Read";
  }
}

function addBookToLibrary() {
  bookCount++;
  const bookData = new Book(
    bookName.value,
    author.value,
    pages.value,
    checkbox.checked
  );
  createBookCard(bookData);
  updateBookCount();
  myLibrary.push(bookData);
}

//here dom elements may have same variable name to other global variables for easyness
//but it won't cause any problems as they are local
function createBookCard(values) {
  //create a book first
  const newBook = document.createElement("div");
  newBook.classList.add("book");
  bookContainer.appendChild(newBook);

  //bookname
  const bookName = document.createElement("div");
  bookName.classList.add("title");
  newBook.appendChild(bookName);
  bookName.textContent = values.bookName;

  //bookauthor
  const author = document.createElement("div");
  newBook.appendChild(author);
  author.textContent = values.author;

  //bookpages
  const pages = document.createElement("div");
  newBook.appendChild(pages);
  pages.textContent = `${values.pages} pages`;

  //readStatus
  const readStatus = document.createElement("div");
  newBook.appendChild(readStatus);
  readStatus.textContent = `Read Status : ${values.readStatus}`;

  //remove button
  const removeBtn = document.createElement("div");
  removeBtn.classList.add("btn", "remove");
  newBook.appendChild(removeBtn);
  removeBtn.textContent = "REMOVE";

  //note : removeBtn is not global var but it works in case of event listeners.
  removeBtn.addEventListener("click", () => {
    //remove book card and it's child
    while (newBook.firstChild) {
      newBook.removeChild(newBook.firstChild);
    }
    newBook.remove();
    bookCount--;
    updateBookCount();
  });
}

function updateBookCount() {
  displayBookCount.textContent = `Book Count : ${bookCount}`;
}
