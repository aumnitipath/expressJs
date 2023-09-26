import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormProduct from "./components/FormProduct";
import FormEditProduct from "./components/FormEditProduct";

function App() {
  return (
    <BrowserRouter>
      <>
        <h1>From CRUD</h1>
        <Routes>
          <Route path="/" element={<FormProduct />} />
          <Route path="/edit/:id" element={<FormEditProduct />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
