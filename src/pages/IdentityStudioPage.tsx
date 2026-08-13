import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../components/StepIndicator';
import { IdentityFormatCard } from '../components/IdentityFormatCard';
import { BackButton } from '../components/BackButton';

export const IdentityStudioPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-fit bg-[#03502E] text-white flex flex-col font-sans selection:bg-[#FF007A] selection:text-white">

      {/* Main Content Area matching visual reference */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center space-y-8 sm:space-y-10">
        
        {/* Step Indicator Header */}
        <StepIndicator
          currentStep={1}
          totalSteps={3}
          title="CHOOSE YOUR FORMAT"
          subtitle="Select the type of identity graphic you want to create."
        />

        {/* 2 Equal Format Option Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-2">
          {/* Card 1: PFP Frame */}
          <IdentityFormatCard
            id="frame"
            titlePrefix="PFP"
            titleSuffix="FRAME"
            dimensions="1080 × 1080"
            badgeTag="PROFILE PICTURE OVERLAY"
            description="Profile picture overlay with HH Goa branding. Ideal for your X, Discord, and Telegram avatars."
            onSelect={() => navigate('/create-identity/pfp')}
          />

          {/* Card 2: Builder ID Card */}
          <IdentityFormatCard
            id="solo"
            titlePrefix="BUILDER"
            titleSuffix="ID CARD"
            dimensions="1080 × 1350"
            badgeTag="SOCIAL EVENT BADGE"
            description="Social event badge with your name, stack, and builder title. Perfect for sharing your hackathon pass."
            onSelect={() => navigate('/create-identity/builder')}
          />
        </div>

        {/* Bottom Centered Note */}
        <div className="text-center font-mono text-xs text-emerald-200/70 pt-2 select-none">
          <span>✦ Both formats generate high-resolution, instant shareable PNG graphics ✦</span>
        </div>
      </main>


    </div>
  );
};

