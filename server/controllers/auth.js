const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

exports.register = async (req, res) => {
  try {
    // 1.CheckUser : have user or not
    const { name, password } = req.body;

    let user = await User.findOne({ name });

    if (user) {
      return res.send("User Already Exists!!").status(400);
    }

    // 2.Encrypt เข้ารหัส password
    const salt = await bcrypt.genSalt(10);
    user = new User({
      name,
      password,
    });

    user.password = await bcrypt.hash(password, salt);

    // 3.save in db
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
          role: user.role,
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

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({
      // search name and role ว่ามีอยู่ในระบบไหม?
      name: req.user.name,
      role: req.user.role,
    })
      .select("-password") // ไม่ต้องการ password ให้ส่งมา ก็ select และใส่ ลบpassword
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
