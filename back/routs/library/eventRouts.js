const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/authMiddleware");

const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("./eventController");

router.post("/", protect, createEvent);
router.get("/", protect, getEvents); // only user books
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);
module.exports = router;
