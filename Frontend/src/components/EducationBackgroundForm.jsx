/* eslint-disable react/prop-types */
const EducationBackgroundForm = ({ educationData, setEducationData }) => {
  const handleChange = (e) => {
    setEducationData({ ...educationData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg h-[60vh] flex flex-col justify-center">
      <h2 className="text-xl font-semibold mb-4">Education Background</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Institution Level */}
        <div>
          <label className="block text-gray-700 font-medium">
            Institution Level
          </label>
          <select
            name="institutionLevel"
            value={educationData.institutionLevel || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Institution Level</option>
            <option value="University">University</option>
            <option value="College">College</option>
            <option value="Technical Institute">Technical Institute</option>
            <option value="Polytechnic">Polytechnic</option>
          </select>
        </div>

        {/* Institution Name */}
        <div>
          <label className="block text-gray-700 font-medium">
            Institution Name
          </label>
          <input
            type="text"
            name="institutionName"
            value={educationData.institutionName || ""}
            onChange={handleChange}
            placeholder="Enter institution name"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Institution Name */}
        <div>
          <label className="block text-gray-700 font-medium">
            Admission Number
          </label>
          <input
            type="text"
            name="admNumber"
            value={educationData.admNumber}
            onChange={handleChange}
            placeholder="Enter admission number"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Institution Name */}
        <div>
          <label className="block text-gray-700 font-medium">Course Name</label>
          <input
            type="text"
            name="course"
            value={educationData.course}
            onChange={handleChange}
            placeholder="Enter course name"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* School Type */}
        <div>
          <label className="block text-gray-700 font-medium">School Type</label>
          <select
            name="schoolType"
            value={educationData.schoolType || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select School Type</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* Exam Year Completion */}
        <div>
          <label className="block text-gray-700 font-medium">
            Exam Year Completion
          </label>
          <input
            type="number"
            name="examYearCompletion"
            value={educationData.examYearCompletion || ""}
            onChange={handleChange}
            placeholder="Enter year of exam completion"
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default EducationBackgroundForm;
