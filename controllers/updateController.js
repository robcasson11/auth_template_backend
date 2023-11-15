const asyncHandler = require("express-async-handler");
const User = require("../model/user");

const updateUser = async (req, res) => {
  const { _id, username, roles } = req.body;

  const user = await User.findOne({ _id }).exec();

  if (!user) {
    return res.status(204).json(`No user matches ${_id}.`);
  }
  if (username) user.username = username;
  if (roles) user.roles = roles;

  const result = await user.save();
  res.json({ result });
};

module.exports = { updateUser };
