const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // minlength: [6, "Password must be at least 6 characters long!!"],
    },
  },
  {
    timestamps: true,
  }
);

//hashing the password before saving
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//method to generate a token
userSchema.methods.generateAuthToken = function () {
  try {
    const payload = { _id: this._id };
    const secretKey = process.env.SECRET_KEY;
    const options = { expiresIn: "15m" };

    //generating a token
    const token = jwt.sign(payload, secretKey, options);
    return token;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to generate authentication token");
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
