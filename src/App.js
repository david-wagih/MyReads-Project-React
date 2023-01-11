import "./App.css";
import { useEffect, useState } from "react";
import BookShelf from "./components/BookShelf";
import { getAll } from "./BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      const books = await getAll();
      setAllBooks(books);
    };
    getAllBooks();
  }, []);
  console.log(allBooks);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              href="/search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf title="Currently Reading" books={allBooks} />
              <BookShelf title="Want to Read" books={allBooks} />
              <BookShelf title="Read" books={allBooks} />
            </div>
          </div>
          <div className="open-search">
            <a
              href="/search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Add a book
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
