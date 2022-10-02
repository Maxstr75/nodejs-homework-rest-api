const { User } = require("../models/user");

// Создает нового юзера в базе
const createUser = async (body) => {
  const user = await new User(body);
  return user.save();
};

// Находит юзера в базе по email
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
};
