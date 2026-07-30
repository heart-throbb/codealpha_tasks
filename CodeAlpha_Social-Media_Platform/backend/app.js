const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({
    message: "Social Media API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message:
        err.code === "LIMIT_FILE_SIZE"
          ? "File too large (max 5MB)"
          : err.message,
    });
  }
  if (err.message === "Only image files are allowed") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  res.status(500).json({
    success: false,
    message: "Server Error",
  });
});

module.exports = app;
