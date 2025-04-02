import { Datepicker, Label, Select, TextInput } from "flowbite-react";

const GuarantorPersonalDetailsForm = ({ guarantorData, setGuarantorData }) => {
  const handleChange = (e) => {
    setGuarantorData({ ...guarantorData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Guarantor Personal Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Full Name */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Full Name
          </Label>
          <TextInput
            name="guarantorName"
            value={guarantorData.guarantorName || ""}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full"
            required
          />
        </div>

        {/* Date of Birth */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Date of Birth
          </Label>
          <input
            type="date"
            name="guarantorDOB"
            value={guarantorData.guarantorDOB || ""}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 text-sm"
          />
        </div>

        {/* ID Number */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            ID Number
          </label>
          <TextInput
            name="guarantorIdNumber"
            value={guarantorData.guarantorIdNumber}
            onChange={handleChange}
            placeholder="Enter ID Number"
            className="w-full"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">Gender</Label>
          <Select
            name="guarantorGender"
            value={guarantorData.guarantorGender}
            onChange={handleChange}
            className="w-full"
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
        </div>

        {/* KRA PIN */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            KRA PIN
          </Label>
          <TextInput
            name="kraPin"
            value={guarantorData.kraPin || ""}
            onChange={handleChange}
            placeholder="Enter KRA PIN"
            className="w-full"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Phone Number
          </Label>
          <TextInput
            name="guarantorPhone"
            value={guarantorData.guarantorPhone || ""}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full"
            required
          />
        </div>

        {/* Education Level */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Education Level
          </Label>
          <Select
            name="guarantorEducationLevel"
            value={guarantorData.guarantorEducationLevel || ""}
            onChange={handleChange}
            className="w-full"
            required
          >
            <option value="">Select Education Level</option>
            <option value="High School">High School</option>
            <option value="Bachelor’s Degree">Bachelor’s Degree</option>
            <option value="Master’s Degree">Master’s Degree</option>
            <option value="PhD">PhD</option>
          </Select>
        </div>

        {/* Number of Dependants */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Number of Dependants
          </Label>
          <TextInput
            name="guarantorDependants"
            value={guarantorData.guarantorDependants || ""}
            onChange={handleChange}
            max={6}
            placeholder="Enter number of dependants"
            className="w-full"
            required
          />
        </div>

        {/* Relationship to Student */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Relationship to Student
          </Label>
          <Select
            name="guarantorRelationship"
            value={guarantorData.guarantorRelationship || ""}
            onChange={handleChange}
            className="w-full"
            required
          >
            <option value="">Select Relationship</option>
            <option value="Parent">Parent</option>
            <option value="Guardian">Guardian</option>
            <option value="Sibling">Sibling</option>
            <option value="Other">Other</option>
          </Select>
        </div>

        {/* Marital Status */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Marital Status
          </Label>
          <Select
            name="guarantorMaritalStatus"
            value={guarantorData.guarantorMaritalStatus || ""}
            onChange={handleChange}
            className="w-full"
            required
          >
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default GuarantorPersonalDetailsForm;
