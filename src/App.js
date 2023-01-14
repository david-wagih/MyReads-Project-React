import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Search from "./components/Search";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
