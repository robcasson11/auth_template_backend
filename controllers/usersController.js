const User = require("../model/user");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.sendStatus(204).json({ message: "No users found" });
  res.json(users);
};

const handleNewUser = async (req, res) => {
  const { user, roles, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and Password are required" });
  }
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409);

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const result = await User.create({
      username: user,
      roles: roles,
      password: hashedPwd,
    });

    res.status(201).json({ success: `New user ${user} created` });
  } catch {
    res.status(500).json({ message: error.message });
  }
};

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

const deleteUser = async (req, res) => {
  const { _id } = req.body;

  const user = await User.findOne({ _id }).exec();

  if (!user) {
    return res.status(204).json(`No user matches ${_id}.`);
  }

  const result = await User.deleteOne({ _id: user._id });
  res.json({ result });
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "ID required." });

  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.params.id}.` });
  }
  res.json(user);
};

module.exports = {
  getAllUsers,
  handleNewUser,
  updateUser,
  deleteUser,
  getUser,
};
