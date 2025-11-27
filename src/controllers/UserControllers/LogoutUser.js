const LogoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  return res.status(200).json({
    message: "Logged out successfully",
  });
};

export default LogoutUser;
