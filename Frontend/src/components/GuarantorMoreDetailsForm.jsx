/* eslint-disable react/prop-types */
const GuarantorMoreDetailsForm = ({
  guarantorFinancialData,
  setGuarantorFinancialData,
}) => {
  const handleChange = (e) => {
    setGuarantorFinancialData({
      ...guarantorFinancialData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        More Details from Guarantor
      </h2>
      <p className="text-gray-600 mb-4">
        These questions help in determining the guarantor&apos;s credit score.
      </p>

      {/* Grid with uniform spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Utility Bill Payment */}
        <div className="p-4">
          <label className="block text-gray-700 font-medium mb-1">
            How consistently do you pay your utility bills (e.g., electricity,
            water, gas)?
          </label>
          <select
            name="utilityBillPayment"
            value={guarantorFinancialData.utilityBillPayment || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="Always on time">Always on time</option>
            <option value="Occasionally late">Occasionally late</option>
            <option value="Frequently late">Frequently late</option>
            <option value="Never paid">Never paid</option>
          </select>
        </div>

        {/* Service Deposit Required */}
        <div className="p-4">
          <label className="block text-gray-700 font-medium mb-1">
            Have you ever been required to pay a deposit for services like
            utilities or mobile phones?
          </label>
          <select
            name="serviceDepositRequired"
            value={guarantorFinancialData.serviceDepositRequired || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="No">No</option>
            <option value="Yes, but refunded">Yes, but refunded</option>
            <option value="Yes, not refunded">Yes, not refunded</option>
          </select>
        </div>

        {/* Debt Collection History */}
        <div className="p-4">
          <label className="block text-gray-700 font-medium mb-1">
            Have you ever been involved in a debt collection process?
          </label>
          <select
            name="debtCollectionHistory"
            value={guarantorFinancialData.debtCollectionHistory || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="No">No</option>
            <option value="Yes, once">Yes, once</option>
            <option value="Yes, more than once">Yes, more than once</option>
          </select>
        </div>

        {/* Savings Account */}
        <div className="p-4">
          <label className="block text-gray-700 font-medium mb-1">
            Do you have a savings account or emergency fund?
          </label>
          <select
            name="savingsAccount"
            value={guarantorFinancialData.savingsAccount || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="Yes, sufficient">Yes, sufficient</option>
            <option value="Yes, but limited">Yes, but limited</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Employment Tenure */}
        <div className="p-4">
          <label className="block text-gray-700 font-medium mb-1">
            How long have you been employed with your current employer? (years)
          </label>
          <select
            name="employmentTenure"
            value={guarantorFinancialData.employmentTenure}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="Less than 6 months">Less than 6 months</option>
            <option value="6 months to 1 year">6 months to 1 year</option>
            <option value="1 to 3 years">1 to 3 years</option>
            <option value="Over 3 years">Over 3 years</option>
          </select>
        </div>

        {/* Additional Income */}
        <div className="p-4">
          <label className="block text-gray-700 font-medium mb-1">
            Do you have any additional sources of income (e.g., freelance work,
            rental income)?
          </label>
          <select
            name="additionalIncome"
            value={guarantorFinancialData.additionalIncome || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="Yes, regularly">Yes, regularly</option>
            <option value="Yes, occasionally">Yes, occasionally</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Housing Status */}
        <div className="p-4">
          <label className="block text-gray-700 font-medium mb-1">
            Do you own or rent your current residence?
          </label>
          <select
            name="housingStatus"
            value={guarantorFinancialData.housingStatus || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="Own">Own</option>
            <option value="Rent">Rent</option>
            <option value="Live with family/friends">
              Live with family/friends
            </option>
          </select>
        </div>

        {/* Eviction History */}
        <div className="p-4">
          <label className="block text-gray-700 font-medium mb-1">
            Have you ever been evicted or had issues with your landlord?
          </label>
          <select
            name="evictionHistory"
            value={guarantorFinancialData.evictionHistory || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="No">No</option>
            <option value="Yes, once">Yes, once</option>
            <option value="Yes, more than once">Yes, more than once</option>
          </select>
        </div>

        {/* Community Savings Group */}
        <div className="p-4">
          <label className="block text-gray-700 font-medium mb-1">
            Are you a member of any community savings groups (e.g., SACCOs)?
          </label>
          <select
            name="communitySavingsGroup"
            value={guarantorFinancialData.communitySavingsGroup || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="Yes, active member">Yes, active member</option>
            <option value="Yes, inactive member">Yes, inactive member</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Mobile Money Account */}
        <div className="p-4">
          <label className="block text-gray-700 font-medium mb-1">
            Do you have a mobile money account (e.g., M-Pesa, Airtel Money)?
          </label>
          <select
            name="mobileMoneyAccount"
            value={guarantorFinancialData.mobileMoneyAccount || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="Yes, actively used">Yes, actively used</option>
            <option value="Yes, rarely used">Yes, rarely used</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GuarantorMoreDetailsForm;
