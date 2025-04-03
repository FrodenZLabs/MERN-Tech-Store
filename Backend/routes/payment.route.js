import express from "express";
import {
  createPayment,
  getAllPayments,
} from "../controllers/payment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

router.post("/create-payment-intent", verifyToken, createPayment);
router.get("/get_payments", verifyToken, verifyAdmin, getAllPayments);

export default router;
