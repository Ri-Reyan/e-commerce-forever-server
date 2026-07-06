import { getClearCookieOptions } from "../../utils/cookieOptions.js";

const LogoutAdmin = async (req, res) => {
  res.clearCookie("token", getClearCookieOptions());
  return res.status(200).json({
    message: "Logged out successfully",
  });
};

export default LogoutAdmin;
