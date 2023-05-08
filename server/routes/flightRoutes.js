const express = require("express");
const flightController = require("../controllers/flightController");
const userController = require("../controllers/userController.js");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);

// router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe);
router.get("/", flightController.getfilterflight);

router.use(authController.restrictTo("admin"));
router.post("/update/:id", flightController.updateflight);
router.get("/:id", flightController.getoneflight);
router.post("/add", flightController.addflight);
router.delete("/:id", flightController.deleteflight);

module.exports = router;
