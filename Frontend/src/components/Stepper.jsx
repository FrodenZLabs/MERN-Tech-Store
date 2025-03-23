import { steps } from "../constants/StepperSteps";
import { GiCheckMark } from "react-icons/gi";

// eslint-disable-next-line react/prop-types
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
                ? "bg-green-500"
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
                    ? "text-green-500"
                    : "text-gray-300"
                }`}
              >
                {step}
              </p>

              {/* Step Connector Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 w-full h-1 ${
                    index < currentStep ? "bg-green-500" : "bg-gray-300"
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
