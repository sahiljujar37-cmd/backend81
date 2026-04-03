const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  plan: String,
  date: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);

// API Route
app.post("/api/book", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: "Booking successful" });
  } catch (error) {
    res.status(500).json({ error: "Error saving booking" });
  }
});

app.get("/api/bookings", async (req, res) => {
  const data = await Booking.find();
  res.json(data);
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));