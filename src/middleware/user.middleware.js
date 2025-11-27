import jwt from "jsonwebtoken";
import User from "../models/User/UserModel.js";

const UserAuth = async (req, res, next) => {
  const { token } = req.cookie;

  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
      error: err.message,
    });
  }
};

export default UserAuth;
