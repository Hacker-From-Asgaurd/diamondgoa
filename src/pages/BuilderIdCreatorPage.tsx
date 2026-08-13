import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../components/StepIndicator';
import { BackButton } from '../components/BackButton';
import { LivePreview } from '../components/LivePreview';
import { BuilderData } from '../types';
import { INITIAL_BUILDER_DATA } from '../utils/defaultData';
import { Upload, User, Briefcase, RefreshCw, ZoomIn, Camera, Shuffle, Zap, Pencil, Check } from 'lucide-react';
import { handleInstantImageUpload, isHeic } from '../utils/imageUtils';
import { CameraModal } from '../components/CameraModal';

const BUILDER_CLASSES = [
  { label: 'Terminal Wizard', emoji: '🧙‍♂️', desc: 'Lives in the CLI. Ships in the dark.' },
  { label: 'Solana Degen', emoji: '⚡', desc: 'On-chain by day, by night, always.' },
  { label: 'Full Stack Phantom', emoji: '👻', desc: 'Front, back, infra. No mercy.' },
  { label: 'AI Overlord', emoji: '🤖', desc: 'Prompts models, builds empires.' },
  { label: 'Rust Evangelist', emoji: '🦀', desc: 'Undefined behavior? Not on my watch.' },
  { label: 'Design Hacker', emoji: '🎨', desc: 'Makes it look good AND ship fast.' },
];

