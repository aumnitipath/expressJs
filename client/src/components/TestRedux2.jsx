import React from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/userSlice";
import { lightGreen } from "@mui/material/colors";

const TestRedux2 = () => {
  const dispatch = useDispatch();

  return (
    <div>
      TestRedux2
      <br />
      <button onClick={() => dispatch(login())}>Hello Redux</button>
      <button onClick={() => dispatch(logout())}>Hello Redux2</button>
    </div>
  );
};

export default TestRedux2;
