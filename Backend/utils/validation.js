import { body } from "express-validator";

// Input validation middleware
const validateScoreInput = [
  body("utility_bill_payment")
    .isString()
    .isIn([
      "Always on time",
      "Occasionally late",
      "Frequently late",
      "Never paid",
    ])
    .withMessage("Invalid utility_bill_payment value"),
  body("service_deposit_required")
    .isString()
    .isIn(["No", "Yes, but refunded", "Yes, not refunded"])
    .withMessage("Invalid service_deposit_required value"),
  body("debt_collection_history")
    .isString()
    .isIn(["No", "Yes, once", "Yes, more than once"])
    .withMessage("Invalid debt_collection_history value"),
  body("savings_account")
    .isString()
    .isIn(["Yes, sufficient", "Yes, but limited", "No"])
    .withMessage("Invalid savings_account value"),
  body("employment_tenure")
    .isString()
    .isIn([
      "Less than 6 months",
      "6 months to 1 year",
      "1 to 3 years",
      "Over 3 years",
    ])
    .withMessage("Invalid employment_tenure value"),
  body("additional_income")
    .isString()
    .isIn(["No", "Yes, occasionally", "Yes, regularly"])
    .withMessage("Invalid additional_income value"),
  body("housing_status")
    .isString()
    .isIn(["Own", "Rent", "Live with family/friends"])
    .withMessage("Invalid housing_status value"),
  body("eviction_history")
    .isString()
    .isIn(["No", "Yes, once", "Yes, more than once"])
    .withMessage("Invalid eviction_history value"),
  body("community_savings_group")
    .isString()
    .isIn(["Yes, active member", "Yes, inactive member", "No"])
    .withMessage("Invalid community_savings_group value"),
  body("mobile_money_account")
    .isString()
    .isIn(["Yes, actively used", "Yes, rarely used", "No"])
    .withMessage("Invalid mobile_money_account value"),
];

// Input validation middleware
const validateRiskInput = [
  body("age")
    .isInt({ min: 18, max: 65 })
    .withMessage("Age must be between 18 and 65"),
  body("marital_status")
    .isString()
    .isIn(["Single", "Married", "Divorced"])
    .withMessage("Invalid marital status"),
  body("no_of_dependants")
    .isInt({ min: 0, max: 6 })
    .withMessage("Number of dependants must be between 0 and 6"),
  body("education_level")
    .isString()
    .isIn(["High School", "Bachelor’s Degree", "Master’s Degree", "PhD"])
    .withMessage("Invalid education level"),
  body("relationship_to_student")
    .isString()
    .isIn(["Parent", "Sibling", "Guardian", "Other"])
    .withMessage("Invalid relationship to student"),
  body("income_in_kes")
    .isInt({ min: 0 })
    .withMessage("Income must be a non-negative number"),
  body("additional_income")
    .isInt({ min: 0 })
    .withMessage("Additional income must be a non-negative number"),
  body("employment_length")
    .isInt({ min: 0, max: 50 })
    .withMessage("Employment length must be between 0 and 50 years"),
  body("employment_status")
    .isString()
    .isIn(["Employed", "Self-Employed", "Unemployed"])
    .withMessage("Invalid employment status"),
  body("guarantor_credit_score")
    .isInt({ min: 300, max: 850 })
    .withMessage("Guarantor credit score must be between 300 and 850"),
  body("existing_loans")
    .isBoolean()
    .withMessage("Existing loans must be true or false"),
  body("outstanding_loan_amount")
    .isInt({ min: 0 })
    .withMessage("Outstanding loan amount must be non-negative"),
  body("monthly_repayment_amount")
    .isInt({ min: 0 })
    .withMessage("Monthly repayment amount must be non-negative"),
  body("monthly_expenses")
    .isInt({ min: 0 })
    .withMessage("Monthly expenses must be non-negative"),
  body("missed_payments_last_year")
    .isInt({ min: 0, max: 5 })
    .withMessage("Missed payments last year must be between 0 and 5"),
  body("financial_counseling")
    .isBoolean()
    .withMessage("Financial counseling must be true or false"),
];

// Input validation middleware
const validatePriceInput = [
  body("duration_months")
    .isInt({ min: 1 })
    .withMessage("Duration must be at least 1 month"),
];

export default { validateScoreInput, validateRiskInput, validatePriceInput };
