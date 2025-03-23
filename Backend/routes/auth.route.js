import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  signin,
  signout,
  signup,
  updateUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.put("/update_user/:id", verifyToken, updateUser);
router.delete("/delete_user/:id", verifyToken, deleteUser);

export default router;
