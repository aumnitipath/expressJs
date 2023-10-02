import { Box } from "@mui/material";
import { Routes } from "react-router-dom";
import HeaderBar from "../layout/HeaderBar";
import SideBar from "../layout/SideBar";

const AdminRoute = ({ children }) => {
  return (
    <div className="app">
      <SideBar />
      <main className="content">
        <HeaderBar />
        <div className="content_body">
          <Box m="20px">{children}</Box>
        </div>
      </main>
    </div>
  );
};

export default AdminRoute;
