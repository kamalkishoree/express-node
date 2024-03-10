const JWT = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  //Extract token
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: "token not found" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Unauthorizeed" });
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Invslid request" });
  }
};

const generateToken = (userData) => {
  return JWT.sign(userData, process.env.JWT_SECRET, { expiresIn: 2276 });
};

module.exports = { jwtAuthMiddleware, generateToken };
