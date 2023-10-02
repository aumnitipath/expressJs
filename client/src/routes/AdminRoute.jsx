import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes } from "react-router-dom";
import NotfoundPage from "../components/pages/NotfoundPage";
import { currentAdmin } from "../functions/auth";
import HeaderBar from "../layout/HeaderBar";
import SideBar from "../layout/SideBar";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({
    ...state,
  }));
  const [confirmAdmin, setConfirmAdmin] = useState(false);

  useEffect(() => {
    if (user && user.user.token) {
      currentAdmin(user.user.token)
        .then((res) => {
          setConfirmAdmin(true);
        })
        .catch((err) => {
          console.log(err);
          setConfirmAdmin(false);
        });
    }
  }, [user]);

  console.log("admin", user.user.role);

  const alertText = "No Permission!!";

  return confirmAdmin ? (
    <div className="app">
      <SideBar />
      <main className="content">
        <HeaderBar />
        <div className="content_body">
          <Box m="20px">{children}</Box>
        </div>
      </main>
    </div>
  ) : (
    <NotfoundPage text={alertText} />
  );
};

export default AdminRoute;
