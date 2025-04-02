import { Label, TextInput } from "flowbite-react";

const ResidenceDetailsForm = ({ residenceData, setResidenceData }) => {
  const handleChange = (e) => {
    setResidenceData({ ...residenceData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg h-[55vh] flex flex-col justify-center">
      <h2 className="text-xl font-semibold mb-4">Residence Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Nearest Primary School */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Nearest Primary School
          </Label>
          <TextInput
            name="nearestPrimarySchool"
            value={residenceData.nearestPrimarySchool || ""}
            onChange={handleChange}
            placeholder="Enter nearest primary school"
            className="w-full"
            required
          />
        </div>

        {/* Estate/Village */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Estate/Village
          </Label>
          <TextInput
            name="estateVillage"
            value={residenceData.estateVillage || ""}
            onChange={handleChange}
            placeholder="Enter estate or village"
            className="w-full"
            required
          />
        </div>

        {/* Town/City */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Town/City
          </Label>
          <TextInput
            name="townCity"
            value={residenceData.townCity || ""}
            onChange={handleChange}
            placeholder="Enter town or city"
            className="w-full"
            required
          />
        </div>

        {/* Constituency */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">
            Constituency
          </Label>
          <TextInput
            name="constituency"
            value={residenceData.constituency || ""}
            onChange={handleChange}
            placeholder="Enter constituency"
            className="w-full"
            required
          />
        </div>

        {/* County */}
        <div>
          <Label className="block mb-2 text-gray-700 font-medium">County</Label>
          <TextInput
            name="county"
            value={residenceData.county || ""}
            onChange={handleChange}
            placeholder="Enter county"
            className="w-full"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ResidenceDetailsForm;
