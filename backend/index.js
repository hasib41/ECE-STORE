
const express = require("express");
require('dotenv').config(); // Move this to the top before other imports
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT || 5005;

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177', 'http://localhost:5178', 'http://localhost:5179', 'http://localhost:5180', 'http://localhost:5181'],
    credentials: true
}));

// Serve static files from the uploads directory
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// routes
const merchandiseRoutes = require('./src/merchandises/merchandise.route');
const orderRoutes = require("./src/orders/order.route");
const userRoutes =  require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");
const imageRoutes = require("./src/merchandises/image.route");

app.use("/api/merchandises", merchandiseRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/images", imageRoutes);
app.use(express.json());
// MongoDB Connection
console.log("Starting server...");
console.log("Environment:", process.env.NODE_ENV || 'development');
console.log("Port:", port);
console.log("MongoDB URL:", process.env.DB_URL);

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('MongoDB Connected Successfully!');
    // Start the server only after successful database connection
    app.listen(port, () => {
      console.log(`Backend server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  });

// Basic route to test server
app.get("/", (req, res) => {
    res.send("ECE Store Server is running!");
});