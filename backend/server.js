const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const todoRouter = require("./routes/routes");
app.use(express.json());
app.use(cors());
app.use("/api", todoRouter);

const start = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("the serve is connected");
  app.listen(5000, () => {
    console.log("The server is running at port 5000");
  });
};

start();
