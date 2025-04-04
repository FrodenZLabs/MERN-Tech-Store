import { Label, Select, TextInput } from "flowbite-react";

const EducationBackgroundForm = ({ educationData, setEducationData }) => {
  const handleChange = (e) => {
    setEducationData({ ...educationData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg flex flex-col justify-center">
      <h2 className="text-xl font-semibold mb-4">Education Background</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Institution Level */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Institution Level
          </Label>
          <Select
            name="institutionLevel"
            value={educationData.institutionLevel || ""}
            onChange={handleChange}
            className="w-full"
            required
          >
            <option value="">Select Institution Level</option>
            <option value="University">University</option>
            <option value="College">College</option>
            <option value="Technical Institute">Technical Institute</option>
            <option value="Polytechnic">Polytechnic</option>
          </Select>
        </div>

        {/* Institution Name */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Institution Name
          </Label>
          <TextInput
            name="institutionName"
            value={educationData.institutionName || ""}
            onChange={handleChange}
            placeholder="Enter institution name"
            className="w-full"
            required
          />
        </div>

        {/* Institution Name */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Admission Number
          </Label>
          <TextInput
            name="admNumber"
            value={educationData.admNumber}
            onChange={handleChange}
            placeholder="Enter admission number"
            className="w-full"
            required
          />
        </div>

        {/* Institution Name */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Course Name
          </Label>
          <TextInput
            name="course"
            value={educationData.course}
            onChange={handleChange}
            placeholder="Enter course name"
            className="w-full"
            required
          />
        </div>

        {/* School Type */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            School Type
          </Label>
          <Select
            name="schoolType"
            value={educationData.schoolType || ""}
            onChange={handleChange}
            className="w-full"
            required
          >
            <option value="">Select School Type</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </Select>
        </div>

        {/* Exam Year Completion */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Exam Year Completion
          </Label>
          <TextInput
            name="examYearCompletion"
            value={educationData.examYearCompletion || ""}
            onChange={handleChange}
            placeholder="Enter year of exam completion"
            className="w-full"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default EducationBackgroundForm;
