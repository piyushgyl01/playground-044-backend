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

// async function insertData(data) {
//   try {
//     const savedData = await Course.insertMany(data);
//     console.log(savedData);
//   } catch (error) {
//     console.log(error);
//   }
// }

// insertData(mockCourseData)

app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.post("/courses", async (req, res) => {
  const { name, description, teacher } = req.body;

  if (!name || !description || !teacher) {
    return res
      .status(404)
      .json({ message: "Please fill in all required fields" });
  }

  try {
    const newCourse = new Course({ name, description, teacher });
    const savedCourse = await newCourse.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.put("/courses/:id", async (req, res) => {
  try {
    const editedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!editedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(editedCourse);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`PORT ${process.env.PORT} is running`);
});
