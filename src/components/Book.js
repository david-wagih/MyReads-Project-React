import BookControl from "./BookControl";
const Book = ({ title, author, image, bookObj, handleBookShelfChange }) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <BookControl
          handleBookShelfChange={handleBookShelfChange}
          book={bookObj}
        />
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{author ? author : " "}</div>
    </div>
  );
};

export default Book;
