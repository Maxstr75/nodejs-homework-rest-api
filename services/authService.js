const User = require("./userService");
const jwt = require("jsonwebtoken"); // Библиотека для создания токенов

const { SECRET_KEY } = process.env; // секрет для подписи токена

// Логин юзера
const login = async ({ email, password }) => {
  const user = await User.findUserByEmail(email);
  const isValidPassword = await user.validPassword(password);

  // Если юзер или пароль не валидные  или не верифицирован email- возвращаем null вместо токена
  if (!user || !isValidPassword || !user.verify) {
    return null;
  }
  // Если валидные - создаем, подписываем и возвращаем токен с временем жизни
  const payload = { id: user.id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.updateToken(user.id, token);
  return token;
};

// Выход юзера
const logout = async (id) => {
  const data = await User.updateToken(id, null);
  return data;
};

module.exports = {
  login,
  logout,
};
