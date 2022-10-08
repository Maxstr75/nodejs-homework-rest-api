const express = require("express");

const router = express.Router();

const {
  registerController,
  loginController,
  currentUserController,
  logoutController,
  subscriptionController,
} = require("../../controllers/usersController"); // Валидации Joi

const {
  regLogValidation,
  subscriptionValidation,
} = require("../../middlewares/userValidation");
const { authenticate } = require("../../middlewares/authenticate");
const ctrlWrapper = require("../../helpers/сtrlWrapper");

router.post("/signup", regLogValidation, ctrlWrapper(registerController)); // Роут для регистрации юзера
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

module.exports = router;
