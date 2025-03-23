import express from "express";
import {
  createPayment,
  stripeWebhook,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-payment-intent", createPayment);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default router;
