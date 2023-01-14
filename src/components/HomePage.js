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
      setAllBooks(books);
    };
    const getCurrentlyReadingBooks = () => {
      setCurrentlyReadingBooks(
        allBooks.filter((book) => book.shelf === "currentlyReading")
      );
    };
    const getWantToReadBooks = () => {
      setWantToReadBooks(
        allBooks.filter((book) => book.shelf === "wantToRead")
      );
    };
    const getReadBooks = () => {
      setReadBooks(allBooks.filter((book) => book.shelf === "read"));
    };
    getAllBooks();
    getCurrentlyReadingBooks();
    getWantToReadBooks();
    getReadBooks();
    return () => {
      console.log("clean");
    };
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
