import jwt from "jsonwebtoken";
import Admin from "../../models/Admin/AdminModel.js";
import bcrypt from "bcrypt";

const LoginAdmin = async (req, res) => {
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

    const existedAdmin = await Admin.findOne({ email });

    if (!existedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (existedAdmin) {
      const comparedPass = await bcrypt.compare(
        password,
        existedAdmin.password
      );

      if (!comparedPass) {
        return res.status(400).json({
          message: "Wrong password",
        });
      }

      const token = jwt.sign(
        { id: existedAdmin._id, role: "Admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

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

export default LoginAdmin;
