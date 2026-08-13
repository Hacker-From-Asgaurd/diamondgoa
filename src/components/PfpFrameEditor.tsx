import React, { useRef, useState, useCallback } from 'react';
import { BuilderData } from '../types';
import { Upload, ZoomIn, User, Briefcase, Camera, RefreshCw } from 'lucide-react';
import { handleInstantImageUpload, isHeic } from '../utils/imageUtils';
import { INITIAL_BUILDER_DATA } from '../utils/defaultData';

interface PfpFrameEditorProps {
  builder: BuilderData;
  setBuilder: React.Dispatch<React.SetStateAction<BuilderData>>;
}

export const PfpFrameEditor: React.FC<PfpFrameEditorProps> = ({ builder, setBuilder }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertError, setConvertError] = useState<string | null>(null);

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setConvertError(null);
    if (isHeic(file)) {
      setIsConverting(true);
    }

    handleInstantImageUpload(
      file,
      (instantUrl) => {
        setBuilder((prev) => ({
          ...prev,
          photoUrl: instantUrl,
          zoom: 1,
          panX: 0,
          panY: 0,
        }));
      },
      (convertedUrl) => {
        setIsConverting(false);
        setBuilder((prev) => ({
          ...prev,
          photoUrl: convertedUrl,
        }));
      },
      (err) => {
        setIsConverting(false);
        console.error('HEIC background conversion error:', err);
      }
    );
  }, [setBuilder]);

  return (
    <div className="bg-[#FFFDF0] text-[#06381D] border border-amber-200/60 rounded-2xl p-4 sm:p-5 shadow-hh-card flex flex-col justify-between h-full space-y-3.5 w-full">
      <div className="border-b border-amber-200/60 pb-3 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-mono font-extrabold text-[#06381D] uppercase tracking-wider flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#023D23]" />
            Customize PFP Profile Frame
          </h2>
          <button
            onClick={() => setBuilder(INITIAL_BUILDER_DATA)}
            className="text-[11px] font-mono font-bold text-[#023D23] hover:text-white bg-[#023D23]/5 hover:bg-[#023D23] px-2 py-0.5 rounded-md transition-all flex items-center gap-1 cursor-pointer shrink-0"
            title="Reset to default details"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>
        </div>
        <p className="text-xs text-[#06381D]/80 font-mono">
          Upload your profile photo and customize your HH Goa 2026 social media badge frame.
        </p>
      </div>

      {/* 1. Photo Upload & Position Controls */}
      <div className="space-y-3">
        <label className="block text-xs font-mono text-[#06381D] uppercase font-bold">
          Submit Profile Image
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-1/2 h-28 border-2 border-dashed border-[#023D23]/30 hover:border-[#023D23] bg-white rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all group relative"
          >
            {convertError ? (
              <>
                <span className="text-[11px] font-mono font-bold text-red-600 text-center px-2">{convertError}</span>
                <span className="text-[9px] text-[#023D23]/60 font-mono mt-0.5">Click to try again</span>
              </>
            ) : (
              <>
                <Upload className="w-6 h-6 text-[#023D23] group-hover:scale-110 mb-1 transition-transform" />
                <span className="text-xs font-mono font-bold text-[#06381D]">
                  UPLOAD PHOTO
                </span>
                <span className="text-[10px] text-slate-500 font-mono">PNG, JPG, HEIC OR WEBP</span>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/heic,image/heif,.jpg,.jpeg,.png,.heic,.heif"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>

          {/* Photo Adjust Controls */}
          <div className="w-full sm:w-1/2 space-y-2.5 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#06381D] font-bold flex items-center gap-1">
                <ZoomIn className="w-3 h-3 text-[#023D23]" /> Zoom ({builder.zoom.toFixed(1)}x)
              </span>
              <button
                onClick={() => setBuilder((prev) => ({ ...prev, zoom: 1, panX: 0, panY: 0 }))}
                className="text-[10px] text-[#023D23] font-mono underline font-bold"
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
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#023D23]"
            />

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-[10px] font-mono text-[#06381D] font-bold block mb-1">Pan X</span>
                <input
                  type="range"
                  min="-80"
                  max="80"
                  value={builder.panX}
                  onChange={(e) => setBuilder((prev) => ({ ...prev, panX: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#023D23]"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#06381D] font-bold block mb-1">Pan Y</span>
                <input
                  type="range"
                  min="-80"
                  max="80"
                  value={builder.panY}
                  onChange={(e) => setBuilder((prev) => ({ ...prev, panY: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#023D23]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Personal Information */}
      <div className="space-y-3 pt-2.5 border-t border-[#023D23]/10">
        <div>
          <label className="block text-xs font-mono font-bold text-[#06381D] mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#023D23]" /> FULL NAME
          </label>
          <input
            type="text"
            value={builder.name}
            onChange={(e) => setBuilder((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="MADHAVAN SINGH"
            className="w-full bg-white border border-[#023D23]/25 focus:border-[#023D23] focus:ring-1 focus:ring-[#023D23] rounded-xl px-3.5 py-2 text-xs text-[#06381D] font-mono uppercase font-bold focus:outline-none shadow-2xs"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-[#06381D] mb-1.5 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#023D23]" /> ROLE / SPECIALTY
          </label>
          <input
            type="text"
            value={builder.role}
            onChange={(e) => setBuilder((prev) => ({ ...prev, role: e.target.value }))}
            placeholder="FULL STACK DEVELOPER"
            className="w-full bg-white border border-[#023D23]/25 focus:border-[#023D23] focus:ring-1 focus:ring-[#023D23] rounded-xl px-3.5 py-2 text-xs text-[#06381D] font-mono uppercase font-bold focus:outline-none shadow-2xs"
          />
        </div>
      </div>
    </div>
  );
};

