import React, { useRef, useEffect, useState } from 'react';
import { BuilderData, Mode } from '../types';
import { downloadCanvasImage, shareCanvasToX } from '../utils/shareHelpers';
import { Download, Share2 } from 'lucide-react';

interface LivePreviewProps {
  builder: BuilderData;
  mode: Mode;
}

// Global image cache to prevent re-fetching and re-decoding images on every state change
const imageCache = new Map<string, HTMLImageElement>();
const imageLoadingPromises = new Map<string, Promise<HTMLImageElement | null>>();

// Pre-processed overlay canvas for builder mode (yellow background & camera icon cutout removed)
let cachedProcessedBuilderOverlay: HTMLCanvasElement | null = null;
let cachedProcessedBaseSrc: string | null = null;

function loadCachedImage(src: string): Promise<HTMLImageElement | null> {
  if (!src) return Promise.resolve(null);

  if (imageCache.has(src)) {
    const cachedImg = imageCache.get(src)!;
    if (cachedImg.complete && cachedImg.naturalWidth > 0) {
      return Promise.resolve(cachedImg);
    }
  }

  if (imageLoadingPromises.has(src)) {
    return imageLoadingPromises.get(src)!;
  }

  const promise = new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(src, img);
      imageLoadingPromises.delete(src);
      resolve(img);
    };
    img.onerror = () => {
      imageLoadingPromises.delete(src);
      resolve(null);
    };
    img.src = src;
  });

  imageLoadingPromises.set(src, promise);
  return promise;
}

