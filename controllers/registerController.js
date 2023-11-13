const User = require("../model/user");
const bcrypt = require("bcrypt");

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

    const result = await User.create({ username: user, password: hashedPwd });

    console.log(result);

    res.status(201).json({ success: `New user ${user} created` });
  } catch {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
