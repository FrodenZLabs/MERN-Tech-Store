import { Label, Select, TextInput } from "flowbite-react";

const GuarantorFinancialDetailsForm = ({ guarantorData, setGuarantorData }) => {
  const handleChange = (e) => {
    setGuarantorData({ ...guarantorData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4">
        Guarantor Financial Details
      </h2>
      <p className="text-gray-600 mb-6">
        These questions help in determining the guarantor&apos;s credit score.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 px-5">
        {/* Employment Status */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            What is your current employment status?
          </Label>
          <Select
            name="employmentStatus"
            value={guarantorData.employmentStatus || ""}
            onChange={handleChange}
            className="w-full"
            required
          >
            <option value="">Select Employment Status</option>
            <option value="Employed">Employed</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Unemployed">Unemployed</option>
          </Select>
        </div>

        {/* Employment Length */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            How many years have you been employed/self-employed?
          </Label>
          <TextInput
            type="number"
            name="employmentLength"
            value={guarantorData.employmentLength}
            onChange={handleChange}
            placeholder="Enter employment length"
            className="w-full"
            required
          />
        </div>

        {/* Monthly Income */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            What is your monthly income (Kshs.)?
          </Label>
          <TextInput
            type="number"
            name="income"
            value={guarantorData.income || ""}
            onChange={handleChange}
            placeholder="Enter monthly income"
            className="w-full"
            required
          />
        </div>

        {/* Additional Income */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Do you have any additional sources of income? (Kshs.)
          </Label>
          <TextInput
            type="number"
            name="additionalIncome"
            value={guarantorData.additionalIncome || ""}
            onChange={handleChange}
            placeholder="Enter additional income"
            className="w-full"
            required
          />
        </div>

        {/* Existing Loans */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Do you currently have any outstanding loans?
          </Label>
          <Select
            name="existingLoans"
            value={guarantorData.existingLoans || ""}
            onChange={handleChange}
            className="w-full"
            required
          >
            <option value="">Select</option>
            <option value="True">Yes</option>
            <option value="False">No</option>
          </Select>
        </div>

        {/* Outstanding Loan Amount */}
        {guarantorData.existingLoans === "True" && (
          <>
            <div>
              <Label className="block mb-2 text-gray-700 font-medium">
                What is the total outstanding loan amount (Kshs.)?
              </Label>
              <TextInput
                name="outstandingLoanAmount"
                value={guarantorData.outstandingLoanAmount}
                onChange={handleChange}
                placeholder="Enter outstanding loan amount"
                className="w-full"
                required
              />
            </div>
            <div>
              <Label className="block mb-2 text-gray-700 font-medium">
                How much do you pay monthly towards your loans? (Kshs.)
              </Label>
              <TextInput
                name="monthlyRepaymentAmount"
                value={guarantorData.monthlyRepaymentAmount}
                onChange={handleChange}
                placeholder="Enter monthly repayment"
                className="w-full"
              />
            </div>
          </>
        )}

        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            What are your estimated monthly expenses (Kshs.)?
          </Label>
          <TextInput
            name="monthlyExpenses"
            value={guarantorData.monthlyExpenses || ""}
            onChange={handleChange}
            placeholder="Enter monthly expenses"
            className="w-full"
            required
          />
        </div>

        {/* Missed Payments Last Year */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            How many loan payments did you miss last year?
          </Label>
          <TextInput
            name="missedPaymentsLastYear"
            value={guarantorData.missedPaymentsLastYear || ""}
            onChange={handleChange}
            placeholder="Enter number of missed payments"
            className="w-full"
            required
          />
        </div>

        {/* Financial Counseling */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Have you ever attended a financial counseling session
            (online/physical)?
          </Label>
          <Select
            name="financialCounseling"
            value={guarantorData.financialCounseling || ""}
            onChange={handleChange}
            className="w-full"
            required
          >
            <option value="">Select</option>
            <option value="True">Yes</option>
            <option value="False">No</option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default GuarantorFinancialDetailsForm;
