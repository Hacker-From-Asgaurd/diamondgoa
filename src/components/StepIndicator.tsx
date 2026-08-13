import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  title: string;
  subtitle?: string;
  onStepClick?: (step: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps = 3,
  title,
  subtitle,
  onStepClick,
}) => {
  return (
    <div className="space-y-4">

      {/* Heading & Subtitle */}
      <div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-[#FFE600] uppercase tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm font-mono text-emerald-100/90 mt-2 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

