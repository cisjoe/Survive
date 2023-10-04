// ! React
import { BrowserRouter, Route, Routes } from "react-router-dom";

// ! Styling
import "./assets/styles/style.scss";

// ! Components
import Home from "./views/Home";
import About from "./views/About";
import Rules from "./views/Rules";

function App() {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
