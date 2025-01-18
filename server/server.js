const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoute = require("./routes/userRoute.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

//parsing the JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/users", userRoute);

//for invalid route
app.use("/*", (req, res) => {
  console.error("No routes found");
  res.status(404).send("Routes not found!!");
});

//connect to the database
connectDB();

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server started in the port: ${port}`);
});
