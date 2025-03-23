/* eslint-disable react/prop-types */
const ReviewSubmitForm = ({
  personalData,
  residenceData,
  educationData,
  guarantorData,
  guarantorFinancialData,
  loading,
  handleSubmit,
  handleEdit,
}) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold uppercase mb-4">Review & Submit</h2>
      <p className="text-gray-600 mb-4">
        Please review all details before submitting.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-md bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">
            📌 Personal Information
          </h3>
          <p>
            <strong>Name:</strong> {personalData.fullName}
          </p>
          <p>
            <strong>ID Number:</strong> {personalData.idNumber}
          </p>
          <p>
            <strong>Date of Birth:</strong> {personalData.dob}
          </p>
          <p>
            <strong>Phone Number:</strong> {personalData.phoneNumber}
          </p>
          <p>
            <strong>Gender:</strong> {personalData.gender}
          </p>
          <p>
            <strong>Marital Status:</strong> {personalData.maritalStatus}
          </p>
        </div>

        <div className="border p-4 rounded-md bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">📌 Residence Details</h3>
          <p>
            <strong>Nearest Primary School:</strong>{" "}
            {residenceData.nearestPrimarySchool}
          </p>
          <p>
            <strong>Estate/Village:</strong> {residenceData.estateVillage}
          </p>
          <p>
            <strong>Town/City:</strong> {residenceData.townCity}
          </p>
          <p>
            <strong>Constituency:</strong> {residenceData.constituency}
          </p>
          <p>
            <strong>County:</strong> {residenceData.county}
          </p>
        </div>

        <div className="border p-4 rounded-md bg-gray-100 mt-4">
          <h3 className="text-lg font-semibold mb-2">
            📌 Education Background
          </h3>
          <p>
            <strong>Institution Level:</strong> {educationData.institutionLevel}
          </p>
          <p>
            <strong>Institution Name:</strong> {educationData.institutionName}
          </p>
          <p>
            <strong>Admission Name:</strong> {educationData.admNumber}
          </p>
          <p>
            <strong>Course Name:</strong> {educationData.course}
          </p>
          <p>
            <strong>School Type:</strong> {educationData.schoolType}
          </p>
          <p>
            <strong>Exam Completion Year:</strong>{" "}
            {educationData.examYearCompletion}
          </p>
        </div>

        <div className="border p-4 rounded-md bg-gray-100 mt-4">
          <h3 className="text-lg font-semibold mb-2">
            📌 Guarantor Personal Details
          </h3>
          <p>
            <strong>Name:</strong> {guarantorData.guarantorName}
          </p>
          <p>
            <strong>Date of Birth:</strong> {guarantorData.guarantorDOB}
          </p>
          <p>
            <strong>Id Number:</strong> {guarantorData.guarantorIdNumber}
          </p>
          <p>
            <strong>KRA PIN:</strong> {guarantorData.kraPin}
          </p>
          <p>
            <strong>Phone Number:</strong> {guarantorData.guarantorPhone}
          </p>
          <p>
            <strong>Education Level:</strong>{" "}
            {guarantorData.guarantorEducationLevel}
          </p>
          <p>
            <strong>No. of Dependents:</strong>{" "}
            {guarantorData.guarantorDependants}
          </p>
          <p>
            <strong>Relationship to Student:</strong>{" "}
            {guarantorData.guarantorRelationship}
          </p>
          <p>
            <strong>Marital Status:</strong>{" "}
            {guarantorData.guarantorMaritalStatus}
          </p>
          <p>
            <strong>Gender:</strong> {guarantorData.guarantorGender}
          </p>
        </div>

        <div className="border p-4 rounded-md bg-gray-100 mt-4">
          <h3 className="text-lg font-semibold mb-2">
            📌 Guarantor Financial Details
          </h3>
          <p>
            <strong>Employment Status:</strong> {guarantorData.employmentStatus}
          </p>
          <p>
            <strong>Employment Length:</strong> {guarantorData.employmentLength}
          </p>
          <p>
            <strong>Income (KES):</strong>{" "}
            {Number(guarantorData.income).toLocaleString()}
          </p>
          <p>
            <strong>Additional Income:</strong>{" "}
            {Number(guarantorData.additionalIncome).toLocaleString()}
          </p>
          <p>
            <strong>Existing Loans:</strong> {guarantorData.existingLoans}
          </p>
          <p>
            <strong>Outstanding Loan Amount:</strong>{" "}
            {Number(guarantorData.outstandingLoanAmount).toLocaleString()}
          </p>
          <p>
            <strong>Monthly Repayment:</strong>{" "}
            {Number(guarantorData.monthlyRepaymentAmount).toLocaleString()}
          </p>
          <p>
            <strong>Monthly Expenses:</strong>{" "}
            {Number(guarantorData.monthlyExpenses).toLocaleString()}
          </p>
          <p>
            <strong>Missed Payments Last Year:</strong>{" "}
            {guarantorData.missedPaymentsLastYear}
          </p>
          <p>
            <strong>Financial Counseling:</strong>{" "}
            {guarantorData.financialCounseling}
          </p>
        </div>

        <div className="border p-4 rounded-md bg-gray-100 mt-4">
          <h3 className="text-lg font-semibold mb-2">
            📌 More Details from Guarantor
          </h3>
          <p>
            <strong>Utility Bill Payment:</strong>{" "}
            {guarantorFinancialData.utilityBillPayment}
          </p>
          <p>
            <strong>Service Deposit Required:</strong>{" "}
            {guarantorFinancialData.serviceDepositRequired}
          </p>
          <p>
            <strong>Debt Collection History:</strong>{" "}
            {guarantorFinancialData.debtCollectionHistory}
          </p>
          <p>
            <strong>Savings Account:</strong>{" "}
            {guarantorFinancialData.savingsAccount}
          </p>
          <p>
            <strong>Employment Tenure:</strong>{" "}
            {guarantorFinancialData.employmentTenure}
          </p>
          <p>
            <strong>Additional Income:</strong>{" "}
            {guarantorFinancialData.additionalIncome}
          </p>
          <p>
            <strong>Housing Status:</strong>{" "}
            {guarantorFinancialData.housingStatus}
          </p>
          <p>
            <strong>Eviction History:</strong>{" "}
            {guarantorFinancialData.evictionHistory}
          </p>
          <p>
            <strong>Community Savings Group:</strong>{" "}
            {guarantorFinancialData.communitySavingsGroup}
          </p>
          <p>
            <strong>Mobile Money Account:</strong>{" "}
            {guarantorFinancialData.mobileMoneyAccount}
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleEdit}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Edit Details
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {loading ? "Processing..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmitForm;
