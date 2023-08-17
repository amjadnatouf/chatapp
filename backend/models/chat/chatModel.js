const Chat = require("./chatSchema");
const User = require("../users/userSchema");

exports.createNewChat = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    let receiver;

    if (req.body.receiverId) {
      receiver = await User.findById(req.body.receiverId);
    } else if (req.body.receiverEmail) {
      receiver = await User.findOne({ email: req.body.receiverEmail });
    } else if (req.body.receiverUsername) {
      receiver = await User.findOne({ username: req.body.receiverUsername });
    } else {
      return res.status(400).json({ message: "Receiver information missing." });
    }

    const sender = await User.findById(senderId);

    if (!receiver) {
      return res.status(201).json({ message: "Receiver not found." });
    }

    // Check if a chat already exists between the two users
    const existingChat = await Chat.findOne({
      members: { $all: [sender._id.toString(), receiver._id.toString()] },
    });

    if (existingChat) {
      return res
        .status(201)
        .json({ message: "Chat already exists!", chat: existingChat });
    }

    const m = [sender._id.toString(), receiver._id.toString()];

    // Create a new chat
    const newChat = new Chat({ members: m });

    const savedChat = await newChat.save();

    res.status(200).json(savedChat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get chat of a user
exports.getChatForUser = async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
};
