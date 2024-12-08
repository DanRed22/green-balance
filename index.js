import express from "express";
import dotenv from "dotenv";
import v1Route from "./routes/v1.route.js";

const app = express();

dotenv.config();

// Middleware to parse JSON bodies
app.use(express.json());

// Define port
const PORT = process.env.PORT || 3000;

// Basic route
app.get("/", (req, res) => {
  res.json({
    success: true,
    error: false,
    message: "Welcome to Green Balance API",
  });
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    error: false,
    message: "Welcome to Green Balance API",
  });
});

app.use("/api/v1", v1Route);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
