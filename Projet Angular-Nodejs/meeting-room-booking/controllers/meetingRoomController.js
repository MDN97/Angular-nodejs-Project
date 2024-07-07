const MeetingRoom = require("../models/MeetingRoom");

exports.getMeetingRooms = async (req, res) => {
  try {
    const meetingRooms = await MeetingRoom.find();
    res.json(meetingRooms);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMeetingRoom = async (req, res) => {
  try {
    const meetingRoom = await MeetingRoom.findById(req.params.id);
    if (!meetingRoom) {
      return res.status(404).json({ error: "Meeting room not found" });
    }
    res.json(meetingRoom);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.createMeetingRoom = async (req, res) => {
  const { name, capacity, equipments, description } = req.body;
  try {
    let meetingRoom = new MeetingRoom({
      name,
      capacity,
      equipments,
      description,
    });
    await meetingRoom.save();
    res.json(meetingRoom);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateMeetingRoom = async (req, res) => {
  const { name, capacity, equipments, description } = req.body;
  try {
    let meetingRoom = await MeetingRoom.findById(req.params.id);
    if (!meetingRoom) {
      return res.status(404).json({ error: "Meeting room not found" });
    }
    meetingRoom.name = name || meetingRoom.name;
    meetingRoom.capacity = capacity || meetingRoom.capacity;
    meetingRoom.equipments = equipments || meetingRoom.equipments;
    meetingRoom.description = description || meetingRoom.description;
    await meetingRoom.save();
    res.json(meetingRoom);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteMeetingRoom = async (req, res) => {
  try {
    let meetingRoom = await MeetingRoom.findById(req.params.id);
    if (!meetingRoom) {
      return res.status(404).json({ error: "Meeting room not found" });
    }
    await meetingRoom.remove();
    res.json({ message: "Meeting room removed" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
