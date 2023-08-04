// routes user.js

const express = require("express");
const { register } = require("../controllers/user");

const router = express.Router();

//Route to register user
router.post("/register", register);

module.exports = router;
