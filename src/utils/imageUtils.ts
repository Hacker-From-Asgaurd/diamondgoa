import heic2any from 'heic2any';

export const isHeic = (file: File): boolean =>
  file.type.toLowerCase().includes('heic') ||
  file.type.toLowerCase().includes('heif') ||
  file.name.toLowerCase().endsWith('.heic') ||
  file.name.toLowerCase().endsWith('.heif');

const heicConversionCache = new Map<string, string>();

export function getFileCacheKey(file: File): string {
  return `${file.name}_${file.size}_${file.lastModified}`;
}

export function downscaleImage(src: string, max = 600): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      const ctx = c.getContext('2d')!;
      ctx.drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => reject(new Error('Failed to load image for downscaling'));
    img.src = src;
  });
}

function testImageDecode(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

/**
 * Instant HEIC upload pipeline:
 * 1. Immediately returns object URL (0ms latency, preview appears instantly).
 * 2. Asynchronously converts HEIC to downscaled JPEG (600px max) in background.
 * 3. Caches conversion result keyed by file name/size/lastModified.
 * 4. Silently updates state with converted JPEG when ready.
 */
export function handleInstantImageUpload(
  file: File,
  onInstantUrl: (url: string) => void,
  onConvertedUrl?: (url: string) => void,
  onError?: (err: Error) => void
): void {
  const instantUrl = URL.createObjectURL(file);

  // 1. Immediately trigger instant preview (0 ms blocking time)
  onInstantUrl(instantUrl);

  if (!isHeic(file)) {
    return;
  }

  const key = getFileCacheKey(file);

  // 2. Check in-memory conversion cache
  if (heicConversionCache.has(key)) {
    const cachedUrl = heicConversionCache.get(key)!;
    if (onConvertedUrl) onConvertedUrl(cachedUrl);
    return;
  }

  // 3. Perform background conversion without blocking UI
  setTimeout(async () => {
    try {
      // Check if browser native decoder works
      const nativeOk = await testImageDecode(instantUrl);
      if (nativeOk) {
        const converted = await downscaleImage(instantUrl, 600);
        heicConversionCache.set(key, converted);
        if (onConvertedUrl) onConvertedUrl(converted);
        return;
      }

      // Convert asynchronously with optimized resolution
      const rawRes = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.7,
      });

      const blob = Array.isArray(rawRes) ? rawRes[0] : rawRes;
      const tempUrl = URL.createObjectURL(blob as Blob);
      const converted = await downscaleImage(tempUrl, 600);
      URL.revokeObjectURL(tempUrl);

      heicConversionCache.set(key, converted);
      if (onConvertedUrl) onConvertedUrl(converted);
    } catch (err) {
      console.warn('HEIC background conversion warning:', err);
      if (onError) onError(err as Error);
    }
  }, 0);
}
