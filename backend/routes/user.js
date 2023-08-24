// routes user.js

const express = require("express");
const {
  register,
  activateAccount,
  login,
  auth,
} = require("../controllers/user");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

//Route to register user
router.post("/register", register);

// Route to activate the account
router.post("/activate", activateAccount);

// Route to login user
router.post("/login", login);

module.exports = router;
