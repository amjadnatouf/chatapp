const Message = require("./messageSchema");

// Create a new Message
exports.createNewMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get messages
exports.getMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      chatId: req.params.chatId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
