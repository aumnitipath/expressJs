const express = require("express");
const router = express.Router();
const {
  read,
  list,
  create,
  update,
  remove,
} = require("../controllers/product");
const { upload } = require("../middleware/upload");

//middleware
const { auth } = require("../middleware/auth");

// router.get("/product", auth, list);
router.get("/product", auth, list);

// router.get("/product/:id", auth, read);
router.get("/product/:id", auth, read);

// router.post("/product", auth, create);
router.post("/product", auth, upload, create);

// router.put("/product/:id", auth, update);
router.put("/product/:id", auth, update);

// router.delete("/product/:id", auth, remove);
router.delete("/product/:id", auth, remove);

module.exports = router;
