// const { Conflict } = require("http-errors");
const { login, logout } = require("../services/authService");
const {
  createUser,
  findUserByEmail,
  findUserById,
  updateSubscription,
} = require("../services/userService");

//  Регистрация юзера
const registerController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) {
    // throw new Conflict(`Email in use`);
    return res.status(409).json({ message: "Email in use" });
  }

  const { email, subscription } = await createUser(req.body);
  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

// Вход юзера
const loginController = async (req, res) => {
  const token = await login(req.body);

  if (token) {
    const { email, subscription } = await findUserByEmail(req.body.email);
    res.status(200).json({
      token,
      user: {
        email,
        subscription,
      },
    });
  }
  res.status(401).json({
    message: "Email or password is wrong",
  });
};

// Текущий юзер
const currentUserController = async (req, res) => {
  const currentUser = await findUserById(req.user.id);

  if (currentUser) {
    const { email, subscription } = currentUser;
    res.status(200).json({ email, subscription });
  }
};

// Выход юзера
const logoutController = async (req, res) => {
  await logout(req.user.id);
  res.status(204).json({ message: "No Content" });
};

// Обновление подписки юзера
const subscriptionController = async (req, res) => {
  const result = await updateSubscription(req.user.id, req.body.subscription);

  if (result) {
    const { email, subscription } = result;
    res.status(200).json({ user: { email, subscription }, status: "updated" });
  }
};

module.exports = {
  registerController,
  loginController,
  currentUserController,
  logoutController,
  subscriptionController,
};
