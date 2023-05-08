const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");

// GET all flight bookings

router.get("/", bookingController.getallbooking);

// GET a flight booking by ID
router.get("/mybooking", authController.protect, bookingController.mybooking);
router.get("/:id", bookingController.getbooking);

// POST a new flight booking
router.post("/", bookingController.addbooking);
// PUT (update) a flight booking by ID
router.post("/:id", bookingController.updatebooking);

// DELETE a flight booking by ID
router.delete("/:id", bookingController.deletebooking);

module.exports = router;
