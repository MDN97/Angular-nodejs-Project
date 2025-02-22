const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  meetingRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MeetingRoom",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
