const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    // 1.CheckUser

    const { name, password } = req.body;

    let user = await User.findOne({ name });

    if (user) {
      return res.send("User Already Exists!!").status(400);
    }

    // 2.Encrypt
    const salt = await bcrypt.genSalt(10);
    user = new User({
      name,
      password,
    });

    user.password = await bcrypt.hash(password, salt);

    // 3.save
    await user.save();
    res.send("Register Success");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  try {
    res.send("Hello Login Controller");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