function getProcessedBuilderOverlay(baseImg: HTMLImageElement, width: number, height: number, src: string): HTMLCanvasElement {
  if (
    cachedProcessedBuilderOverlay &&
    cachedProcessedBaseSrc === src &&
    cachedProcessedBuilderOverlay.width === width &&
    cachedProcessedBuilderOverlay.height === height
  ) {
    return cachedProcessedBuilderOverlay;
  }

  const overlayCanvas = document.createElement('canvas');
  overlayCanvas.width = width;
  overlayCanvas.height = height;
  const octx = overlayCanvas.getContext('2d', { alpha: true })!;
  octx.drawImage(baseImg, 0, 0, width, height);

  const imgData = octx.getImageData(0, 0, width, height);
  const data = imgData.data;

  const cx = width * 0.5000;
  const cy = height * 0.4220;
  const rx = width * 0.2373;
  const ry = height * 0.1887;

  const iconMinX = width * 0.444; // 480px
  const iconMaxX = width * 0.556; // 600px
  const iconMinY = height * 0.378; // 510px
  const iconMaxY = height * 0.467; // 630px

  for (let y = 0; y < height; y++) {
    const dy = y - cy;
    if (Math.abs(dy) > ry) continue;
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      if ((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1.0) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const isYellow = (r > 200 && g > 180 && b < 70);
        const isCenterIcon = (x >= iconMinX && x <= iconMaxX && y >= iconMinY && y <= iconMaxY);

        if (isYellow || isCenterIcon) {
          data[i + 3] = 0; // Transparent cutout
        }
      }
    }
  }

  octx.putImageData(imgData, 0, 0);
  cachedProcessedBuilderOverlay = overlayCanvas;
  cachedProcessedBaseSrc = src;
  return overlayCanvas;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  builder,
  mode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [shareNotice, setShareNotice] = useState<string | null>(null);
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const [shareError, setShareError] = useState<string | null>(null);

  // Preload base images on mount
  useEffect(() => {
    loadCachedImage('/pfp.png');
    loadCachedImage('/builder.png');
  }, []);

  // Redraw canvas smoothly whenever builder or mode changes
  useEffect(() => {
    let isMounted = true;

    async function updateCanvas() {
      const mainCanvas = canvasRef.current;
      if (!mainCanvas) return;

      const isFrameMode = mode === 'frame';
      const baseSrc = isFrameMode ? '/pfp.png' : '/builder.png';
      const OUTPUT_WIDTH = 1080;
      const OUTPUT_HEIGHT = isFrameMode ? 1080 : 1350;

      // Fetch / load images from cache
      const basePromise = loadCachedImage(baseSrc);
      const photoPromise = builder.photoUrl ? loadCachedImage(builder.photoUrl) : Promise.resolve(null);

      const [baseImg, photoImg] = await Promise.all([basePromise, photoPromise]);

      if (!isMounted || !baseImg) return;

      // Offscreen double-buffering canvas to eliminate blank flash / flicker
      const offscreen = document.createElement('canvas');
      offscreen.width = OUTPUT_WIDTH;
      offscreen.height = OUTPUT_HEIGHT;
      const ctx = offscreen.getContext('2d', { alpha: true })!;

      ctx.clearRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);
      ctx.fillStyle = '#FFFDF0';
      ctx.fillRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);

      if (isFrameMode) {
        // --- PFP FRAME CREATOR MODE (1080 × 1080) ---
        ctx.drawImage(baseImg, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);

        const photoWidth = 448;
        const photoHeight = 357;
        const photoX = (OUTPUT_WIDTH - photoWidth) / 2;
        const photoY = 269;

        if (photoImg) {
          const imageWidth = photoImg.naturalWidth;
          const imageHeight = photoImg.naturalHeight;

          const zoom = builder.zoom || 1;
          const baseScale = Math.max(photoWidth / imageWidth, photoHeight / imageHeight);
          const scale = baseScale * zoom;

          const scaledWidth = imageWidth * scale;
          const scaledHeight = imageHeight * scale;

          const centerX = photoX + photoWidth / 2;
          const centerY = photoY + photoHeight / 2;

          const drawX = centerX - scaledWidth / 2 + (builder.panX || 0) * (OUTPUT_WIDTH / 300);
          const drawY = centerY - scaledHeight / 2 + (builder.panY || 0) * (OUTPUT_HEIGHT / 300);

          ctx.save();
          ctx.beginPath();
          ctx.rect(photoX, photoY, photoWidth, photoHeight);
          ctx.clip();

          ctx.drawImage(photoImg, drawX, drawY, scaledWidth, scaledHeight);
          ctx.restore();
        }

        // Full Name inside Green Box
        if (builder.name && builder.name.trim()) {
          const nameCx = OUTPUT_WIDTH * 0.500;
          const nameCy = OUTPUT_HEIGHT * 0.6559;
          const maxW = OUTPUT_WIDTH * 0.46;

          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#FFE600';

          let fontSize = Math.round(OUTPUT_HEIGHT * 0.036);
          ctx.font = `900 ${fontSize}px "JetBrains Mono", "Space Grotesk", sans-serif`;

          while (ctx.measureText(builder.name.toUpperCase()).width > maxW && fontSize > 16) {
            fontSize -= 2;
            ctx.font = `900 ${fontSize}px "JetBrains Mono", "Space Grotesk", sans-serif`;
          }

          ctx.fillText(builder.name.toUpperCase(), nameCx, nameCy);
          ctx.restore();
        }

        // Role inside White Box
        if (builder.role && builder.role.trim()) {
          const roleCx = OUTPUT_WIDTH * 0.500;
          const roleCy = OUTPUT_HEIGHT * 0.7300;
          const maxW = OUTPUT_WIDTH * 0.46;

          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#0A6738';

          let fontSize = Math.round(OUTPUT_HEIGHT * 0.032);
          ctx.font = `900 ${fontSize}px "JetBrains Mono", "Space Grotesk", sans-serif`;

          while (ctx.measureText(builder.role.toUpperCase()).width > maxW && fontSize > 14) {
            fontSize -= 2;
            ctx.font = `900 ${fontSize}px "JetBrains Mono", "Space Grotesk", sans-serif`;
          }

          ctx.fillText(builder.role.toUpperCase(), roleCx, roleCy);
          ctx.restore();
        }
      } else {
        // --- BUILDER ID CARD MODE (1080 × 1350) ---
        const cx = OUTPUT_WIDTH * 0.5000;
        const cy = OUTPUT_HEIGHT * 0.4220;
        const rx = OUTPUT_WIDTH * 0.2373;
        const ry = OUTPUT_HEIGHT * 0.1887;
        const targetW = rx * 2;
        const targetH = ry * 2;

        // Base yellow backing for photo window
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#FFE600';
        ctx.fill();
        ctx.restore();

        // Render photo inside circular viewport
        if (photoImg) {
          const zoom = builder.zoom || 1;
          const baseScale = Math.max(targetW / photoImg.naturalWidth, targetH / photoImg.naturalHeight);
          const dw = photoImg.naturalWidth * baseScale * zoom;
          const dh = photoImg.naturalHeight * baseScale * zoom;

          const px = cx + (builder.panX || 0) * (OUTPUT_WIDTH / 300);
          const py = cy + (builder.panY || 0) * (OUTPUT_HEIGHT / 300);

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
          ctx.clip();

          ctx.drawImage(photoImg, px - dw / 2, py - dh / 2, dw, dh);
          ctx.restore();
        }

        // Use pre-processed or cached overlay canvas
        if (photoImg) {
          const overlayCanvas = getProcessedBuilderOverlay(baseImg, OUTPUT_WIDTH, OUTPUT_HEIGHT, baseSrc);
          ctx.drawImage(overlayCanvas, 0, 0);
        } else {
          ctx.drawImage(baseImg, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);
        }

        // Full Name inside Green Box
        if (builder.name && builder.name.trim()) {
          const nameCx = OUTPUT_WIDTH * 0.500;
          const nameCy = OUTPUT_HEIGHT * 0.6778;
          const maxW = OUTPUT_WIDTH * 0.52;

          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#FFE600';

          let fontSize = Math.round(OUTPUT_HEIGHT * 0.038);
          ctx.font = `900 ${fontSize}px "JetBrains Mono", "Space Grotesk", sans-serif`;

          while (ctx.measureText(builder.name.toUpperCase()).width > maxW && fontSize > 16) {
            fontSize -= 2;
            ctx.font = `900 ${fontSize}px "JetBrains Mono", "Space Grotesk", sans-serif`;
          }

          ctx.fillText(builder.name.toUpperCase(), nameCx, nameCy);
          ctx.restore();
        }

        // Role inside Yellow Box
        if (builder.role && builder.role.trim()) {
          const roleCx = OUTPUT_WIDTH * 0.500;
          const roleCy = OUTPUT_HEIGHT * 0.7815;
          const maxW = OUTPUT_WIDTH * 0.52;

          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#0A6738';

          let fontSize = Math.round(OUTPUT_HEIGHT * 0.032);
          ctx.font = `900 ${fontSize}px "JetBrains Mono", "Space Grotesk", sans-serif`;

          while (ctx.measureText(builder.role.toUpperCase()).width > maxW && fontSize > 14) {
            fontSize -= 2;
            ctx.font = `900 ${fontSize}px "JetBrains Mono", "Space Grotesk", sans-serif`;
          }

          ctx.fillText(builder.role.toUpperCase(), roleCx, roleCy);
          ctx.restore();
        }
      }

      // Flip offscreen canvas to main visible canvas synchronously in one atomic operation
      if (mainCanvas.width !== OUTPUT_WIDTH || mainCanvas.height !== OUTPUT_HEIGHT) {
        mainCanvas.width = OUTPUT_WIDTH;
        mainCanvas.height = OUTPUT_HEIGHT;
      }
      const mainCtx = mainCanvas.getContext('2d');
      if (mainCtx) {
        mainCtx.clearRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);
        mainCtx.drawImage(offscreen, 0, 0);
      }
    }

    updateCanvas();
    return () => { isMounted = false; };
  }, [builder, mode]);

  const isInfoUpdated = (() => {
    if (builder.photoUrl) return true;

    const hasNameChanged =
      builder.name &&
      builder.name.trim() !== '' &&
      builder.name.trim().toUpperCase() !== 'MADHAVAN SINGH';

    const defaultStack = ['React', 'Rust', 'Solana', 'TypeScript'];
    const hasStackChanged =
      !builder.techStack ||
      builder.techStack.length !== defaultStack.length ||
      !builder.techStack.every((val, index) => val === defaultStack[index]);

    return hasNameChanged && hasStackChanged;
  })();

  const handleDownload = () => {
    if (!isInfoUpdated) {
      setShareError("Please customize your name and tech stack before downloading.");
      setTimeout(() => setShareError(null), 4000);
      return;
    }
    if (!canvasRef.current) return;
    const filename = `HHGoa_2026_${mode.toUpperCase()}_${(builder.name || 'builder').replace(/\s+/g, '_')}.png`;
    downloadCanvasImage(canvasRef.current, filename);
  };

  const handleShare = async () => {
    if (!isInfoUpdated) {
      setShareError("Please customize your name and tech stack before sharing on X.");
      setTimeout(() => setShareError(null), 4000);
      return;
    }
    if (!canvasRef.current || isSharing) return;
    setIsSharing(true);
    setShareError(null);
    setShareStatus('PREPARING...');

    try {
      await shareCanvasToX(
        canvasRef.current,
        builder,
        mode,
        (status) => setShareStatus(status)
      );
      setShareNotice('TWEET OPENED!');
      setTimeout(() => setShareNotice(null), 3000);
    } catch (err: any) {
      console.error('Share error:', err);
      setShareError(err.message || "Couldn't prepare the image for X. Please try again.");
      setTimeout(() => setShareError(null), 4000);
    } finally {
      setIsSharing(false);
      setShareStatus(null);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4 select-none">
      {/* Generated Canvas / Image directly on page background */}
      <div className="relative flex justify-center items-center w-full">
        <canvas
          ref={canvasRef}
          className="max-h-[480px] sm:max-h-[520px] w-auto max-w-full object-contain block rounded-lg shadow-xl"
        />
      </div>

      {/* Action Buttons Aligned underneath */}
      {builder.photoUrl && (
        <div className="w-full max-w-[340px] sm:max-w-[380px] space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {/* Download PNG Button */}
            <button
              onClick={handleDownload}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-mono font-extrabold text-xs uppercase text-white bg-[#023D23] hover:bg-[#012A18] border border-emerald-700/40 shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                !isInfoUpdated ? 'opacity-50 cursor-not-allowed filter grayscale-[35%]' : ''
              }`}
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>DOWNLOAD PNG</span>
            </button>

            {/* Share on X Button */}
            <button
              onClick={handleShare}
              disabled={isSharing}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-mono font-extrabold text-xs uppercase text-[#023D23] bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                !isInfoUpdated ? 'opacity-50 cursor-not-allowed filter grayscale-[35%]' : ''
              }`}
            >
              <Share2 className={`w-3.5 h-3.5 ${isSharing ? 'animate-spin' : ''}`} />
              <span className="truncate">
                {shareNotice ? shareNotice : isSharing ? (shareStatus || 'PREPARING...') : 'SHARE ON X'}
              </span>
            </button>
          </div>

          {shareError && (
            <div className="text-[10px] font-mono font-bold text-red-300 bg-red-950/80 border border-red-500/40 rounded-lg px-2.5 py-1.5 text-center mt-1">
              {shareError}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

