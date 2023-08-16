const router = require("express").Router();
const messagesController = require("../models/message/messageModel");

router.post("/message", messagesController.createNewMessage);

router.get("/message/:chatId", messagesController.getMessage);

module.exports = router;
