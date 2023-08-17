"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();

// router.get("", (req, res, next) => {
//   return res.status(200).json({
//     message: "Welcome to course!",
//   });
// });

// check apiKey

router.use(apiKey);
router.use(permission("0000"));

// check permissions

router.use("/v1/api", require("./access"));

module.exports = router;
