const express = require("express");

const router = express.Router();

const {
  registerController,
  loginController,
} = require("../../controllers/usersController"); // Валидации Joi

const { regLogValidation } = require("../../middlewares/userValidation");
const ctrlWrapper = require("../../helpers/сtrlWrapper");

router.post("/signup", regLogValidation, ctrlWrapper(registerController)); // singup
router.post("/login", regLogValidation, ctrlWrapper(loginController));
module.exports = router;
