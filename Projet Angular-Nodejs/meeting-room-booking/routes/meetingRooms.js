const express = require("express");
const router = express.Router();
const {
  getMeetingRooms,
  getMeetingRoom,
  createMeetingRoom,
  updateMeetingRoom,
  deleteMeetingRoom,
} = require("../controllers/meetingRoomController");
const auth = require("../middleware/authMiddleware");
const {
  validate,
  checkValidation,
} = require("../middleware/validationMiddleware");

router.get("/", getMeetingRooms);
router.get("/:id", getMeetingRoom);
router.post(
  "/",
  validate("createMeetingRoom"),
  checkValidation,
  createMeetingRoom
);
router.put(
  "/:id",
  validate("createMeetingRoom"),
  checkValidation,
  updateMeetingRoom
);
router.delete("/:id", deleteMeetingRoom);

module.exports = router;
