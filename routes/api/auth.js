const express = require("express");

const router = express.Router();

const ctrlWrapper = require("../../helpers/сtrlWrapper");

// singup

router.post("/login", ctrlWrapper());

module.exports = router;
