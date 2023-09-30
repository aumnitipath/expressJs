import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { read, update } from "../functions/product";
import { Box, TextField, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { url } from "../api/api";

const FormEditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    detail: "",
    price: "",
  });
  const [fileOld, setFileOld] = useState();

  useEffect(() => {
    loadData(params.id);
  }, []);

  const loadData = async (id) => {
    read(id).then((res) => {
      setData(res.data);
      setFileOld(res.data.file);
    });
  };

  const handleChange = (e) => {
    // console.log(e.target.files);

    if (e.target.name === "file") {
      setData({
        ...data,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    console.log(fileOld);
    const formWithImageData = new FormData();
    for (let key in data) {
      formWithImageData.append(key, data[key]);
    }

    formWithImageData.append("fileOld", fileOld);
    update(formWithImageData, params.id)
      .then((res) => {
        console.log(res.data);
        navigate(`/admin/viewtable`);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="my-4">
          <TextField
            id="outlined-basic"
            label="name"
            variant="outlined"
            name="name"
            onChange={(e) => handleChange(e)}
            value={data.name}
            className="bg-white my-5"
          />
        </div>

        <div className="my-4">
          <TextField
            id="outlined-basic"
            label="detail"
            variant="outlined"
            placeholder="detail"
            value={data.detail}
            onChange={(e) => handleChange(e)}
            className="bg-white my-5"
          />
        </div>
        <div className="my-4">
          <TextField
            id="outlined-basic"
            label="file"
            variant="outlined"
            type="file"
            onChange={(e) => handleChange(e)}
            focused
            className="bg-white my-5"
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="price"
            variant="outlined"
            value={data.price}
            onChange={(e) => handleChange(e)}
            type="number"
            name="price"
          />
        </div>

        <div className="my-4">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormEditProduct;
