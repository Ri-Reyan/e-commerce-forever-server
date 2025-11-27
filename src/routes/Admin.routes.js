import express from "express";
import CreateAdmin from "../controllers/AdminControllers/CreateAdmin.js";
import LoginAdmin from "../controllers/AdminControllers/LoginAdmin.js";
import LogoutAdmin from "../controllers/AdminControllers/LogoutAdmin.js";

const router = express.Router();
// /api/admin/name
router.post("/admin/signup", CreateAdmin);
router.post("/admin/signin", LoginAdmin);
router.post("/admin/logout", LogoutAdmin);

export default router;
