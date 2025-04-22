const express = require("express");
const app = express();

const { connectToDB } = require("./db/db.connect");

const Course = require("./models/course.model");

connectToDB();
app.use(express.json());

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json("Course Database! Browse your favorite course");
});

app.listen(process.env.PORT, () => {
  console.log(`PORT ${process.env.PORT} is running`);
});
