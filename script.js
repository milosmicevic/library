const addBooksContainer = document.querySelector(".add-books-container");
const booksContainer = document.querySelector(".books");
const addBookButton = addBooksContainer.querySelector(".add-form-button");
const instructionsButton = document.querySelector(".fa-question-circle");
const darkBackground = document.querySelector(".dark-background");
const addButton = document.querySelector(".add-button");
const closeButton = document.querySelector(".close-button");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);

  closeAddDialogBox();
  renderBooks();
}

function getInputedValues() {
  const inputedTitle = addBooksContainer.querySelector(".input-title");
  const authorInput = document.querySelector(".author-name");
  const pagesInput = document.querySelector(".pages-number");
  const readInput = document.querySelector(".read");

  const bookObject = new Book(
    inputedTitle.value,
    authorInput.value,
    pagesInput.value,
    readInput.checked
  );

  return bookObject;
}

function openAddDialogBox() {
  const addDialogBox = document.querySelector(".add-dialog-box");
  const inputedTitle = addBooksContainer.querySelector(".input-title");
  const bookTitle = addDialogBox.querySelector(".book-title");

  bookTitle.innerText = `„${inputedTitle.value}“`;

  addDialogBox.style.display = "flex";
  darkBackground.style.display = "flex";
}

function closeAddDialogBox() {
  const addDialogBox = document.querySelector(".add-dialog-box");
  addDialogBox.style.display = "none";
  darkBackground.style.display = "none";
}

function openInstructionsDialogBox() {
  const instructionsDialogBox = document.querySelector(
    ".instructions-dialog-box"
  );

  instructionsDialogBox.style.display = "flex";
  darkBackground.style.display = "flex";
}

function closeInstructionsDialogBox() {
  const instructionsDialogBox = document.querySelector(
    ".instructions-dialog-box"
  );

  instructionsDialogBox.style.display = "none";
  darkBackground.style.display = "none";
}

function toggleRead(bookDiv) {
  const bookmark = bookDiv.querySelector(".fa-bookmark");
  const bookIndex = bookDiv.getAttribute("data-index");

  if (bookmark) {
    bookDiv.removeChild(bookmark);
    myLibrary[bookIndex].read = false;
  } else {
    const bookmark = document.createElement("i");
    bookmark.classList.add("fas");
    bookmark.classList.add("fa-bookmark");

    myLibrary[bookIndex].read = true;

    bookDiv.appendChild(bookmark);
  }
}

function deleteBook(book) {
  myLibrary.splice(myLibrary.indexOf(book), 1);
}

function populateStorage() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function loadFromStorage() {
  const library = localStorage.getItem("library");

  myLibrary = library === null ? [] : JSON.parse(library);
}

function renderBooks() {
  let bookIndex = 0;
  booksContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("div");
    const bookPages = document.createElement("div");
    const deleteButton = document.createElement("i");

    bookDiv.classList.add("book");
    bookTitle.classList.add("book-title");
    bookAuthor.classList.add("book-author");
    bookPages.classList.add("book-pages");
    deleteButton.classList.add("fas");
    deleteButton.classList.add("fa-times");

    bookDiv.setAttribute("data-index", bookIndex);
    bookIndex++;

    bookTitle.innerText = `„${book.title}“`;
    bookAuthor.innerText = `${book.author}`;
    bookPages.innerText = `${book.pages}`;

    booksContainer.appendChild(bookDiv);
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookPages);
    bookDiv.appendChild(deleteButton);

    if (book.read) {
      const bookmark = document.createElement("i");
      bookmark.classList.add("fas");
      bookmark.classList.add("fa-bookmark");

      bookDiv.appendChild(bookmark);
    }

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteBook(book);
      renderBooks();
    });

    bookDiv.addEventListener("click", () => {
      toggleRead(bookDiv);
      renderBooks();
    });

    bookDiv.addEventListener("mouseenter", () => {
      deleteButton.style.display = "flex";
    });

    bookDiv.addEventListener("mouseleave", () => {
      deleteButton.style.display = "none";
    });
  });
  populateStorage();
}

addBookButton.addEventListener("click", openAddDialogBox);
instructionsButton.addEventListener("click", openInstructionsDialogBox);

addButton.addEventListener("click", () => {
  const bookObject = getInputedValues();

  addBookToLibrary(bookObject);
});

darkBackground.addEventListener("click", () => {
  closeAddDialogBox();
  closeInstructionsDialogBox();
});

closeButton.addEventListener("click", () => {
  closeInstructionsDialogBox();
});

window.onload = () => {
  loadFromStorage();
  renderBooks();
};
