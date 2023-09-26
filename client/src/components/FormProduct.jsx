//rafce
import React, { useState, useEffect } from "react";
import axios from "axios";

const FormProduct = () => {
  const loadData = async () => {
    await axios
      .get("http://localhost:5000/product")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadData();
  }, []);
  return <div>FormProduct</div>;
};

export default FormProduct;
