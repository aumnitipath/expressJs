import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FormEditProduct from "./components/FormEditProduct";
import FormProduct from "./components/FormProduct";
import TestRedux1 from "./components/TestRedux1";
import TestRedux2 from "./components/TestRedux2";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register.jsx";
import HeaderBar from "./layout/HeaderBar";
import SideBar from "./layout/SideBar";

function App() {
  return (
    <BrowserRouter>
      <>
        <CssBaseline />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <div className="app">
          <SideBar />
          <main className="content">
            <HeaderBar />
            <div className="content_body">
              <Box m="20px">
                <Routes>
                  <Route path="/admin/viewtable" element={<FormProduct />} />
                  <Route path="/edit/:id" element={<FormEditProduct />} />
                </Routes>
              </Box>
            </div>
          </main>
        </div>
        {/* <TestRedux1 />
        <hr />
        <TestRedux2 /> */}
      </>
    </BrowserRouter>
  );
}

export default App;
