const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  try {
    let tmp = req.header("Authorization");
    // Slice the token to remove the "Bearer " part and only leave the token part
    const token = tmp ? tmp.slice(7, tmp.length) : "";
    // If no token
    if (!token) {
      return res.status(400).json({ message: "Invalid Authentication" });
    }
    // If token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Authentication" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
