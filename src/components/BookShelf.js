import Book from "./Book";

const BookShelf = ({ title, books }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book
                bookObj={book}
                bookId={book.id}
                title={book.title}
                author={book.authors[0] ? book.authors[0] : ""}
                image={book.imageLinks.smallThumbnail}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
