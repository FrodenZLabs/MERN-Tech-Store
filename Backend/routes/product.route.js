import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import upload from "../utils/multer.js";
import { uploadMultiple } from "../utils/uploadImage.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductByID);
router.post(
  "/add_product",
  verifyToken,
  verifyAdmin,
  upload.array("images", 6),
  uploadMultiple,
  addProduct
);
router.put(
  "/update_product/:id",
  verifyToken,
  verifyAdmin,
  upload.array("images", 6),
  uploadMultiple,
  updateProduct
);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

export default router;
