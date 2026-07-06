import Admin from "../../models/Admin/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getCookieOptions } from "../../utils/cookieOptions.js";

const CreateAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "username , email , password required",
      });
    }

    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!strictEmailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const AdminExists = await Admin.findOne({ email });
    if (AdminExists) {
      return res.status(409).json({
        message: "Admin already registered",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const createdAdmin = await Admin.create({
      username,
      email,
      password: hashedPass,
    });

    const token = jwt.sign(
      { id: createdAdmin._id, role: "Admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, getCookieOptions());

    return res.status(201).json({
      message: "Admin registered successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Admin Registration failed",
    });
  }
};

export default CreateAdmin;
