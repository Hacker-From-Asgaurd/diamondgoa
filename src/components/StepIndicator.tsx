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
      {/* Top step bar / indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#FF007A] rounded-full" />
          <span className="text-xs font-mono font-extrabold text-[#FFE600] tracking-widest uppercase">
            STEP {currentStep} OF {totalSteps}
          </span>
        </div>

        {/* Step progress pills */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
            const isActive = step === currentStep;
            const isCompleted = step < currentStep;
            return (
              <button
                key={step}
                onClick={() => isCompleted && onStepClick?.(step)}
                disabled={!isCompleted}
                aria-label={`Go to step ${step}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-8 bg-[#FFE600]'
                    : isCompleted
                    ? 'w-4 bg-[#FF007A] cursor-pointer hover:bg-[#FF007A]/80'
                    : 'w-4 bg-[#023D23] border border-emerald-700/50'
                }`}
              />
            );
          })}
        </div>
      </div>

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

