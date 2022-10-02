const express = require("express");

const router = express.Router();

const { regController } = require("../../controllers/usersController"); // Валидации Joi

const { regLogValidation } = require("../../middlewares/userValidation");
const ctrlWrapper = require("../../helpers/сtrlWrapper");

router.post("/signup", regLogValidation, ctrlWrapper(regController)); // singup

module.exports = router;
