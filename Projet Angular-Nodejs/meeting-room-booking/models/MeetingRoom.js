const mongoose = require("mongoose");

const MeetingRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  equipments: [String],
  description: String,
});

module.exports = mongoose.model("MeetingRoom", MeetingRoomSchema);
