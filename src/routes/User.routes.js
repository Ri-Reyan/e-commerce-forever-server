import express from "express";
import CreateUser from "../controllers/UserControllers/CreateUser.js";
import LoginUser from "../controllers/UserControllers/LoginUser.js";
import LogoutUser from "../controllers/UserControllers/LogoutUser.js";
import AllProducts from "../controllers/UserControllers/AllProducts.js";

const router = express.Router();
// /api/user/name
router.post("/user/signup", CreateUser);
router.post("/user/signin", LoginUser);
router.post("/user/logout", LogoutUser);
router.get("/user/allproducts", AllProducts);

export default router;
