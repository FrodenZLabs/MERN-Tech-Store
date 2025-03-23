/* eslint-disable react/prop-types */
const GuarantorPersonalDetailsForm = ({ guarantorData, setGuarantorData }) => {
  const handleChange = (e) => {
    setGuarantorData({ ...guarantorData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Guarantor Personal Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="guarantorName"
            value={guarantorData.guarantorName || ""}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-gray-700 font-medium">
            Date of Birth
          </label>
          <input
            type="date"
            name="guarantorDOB"
            value={guarantorData.guarantorDOB || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* ID Number */}
        <div>
          <label className="block text-gray-700 font-medium">ID Number</label>
          <input
            type="text"
            name="guarantorIdNumber"
            value={guarantorData.guarantorIdNumber}
            onChange={handleChange}
            placeholder="Enter ID Number"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-medium">Gender</label>
          <select
            name="guarantorGender"
            value={guarantorData.guarantorGender}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* KRA PIN */}
        <div>
          <label className="block text-gray-700 font-medium">KRA PIN</label>
          <input
            type="text"
            name="kraPin"
            value={guarantorData.kraPin || ""}
            onChange={handleChange}
            placeholder="Enter KRA PIN"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-gray-700 font-medium">
            Phone Number
          </label>
          <input
            type="text"
            name="guarantorPhone"
            value={guarantorData.guarantorPhone || ""}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Education Level */}
        <div>
          <label className="block text-gray-700 font-medium">
            Education Level
          </label>
          <select
            name="guarantorEducationLevel"
            value={guarantorData.guarantorEducationLevel || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Education Level</option>
            <option value="High School">High School</option>
            <option value="Bachelor’s Degree">Bachelor’s Degree</option>
            <option value="Master’s Degree">Master’s Degree</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        {/* Number of Dependants */}
        <div>
          <label className="block text-gray-700 font-medium">
            Number of Dependants
          </label>
          <input
            type="number"
            name="guarantorDependants"
            value={guarantorData.guarantorDependants || ""}
            onChange={handleChange}
            max={6}
            placeholder="Enter number of dependants"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Relationship to Student */}
        <div>
          <label className="block text-gray-700 font-medium">
            Relationship to Student
          </label>
          <select
            name="guarantorRelationship"
            value={guarantorData.guarantorRelationship || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Relationship</option>
            <option value="Parent">Parent</option>
            <option value="Guardian">Guardian</option>
            <option value="Sibling">Sibling</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-gray-700 font-medium">
            Marital Status
          </label>
          <select
            name="guarantorMaritalStatus"
            value={guarantorData.guarantorMaritalStatus || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GuarantorPersonalDetailsForm;
