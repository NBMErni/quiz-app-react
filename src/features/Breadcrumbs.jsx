import React from "react";

const Breadcrumbs = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-center flex-wrap">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center m-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === step ? "bg-yellow-400" : "bg-gray-400"
            } text-white`}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div className="w-8 h-1 bg-gray-400 mx-2"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