export const BuilderIdCreatorPage: React.FC = () => {
  const navigate = useNavigate();
  const [builder, setBuilder] = useState<BuilderData>(INITIAL_BUILDER_DATA);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertError, setConvertError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const conversionToken = useRef(0);
  const [isEditingClass, setIsEditingClass] = useState(false);
  const [customClass, setCustomClass] = useState('');

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setConvertError(null);
    const token = ++conversionToken.current;

    if (isHeic(file)) {
      setIsConverting(true);
    }

    handleInstantImageUpload(
      file,
      (instantUrl) => {
        if (token === conversionToken.current) {
          setBuilder(prev => ({ ...prev, photoUrl: instantUrl, zoom: 1, panX: 0, panY: 0 }));
        }
      },
      (convertedUrl) => {
        if (token === conversionToken.current) {
          setIsConverting(false);
          setBuilder(prev => ({ ...prev, photoUrl: convertedUrl }));
        }
      },
      (err) => {
        if (token === conversionToken.current) {
          setIsConverting(false);
          setConvertError('HEIC conversion failed. Please try a standard JPG/PNG.');
          console.error('HEIC background conversion error:', err);
        }
      }
    );
  }, []);

  const handleRefresh = () => {
    setBuilder(INITIAL_BUILDER_DATA);
  };

  return (
    <div className="min-h-screen bg-[#03502E] text-white flex flex-col font-sans selection:bg-[#FF007A] selection:text-white">


      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <div className="flex justify-start">
          <BackButton onClick={() => navigate('/')} label="BACK TO HOME" />
        </div>
        {/* Step Indicator Header */}
        <StepIndicator
          currentStep={2}
          totalSteps={3}
          title="CUSTOMIZE YOUR BUILDER ID CARD"
          subtitle="Submit your builder photo and fill out your details to render your official event badge."
          onStepClick={(step) => {
            if (step === 1) navigate('/create-identity');
          }}
        />

        {/* Main Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch max-w-6xl mx-auto w-full">
          {/* LEFT COLUMN: Customization Form */}
          <div className="w-full h-full flex flex-col">
            <div className="bg-[#FFFDF0] text-[#023D23] border border-amber-200/70 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col justify-start space-y-4 w-full h-full">
              {/* Step 1: Upload Photo */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-3 bg-[#023D23] rounded-full" />
                    <label className="block text-[11px] font-mono font-extrabold text-[#023D23] uppercase tracking-wider">
                      1. SUBMIT YOUR IMAGE
                    </label>
                  </div>
                  <button
                    onClick={handleRefresh}
                    className="text-[11px] font-mono font-bold text-[#023D23] hover:text-white bg-[#023D23]/5 hover:bg-[#023D23] px-2 py-0.5 rounded transition-all flex items-center gap-1 cursor-pointer"
                    title="Reset to default details"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Refresh
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-36 border-2 border-dashed border-[#023D23]/30 hover:border-[#023D23] bg-white hover:bg-[#F9F7F2] rounded-xl p-2.5 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group relative shadow-2xs"
                  >
                    {isConverting ? (
                      <>
                        <RefreshCw className="w-5 h-5 text-[#023D23] animate-spin mb-1" />
                        <span className="text-[11px] font-mono font-extrabold text-[#023D23] tracking-wider animate-pulse">CONVERTING HEIC...</span>
                        <span className="inline-block bg-[#023D23]/5 text-[#023D23]/70 font-mono text-[9px] font-bold px-2 py-0.5 rounded tracking-wider mt-0.5">
                          Optimizing image format...
                        </span>
                      </>
                    ) : convertError ? (
                      <>
                        <span className="text-[11px] font-mono font-bold text-red-600 text-center px-2">{convertError}</span>
                        <span className="text-[9px] text-[#023D23]/60 font-mono mt-0.5">Click to try again</span>
                      </>
                    ) : (
                      <>
                        <div className="w-7 h-7 rounded-full bg-[#023D23]/10 group-hover:bg-[#023D23] text-[#023D23] group-hover:text-[#FFE600] flex items-center justify-center transition-colors mb-1">
                          <Upload className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                        </div>
                        <span className="text-[11px] font-mono font-extrabold text-[#023D23] tracking-wider">CLICK TO UPLOAD</span>
                        <span className="inline-block bg-[#023D23]/5 text-[#023D23]/70 font-mono text-[9px] font-bold px-2 py-0.5 rounded tracking-wider mt-0.5">
                          JPG · PNG · HEIC · WEBP
                        </span>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCameraOpen(true)}
                    className="w-full py-2.5 px-4 bg-[#023D23] hover:bg-[#012515] text-[#FFE600] rounded-xl font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                  >
                    <Camera className="w-4 h-4 text-[#FFE600]" />
                    <span>USE LIVE DEVICE CAMERA</span>
                  </button>

                  <CameraModal
                    isOpen={isCameraOpen}
                    onClose={() => setIsCameraOpen(false)}
                    onCapture={(capturedDataUrl) => {
                      setBuilder(prev => ({
                        ...prev,
                        photoUrl: capturedDataUrl,
                        zoom: 1,
                        panX: 0,
                        panY: 0,
                      }));
                    }}
                  />

                  {/* Photo Zoom & Pan Position Controls */}
                  <div className="w-full space-y-2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#023D23] font-extrabold flex items-center gap-1">
                        <ZoomIn className="w-3 h-3 text-[#023D23]" /> ZOOM ({builder.zoom.toFixed(1)}x)
                      </span>
                      <button
                        onClick={() => setBuilder((prev) => ({ ...prev, zoom: 1, panX: 0, panY: 0 }))}
                        className="text-[9px] text-[#023D23] font-mono underline font-bold"
                      >
                        Reset
                      </button>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.05"
                      value={builder.zoom}
                      onChange={(e) => setBuilder((prev) => ({ ...prev, zoom: parseFloat(e.target.value) }))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#023D23]"
                    />

                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <div>
                        <span className="text-[9px] font-mono text-[#023D23] font-bold block mb-0.5">X PLANE</span>
                        <input
                          type="range"
                          min="-80"
                          max="80"
                          value={builder.panX}
                          onChange={(e) => setBuilder((prev) => ({ ...prev, panX: parseInt(e.target.value) }))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#023D23]"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-[#023D23] font-bold block mb-0.5">Y PLANE</span>
                        <input
                          type="range"
                          min="-80"
                          max="80"
                          value={builder.panY}
                          onChange={(e) => setBuilder((prev) => ({ ...prev, panY: parseInt(e.target.value) }))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#023D23]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Name & Details */}
              <div className="space-y-3 pt-2.5 border-t border-[#023D23]/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-[#023D23] rounded-full" />
                  <label className="block text-[11px] font-mono font-extrabold text-[#023D23] uppercase tracking-wider">
                    2. YOUR BUILDER DETAILS
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#023D23] uppercase mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#023D23]" /> FULL NAME
                  </label>
                  <input
                    type="text"
                    value={builder.name}
                    onChange={(e) => setBuilder((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="MADHAVAN SINGH"
                    className="w-full bg-white border border-[#023D23]/25 focus:border-[#023D23] focus:ring-1 focus:ring-[#023D23] rounded-xl px-3 py-1.5 text-xs text-[#023D23] font-mono font-bold uppercase transition-all shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#023D23] uppercase mb-1 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#023D23]" /> ROLE / SPECIALTY
                  </label>
                  <input
                    type="text"
                    value={builder.role}
                    onChange={(e) => setBuilder((prev) => ({ ...prev, role: e.target.value }))}
                    placeholder="FULL STACK DEVELOPER"
                    className="w-full bg-white border border-[#023D23]/25 focus:border-[#023D23] focus:ring-1 focus:ring-[#023D23] rounded-xl px-3 py-1.5 text-xs text-[#023D23] font-mono font-bold uppercase transition-all shadow-2xs"
                  />
                </div>

                {/* Builder Class */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#023D23] uppercase mb-1 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#023D23]" /> BUILDER CLASS
                  </label>
                  <div className="flex items-center gap-2">
                    {isEditingClass ? (
                      <input
                        type="text"
                        autoFocus
                        value={customClass}
                        onChange={(e) => setCustomClass(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (customClass.trim()) setBuilder(prev => ({ ...prev, builderClass: customClass.trim() }));
                            setIsEditingClass(false);
                          }
                          if (e.key === 'Escape') setIsEditingClass(false);
                        }}
                        placeholder="TYPE YOUR CLASS..."
                        className="flex-1 bg-white border border-[#023D23] focus:ring-1 focus:ring-[#023D23] rounded-xl px-3 py-1.5 text-xs text-[#023D23] font-mono font-bold uppercase transition-all shadow-2xs"
                      />
                    ) : (
                      <div className="flex-1 bg-white border border-[#023D23]/25 rounded-xl px-3 py-1.5 text-xs text-[#023D23] font-mono font-bold uppercase shadow-2xs truncate">
                        {builder.builderClass || 'SELECT A CLASS'}
                      </div>
                    )}
                    {isEditingClass ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (customClass.trim()) setBuilder(prev => ({ ...prev, builderClass: customClass.trim() }));
                          setIsEditingClass(false);
                        }}
                        className="flex items-center gap-1 bg-[#023D23] hover:bg-[#012515] text-[#FFE600] rounded-xl px-3 py-1.5 text-[10px] font-mono font-extrabold uppercase transition-colors shrink-0 cursor-pointer"
                      >
                        <Check className="w-3 h-3" />
                        <span>DONE</span>
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setCustomClass(builder.builderClass);
                            setIsEditingClass(true);
                          }}
                          className="flex items-center gap-1 bg-[#023D23]/10 hover:bg-[#023D23]/20 text-[#023D23] rounded-xl px-3 py-1.5 text-[10px] font-mono font-extrabold uppercase transition-colors shrink-0 cursor-pointer"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>EDIT</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const current = builder.builderClass;
                            const others = BUILDER_CLASSES.filter(c => c.label !== current);
                            const next = others[Math.floor(Math.random() * others.length)];
                            setBuilder(prev => ({ ...prev, builderClass: next.label }));
                          }}
                          className="flex items-center gap-1 bg-[#023D23] hover:bg-[#012515] text-[#FFE600] rounded-xl px-3 py-1.5 text-[10px] font-mono font-extrabold uppercase transition-colors shrink-0 cursor-pointer"
                        >
                          <Shuffle className="w-3 h-3" />
                          <span>SHUFFLE</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Output Canvas & Download Buttons */}
          <div className="w-full h-full flex flex-col">
            <LivePreview
              builder={builder}
              mode="solo"
            />
          </div>
        </div>
      </main>


    </div>
  );
};


