//rafce
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { create, getData, remove } from "../functions/product";

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
      FormProduct
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          placeholder="name"
        />
        <br />

        <input
          type="text"
          name="detail"
          placeholder="detail"
          onChange={(e) => handleChange(e)}
        />
        <br />

        <input type="file" name="file" onChange={(e) => handleChange(e)} />
        <br />

        <input
          type="text"
          name="price"
          placeholder="price"
          onChange={(e) => handleChange(e)}
        />

        <button>Submit</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">detail</th>
            <th scope="col">file</th>
            <th scope="col">price</th>
            <th scope="col">action</th>
            <th scope="col">edit</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.detail}</td>
                  <td>{item.file}</td>
                  <td>{item.price}</td>
                  <td onClick={() => handleRemove(item._id)}>delete</td>
                  <td>
                    <Link to={"/edit/" + item._id}>edit</Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default FormProduct;
