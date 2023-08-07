// controllers user.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validateEmail, validateLength } = require("../helpers/validation");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");

// Register the user
exports.register = async (req, res) => {
  console.log("Request Body:", req.body); // This will print the request body to the console
  try {
    // Extract data from request body
    const { email, password } = req.body; // Removed username

    // Check if email is correct
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check if email is not duplicate
    const check_email = await User.findOne({ email });
    console.log("Checking email duplication:", check_email);

    if (check_email) {
      return res.status(400).json({
        message: "Email address already registered, please pick a new one",
      });
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
      email,
      password: cryptedPassword,
    }).save(); // Removed username

    // Send verification email to user
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30min"
    );

    // The user will be directed to this page, where we will do the verification
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      token: token,
      verified: user.verified,
      message: "Register Success ! please activate your email to start",
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: error.message });
  }
};

// Activate the account
exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(user);
    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "This email is already verified" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has been activated successfully." });
    }
  } catch (error) {
    console.error("Error in activation:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message:
          "The email address you entered is not connected to and account.",
      });
    }
    // If user exists then check password
    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials, please try again.",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      token: token,
      verified: user.verified,
      message: "Register Success ! please activate your email to start",
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: error.message });
  }
};
