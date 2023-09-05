const express = require("express");
const { readdirSync } = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");

// const productRouters = require("./routes/product");
// const authRouters = require("./routes/auth");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({ limit: "10mb" }));

//Route 1
// app.get("/product", (req, res) => {
//   res.send("Hello");
// });

//Route 2
// app.use("/product", productRouters);
// app.use("/auth", authRouters);

//Route 3
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.listen(5000, () => {
  console.log(`Server is Running port 5000`);
});
