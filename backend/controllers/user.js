// controllers user.js
const User = require("../models/User");
const { validateEmail, validateLength } = require("../helpers/validation");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");

exports.register = async (req, res) => {
  try {
    // Extract data from request body
    const { username, email, password } = req.body;

    // Check if email is correct
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check if email is not duplicate
    const check_email = await User.findOne({ email });

    if (check_email) {
      return res.status(400).json({
        message: "Email address already registered, please pick a new one",
      });
    }

    // check if username is not a duplicate
    const check_username = await User.findOne({ username });

    if (check_username) {
      return res.status(400).json({
        message: "Username already registered, please pick a new one",
      });
    }

    // Check if username is between 3 and 30 characters
    if (!validateLength(username, 3, 30)) {
      return res
        .status(400)
        .json({ message: "Username must be between 3 and 30 characters" });
    }
    // Check if password is between 6 and 30 characters
    if (!validateLength(password, 6, 30)) {
      return res
        .status(400)
        .json({ message: "Password must be between 6 and 30 characters" });
    }

    // encrypt password with bcrypt -hash it and salt 12
    const cryptedPassword = await bcrypt.hash(password, 12);

    // Create and save the data to a new User Object - Save in DB
    const user = await new User({
      username,
      email,
      password: cryptedPassword,
    }).save();

    // Send verification email to user
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30min"
    );
    console.log(emailVerificationToken);
    // return the user that is being saved
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
