# Test Case 1: Ideal Applicant
# Input:

# python
# Copy
# {
#     "utility_bill_payment": "Always on time",
#     "service_deposit_required": "No",
#     "debt_collection_history": "No",
#     "savings_account": "Yes, sufficient",
#     "employment_tenure": "Over 3 years",
#     "additional_income": "Yes, regularly",
#     "housing_status": "Own",
#     "eviction_history": "No",
#     "community_savings_group": "Yes, active member",
#     "mobile_money_account": "Yes, actively used"
# }
# Expected Output:

# Score: ~780–850

# Category: Excellent
# Why: Perfect payment history, strong financial stability, and no red flags.

# Test Case 2: Moderate Risk (Late Payments but Stable Income)
# Input:

# python
# Copy
# {
#     "utility_bill_payment": "Occasionally late",
#     "service_deposit_required": "Yes, but refunded",
#     "debt_collection_history": "Yes, once",
#     "savings_account": "Yes, but limited",
#     "employment_tenure": "1 to 3 years",
#     "additional_income": "Yes, occasionally",
#     "housing_status": "Rent",
#     "eviction_history": "No",
#     "community_savings_group": "No",
#     "mobile_money_account": "Yes, rarely used"
# }
# Expected Output:

# Score: ~620–680

# Category: Fair
# Why: Occasional late payments and debt collection history, but stable employment.

# Test Case 3: High Risk (Multiple Defaults)
# Input:

# python
# Copy
# {
#     "utility_bill_payment": "Never paid",
#     "service_deposit_required": "Yes, not refunded",
#     "debt_collection_history": "Yes, more than once",
#     "savings_account": "No",
#     "employment_tenure": "Less than 6 months",
#     "additional_income": "No",
#     "housing_status": "Live with family/friends",
#     "eviction_history": "Yes, more than once",
#     "community_savings_group": "No",
#     "mobile_money_account": "No"
# }
# Expected Output:

# Score: ~300–500

# Category: Poor
# Why: Multiple defaults, unstable income, and eviction history.

# Test Case 4: Borderline Good/Fair
# Input:

# python
# Copy
{
    "utility_bill_payment": "Always on time",
    "service_deposit_required": "No",
    "debt_collection_history": "No",
    "savings_account": "Yes, but limited",
    "employment_tenure": "6 months to 1 year",
    "additional_income": "No",
    "housing_status": "Rent",
    "eviction_history": "No",
    "community_savings_group": "Yes, inactive member",
    "mobile_money_account": "Yes, actively used"
}
# Expected Output:

# Score: ~680–720

# Category: Good (if ≥680) / Fair (if <680)
# Why: Strong payment history but limited savings and short employment tenure.

# Test Case 5: Mixed Factors (Good History but Eviction)
# Input:

# python
# Copy
# {
#     "utility_bill_payment": "Always on time",
#     "service_deposit_required": "No",
#     "debt_collection_history": "No",
#     "savings_account": "Yes, sufficient",
#     "employment_tenure": "Over 3 years",
#     "additional_income": "Yes, regularly",
#     "housing_status": "Own",
#     "eviction_history": "Yes, once",
#     "community_savings_group": "No",
#     "mobile_money_account": "No"
# }
# Expected Output:

# Score: ~600–650

# Category: Fair
# Why: Strong financials but eviction history drags down the score.

# Test Case 6: Borderline Fair/Poor
# Input:

# python
# Copy
# {
#     "utility_bill_payment": "Frequently late",
#     "service_deposit_required": "Yes, not refunded",
#     "debt_collection_history": "Yes, once",
#     "savings_account": "No",
#     "employment_tenure": "6 months to 1 year",
#     "additional_income": "No",
#     "housing_status": "Live with family/friends",
#     "eviction_history": "No",
#     "community_savings_group": "No",
#     "mobile_money_account": "Yes, rarely used"
# }
# Expected Output:

# Score: ~550–620

# Category: Fair (if ≥620) / Poor (if <620)
# Why: Frequent late payments and no savings, but no eviction history.


# Test Case 1: Low Risk Applicant
# This case represents an applicant with strong financial stability and minimal financial obligations.

