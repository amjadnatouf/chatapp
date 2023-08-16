const router = require("express").Router();
const userModel = require("../models/users/userModel");
const gUserModel = require("../models/global/gUsersModel");

// Register a new user
router.post("/register", userModel.registerUser);

// Login a user
router.post("/login", userModel.loginUserWithEmailAndPassword);

// Get user data
router.get("/:id", userModel.findUser);

// Update user data
router.put("/:id", userModel.updateUser);

// Delet user data
router.delete("/:id", userModel.deleteUser);

module.exports = router;
