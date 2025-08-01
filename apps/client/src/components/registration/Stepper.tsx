import React from 'react';

interface StepperProps {
  currentStep: number;
  totalSteps?: number;
}

export default function Stepper({ currentStep, totalSteps = 3 }: StepperProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
            currentStep >= step ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            {step}
          </div>
          {index < steps.length - 1 && (
            <div className={`h-1 flex-1 ${currentStep >= step + 1 ? 'bg-red-400' : 'bg-gray-300'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}