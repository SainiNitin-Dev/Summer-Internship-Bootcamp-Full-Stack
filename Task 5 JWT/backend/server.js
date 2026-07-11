require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// --- Fail fast if critical env vars are missing ---
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "JWT_REFRESH_SECRET"];
const missing = requiredEnvVars.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(
    `Missing required environment variables: ${missing.join(", ")}`,
  );
  process.exit(1);
}

connectDB();

const app = express();

// --- Core middleware ---
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true, // required so the browser sends/receives the refreshToken cookie
  }),
);
app.use(express.json({ limit: "10kb" })); // small limit mitigates large-payload abuse
app.use(cookieParser());

// --- Routes ---
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is healthy" });
});

app.use("/api/auth", authRoutes);

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// --- Centralized error handler (catches anything passed to next(err)) ---
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
  );
});
