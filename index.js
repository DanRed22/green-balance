import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();

// Middleware to parse JSON bodies
app.use(express.json());

// Define port
const PORT = process.env.PORT || 3000;

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Green Balance API" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
