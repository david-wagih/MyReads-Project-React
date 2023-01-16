import { useState } from "react";
import { Link } from "react-router-dom";
import { get, search } from "../BooksAPI";
import Book from "./Book";

const Search = (props) => {
  const [searchText, setSearchText] = useState("");
  //const allBooks = props.books;
  const [filteredBooks, setFilteredBooks] = useState([]);

  async function getBookShelf(book) {
    const bookShelf = await get(book.id);
    return bookShelf.shelf !== "none" ? bookShelf.shelf : "none";
  }
  const handleSearch = async (e) => {
    setSearchText(e.target.value);
    if (e.target.value !== "") {
      const data = await search(e.target.value, 20);
      if (data.length > 0) {
        data.map(async (book) => (book.shelf = await getBookShelf(book)));
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
