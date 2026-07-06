import jwt from "jsonwebtoken";
import User from "../../models/User/UserModel.js";
import bcrypt from "bcrypt";
import { getCookieOptions } from "../../utils/cookieOptions.js";

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "email & password must required",
      });
    }

    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!strictEmailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existedUser = await User.findOne({ email });

    if (!existedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (existedUser) {
      const comparedPass = await bcrypt.compare(password, existedUser.password);

      if (!comparedPass) {
        return res.status(400).json({
          message: "Wrong password",
        });
      }

      const token = jwt.sign(
        { id: existedUser._id, role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      res.cookie("token", token, getCookieOptions());

      return res.status(200).json({
        message: "Logged in successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
};

export default LoginUser;
