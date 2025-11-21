const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const generatorRoutes = require("./routes/generator");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:4000"], 
    methods: ["GET", "POST"],
  })
);

// API routes
app.use("/api", generatorRoutes);

// Static files (embed.js, widget.html, etc.)
app.use(express.static(path.join(__dirname, "..", "public")));

// Simple widget endpoint (iframe content)
app.get("/chat", (req, res) => {
  const sdn = req.query.sdn || "unknown";
  res.sendFile(path.join(__dirname, "..", "public", "widget.html"));
});

// Basic health check
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
