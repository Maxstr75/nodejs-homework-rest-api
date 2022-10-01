const express = require("express");

const router = express.Router();

const { regController } = require("../../controllers/usersController");

const ctrlWrapper = require("../../helpers/сtrlWrapper");

// singup

router.post("/login", ctrlWrapper(regController));

module.exports = router;
