/* eslint-disable react/prop-types */

const PersonalInfoForm = ({ personalData, setPersonalData }) => {
  const handleChange = (e) => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg h-[70vh] flex flex-col justify-center">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={personalData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* ID Number */}
        <div>
          <label className="block text-gray-700 font-medium">ID Number</label>
          <input
            type="text"
            name="idNumber"
            value={personalData.idNumber}
            onChange={handleChange}
            placeholder="Enter your ID number"
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
            name="dob"
            value={personalData.dob}
            onChange={handleChange}
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
            name="phoneNumber"
            value={personalData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-medium">Gender</label>
          <select
            name="gender"
            value={personalData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-gray-700 font-medium">
            Marital Status
          </label>
          <select
            name="maritalStatus"
            value={personalData.maritalStatus}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
        </div>

        {/* Profile Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium">
            Profile Image
          </label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                profileImage: e.target.files[0],
              })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* ID Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium">ID Image</label>
          <input
            type="file"
            name="idImage"
            accept="image/*"
            onChange={(e) =>
              setPersonalData({ ...personalData, idImage: e.target.files[0] })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
