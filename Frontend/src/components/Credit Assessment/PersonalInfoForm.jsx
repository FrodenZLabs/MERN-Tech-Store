import {
  Datepicker,
  FileInput,
  Label,
  Select,
  TextInput,
} from "flowbite-react";

const PersonalInfoForm = ({ personalData, setPersonalData }) => {
  const handleChange = (e) => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white px-6 py-10 rounded-md shadow-lg flex flex-col justify-center">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Full Name */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            First Name
          </Label>
          <TextInput
            name="firstName"
            value={personalData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="w-full"
            required
          />
        </div>

        {/* Full Name */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Last Name
          </Label>
          <TextInput
            name="lastName"
            value={personalData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="w-full"
            required
          />
        </div>

        {/* ID Number */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            ID Number
          </Label>
          <TextInput
            name="idNumber"
            value={personalData.idNumber}
            onChange={handleChange}
            placeholder="Enter your ID number"
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
            name="dob"
            value={personalData.dob}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 text-sm"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Phone Number
          </Label>
          <TextInput
            name="phoneNumber"
            value={personalData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">Gender</Label>
          <Select
            name="gender"
            value={personalData.gender}
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

        {/* Marital Status */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Marital Status
          </Label>
          <Select
            name="maritalStatus"
            value={personalData.maritalStatus}
            onChange={handleChange}
            className="w-full"
            required
          >
            <option value="">Select status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </Select>
        </div>

        {/* Profile Image Upload */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Profile Image
          </Label>
          <FileInput
            name="profileImage"
            accept="image/*"
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                profileImage: e.target.files[0],
              })
            }
            className="w-full"
          />
        </div>

        {/* ID Image Upload */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            ID Image
          </Label>
          <FileInput
            name="idImage"
            accept="image/*"
            onChange={(e) =>
              setPersonalData({ ...personalData, idImage: e.target.files[0] })
            }
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
