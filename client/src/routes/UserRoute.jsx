import React from "react";
import { useSelector } from "react-redux";

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log("userRoute", user);

  // check login

  // check ว่ามี user  และ user นั้นมี token ไหม? ถ้ามี render props{children} แต่ถ้าไม่มีให้แสดงข้อความ No Login
  return user && user.user.token ? children : <h1>No Login</h1>;
};

export default UserRoute;
