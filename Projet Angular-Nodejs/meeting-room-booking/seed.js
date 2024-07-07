const User = require("./models/User");
const MeetingRoom = require("./models/MeetingRoom");
const Reservation = require("./models/Reservation");

const user = new User({
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
});
user.save();

const meetingRoom = new MeetingRoom({
  name: "Conference Room 1",
  capacity: 10,
  equipments: ["Projector", "Whiteboard"],
  description: "A spacious conference room with modern amenities.",
});
meetingRoom.save();

const reservation = new Reservation({
  user: user._id,
  meetingRoom: meetingRoom._id,
  startTime: new Date("2024-07-01T09:00:00"),
  endTime: new Date("2024-07-01T11:00:00"),
});
reservation.save();
