import { Box, CssBaseline } from "@mui/material";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FormEditProduct from "./components/FormEditProduct";
import FormProduct from "./components/FormProduct";
import TestRedux1 from "./components/TestRedux1";
import TestRedux2 from "./components/TestRedux2";
import HomePageAdmin from "./components/pages/admin/HomePageAdmin";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register.jsx";
import HomePageUser from "./components/pages/user/HomePageUser";
import { currentUser } from "./functions/auth";
import HeaderBar from "./layout/HeaderBar";
import SideBar from "./layout/SideBar";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute"; //ส่งข้อมูลเข้าไปเก็บใน store
import { login } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  const idToken = localStorage.getItem("token"); // แกะเอา token ออกมาจาก localStorage
  // console.log("token :", idToken);
  currentUser(idToken) //  execute function currentUser และ ส่ง token ไปให้ function และส่งไปหลังบ้าน
    .then((res) => {
      console.log(res);
      dispatch(
        //ส่งข้อมูลเข้าไปเก็บใน store
        login({
          name: res.data.name,
          role: res.data.role,
          token: idToken,
        })
      );
    })
    .catch((err) => console.log(err));
  return (
    <BrowserRouter>
      <>
        <CssBaseline />

        {/* Public */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* User */}
          <Route
            path="/user/index"
            element={
              <UserRoute>
                <HomePageUser />
              </UserRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/index"
            element={
              <AdminRoute>
                <HomePageAdmin />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/viewtable"
            element={
              <AdminRoute>
                <FormProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <AdminRoute>
                <FormEditProduct />
              </AdminRoute>
            }
          />
        </Routes>

        {/* <TestRedux1 />
        <hr />
        <TestRedux2 /> */}
      </>
    </BrowserRouter>
  );
}

export default App;
