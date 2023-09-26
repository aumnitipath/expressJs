const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    // 1.Check User password
    const { name, password } = req.body;
    let user = await User.findOneAndUpdate({ name }, { new: true });
    console.log(user);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Password Invalid!!");
      }

      // 2. Payload
      let payload = {
        user: {
          name: user.name,
        },
      };
      // 3. Generate Token
      jwt.sign(payload, "jwtsecret", { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
