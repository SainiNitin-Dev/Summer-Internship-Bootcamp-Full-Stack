// const math = require("./math");
// console.log(math,"math");

// console.log(math.add(5,3));
// console.log(math.subtract(8,3));

const express = require("express");
const app = express();

// Homepage Route
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to Home Page</h1><p>This is the homepage of our application</p>",
  );
});

// Contact Route
app.get("/contact", (req, res) => {
  res.send(
    "<h1>Contact Us</h1><p>Email: info@example.com</p><p>Phone: +1-800-000-0000</p>",
  );
});

// About Route
app.get("/about", (req, res) => {
  res.send("<h1>About Us</h1><p>This is the about page</p>");
});

app.listen(3000, () => {
  console.log("Server Is Running At Port 3000");
});
