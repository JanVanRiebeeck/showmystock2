// routes user.js

const express = require("express");
const {
  register,
  activateAccount,
  login,
  auth,
  sendVerification,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
} = require("../controllers/user");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

//Route to register user
router.post("/register", register);

// Route to activate the account
router.post("/activate", authUser, activateAccount);

// Route to login user
router.post("/login", login);

// Route to resend the verification to user email
router.post("/sendVerification", authUser, sendVerification);

// Route for user to search email address when forgot password
router.post("/findUser", findUser);

//Route to send the verification code to user email
router.post("/sendResetPasswordCode", sendResetPasswordCode);

// Route to check verification codes correct
router.post("/validateResetCode", validateResetCode);

// Route to change user password
router.post("/changePassword", changePassword);

module.exports = router;
