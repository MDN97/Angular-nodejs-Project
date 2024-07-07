const express = require("express");
const router = express.Router();
const {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");
const auth = require("../middleware/authMiddleware");

router.get("/", getReservations);
router.get("/:id", getReservation);
router.post("/", createReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);

module.exports = router;
