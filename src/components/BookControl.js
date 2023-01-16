import { useState, useEffect } from "react";
import { update, get } from "../BooksAPI";

const BookControl = (props) => {
  let book = props.book;
  let [shelf, setShelf] = useState(book.shelf);

  const handleBookShelfChange = async (e) => {
    setShelf(e.target.value);
    await update(book, e.target.value);
    //console.log(book);
  };

  // useEffect(async () => {
  //   const data = await get(book.id);
  //   setShelf(data.shelf !== "" ? data.shelf : "none");
  //   // return () => {
  //   //   console.log("clean");
  //   // };
  // }, []);

  return (
    <div className="book-shelf-changer">
      <select value={shelf} onChange={handleBookShelfChange}>
        <option value="none" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookControl;
