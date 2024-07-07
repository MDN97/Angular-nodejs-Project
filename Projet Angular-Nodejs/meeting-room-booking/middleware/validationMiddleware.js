const { check, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createMeetingRoom": {
      return [
        check("name", "Name is required").not().isEmpty(),
        check("capacity", "Capacity is required").isInt(),
        check("equipments", "Equipments should be an array").isArray(),
        check("description", "Description is required").not().isEmpty(),
      ];
    }
    case "createReservation": {
      return [
        check("meetingRoomId", "Meeting room ID is required").not().isEmpty(),
        check("startTime", "Start time is required").isISO8601(),
        check("endTime", "End time is required").isISO8601(),
      ];
    }
  }
};

exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
