import { useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";
import Book from "./Book";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleSearch = async (e) => {
    setSearchText(e.target.value);
    if (e.target.value !== "") {
      const data = await search(e.target.value, 10);
      setFilteredBooks(data);
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
                  image={book.imageLinks.smallThumbnail}
                />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
