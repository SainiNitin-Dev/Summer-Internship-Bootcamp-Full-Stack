const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
app.get("/", (req, res) => {
  res.send("Employee Management API Running");
});



mongoose
  .connect(
    "mongodb+srv://Nitin:g8TjUDMneu6jOH3h@bootcampcluster.rljrjmc.mongodb.net/",
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
