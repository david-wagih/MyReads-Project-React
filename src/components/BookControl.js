import { useEffect, useState } from "react";
import { shelvesOptions } from "../utils/shelfOptions";

const BookControl = (props) => {
  const book = props.book;
  const bookShelf = props.book.shelf;
  const [shelf, setShelf] = useState(bookShelf);

  useEffect(() => {
    setShelf(bookShelf);
  }, [bookShelf]);

  return (
    <div className="book-shelf-changer">
      {book.shelf && (
        <select
          value={shelf}
          onChange={(e) => props.handleBookShelfChange(book, e.target.value)}
        >
          <option value="none" disabled>
            Move to...
          </option>
          {shelvesOptions.map((shelf) => (
            <option key={shelf.id} value={shelf.shelfName}>
              {shelf.shelfDisplayName}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default BookControl;
