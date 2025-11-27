import User from "../../models/User/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const CreateUser = async (req, res) => {
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

    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(409).json({
        message: "User already registered",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      username,
      email,
      password: hashedPass,
    });

    const token = jwt.sign(
      { id: createdUser._id, role: "user" },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registertd successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "User Registration failed",
    });
  }
};

export default CreateUser;
