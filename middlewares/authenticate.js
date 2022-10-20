/*
1. Извлекает заголовок Authorization из req.headers.
2. Разделяет заголовок на 2 слова.
3. Если первое слово !== "Bearer" - выбрасывает 401 ошибку.
4. Проверить что токен валиден. Если нет - выбросить 401 ошибку.
5. Ищем в базе пользователя с таким id. Если нет - выбрасываем 401 ошибку.
*/
const jwt = require("jsonwebtoken"); // Библиотека для создания токенов

const User = require("../services/userService");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      return res.status(401).json({ message: "Not authorized" });
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findUserById(id);
    if (!user || !user.token || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = {
  authenticate,
};
