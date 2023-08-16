const express = require("express");
const app = express();
const cors = require("cors");

// IMPORTS
const userController = require("./controllers/userController");
const chatController = require("./controllers/chatController");
const messagesController = require("./controllers/messagesController");
const globalUsersController = require("./controllers/globalUsersController");

// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CONTROLLERS
app.use("/api/users", userController);
app.use("/api", chatController);
app.use("/api", messagesController);
app.use("/api", globalUsersController);

module.exports = app;
