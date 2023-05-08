const User = require("./../models/user");
const AppError = require("./../utils/appError");

exports.getAllUser = async (req, res) => {
  const result = await User.find();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({ data: "user Not Found" });
  }
};

exports.getUser = async (req, res) => {
  const response = await User.find({});
  res.status(200).json({ data: response });
};

exports.getMe = async (req, res) => {
  res.status(200).json({ data: req.user });
};
