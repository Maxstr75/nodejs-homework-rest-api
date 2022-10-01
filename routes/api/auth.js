const express = require("express");

const router = express.Router();

const { regController } = require("../../controllers/usersController"); // Валидации Joi

const { regLogValidation } = require("../../middlewares/userValidation");
const ctrlWrapper = require("../../helpers/сtrlWrapper");

// singup

router.post("/login", regLogValidation, ctrlWrapper(regController));

module.exports = router;
