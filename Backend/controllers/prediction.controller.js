import axios from "axios";
import dotenv from "dotenv";
import validation from "../utils/validation.js";
import { validationResult } from "express-validator";
import { CreditRisk, CreditScore } from "../models/prediction.models.js";
import Product from "../models/products.models.js";
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
      const authId = request.user.id;

      // Check if the user already has a prediction
      const existingPrediction = await CreditScore.findOne({
        authId,
      });
      if (existingPrediction) {
        return next(
          errorHandler(400, "You have already made a credit score prediction.")
        );
      }

      const res = await axios.post(
        `${FLASK_API_URL}/predict_score`,
        userInput,
        { headers: { "Content-Type": "application/json" } }
      );

      const newPrediction = new CreditScore({
        authId,
        ...userInput,
        credit_score: res.data["Credit Score Prediction"][0],
      });

      // Save the prediction to the database
      const savedPrediction = await newPrediction.save();

      response.status(201).json({
        success: true,
        savedPrediction,
        message: "Credit Score prediction successful and stored",
      });
    } catch (error) {
      console.log(error);
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
      const authId = request.user.id;

      // Check if the user already has a risk prediction
      const existingPrediction = await CreditRisk.findOne({
        authId,
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
        authId,
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
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      const { productId } = request.params;
      const authId = request.user.id;

      const product = await Product.findById(productId);
      if (!product) {
        return next(errorHandler(404, "Product not found"));
      }

      // Fetch user's credit risk level
      const creditRisk = await CreditRisk.findOne({ authId })
        .sort({ createdAt: -1 })
        .limit(1); // Get the most recent record
      if (!creditRisk) {
        return next(errorHandler(404, "Credit risk data not found"));
      }

      // Fetch guarantor's credit score
      const creditScore = await CreditScore.findOne({ authId })
        .sort({ createdAt: -1 })
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
        income_in_kes: creditRisk.income_in_kes,
        guarantor_credit_score: creditScore.credit_score,
        duration_months: request.body.duration_months, // Get duration from request body
      };

      const res = await axios.post(
        `${FLASK_API_URL}/dynamic_price`,
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );
      const dynamicPrice = res.data;
      response.status(201).json({
        success: true,
        message: "Dynamic price calculation successful",
        dynamicPrice,
      });
    } catch (error) {
      console.log(error);
      next(errorHandler(500, error));
    }
  },
];

// Fetch user's credit prediction status
export const getUserPrediction = async (request, response, next) => {
  try {
    const authId = request.params.id;

    // Find prediction based on the logged-in user's ID
    const prediction = await CreditRisk.findOne({ authId });

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
    console.log(error);
    next(errorHandler(500, error));
  }
};

/**
 * Fetch all credit risks (Admin-only endpoint)
 */
export const getAllCreditRisks = async (request, response, next) => {
  try {
    // Fetch all credit risk predictions from the database
    const creditRisks = await CreditRisk.find({})
      .populate({
        path: "authId",
        select: "username email role clientId guarantorId",
        populate: [
          {
            path: "clientId",
            model: "Client",
            select:
              "first_name last_name id_number phone_no gender marital_status image id_image date_of_birth",
          },
          {
            path: "guarantorId",
            model: "Guarantor",
            select:
              "full_name phone_no id_number gender kra_pin date_of_birth marital_status no_of_dependants education_level relationship_to_student",
          },
        ],
      })
      .lean();

    if (!creditRisks || creditRisks.length === 0) {
      return next(errorHandler(404, "No credit risk predictions found."));
    }

    // Return the list of credit risks
    response.status(200).json({
      success: true,
      message: "All credit risks fetched successfully",
      creditRisks,
    });
  } catch (error) {
    console.error("Error fetching credit risks:", error);
    next(errorHandler(500, "Failed to fetch credit risks"));
  }
};

export const getCreditRiskById = async (request, response, next) => {
  try {
    const creditRiskId = request.params.id; // Extract credit risk ID from URL params

    // Fetch the credit risk entry from the database
    const creditRisk = await CreditRisk.findById(creditRiskId)
      .populate({
        path: "authId",
        select: "username email role clientId guarantorId",
        populate: [
          {
            path: "clientId",
            model: "Client",
            select:
              "first_name last_name id_number phone_no gender marital_status image id_image date_of_birth",
          },
          {
            path: "guarantorId",
            model: "Guarantor",
            select:
              "full_name phone_no id_number gender kra_pin date_of_birth marital_status no_of_dependants education_level relationship_to_student",
          },
        ],
      })
      .lean();

    if (!creditRisk) {
      return next(errorHandler(404, "Credit risk data not found"));
    }

    response.status(200).json({
      success: true,
      message: "Credit risk data fetched successfully",
      creditRisk,
    });
  } catch (error) {
    next(errorHandler(500, "Failed to fetch credit risks by ID")); // Pass the error to the error handler middleware
  }
};
