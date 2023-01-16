import { useEffect, useState } from "react";
import { update } from "../BooksAPI";

const BookControl = (props) => {
  const book = props.book;
  const bookShelf = props.book.shelf;
  const [shelf, setShelf] = useState(bookShelf);

  const handleBookShelfChange = async (e) => {
    setShelf(e.target.value);
    await update(book, e.target.value);
  };

  useEffect(() => {
    setShelf(bookShelf);
  }, [bookShelf]);

  return (
    <div className="book-shelf-changer">
      {book.shelf && (
        <select value={shelf} onChange={handleBookShelfChange}>
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      )}
    </div>
  );
};

export default BookControl;
