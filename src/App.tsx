import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Home  from "./components/Home/Home";
import ArticlePage from "./components/ArticlePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

