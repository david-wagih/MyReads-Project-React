import "../App.css";
import { useEffect, useState } from "react";
import BookShelf from "./BookShelf";
import { getAll } from "../BooksAPI";
import SearchButton from "./SearchButton";

const HomePage = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [ReadBooks, setReadBooks] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      const books = await getAll();
      if (books.length > 0) {
        setAllBooks(books);
      } else {
        setAllBooks([]);
      }
    };
    const getCurrentlyReadingBooks = () => {
      setCurrentlyReadingBooks(
        allBooks.filter(
          (book) => book.shelf === "currentlyReading" && book.shelf !== "none"
        )
      );
    };
    const getWantToReadBooks = () => {
      setWantToReadBooks(
        allBooks.filter(
          (book) => book.shelf === "wantToRead" && book.shelf !== "none"
        )
      );
    };
    const getReadBooks = () => {
      setReadBooks(
        allBooks.filter(
          (book) => book.shelf === "read" && book.shelf !== "none"
        )
      );
    };
    getAllBooks();
    getCurrentlyReadingBooks();
    getWantToReadBooks();
    getReadBooks();
  }, [allBooks]);
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={currentlyReadingBooks}
            />
            <BookShelf title="Want to Read" books={wantToReadBooks} />
            <BookShelf title="Read" books={ReadBooks} />
          </div>
        </div>
        <SearchButton />
      </div>
    </div>
  );
};

export default HomePage;
