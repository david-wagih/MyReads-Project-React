import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";
import { getAllBooks } from "../services/getAllBooks";
import Book from "./Book";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const data = await getAllBooks();
      setAllBooks(data);
    };
    getBooks();
  }, [allBooks]);

  function compareBooks(book1, allBooks) {
    if (allBooks.length > 0) {
      allBooks.forEach((book) => {
        if (book1.id === book.id) {
          book1.shelf = book.shelf;
        } else {
          book1.shelf = "none";
        }
      });
    }
  }
  const handleSearch = async (e) => {
    setSearchText(e.target.value);
    if (e.target.value !== "") {
      const data = await search(e.target.value, 20);
      if (data.length > 0) {
        data.forEach((searchResult) => {
          compareBooks(searchResult, allBooks);
        });
        setFilteredBooks(data);
      } else {
        setFilteredBooks([]);
      }
    } else {
      setFilteredBooks([]);
    }
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            value={searchText}
            onChange={handleSearch}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {filteredBooks.length > 0 &&
            filteredBooks.map((book) => (
              <li key={book.id}>
                <Book
                  bookObj={book}
                  bookId={book.id}
                  title={book.title}
                  author={book.authors ? book.authors[0] : " "}
                  image={book.imageLinks ? book.imageLinks.smallThumbnail : ""}
                />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
