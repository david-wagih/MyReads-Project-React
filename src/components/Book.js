import BookControl from "./BookControl";
const Book = ({ title, author, image }) => {
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
        <BookControl />
      </div>
      <div className="book-title">T{title}</div>
      <div className="book-authors">{author}</div>
    </div>
  );
};

export default Book;
