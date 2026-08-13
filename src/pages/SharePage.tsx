import React, { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { updateMetaTags, triggerConfetti } from '../utils/shareHelpers';
import { Download, Share2, Sparkles } from 'lucide-react';

export const SharePage: React.FC = () => {
  const { imageId } = useParams<{ imageId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const imageUrl = searchParams.get('img') || '';
  const mode = (searchParams.get('mode') as 'solo' | 'frame') || 'frame';
  const name = searchParams.get('name') || '';
  const role = searchParams.get('role') || '';

  useEffect(() => {
    if (imageUrl) {
      updateMetaTags(imageUrl, mode, name, role);
    }
  }, [imageUrl, mode, name, role]);

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `HHGoa_2026_${mode.toUpperCase()}_${(name || 'identity').replace(/\s+/g, '_')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    triggerConfetti();
  };

  const handleShareToX = () => {
    const nameStr = name.trim();
    const caption = mode === 'frame'
      ? (nameStr
          ? `${nameStr}'s builder identity for HH Goa 2026 🌴\n\nSee you in Goa.`
          : `Just framed my builder identity for HH Goa 2026 🌴\n\nSee you in Goa.`)
      : (nameStr
          ? `${nameStr}'s HH Goa 2026 Builder Identity is ready 🌴\n\nSee you in Goa.`
          : `My HH Goa 2026 Builder Identity is ready 🌴\n\nSee you in Goa.`);

    const shareUrl = window.location.href;
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&hashtags=FrameInGoa&url=${encodeURIComponent(shareUrl)}`;
    window.open(intentUrl, '_blank', 'noopener,noreferrer');
    triggerConfetti();
  };

  return (
    <div className="min-h-screen bg-[#03502E] text-white flex flex-col font-sans selection:bg-[#FF007A] selection:text-white">
      {/* Top Header */}
      <header className="w-full bg-[#023D23] border-b border-emerald-800/40 py-4 px-6 sm:px-12 select-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <BackButton onClick={() => navigate('/create-identity')} label="CREATE YOUR IDENTITY" />
          <div className="font-mono text-[#FFE600] text-xs sm:text-sm font-extrabold tracking-widest uppercase">
            HH GOA 2026 IDENTITY #{imageId?.toUpperCase()}
          </div>
        </div>
      </header>

      {/* Main Share View */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col items-center justify-center space-y-6">
        <div className="text-center space-y-2">
          <span className="inline-block bg-[#FF007A] text-white font-mono text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            #FRAMEINGOA IDENTITY GRAPHIC
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif uppercase text-[#FFE600] tracking-tight">
            {name ? `${name.toUpperCase()}'S IDENTITY` : 'HH GOA 2026 BUILDER GRAPHIC'}
          </h1>
        </div>

        {/* Display Image */}
        <div className="relative max-w-md w-full flex justify-center items-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="HH Goa 2026 Generated Identity"
              className="max-h-[520px] w-auto max-w-full object-contain rounded-xl shadow-2xl border-2 border-[#FFE600]/30"
            />
          ) : (
            <div className="w-80 h-96 bg-[#023D23] rounded-xl flex items-center justify-center font-mono text-xs text-amber-200/60 border border-emerald-800/40">
              Loading image preview...
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="w-full max-w-md space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono font-extrabold text-xs uppercase text-white bg-[#023D23] hover:bg-[#012A18] border border-emerald-700/40 shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD PNG</span>
            </button>

            <button
              onClick={handleShareToX}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono font-extrabold text-xs uppercase text-[#023D23] bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>SHARE ON X</span>
            </button>
          </div>

          <button
            onClick={() => navigate('/create-identity')}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono font-extrabold text-xs uppercase text-[#FFE600] bg-[#023D23]/80 hover:bg-[#023D23] border border-[#FFE600]/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FFE600]" />
            <span>CREATE YOUR OWN HH GOA IDENTITY</span>
          </button>
        </div>
      </main>
    </div>
  );
};
