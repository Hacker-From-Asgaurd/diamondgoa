import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, AlertCircle } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    setError(null);

    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 720 },
            height: { ideal: 720 },
            facingMode: 'user'
          },
          audio: false
        });
        
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error starting camera:', err);
        setError('Could not access camera. Please check permissions and try again.');
        setIsLoading(false);
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  // Stop camera when closing
  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    onClose();
  };

  const handleCapture = () => {
    if (!videoRef.current || !stream) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    
    // Capture at the video element's stream resolution for quality
    const videoWidth = video.videoWidth || 640;
    const videoHeight = video.videoHeight || 480;
    
    // Crop to a square format (best for PFPs/builder IDs)
    const size = Math.min(videoWidth, videoHeight);
    canvas.width = size;
    canvas.height = size;
    
    const ctx = canvas.getContext('2d')!;
    
    // Center crop coordinates
    const sx = (videoWidth - size) / 2;
    const sy = (videoHeight - size) / 2;
    
    // Flip horizontally if using front/user camera to feel natural (mirror effect)
    ctx.translate(size, 0);
    ctx.scale(-1, 1);
    
    ctx.drawImage(
      video,
      sx, sy, size, size, // Source rect
      0, 0, size, size    // Dest rect
    );
    
    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    onCapture(dataUrl);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-[#FFFDF0] text-[#023D23] border-2 border-[#FFE600] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col font-mono relative">
        
        {/* Header */}
        <div className="bg-[#023D23] text-white py-3 px-4 flex items-center justify-between border-b border-emerald-800">
          <span className="text-xs font-black tracking-widest flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-[#FFE600] animate-pulse" />
            CAMERA WORKSPACE
          </span>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors hover:bg-white/10 p-1 rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Area */}
        <div className="relative aspect-square w-full bg-black flex items-center justify-center overflow-hidden border-b border-amber-200/40">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-white/60">
              <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs uppercase tracking-wider">Starting stream...</span>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#111]">
              <AlertCircle className="w-10 h-10 text-red-500" />
              <span className="text-xs font-bold text-red-400">{error}</span>
              <button 
                onClick={handleClose}
                className="text-[10px] bg-white/10 hover:bg-white/20 text-white py-1 px-3 rounded uppercase border border-white/25 cursor-pointer"
              >
                Upload File Instead
              </button>
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100" // Mirrors the user view
          />
        </div>

        {/* Action Panel */}
        <div className="p-4 bg-amber-50/50 flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors text-xs font-black cursor-pointer text-slate-700 bg-white"
          >
            CANCEL
          </button>
          
          <button
            onClick={handleCapture}
            disabled={isLoading || !!error}
            className="flex-1 py-3 px-4 rounded-xl bg-[#023D23] hover:bg-[#012515] text-[#FFE600] disabled:bg-slate-200 disabled:text-slate-400 transition-colors text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <Camera className="w-4 h-4" />
            TAKE PHOTO
          </button>
        </div>
      </div>
    </div>
  );
};
