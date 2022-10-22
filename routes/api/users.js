const express = require("express");

const router = express.Router();

const {
  registerController,
  loginController,
  currentUserController,
  logoutController,
  subscriptionController,
  avatarController,
  verifyController,
  reVerifyController,
} = require("../../controllers/usersController"); // Валидации Joi

const {
  regLogValidation,
  subscriptionValidation,
} = require("../../middlewares/userValidation");
const { authenticate } = require("../../middlewares/authenticate");
const ctrlWrapper = require("../../helpers/сtrlWrapper");
const upload = require("../../middlewares/upload");

router.post("/signup", regLogValidation, ctrlWrapper(registerController)); // Роут для регистрации юзера
router.get("/verify/:verificationToken", ctrlWrapper(verifyController)); // Роут для верификации юзера
router.post("/verify/", ctrlWrapper(reVerifyController)); // Роут повторной отправки для верификации юзера
router.post("/login", regLogValidation, ctrlWrapper(loginController)); // Роут для входа юзера
router.get("/logout", authenticate, ctrlWrapper(logoutController)); // Роут для выхода юзера
router.get(
  "/current",
  authenticate,
  regLogValidation,
  ctrlWrapper(currentUserController)
); // Роут для текущего юзера
router.patch(
  "/subscription",
  authenticate,
  subscriptionValidation,
  ctrlWrapper(subscriptionController)
); // Роут для обновления статуса
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(avatarController)
); // Обновление аватара

module.exports = router;
