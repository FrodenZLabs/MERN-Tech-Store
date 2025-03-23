import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchUserPrediction,
  predictRisk,
  predictScore,
} from "../redux/services/authService";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";

const CreditPredictionPage = () => {
  const { currentUser } = useSelector((state) => state.authentication);
  const formData = useSelector((state) => state.form);
  const [creditScore, setCreditScore] = useState(null);
  const [riskLevel, setRiskLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      toast.error("User not authenticated. Please log in.");
      return;
    }

    const fetchPredictions = async () => {
      try {
        const userId = currentUser.user._id;

        // Step 1: Check if credit data exists for the user
        const existingData = await fetchUserPrediction(userId);

        if (existingData) {
          // Step 2: If data exists, display it
          setCreditScore(existingData.guarantor_credit_score);
          setRiskLevel(existingData.risk_score);
        } else {
          // Step 3: If data does not exist, generate predictions
          const { guarantorFinancialData, guarantorData } = formData;

          const calculateAge = (dob) => {
            const birthDate = new Date(dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (
              monthDiff < 0 ||
              (monthDiff === 0 && today.getDate() < birthDate.getDate())
            ) {
              age--;
            }
            return age;
          };
          const age = guarantorData.guarantorDOB
            ? calculateAge(guarantorData.guarantorDOB)
            : null;

          const creditScoreInput = {
            utility_bill_payment: guarantorFinancialData.utilityBillPayment,
            service_deposit_required:
              guarantorFinancialData.serviceDepositRequired,
            savings_account: guarantorFinancialData.savingsAccount,
            debt_collection_history:
              guarantorFinancialData.debtCollectionHistory,
            employment_tenure: guarantorFinancialData.employmentTenure,
            additional_income: guarantorFinancialData.additionalIncome,
            housing_status: guarantorFinancialData.housingStatus,
            eviction_history: guarantorFinancialData.evictionHistory,
            community_savings_group:
              guarantorFinancialData.communitySavingsGroup,
            mobile_money_account: guarantorFinancialData.mobileMoneyAccount,
          };

          const creditScoreResponse = await predictScore(creditScoreInput);
          const predictedCreditScore =
            creditScoreResponse.savedPrediction.credit_score;

          // Ensure credit score is within valid range (300 - 850)
          const roundedCreditScore = Math.round(predictedCreditScore);
          const validCreditScore = Math.max(
            300,
            Math.min(roundedCreditScore, 850)
          );
          const parseToNumber = (value) => (isNaN(value) ? 0 : Number(value));
          const convertToBoolean = (value) =>
            value === "True" || value === "true";

          const creditRiskInput = {
            age,
            marital_status: guarantorData.guarantorMaritalStatus,
            no_of_dependants: parseToNumber(guarantorData.guarantorDependants),
            education_level: guarantorData.guarantorEducationLevel,
            relationship_to_student: guarantorData.guarantorRelationship,
            income_in_kes: parseToNumber(guarantorData.income),
            additional_income: parseToNumber(guarantorData.additionalIncome),
            employment_length: parseToNumber(guarantorData.employmentLength),
            employment_status: guarantorData.employmentStatus,
            guarantor_credit_score: validCreditScore,
            existing_loans: convertToBoolean(guarantorData.existingLoans),
            outstanding_loan_amount: parseToNumber(
              guarantorData.outstandingLoanAmount
            ),
            monthly_repayment_amount: parseToNumber(
              guarantorData.monthlyRepaymentAmount
            ),
            monthly_expenses: parseToNumber(guarantorData.monthlyExpenses),
            missed_payments_last_year: parseToNumber(
              guarantorData.missedPaymentsLastYear
            ),
            financial_counseling: convertToBoolean(
              guarantorData.financialCounseling
            ),
          };

          const creditRiskResponse = await predictRisk(creditRiskInput);
          const predictedCreditRisk =
            creditRiskResponse.savedPrediction.risk_score;

          setCreditScore(validCreditScore);
          setRiskLevel(predictedCreditRisk);
        }
      } catch (error) {
        console.error("Error fetching predictions:", error);
        toast.error("Failed to fetch predictions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [currentUser, formData]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg border border-gray-200">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Credit Score & Risk Level
      </h2>

      {/* Loading State */}
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <RingLoader color="#4A90E2" size={100} />
        </div>
      ) : (
        <>
          {/* Credit Score Display */}
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-sm">
            <p className="text-lg font-medium text-gray-700">Credit Score:</p>
            <p className="text-4xl font-extrabold text-blue-600 mt-2 animate-fade-in">
              {creditScore}
            </p>
          </div>

          {/* Risk Level Display */}
          <div className="text-center mt-6 bg-gray-100 p-6 rounded-lg shadow-sm">
            <p className="text-lg font-medium text-gray-700">Risk Level:</p>
            <p
              className={`text-2xl font-bold mt-2 animate-fade-in ${
                riskLevel === 0
                  ? "text-green-600 bg-green-100 px-4 py-2 rounded-md inline-block"
                  : riskLevel === 1
                  ? "text-yellow-600 bg-yellow-100 px-4 py-2 rounded-md inline-block"
                  : "text-red-600 bg-red-100 px-4 py-2 rounded-md inline-block"
              }`}
            >
              {riskLevel === 0 ? "Low" : riskLevel === 1 ? "Medium" : "High"}
            </p>
          </div>

          {/* Button - Browse Products */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-green-500 font-semibold text-white px-6 py-3 rounded-lg shadow-md transition duration-300 transform hover:bg-green-600 hover:scale-105"
            >
              Browse Tech Products
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreditPredictionPage;
