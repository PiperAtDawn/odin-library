let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

booksDiv = document.querySelector('.books');
addBookBtn = document.querySelector('#add-book');
modal = document.querySelector('.modal');
modalContent = document.querySelector('.modal-content');
haveRead = document.querySelector('#have-read');
bookForm = document.querySelector('form');

const addBook = (book, index) => {
  let bookDiv = document.createElement('div');
  bookDiv.className = 'book';

  let title = document.createElement('h2');
  title.textContent = book.title;
  bookDiv.appendChild(title);

  let author = document.createElement('p');
  author.textContent = `by ${book.author}`;
  bookDiv.appendChild(author);

  let pages = document.createElement('p');
  pages.textContent = `Pages: ${book.pages}`;
  bookDiv.appendChild(pages);

  let read = document.createElement('p');
  read.textContent = `${book.read ? 'Have read' : 'Have not read'}`;
  bookDiv.appendChild(read);

  let readButton = document.createElement('button');
  readButton.type = 'button';
  readButton.textContent = 'Change read status';
  readButton.dataset.book = index;
  readButton.addEventListener('click', () => {
    changeRead(index);
    renderBooks();
  });
  bookDiv.appendChild(readButton);

  let removeBookBtn = document.createElement('button');
  removeBookBtn.type = 'button';
  removeBookBtn.textContent = 'Remove book';
  removeBookBtn.dataset.book = index;
  removeBookBtn.addEventListener('click', () => {
    removeBook(index);
  });
  bookDiv.appendChild(removeBookBtn);

  booksDiv.appendChild(bookDiv);
}

const removeBook = (index) => {
  myLibrary.splice(index, 1);
  renderBooks();
}

const changeRead = (index) => {
  myLibrary[index].read = !myLibrary[index].read;
}

const renderBooks = () => {
  booksDiv.innerHTML = '';
  myLibrary.forEach((book, index) => addBook(book, index));
}

// Modal stuff

toggleModal = () => {
  modal.classList.toggle('hide');
}

addBookBtn.addEventListener('click', toggleModal);

modal.addEventListener('click', toggleModal);

modalContent.addEventListener('click', (e) => {
  const isOutside = e.target.closest('.modal-content');
  if (isOutside) {
    toggleModal();
  }
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formValues = e.target.elements;

  book = new Book(
    formValues.title.value,
    formValues.author.value,
    formValues.pages.value,
    formValues.haveRead.checked
  )

  myLibrary.push(book);
  renderBooks();
  bookForm.reset();
  toggleModal();
});

//

const makeDefaultBooks = () => {
  myLibrary.push(new Book('Hobbit', 'J.R.R.Tolkien', 300, true));
  myLibrary.push(new Book('It', 'Stephen King', 1000, true));
  renderBooks();
}

makeDefaultBooks();