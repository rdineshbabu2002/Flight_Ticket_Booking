const express = require("express");
const userController = require("../controllers/userController.js");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
// router.get("/", userController.getUser);
// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

// router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe);

router.use(authController.restrictTo("admin"));

router.route("/").get(userController.getUser);
// .post(userController.createUser);

// router
//   .route("/:id")
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
