import express from "express";
import { createPayment } from "../controllers/payment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create-payment-intent", verifyToken, createPayment);

export default router;
