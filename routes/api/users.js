const express = require("express");

const router = express.Router();

const {
  registerController,
  loginController,
  currentUserController,
} = require("../../controllers/usersController"); // Валидации Joi

const { regLogValidation } = require("../../middlewares/userValidation");
const { authenticate } = require("../../middlewares/authenticate");
const ctrlWrapper = require("../../helpers/сtrlWrapper");

router.post("/signup", regLogValidation, ctrlWrapper(registerController)); // Роут для регистрации юзера
router.post("/login", regLogValidation, ctrlWrapper(loginController)); // Роут для входа юзера
router.get(
  "/current",
  authenticate,
  regLogValidation,
  ctrlWrapper(currentUserController)
); // Роут для текущего юзера

module.exports = router;
