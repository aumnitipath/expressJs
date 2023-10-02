const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"];

    if (!token) {
      return res.status(401).send("No token");
    }

    const decoded = jwt.verify(token, "jwtsecret");
    req.user = decoded.user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Token Invalid");
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    console.log(req.user.name);
    const userAdmin = await User.findOne({
      name: req.user.name,
    })
      .select("-password")
      .exec();
    if (userAdmin.role !== "admin") {
      res.status(403).send("Admin access Denied!!");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(403).send("Admin access Denied!!!");
  }
};