# json
# Copy
# Edit
# {
#   "age": 30,
#   "marital_status": "Married",
#   "no_of_dependants": 1,
#   "education_level": "Master’s Degree",
#   "relationship_to_student": "Parent",
#   "income_in_kes": 120000,
#   "additional_income": 20000,
#   "employment_length": 10,
#   "employment_status": "Employed",
#   "guarantor_credit_score": 800,
#   "existing_loans": false,
#   "outstanding_loan_amount": 0,
#   "monthly_repayment_amount": 0,
#   "monthly_expenses": 15000,
#   "missed_payments_last_year": 0,
#   "financial_counseling": true
# }
# Expected Outcome:

# Risk Score: Low (Below 40)
# Risk Level: "Low"
# Test Case 2: Medium Risk Applicant
# This case represents an applicant with moderate financial obligations and a decent financial standing.

# json
# Copy
# Edit
# {
#   "age": 25,
#   "marital_status": "Single",
#   "no_of_dependants": 0,
#   "education_level": "Bachelor’s Degree",
#   "relationship_to_student": "Sibling",
#   "income_in_kes": 60000,
#   "additional_income": 10000,
#   "employment_length": 3,
#   "employment_status": "Self-Employed",
#   "guarantor_credit_score": 650,
#   "existing_loans": true,
#   "outstanding_loan_amount": 40000,
#   "monthly_repayment_amount": 10000,
#   "monthly_expenses": 25000,
#   "missed_payments_last_year": 1,
#   "financial_counseling": false
# }
# Expected Outcome:

# Risk Score: Medium (Between 40 and 70)
# Risk Level: "Medium"
# Test Case 3: High Risk Applicant
# This case represents an applicant with poor financial standing and a history of missed payments.

# json
# Copy
# Edit
# {
#   "age": 20,
#   "marital_status": "Single",
#   "no_of_dependants": 2,
#   "education_level": "High School",
#   "relationship_to_student": "Guardian",
#   "income_in_kes": 20000,
#   "additional_income": 5000,
#   "employment_length": 1,
#   "employment_status": "Unemployed",
#   "guarantor_credit_score": 400,
#   "existing_loans": true,
#   "outstanding_loan_amount": 80000,
#   "monthly_repayment_amount": 20000,
#   "monthly_expenses": 40000,
#   "missed_payments_last_year": 4,
#   "financial_counseling": false
# }
# Expected Outcome:

# Risk Score: High (Above 70)
# Risk Level: "High"
# Test Case 4: Edge Case (Middle Ground)
# This case represents an applicant who falls on the borderline between Medium and High risk.

# json
# Copy
# Edit
# {
#   "age": 28,
#   "marital_status": "Divorced",
#   "no_of_dependants": 1,
#   "education_level": "Bachelor’s Degree",
#   "relationship_to_student": "Other",
#   "income_in_kes": 50000,
#   "additional_income": 15000,
#   "employment_length": 5,
#   "employment_status": "Employed",
#   "guarantor_credit_score": 600,
#   "existing_loans": true,
#   "outstanding_loan_amount": 50000,
#   "monthly_repayment_amount": 15000,
#   "monthly_expenses": 30000,
#   "missed_payments_last_year": 2,
#   "financial_counseling": false
# }
# Expected Outcome:

# Risk Score: Around 70
# Risk Level: Borderline between Medium and High
# Test Case 5: Applicant with No Credit History
# This case represents an applicant with no existing financial obligations but a weak credit score.

# json
# Copy
# Edit
# {
#   "age": 22,
#   "marital_status": "Single",
#   "no_of_dependants": 0,
#   "education_level": "High School",
#   "relationship_to_student": "Sibling",
#   "income_in_kes": 30000,
#   "additional_income": 0,
#   "employment_length": 2,
#   "employment_status": "Unemployed",
#   "guarantor_credit_score": 500,
#   "existing_loans": false,
#   "outstanding_loan_amount": 0,
#   "monthly_repayment_amount": 0,
#   "monthly_expenses": 18000,
#   "missed_payments_last_year": 0,
#   "financial_counseling": false
# }
# Expected Outcome:

# Risk Score: Medium (Around 40-50)
# Risk Level: "Medium"

# Test Case 1: Best Case (Low Risk, High Affordability)
# High-income guarantor, high credit score, stable employment, and low risk level.
# json
# Copy
# Edit
# {
#     "base_price": 50000,
#     "inventory_stock": 100,
#     "risk_level": "Low",
#     "income_in_kes": 150000,
#     "guarantor_credit_score": 800
# }
# Expected Output:

