const express = require("express");
const route = express.Router();
const User = require("../model/userModel");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const authenticateToken = require("../middleware/authenticateToken");

route.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "success", data: users });
    if (!users) {
      res.status(404).json({ message: "No data found!" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const user = await User.findBy(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User found!", data: user });
  } catch (error) {
    if (error.name === "CastError") {
      // Handle invalid ObjectId error
      return res.status(400).json({ message: "Invalid user ID!" });
    }
    res.status(500).json({ message: error.message });
  }
});

route.post("/", async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;
    if (!name || !email || !password || !cpassword) {
      return res
        .status(400)
        .json({ message: "Please fill up the entier form!!" });
    }

    //password match
    if (password !== cpassword) {
      return res.status(400).json({ message: "Password do not match!" });
    }

    // Validate email with validator.js
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "Sucessfully Register!", data: user });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exits!!" });
    }
    res.status(500).json({ message: "Something went Wrong!!" });
  }
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //Input Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    //Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    //checking if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    //token generate
    const token = await user.generateAuthToken();

    //cookie generate
    res.cookie("usercookie", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, //15min in milliseconds
      // sameSite: "lax",
    });

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

route.get("/validate", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "UnAuthorize!!" });
  }
  res.status(200).json({ message: "hurray!!" });
  console.log(token);
});

module.exports = route;
