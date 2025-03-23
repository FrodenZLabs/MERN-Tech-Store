import axios from "axios";
import dotenv from "dotenv";
import validation from "../utils/validation.js";
import { validationResult } from "express-validator";
import { CreditRisk, CreditScore } from "../models/prediction.models.js";
import { Product } from "../models/products.models.js";
import { errorHandler } from "../utils/errorHandler.js";
dotenv.config();

const FLASK_API_URL = process.env.FLASK_API_URL;

export const predictScore = [
  validation.validateScoreInput,
  async (request, response, next) => {
    try {
      // Check validation results
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      const userInput = request.body;
      const currentUserId = request.user.id;

      // Check if the user already has a prediction
      const existingPrediction = await CreditScore.findOne({
        userId: currentUserId,
      });
      if (existingPrediction) {
        return response.status(400).json({
          success: false,
          message: "You have already made a credit score prediction.",
        });
      }

      const res = await axios.post(
        `${FLASK_API_URL}/predict_score`,
        userInput,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const newPrediction = new CreditScore({
        userId: currentUserId,
        ...userInput,
        credit_score: res.data["Credit Score Prediction"][0],
      });

      // Save the prediction to the database
      const savedPrediction = await newPrediction.save();
      response.json({
        success: true,
        savedPrediction,
        message: "Credit Score prediction successful and stored",
      });
    } catch (error) {
      next(errorHandler(500, error));
    }
  },
];

export const predictRisk = [
  validation.validateRiskInput,
  async (request, response, next) => {
    try {
      // Check validation results
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      const userInput = request.body;
      const currentUserId = request.user.id;

      // Check if the user already has a risk prediction
      const existingPrediction = await CreditRisk.findOne({
        userId: currentUserId,
      });
      if (existingPrediction) {
        return response.status(400).json({
          success: false,
          message: "You have already made a risk prediction.",
        });
      }

      const res = await axios.post(`${FLASK_API_URL}/predict_risk`, userInput, {
        headers: { "Content-Type": "application/json" },
      });

      const newPrediction = new CreditRisk({
        userId: currentUserId,
        ...userInput,
        risk_score: res.data["Credit Risk Prediction"][0],
      });

      // Save the prediction to the database
      const savedPrediction = await newPrediction.save();

      response.status(201).json({
        success: true,
        savedPrediction,
        message: "Risk prediction successful and stored",
      });
    } catch (error) {
      console.log(error);
      next(errorHandler(500, error));
    }
  },
];

export const dynamicPrice = [
  validation.validatePriceInput,
  async (request, response, next) => {
    try {
      // Check validation results
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      const { productId } = request.params;
      const user = request.user;

      const product = await Product.findById(productId);
      if (!product) {
        return next(errorHandler(404, "Product not found"));
      }

      // Fetch user's credit risk level
      const creditRisk = await CreditRisk.findOne({ userId: user.id })
        .sort({ createdAt: -1 }) // Sort by latest
        .limit(1); // Get the most recent record
      if (!creditRisk) {
        return next(errorHandler(404, "Credit risk data not found"));
      }

      // Fetch guarantor's credit score
      const creditScore = await CreditScore.findOne({ userId: user.id })
        .sort({ createdAt: -1 }) // Sort by latest
        .limit(1); // Get the most recent record
      if (!creditScore) {
        return next(errorHandler(404, "Guarantor credit score not found"));
      }

      let riskLevel;
      if (creditRisk.risk_score === 0) {
        riskLevel = "Low";
      } else if (creditRisk.risk_score === 1) {
        riskLevel = "Medium";
      } else if (creditRisk.risk_score === 2) {
        riskLevel = "High";
      } else {
        return next(errorHandler(400, "Invalid risk score"));
      }

      // Prepare input data for Flask API
      const requestData = {
        base_price: product.base_price,
        inventory_stock: product.stock,
        risk_level: riskLevel,
        income_in_kes: creditRisk.income_in_kes, // Ensure this field exists in user model
        guarantor_credit_score: creditScore.credit_score,
        duration_months: request.body.duration_months, // Get duration from request body
      };

      const res = await axios.post(
        `${FLASK_API_URL}/dynamic_price`,
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const dynamicPrice = res.data;
      response.status(201).json({
        success: true,
        message: "Dynamic price calculation successful",
        dynamicPrice,
      });
    } catch (error) {
      next(error);
    }
  },
];

// Fetch user's credit prediction status
export const getUserPrediction = async (request, response, next) => {
  try {
    const userId = request.params.id;

    // Find prediction based on the logged-in user's ID
    const prediction = await CreditRisk.findOne({ userId: userId });

    if (!prediction) {
      return next(errorHandler(404, "Prediction not found!"));
    }

    // Return the user's prediction
    response.status(200).json({
      success: true,
      message: "Prediction fetched successfully",
      prediction,
    });
  } catch (error) {
    next(errorHandler(500, error));
  }
};
