const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/product-db");
    console.log("Db Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
