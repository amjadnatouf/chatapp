const globalUsers = require("./gUsersSchema");

exports.getGlobalUsers = (req, res) => {
  globalUsers.find({}, (error, result) => {
    if (error) {
      console.log(error);
    }
    if (result) {
      res.status(200).json({
        message: "Global users retrieved successfully",
        result,
      });
    }
  });
};
