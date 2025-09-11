import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoute from './routes/Auth.routes.js'

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// ✅ Setup CORS properly
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               // cookies allow karne ke liye
  })
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/auth', AuthRoute);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_CONN, { dbName: "dev-blog" })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Global error handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
