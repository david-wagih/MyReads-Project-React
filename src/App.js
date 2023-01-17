import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Search from "./components/Search";
import { getAllBooks } from "./services/getAllBooks";
import { update } from "../src/BooksAPI";

function App() {
  const [allBooks, setAllBooks] = useState([]);

  const handleBookShelfChange = async (book, shelf) => {
    book.shelf = shelf;
    await update(book, shelf).then(() => {
      setAllBooks([...allBooks.filter((b) => b.id !== book.id), book]);
    });
  };
  useEffect(() => {
    const getBooks = async () => {
      const data = await getAllBooks();
      setAllBooks(data);
    };
    getBooks();
  }, []);
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <HomePage
              books={allBooks}
              handleBookShelfChange={handleBookShelfChange}
            />
          }
        />
        <Route
          exact
          path="/search"
          element={
            <Search
              books={allBooks}
              handleBookShelfChange={handleBookShelfChange}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
