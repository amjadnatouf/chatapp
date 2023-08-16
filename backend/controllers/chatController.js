const router = require("express").Router();
const chatController = require("../models/chat/chatModel");

router.post("/chat", chatController.createNewChat);

router.get("/chat/:userId", chatController.getChatForUser);

module.exports = router;
