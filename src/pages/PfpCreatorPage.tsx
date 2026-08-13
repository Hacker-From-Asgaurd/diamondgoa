import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../components/StepIndicator';
import { BackButton } from '../components/BackButton';
import { LivePreview } from '../components/LivePreview';
import { PfpFrameEditor } from '../components/PfpFrameEditor';
import { BuilderData } from '../types';
import { INITIAL_BUILDER_DATA } from '../utils/defaultData';

export const PfpCreatorPage: React.FC = () => {
  const navigate = useNavigate();
  const [builder, setBuilder] = useState<BuilderData>(INITIAL_BUILDER_DATA);

  return (
    <div className="min-h-screen bg-[#03502E] text-white flex flex-col font-sans selection:bg-[#FF007A] selection:text-white">


      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex justify-start">
          <BackButton onClick={() => navigate('/')} label="BACK TO HOME" />
        </div>
        {/* Step Indicator Header */}
        <StepIndicator
          currentStep={builder.photoUrl ? 3 : 2}
          totalSteps={3}
          title={builder.photoUrl ? "PREVIEW & DOWNLOAD PFP FRAME" : "CUSTOMIZE YOUR PFP FRAME"}
          subtitle={
            builder.photoUrl
              ? "Your profile overlay is ready! Review the live 1080x1080 preview below and download or share on X."
              : "Upload your avatar photo to apply the official HH Goa 2026 profile overlay frame."
          }
          onStepClick={(step) => {
            if (step === 1) navigate('/create-identity');
          }}
        />

        {/* Main Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch max-w-3xl mx-auto w-full">
          {/* LEFT COLUMN: PfpFrameEditor */}
          <div className="w-full h-full flex flex-col">
            <PfpFrameEditor builder={builder} setBuilder={setBuilder} />
          </div>

          {/* RIGHT COLUMN: Output Canvas & Download Buttons */}
          <div className="w-full h-full flex flex-col">
            <LivePreview
              builder={builder}
              mode="frame"
            />
          </div>
        </div>
      </main>


    </div>
  );
};
