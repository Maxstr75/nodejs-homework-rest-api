const express = require("express");

const router = express.Router();

const {
  registerController,
  loginController,
  currentUserController,
} = require("../../controllers/usersController"); // Валидации Joi

const { regLogValidation } = require("../../middlewares/userValidation");
const ctrlWrapper = require("../../helpers/сtrlWrapper");

router.post("/signup", regLogValidation, ctrlWrapper(registerController)); // Роут для регистрации юзера
router.post("/login", regLogValidation, ctrlWrapper(loginController)); // Роут для входа юзера
router.get("/current", regLogValidation, ctrlWrapper(currentUserController));

module.exports = router;
