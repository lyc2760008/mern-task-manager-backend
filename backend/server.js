const { response } = require("express");
const express = require("express");
const dotenv = require("dotenv").config();
//const connectDB = require("./config/connetDB");
const mongoose = require("mongoose");
const Task = require("./Models/taskModel");
const cors = require("cors");

const taskRoutes = require("./Routes/taskRoute");

const app = express();

const PORT = process.env.PORT || 3001;

mongoose
  .set("strictQuery", false) //get rid of strictQuery error
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://mern-task-app.onrender.com"],
  })
);
app.use("/api/v1/tasks", taskRoutes);

/*code block below is explaining what is middel ware*/
/*const logger = (req, res, next) => {
  console.log("this is middelware");
  next();
};*/

//routes

app.get("/", (req, res) => {
  res.send("<h1>Welcome!!</h1>");
});
