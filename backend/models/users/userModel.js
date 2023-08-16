const User = require("./userSchema");
const bcrypt = require("bcrypt");
const auth = require("../../authentication/auth");
const globalUsers = require("../global/gUsersSchema");

exports.registerUser = async (req, res) => {
  try {
    const userExists = await User.exists({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        message: "The email address is already taken",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      passwordHash: hash,
    });

    await globalUsers.create({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    });

    res.status(201).json({
      message: "User was created successfully",
      token: auth.generateToken(newUser),
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create user",
      err,
    });
  }
};

// Login a user

exports.loginUserWithEmailAndPassword = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        message: "You made a bad request",
        err,
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong when decrypting the password",
          err,
        });
      }

      if (!result) {
        return res.status(401).json({
          message: "Incorrect credentials",
        });
      }

      res.status(200).json({
        message: "Authentication was successful",
        token: auth.generateToken(user),
      });
    });
  });
};

exports.findUser = (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({
        message: "You made a bad request",
        err,
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }
    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json({
      message: "User exist",
      user: other,
    });
  });
};

//update user
exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
};
