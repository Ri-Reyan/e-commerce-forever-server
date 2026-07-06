import { getClearCookieOptions } from "../../utils/cookieOptions.js";

const LogoutUser = async (req, res) => {
  res.clearCookie("token", getClearCookieOptions());
  return res.status(200).json({
    message: "Logged out successfully",
  });
};

export default LogoutUser;
