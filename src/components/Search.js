import { useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";
import Book from "./Book";

const Search = ({ handleBookShelfChange, books }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [exists, setExists] = useState();

  const handleSearch = async (e) => {
    setSearchText(e.target.value);
    if (e.target.value !== "") {
      const data = await search(e.target.value, 20);
      if (data.length > 0) {
        data.map((searchResult) => {
          const match = books.find((book) => book.id === searchResult.id);
          if (match && match.shelf) {
            searchResult.shelf = match.shelf;
          } else {
            searchResult.shelf = "none";
          }
          return searchResult;
        });

        setFilteredBooks(data);
        setExists(true);
      } else {
        setFilteredBooks([]);
        setExists(false);
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
                  handleBookShelfChange={handleBookShelfChange}
                  bookObj={book}
                  bookId={book.id}
                  title={book.title}
                  author={book.authors ? book.authors[0] : " "}
                  image={book.imageLinks ? book.imageLinks.smallThumbnail : ""}
                />
              </li>
            ))}
          {!exists && <div>No Books Found.</div>}
        </ol>
      </div>
    </div>
  );
};

export default Search;
