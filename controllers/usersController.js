// const { Conflict } = require("http-errors");

const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const { login, logout } = require("../services/authService");
const {
  createUser,
  findUserByEmail,
  findUserById,
  updateSubscription,
  updateAvatar,
} = require("../services/userService");

//  Регистрация юзера
const registerController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) {
    // throw new Conflict(`Email in use`);
    return res.status(409).json({ message: "Email in use" });
  }

  const { email, subscription, avatarURL } = await createUser(req.body);
  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

// Вход юзера
const loginController = async (req, res) => {
  const token = await login(req.body);

  if (token) {
    const { email, subscription, avatarURL } = await findUserByEmail(
      req.body.email
    );
    res.status(200).json({
      token,
      user: {
        email,
        subscription,
        avatarURL,
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
    const { email, subscription, avatarURL } = currentUser;
    res.status(200).json({ email, subscription, avatarURL });
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
// Контроллер аватара юзера
const avatarController = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const avatarName = `${id}_${originalname}`;
  await Jimp.read(tempUpload)
    .then((image) => {
      return image
        .autocrop() // автообрезка
        .cover(
          // режим выравнивания
          250,
          250,
          Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE // Располагает ось x в центре изображения || Располагает ось Y в центре изображения
        )
        .quality(60) // качество изображения 0-100
        .writeAsync(tempUpload); // сохранить
    })
    .catch((error) => {
      console.log(error);
    }); // Обработка исключения.
  try {
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    const newAvatarUrl = path.join("public", "avatars", avatarName);
    const url = await updateAvatar(req.user.id, newAvatarUrl);
    return res.status(200).json({ avatarURL: url });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = {
  registerController,
  loginController,
  currentUserController,
  logoutController,
  subscriptionController,
  avatarController,
};
