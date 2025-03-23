/* eslint-disable react/prop-types */
const GuarantorFinancialDetailsForm = ({ guarantorData, setGuarantorData }) => {
  const handleChange = (e) => {
    setGuarantorData({ ...guarantorData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Guarantor Financial Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Employment Status */}
        <div>
          <label className="block text-gray-700 font-medium">
            Employment Status
          </label>
          <select
            name="employmentStatus"
            value={guarantorData.employmentStatus || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Employment Status</option>
            <option value="Employed">Employed</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Unemployed">Unemployed</option>
          </select>
        </div>

        {/* Employment Length */}
        <div>
          <label className="block text-gray-700 font-medium">
            Employment Length (Years)
          </label>
          <input
            type="number"
            name="employmentLength"
            value={guarantorData.employmentLength}
            onChange={handleChange}
            placeholder="Enter employment length"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Monthly Income */}
        <div>
          <label className="block text-gray-700 font-medium">
            Monthly Income (KES)
          </label>
          <input
            type="number"
            name="income"
            value={guarantorData.income || ""}
            onChange={handleChange}
            placeholder="Enter monthly income"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Additional Income */}
        <div>
          <label className="block text-gray-700 font-medium">
            Additional Income (KES)
          </label>
          <input
            type="number"
            name="additionalIncome"
            value={guarantorData.additionalIncome || ""}
            onChange={handleChange}
            placeholder="Enter additional income"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Existing Loans */}
        <div>
          <label className="block text-gray-700 font-medium">
            Do you have existing loans?
          </label>
          <select
            name="existingLoans"
            value={guarantorData.existingLoans || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="True">Yes</option>
            <option value="False">No</option>
          </select>
        </div>

        {/* Outstanding Loan Amount */}
        {guarantorData.existingLoans === "True" && (
          <>
            <div>
              <label className="block text-gray-700 font-medium">
                Outstanding Loan Amount (KES)
              </label>
              <input
                type="number"
                name="outstandingLoanAmount"
                value={guarantorData.outstandingLoanAmount}
                onChange={handleChange}
                placeholder="Enter outstanding loan amount"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Monthly Repayment Amount (KES)
              </label>
              <input
                type="number"
                name="monthlyRepaymentAmount"
                value={guarantorData.monthlyRepaymentAmount}
                onChange={handleChange}
                placeholder="Enter monthly repayment"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-gray-700 font-medium">
            Monthly Expenses (KES)
          </label>
          <input
            type="number"
            name="monthlyExpenses"
            value={guarantorData.monthlyExpenses || ""}
            onChange={handleChange}
            placeholder="Enter monthly expenses"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Missed Payments Last Year */}
        <div>
          <label className="block text-gray-700 font-medium">
            Missed Payments Last Year
          </label>
          <input
            type="number"
            name="missedPaymentsLastYear"
            value={guarantorData.missedPaymentsLastYear || ""}
            onChange={handleChange}
            placeholder="Enter number of missed payments"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Financial Counseling */}
        <div>
          <label className="block text-gray-700 font-medium">
            Have you attended financial counseling?
          </label>
          <select
            name="financialCounseling"
            value={guarantorData.financialCounseling || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="True">Yes</option>
            <option value="False">No</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GuarantorFinancialDetailsForm;
