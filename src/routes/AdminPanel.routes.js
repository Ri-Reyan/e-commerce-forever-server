import CreateProduct from "../controllers/AdminPanelControllers.js/CreateProduct.js";
import express from "express";
import { uploads } from "../middleware/multer.middleware.js";

const router = express.Router();

// api/adminpanel/createproduct

router.post(
  "/adminpanel/createproduct",
  uploads.array("images", 4),
  CreateProduct
);

export default router;
