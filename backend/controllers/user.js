// controllers user.js
const User = require("../models/User");
const { validateEmail, validateLength } = require("../helpers/validation");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    // Extract data from request body
    const { username, email, password } = req.body;

    // Check if email is correct
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check if email is not duplicate
    const check = await User.findOne({ email });

    if (check) {
      return res
        .status(400)
        .json({ message: "Email address already registered" });
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
    console.log(cryptedPassword);

    return;

    // Create and save the data to a new User Object - Save in DB
    const user = await new User({ username, email, password }).save();
    // return the user that is being saved
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
