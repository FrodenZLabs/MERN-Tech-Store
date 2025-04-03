import express from "express";
import {
  dynamicPrice,
  getAllCreditRisks,
  getCreditRiskById,
  getUserPrediction,
  predictRisk,
  predictScore,
} from "../controllers/prediction.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

router.get("/user/:id", getUserPrediction);
router.post("/predict_score", verifyToken, predictScore);
router.post("/predict_risk", verifyToken, predictRisk);
router.post("/:productId/dynamic_price", verifyToken, dynamicPrice);

// Fetch all credit scores
router.get("/admin/credit-risks", verifyToken, verifyAdmin, getAllCreditRisks); // Fetch all credit risks
router.get("/admin/credit-risks/:id", verifyToken, verifyAdmin, getCreditRiskById); // Fetch all credit risks

export default router;
