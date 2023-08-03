// routes user.js

const express = require("express");
const { home } = require("../controllers/user");

const router = express.Router();

// User controller home (in controllers user.js)
router.get("/user", home);

module.exports = router;
