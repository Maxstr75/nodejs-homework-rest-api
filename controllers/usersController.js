const { Conflict } = require("http-errors");
const {
  createUser,
  findUserByEmail,
  // findUserById,
} = require("../services/userService");

//  Регистрация юзера
const regController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) {
    throw new Conflict(`Email in use`);
    // return res.status(409).json({ message: "Email in use" });
  }

  const { email, subscription } = await createUser(req.body);
  res.status(201).json({ user: { email, subscription } });
};

module.exports = {
  regController,
};
