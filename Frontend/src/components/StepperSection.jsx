import { GiCheckMark } from "react-icons/gi";
import { steps } from "../helpers/StepperSteps";

const Stepper = ({ currentStep }) => {
  return (
    <div className="flex justify-center items-center my-6">
      <div className="flex w-full max-w-6xl">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <div className="relative flex flex-col items-center">
              {/* Step Indicator */}
              <div
                className={`w-10 h-10 z-10 flex items-center justify-center rounded-full text-white font-bold transition-all
            ${
              index === currentStep
                ? "bg-blue-500"
                : index < currentStep
                ? "bg-[#24cc24]"
                : "bg-gray-300"
            }`}
              >
                {index < currentStep ? <GiCheckMark size={18} /> : index + 1}
              </div>

              {/* Step Label */}
              <p
                className={`text-sm text-center font-semibold mt-2 ${
                  index === currentStep
                    ? "text-blue-500"
                    : index < currentStep
                    ? "text-[#24cc24]"
                    : "text-gray-300"
                }`}
              >
                {step}
              </p>

              {/* Step Connector Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 w-full h-1 ${
                    index < currentStep ? "bg-[#24cc24]" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
