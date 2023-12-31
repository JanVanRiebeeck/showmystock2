// controllers user.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validateEmail, validateLength } = require("../helpers/validation");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const {
  sendVerificationEmail,
  sendVerificationCode,
} = require("../helpers/mailer");
const Code = require("../models/Code");
const generateCode = require("../helpers/generateCode");

// Register the user
exports.register = async (req, res) => {
  console.log("Request Body:", req.body); // This will print the request body to the console
  try {
    // Extract data from request body
    const { email, password, accountType, companyName, firstName, lastName } =
      req.body;

    // Set picture based on account type
    let picture;
    if (accountType === "personal") {
      picture =
        "https://res.cloudinary.com/dw3k5fe80/image/upload/v1692706052/icons8-user-100_vqhvz3.png";
    } else if (accountType === "company") {
      picture =
        "https://res.cloudinary.com/dw3k5fe80/image/upload/v1692706052/icons8-company-100_ufymer.png";
    } else {
      return res.status(400).json({ message: "Invalid account type" });
    }

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

    // Validate and store company name for company accounts
    let details;
    if (accountType === "company") {
      if (!companyName) {
        return res.status(400).json({ message: "Company name is required" });
      }
      details = { accountType, companyName };
    } else if (accountType === "personal") {
      if (!firstName || !lastName) {
        return res
          .status(400)
          .json({ message: "First name and last name are required" });
      }
      details = { accountType, firstName, lastName };
    } else {
      return res.status(400).json({ message: "Invalid account type" });
    }

    // encrypt password with bcrypt -hash it and salt 12
    const cryptedPassword = await bcrypt.hash(password, 12);

    // Create and save the data to a new User Object - Save in DB
    const user = await new User({
      email,
      password: cryptedPassword,
      details,
      picture,
    }).save();

    // Send verification email to user
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "3d"
    );

    // The user will be directed to this page, where we will do the verification
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      token: token,
      verified: user.verified,
      picture: user.picture,
      message: "Register Success ! please activate your email to start",
      details,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: error.message });
  }
};

// Activate the account
exports.activateAccount = async (req, res) => {
  try {
    // Make sure the request comes from the actual user
    const validUser = req.user.id;
    const { token } = req.body;

    const user = jwt.verify(token, process.env.TOKEN_SECRET);

    const check = await User.findById(user.id);

    if (validUser !== user.id) {
      return res.status(400).json({
        message: "You don't have the authorization to complete this operation",
      });
    }
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
    res.status(500).json({ message: error.message });
  }
};
// Login the user
exports.login = async (req, res) => {
  try {
    // Extract data from request body
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

    // If password is correct then we generate a token for the login (same as register)
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      token: token,
      verified: user.verified,
      picture: user.picture,
      message: "Login Success !",
      details: user.details,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: error.message });
  }
};
// Send verification email to user
exports.sendVerification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.verified === true) {
      return res
        .status(400)
        .json({ message: "This account is already activated" });
    }
    // Send verification email to user
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "3d"
    );

    // The user will be directed to this page, where we will do the verification
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, url);
    return res
      .status(200)
      .json({ message: "Email verification link has been sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Find user email addresses on db
exports.findUser = async (req, res) => {
  try {
    // get the email address from the body
    const { email } = req.body;
    // look for the email address in DB
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(400).json({ message: "Account does not exist" });
    }
    return res.status(200).json({
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Send the reset password code to user
exports.sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    await Code.findOneAndRemove({ user: user._id });
    const code = generateCode(5);
    const savedCode = await new Code({
      code,
      user: user._id,
    }).save();
    sendVerificationCode(user.email, code);
    return res.status(200).json({
      message: "Email reset code has been sent to your email address",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Validate the reset code to the one sent to user email
exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const db_code = await Code.findOne({ user: user._id });

    if (db_code.code !== code) {
      return res.status(400).json({ message: "Verification code is wrong" });
    }
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Let user change password
exports.changePassword = async (req, res) => {
  const { email, password } = req.body;

  const cryptedPassword = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate({ email }, { password: cryptedPassword });
  return res.status(200).json({ message: "Password changed" });
};
