const User = require("./../models/user");
const AppError = require("./../utils/appError");

exports.getUser = async (req, res) => {
  const result = await User.find();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({ data: "user Not Found" });
  }
};
