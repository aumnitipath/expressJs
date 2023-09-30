//rafce
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { create, getData, remove } from "../functions/product";

// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
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

const FormProduct = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  const loadData = async () => {
    getData()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    // console.log(e.target.files);

    if (e.target.name === "file") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formWithImageData = new FormData();
    for (let key in form) {
      formWithImageData.append(key, form[key]);
    }

    // console.log(formWithImageData);
    create(formWithImageData)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = async (id) => {
    remove(id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Form Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <TextField
            id="outlined-basic"
            label="name"
            name="name"
            onChange={(e) => handleChange(e)}
            variant="outlined"
          />
        </div>

        <div className="my-3">
          <TextField
            id="outlined-basic"
            label="detail"
            name="detail"
            onChange={(e) => handleChange(e)}
            variant="outlined"
          />
        </div>

        <div className="my-3">
          <TextField
            type="file"
            id="outlined-basic"
            label="file"
            name="file"
            onChange={(e) => handleChange(e)}
            variant="outlined"
            focused
          />
        </div>

        <div className="my-3">
          <TextField
            type="number"
            id="outlined-basic"
            label="price"
            name="price"
            onChange={(e) => handleChange(e)}
            variant="outlined"
          />
        </div>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>

      <TableContainer component={Paper} className="my-6">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell scope="col">No.</TableCell>
              <TableCell scope="col">Name</TableCell>
              <TableCell scope="col">Detail</TableCell>
              <TableCell scope="col">File</TableCell>
              <TableCell scope="col">Price</TableCell>
              <TableCell scope="col">Delete</TableCell>
              <TableCell scope="col">Edit</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data
              ? data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.detail}</TableCell>
                    <TableCell>{item.file}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <DeleteIcon
                        className="cursor-pointer"
                        color="error"
                        onClick={() => handleRemove(item._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Link to={"/edit/" + item._id}>
                        <EditTwoToneIcon className="bg-blue-200" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FormProduct;
