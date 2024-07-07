const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors"); // Add CORS middleware
const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

dotenv.config();

connectDB();

const app = express();
app.use(cors(corsOptions));
// Body parser middleware
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/meetingRooms", require("./routes/meetingRooms"));
app.use("/api/reservations", require("./routes/reservations"));

app.get("/login", (req, res) => {
  res.json({ message: "Login endpoint" });
});

app.get("/register", (req, res) => {
  res.json({ message: "Register endpoint" });
});

app.get("/meetingRooms", (req, res) => {
  res.json({ message: "Meeting Rooms endpoint" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
