const { nanoid } = require("nanoid");
const User = require("../models/user");
const sendEmail  = require("./emailService");

// Создает нового юзера в базе
const createUser = async (body) => {
  const verificationToken = nanoid();
  const { email } = body;

  await sendEmail(verificationToken, email);

  const user = await new User({ ...body, verificationToken });
  return user.save();
};

// Верифицирует юзера
const verify = async (token) => {
  const user = await User.findOne({ verificationToken: token });

  if (user) {
    await user.updateOne({ verify: true, verificationToken: null });
    return true;
  }
};

// Находит юзера в базе по id
const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

// Находит юзера в базе по email
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  // console.log(user);
  return user;
};

// Обновляет токен юзера
const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token });
};

// Обновляет подписку юзера
const updateSubscription = async (id, subscription) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { subscription },
    { new: true }
  );
  return user;
};

// Обновляет аватар юзера
const updateAvatar = async (id, url) => {
  const { avatarURL } = await User.findOneAndUpdate(
    { _id: id },
    { avatarURL: url },
    { new: true }
  );
  return avatarURL;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateToken,
  updateSubscription,
  updateAvatar,
  verify,
};
