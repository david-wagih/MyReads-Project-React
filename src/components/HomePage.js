import "../App.css";
import { useEffect, useState } from "react";
import BookShelf from "./BookShelf";
import SearchButton from "./SearchButton";

const HomePage = (props) => {
  const allBooks = props.books;
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [ReadBooks, setReadBooks] = useState([]);

  const getCurrentlyReadingBooks = (allBooks) => {
    setCurrentlyReadingBooks(
      allBooks.filter(
        (book) => book.shelf === "currentlyReading" && book.shelf !== "none"
      )
    );
  };
  const getWantToReadBooks = (allBooks) => {
    setWantToReadBooks(
      allBooks.filter(
        (book) => book.shelf === "wantToRead" && book.shelf !== "none"
      )
    );
  };
  const getReadBooks = (allBooks) => {
    setReadBooks(
      allBooks.filter((book) => book.shelf === "read" && book.shelf !== "none")
    );
  };
  useEffect(() => {
    getCurrentlyReadingBooks(allBooks);
    getWantToReadBooks(allBooks);
    getReadBooks(allBooks);
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
              handleBookShelfChange={props.handleBookShelfChange}
              title="Currently Reading"
              books={currentlyReadingBooks}
            />
            <BookShelf
              handleBookShelfChange={props.handleBookShelfChange}
              title="Want to Read"
              books={wantToReadBooks}
            />
            <BookShelf
              handleBookShelfChange={props.handleBookShelfChange}
              title="Read"
              books={ReadBooks}
            />
          </div>
        </div>
        <SearchButton />
      </div>
    </div>
  );
};

export default HomePage;
