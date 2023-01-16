import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Search from "./components/Search";
import { getAllBooks } from "./services/getAllBooks";

function App() {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const data = await getAllBooks();
      setAllBooks(data);
    };
    getBooks();
  });
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage books={allBooks} />} />
        <Route exact path="/search" element={<Search books={allBooks} />} />
      </Routes>
    </div>
  );
}

export default App;
