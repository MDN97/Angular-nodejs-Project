const Reservation = require("../models/Reservation");

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const { user, meetingRoom, startTime, endTime } = req.body;

    // Check if all required fields are present
    if (!user || !meetingRoom || !startTime || !endTime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check for existing reservation for the same meeting room and overlapping time
    const existingReservation = await Reservation.findOne({
      meetingRoom,
      $or: [
        { startTime: { $gte: startTime, $lt: endTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
      ],
    });

    if (existingReservation) {
      return res.status(400).json({ error: "Room already reserved" });
    }

    const reservation = new Reservation({
      user,
      meetingRoom,
      startTime,
      endTime,
    });

    await reservation.save();

    res.status(201).json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const { user, meetingRoom, startTime, endTime } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { user, meetingRoom, startTime, endTime },
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
