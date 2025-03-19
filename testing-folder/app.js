// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/routes"); // Import the routes file

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/sessionLogs", {}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Failed to connect to MongoDB", err);
});

// Use routes defined in routes.js
app.use("/api", routes); // All routes will be prefixed with /api

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

