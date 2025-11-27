import jwt from "jsonwebtoken";
import Admin from "../models/Admin/AdminModel.js";

const UserAuth = async (req, res, next) => {
  const { token } = req.cookie;

  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decode.id);
    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
      error: err.message,
    });
  }
};

export default UserAuth;
