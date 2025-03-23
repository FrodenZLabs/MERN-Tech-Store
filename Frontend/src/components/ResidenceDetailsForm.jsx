/* eslint-disable react/prop-types */
const ResidenceDetailsForm = ({ residenceData, setResidenceData }) => {
  const handleChange = (e) => {
    setResidenceData({ ...residenceData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg h-[70vh] flex flex-col justify-center">
      <h2 className="text-xl font-semibold mb-4">Residence Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nearest Primary School */}
        <div>
          <label className="block text-gray-700 font-medium">
            Nearest Primary School
          </label>
          <input
            type="text"
            name="nearestPrimarySchool"
            value={residenceData.nearestPrimarySchool || ""}
            onChange={handleChange}
            placeholder="Enter nearest primary school"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Estate/Village */}
        <div>
          <label className="block text-gray-700 font-medium">
            Estate/Village
          </label>
          <input
            type="text"
            name="estateVillage"
            value={residenceData.estateVillage || ""}
            onChange={handleChange}
            placeholder="Enter estate or village"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Town/City */}
        <div>
          <label className="block text-gray-700 font-medium">Town/City</label>
          <input
            type="text"
            name="townCity"
            value={residenceData.townCity || ""}
            onChange={handleChange}
            placeholder="Enter town or city"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Constituency */}
        <div>
          <label className="block text-gray-700 font-medium">
            Constituency
          </label>
          <input
            type="text"
            name="constituency"
            value={residenceData.constituency || ""}
            onChange={handleChange}
            placeholder="Enter constituency"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* County */}
        <div>
          <label className="block text-gray-700 font-medium">County</label>
          <input
            type="text"
            name="county"
            value={residenceData.county || ""}
            onChange={handleChange}
            placeholder="Enter county"
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ResidenceDetailsForm;
