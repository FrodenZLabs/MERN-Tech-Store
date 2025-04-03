import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReviewSubmitForm from "../../components/Credit Assessment/ReviewSubmitForm";
import ResidenceDetailsForm from "../../components/Credit Assessment/ResidenceDetailsForm";
import PersonalInfoForm from "../../components/Credit Assessment/PersonalInfoForm";
import GuarantorPersonalDetailsForm from "../../components/Credit Assessment/GuarantorPersonalDetailsForm";
import GuarantorFinancialDetailsForm from "../../components/Credit Assessment/GuarantorFinancialDetailsForm";
import GuarantorMoreDetailsForm from "../../components/Credit Assessment/GuarantorMoreDetailsForm";
import EducationBackgroundForm from "../../components/Credit Assessment/EducationBackgroundForm";
import Stepper from "../../components/StepperSection";
import { steps } from "../../helpers/StepperSteps";
import { createClient, createGuarantor } from "../../services/userService";
import {
  setEducationData,
  setGuarantorData,
  setGuarantorFinancialData,
  setPersonalData,
  setResidenceData,
} from "../../redux/reducers/formSlice";
import { Button } from "flowbite-react";
import { HashLoader } from "react-spinners";

const CreditAssessmentPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.form);
  const { currentUser } = useSelector((state) => state.authentication);
  const userId = currentUser.user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("User not authenticated. Please log in.");
      return;
    }

    try {
      setLoading(true);
      // Extract form data
      const { personalData, residenceData, educationData, guarantorData } =
        formData;

      // Construct client payload
      const clientPayload = {
        userId,
        first_name: personalData.firstName,
        last_name: personalData.lastName,
        id_number: personalData.idNumber,
        phone_no: personalData.phoneNumber,
        gender: personalData.gender,
        marital_status: personalData.maritalStatus,
        profileImage: personalData.profileImage,
        idImage: personalData.idImage,
        date_of_birth: personalData.dob,
        institution_level: educationData.institutionLevel,
        institution_name: educationData.institutionName,
        course: educationData.course,
        adm_number: educationData.admNumber,
        school_type: educationData.schoolType,
        completion_year: educationData.examYearCompletion,
        nearest_primary_school: residenceData.nearestPrimarySchool,
        estate_village: residenceData.estateVillage,
        town_city: residenceData.townCity,
        constituency: residenceData.constituency,
        county: residenceData.county,
      };
      // Construct guarantor payload
      const guarantorPayload = {
        userId,
        full_name: guarantorData.guarantorName,
        phone_no: guarantorData.guarantorPhone,
        id_number: guarantorData.guarantorIdNumber,
        gender: guarantorData.guarantorGender,
        kra_pin: guarantorData.kraPin,
        date_of_birth: guarantorData.guarantorDOB,
        marital_status: guarantorData.guarantorMaritalStatus,
        no_of_dependants: guarantorData.guarantorDependants,
        education_level: guarantorData.guarantorEducationLevel,
        relationship_to_student: guarantorData.guarantorRelationship,
      };
      const clientResponse = await createClient(clientPayload);
      const guarantorResponse = await createGuarantor(guarantorPayload);

      toast.success(clientResponse.message);
      toast.success(guarantorResponse.message);

      setTimeout(() => {
        setLoading(false);
        navigate("/credit-prediction");
      }, 5000);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="py-3 mt-5">
      <div className="max-w-6xl mx-auto">
        {/* Full-screen loader */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
            <HashLoader color="#ffcb00" size={200} />
          </div>
        )}

        <h1 className="text-center text-3xl">
          Please fill in the following form to determine your credit worthiness.
        </h1>
        <Stepper currentStep={currentStep} />

        {/* Form content based on currentStep */}
        <div className="">
          {currentStep === 0 && (
            <PersonalInfoForm
              personalData={formData.personalData}
              setPersonalData={(data) => dispatch(setPersonalData(data))}
            />
          )}
          {currentStep === 1 && (
            <ResidenceDetailsForm
              residenceData={formData.residenceData}
              setResidenceData={(data) => dispatch(setResidenceData(data))}
            />
          )}
          {currentStep === 2 && (
            <EducationBackgroundForm
              educationData={formData.educationData}
              setEducationData={(data) => dispatch(setEducationData(data))}
            />
          )}
          {currentStep === 3 && (
            <GuarantorPersonalDetailsForm
              guarantorData={formData.guarantorData}
              setGuarantorData={(data) => dispatch(setGuarantorData(data))}
            />
          )}
          {currentStep === 4 && (
            <GuarantorFinancialDetailsForm
              guarantorData={formData.guarantorData}
              setGuarantorData={(data) => dispatch(setGuarantorData(data))}
            />
          )}
          {currentStep === 5 && (
            <GuarantorMoreDetailsForm
              guarantorFinancialData={formData.guarantorFinancialData}
              setGuarantorFinancialData={(data) =>
                dispatch(setGuarantorFinancialData(data))
              }
            />
          )}
          {currentStep === 6 && (
            <ReviewSubmitForm
              personalData={formData.personalData}
              residenceData={formData.residenceData}
              educationData={formData.educationData}
              guarantorData={formData.guarantorData}
              guarantorFinancialData={formData.guarantorFinancialData}
              loading={loading}
              handleSubmit={handleSubmit}
              handleEdit={() => setCurrentStep(0)}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between p-6">
          <Button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-2 rounded-lg disabled:opacity-0 focus:ring-0"
          >
            Previous
          </Button>

          <Button
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
            disabled={currentStep === steps.length - 1}
            className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-2 rounded-lg disabled:opacity-0 focus:ring-0"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreditAssessmentPage;
