import express from "express";
import {
  dynamicPrice,
  getUserPrediction,
  predictRisk,
  predictScore,
} from "../controllers/prediction.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/user/:id", getUserPrediction);
router.post("/predict_score", verifyToken, predictScore);
router.post("/predict_risk", verifyToken, predictRisk);
router.post("/:productId/dynamic_price", verifyToken, dynamicPrice);

export default router;
