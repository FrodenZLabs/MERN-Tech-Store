import mongoose from "mongoose";

const creditRiskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    age: { type: Number, required: true },
    marital_status: {
      type: String,
      required: true,
    },
    no_of_dependants: { type: Number, required: true },
    education_level: {
      type: String,
      required: true,
    },
    relationship_to_student: {
      type: String,
      required: true,
    },
    income_in_kes: { type: Number, required: true },
    additional_income: { type: Number, required: true },
    employment_length: { type: Number, required: true },
    employment_status: {
      type: String,
      required: true,
    },
    guarantor_credit_score: {
      type: Number,
      required: true,
    },
    existing_loans: { type: Boolean, required: true },
    outstanding_loan_amount: { type: Number, required: true },
    monthly_repayment_amount: { type: Number, required: true },
    monthly_expenses: { type: Number, required: true },
    missed_payments_last_year: {
      type: Number,
      required: true,
    },
    financial_counseling: { type: Boolean, required: true },
    risk_score: { type: Number, required: true }, // Received from the Flask API
  },
  { timestamps: true }
);

const creditScoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    utility_bill_payment: {
      type: String,
      required: true,
    },
    service_deposit_required: {
      type: String,
      required: true,
    },
    debt_collection_history: {
      type: String,
      required: true,
    },
    savings_account: {
      type: String,
      required: true,
    },
    employment_tenure: {
      type: String,
      required: true,
    },
    additional_income: {
      type: String,
      required: true,
    },
    housing_status: {
      type: String,
      required: true,
    },
    eviction_history: {
      type: String,
      required: true,
    },
    community_savings_group: {
      type: String,
      required: true,
    },
    mobile_money_account: {
      type: String,
      required: true,
    },
    credit_score: { type: Number, required: true },
  },
  { timestamps: true }
);

export const CreditScore = mongoose.model("CreditScore", creditScoreSchema);

export const CreditRisk = mongoose.model("CreditRisk", creditRiskSchema);