# json
# Copy
# Edit
# {
#     "predicted_dynamic_price": 48000,
#     "predicted_monthly_repayment": 4000
# }
# ✅ Interpretation: Discounted price due to high affordability and low risk.

# Test Case 2: Worst Case (High Risk, Low Affordability)
# Low-income guarantor, poor credit score, unemployed, and high risk level.
# json
# Copy
# Edit
# {
#     "base_price": 50000,
#     "inventory_stock": 5,
#     "risk_level": "High",
#     "income_in_kes": 15000,
#     "guarantor_credit_score": 350
# }
# Expected Output:

# json
# Copy
# Edit
# {
#     "predicted_dynamic_price": 55000,
#     "predicted_monthly_repayment": 8000
# }
# ❌ Interpretation: Higher price due to high risk and low financial capability.

# Test Case 3: Moderate Case (Medium Risk, Average Affordability)
# Average-income guarantor, medium credit score, stable job.
# json
# Copy
# Edit
# {
#     "base_price": 50000,
#     "inventory_stock": 50,
#     "risk_level": "Medium",
#     "income_in_kes": 70000,
#     "guarantor_credit_score": 600
# }
# Expected Output:

# json
# Copy
# Edit
# {
#     "predicted_dynamic_price": 51000,
#     "predicted_monthly_repayment": 6000
# }
# ⚖️ Interpretation: Slight increase in price but still affordable.

# Test Case 4: High Inventory Impact (Excess Stock)
# Stock levels are high, encouraging discounts.
# json
# Copy
# Edit
# {
#     "base_price": 60000,
#     "inventory_stock": 200,
#     "risk_level": "Low",
#     "income_in_kes": 90000,
#     "guarantor_credit_score": 750
# }
# Expected Output:

# json
# Copy
# Edit
# {
#     "predicted_dynamic_price": 57000,
#     "predicted_monthly_repayment": 5000
# }
# 📦 Interpretation: Lower price due to high stock availability.

# Test Case 5: Low Inventory Impact (Limited Stock)
# Stock levels are low, causing price increases.
# json
# Copy
# Edit
# {
#     "base_price": 60000,
#     "inventory_stock": 3,
#     "risk_level": "Low",
#     "income_in_kes": 100000,
#     "guarantor_credit_score": 750
# }
# Expected Output:

# json
# Copy
# Edit
# {
#     "predicted_dynamic_price": 63000,
#     "predicted_monthly_repayment": 5200
# }
# 📉 Interpretation: Higher price due to scarcity of stock.

# Test Case 6: Unemployed Applicant
# Guarantor is unemployed, affecting affordability.
# json
# Copy
# Edit
# {
#     "base_price": 45000,
#     "inventory_stock": 50,
#     "risk_level": "High",
#     "income_in_kes": 20000,
#     "guarantor_credit_score": 400
# }
# Expected Output:

# json
# Copy
# Edit
# {
#     "predicted_dynamic_price": 50000,
#     "predicted_monthly_repayment": 7000
# }
# 🔴 Interpretation: Increased cost due to high financial risk.

# Test Case 7: Very High-Income Guarantor
# Strong financial backing lowers pricing.
# json
# Copy
# Edit
# {
#     "base_price": 70000,
#     "inventory_stock": 80,
#     "risk_level": "Low",
#     "income_in_kes": 250000,
#     "guarantor_credit_score": 850
# }
# Expected Output:

# json
# Copy
# Edit
# {
#     "predicted_dynamic_price": 65000,
#     "predicted_monthly_repayment": 5500
# }
# 💰 Interpretation: More discounts due to very strong financial backing.

# Test Case 8: Mid-Income with High Risk
# Middle-income but high-risk profile due to low credit score.
# json
# Copy
# Edit
# {
#     "base_price": 55000,
#     "inventory_stock": 40,
#     "risk_level": "High",
#     "income_in_kes": 60000,
#     "guarantor_credit_score": 450
# }
# Expected Output:

# json
# Copy
# Edit
# {
#     "predicted_dynamic_price": 58000,
#     "predicted_monthly_repayment": 6500
# }
# ⚠️ Interpretation: Price increases due to the higher risk profile.