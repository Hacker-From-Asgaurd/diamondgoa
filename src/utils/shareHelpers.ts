import confetti from 'canvas-confetti';
import { BuilderData } from '../types';

export function generateRandomBuilderId(): string {
  const randNum = Math.floor(1000 + Math.random() * 9000);
  return `HHG26-${randNum}-GOA`;
}

export function downloadCanvasImage(canvas: HTMLCanvasElement, filename: string): void {
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  triggerConfetti();
}

/**
 * 1. Converts HTMLCanvasElement to a real PNG Blob via canvas.toBlob()
 */
export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas could not be converted to PNG'));
      },
      'image/png',
      1.0
    );
  });
}

/**
 * 2. Uploads generated PNG Blob to persistent public storage with full browser CORS support
 */
export async function uploadImageBlob(blob: Blob, filename = 'hhgoa_identity.png'): Promise<string> {
  console.log('[X SHARE] Upload started');

  // Service 1: Catbox.moe (Direct HTTPS URL, CORS enabled)
  try {
    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', blob, filename);
    const res = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const url = (await res.text()).trim();
      if (url.startsWith('http')) {
        console.log('[X SHARE] Upload successful (Catbox):', url);
        return url;
      }
    }
  } catch (err) {
    console.warn('[X SHARE] Upload service 1 (Catbox) failed, trying fallback:', err);
  }

  // Service 2: Tmpfiles.org fallback (Direct /dl/ URL conversion)
  try {
    const formData = new FormData();
    formData.append('file', blob, filename);
    const res = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data && data.data && data.data.url) {
      const url = data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
      console.log('[X SHARE] Upload successful (Tmpfiles):', url);
      return url;
    }
  } catch (err) {
    console.warn('[X SHARE] Upload service 2 (Tmpfiles) failed, trying fallback:', err);
  }

  // Service 3: Telegraph API fallback
  try {
    const formData = new FormData();
    formData.append('file', blob, filename);
    const res = await fetch('https://telegra.ph/upload', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data[0] && data[0].src) {
        const publicUrl = `https://telegra.ph${data[0].src}`;
        console.log('[X SHARE] Upload successful (Telegraph):', publicUrl);
        return publicUrl;
      }
    }
  } catch (err) {
    console.warn('[X SHARE] Upload service 3 (Telegraph) failed:', err);
  }

  throw new Error('Image upload failed across all storage providers.');
}

/**
 * 3. Updates Open Graph metadata on the share page
 */
export function updateMetaTags(
  imageUrl: string,
  mode: 'solo' | 'frame',
  name?: string,
  _role?: string
): void {
  const nameStr = name ? name.trim() : '';
  const title = nameStr ? `${nameStr}'s HH Goa 2026 Identity` : 'HH Goa 2026 — Frame In Goa';
  const description = mode === 'frame'
    ? 'Just framed my builder identity for HH Goa 2026 🌴 See you in Goa. #FrameInGoa'
    : `${nameStr ? nameStr : 'My'} HH Goa 2026 Builder Identity is ready 🌴 See you in Goa. #FrameInGoa`;

  document.title = title;

  const setMeta = (propName: string, content: string, useName = false) => {
    let el = document.querySelector(useName ? `meta[name="${propName}"]` : `meta[property="${propName}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(useName ? 'name' : 'property', propName);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('og:title', title);
  setMeta('og:description', description);
  setMeta('og:image', imageUrl);
  setMeta('og:url', window.location.href);
  setMeta('og:type', 'website');

  setMeta('twitter:card', 'summary_large_image', true);
  setMeta('twitter:title', title, true);
  setMeta('twitter:description', description, true);
  setMeta('twitter:image', imageUrl, true);
}

/**
 * 4. Complete Share to X Pipeline:
 *    - Immediately opens window synchronously to bypass popup blockers
 *    - Prepares & uploads image asynchronously
 *    - Navigates opened window to generated share URL (or website fallback if upload fails)
 */
export async function shareCanvasToX(
  canvas: HTMLCanvasElement,
  builder: BuilderData,
  mode: 'solo' | 'frame',
  onStatusUpdate?: (status: string) => void
): Promise<void> {
  console.log('[X SHARE] Button clicked');

  const nameStr = builder.name && builder.name.trim() ? builder.name.trim() : '';
  const caption = mode === 'frame'
    ? (nameStr
        ? `${nameStr}'s builder identity for HH Goa 2026 🌴\n\nSee you in Goa.`
        : `Just framed my builder identity for HH Goa 2026 🌴\n\nSee you in Goa.`)
    : (nameStr
        ? `${nameStr}'s HH Goa 2026 Builder Identity is ready 🌴\n\nSee you in Goa.`
        : `My HH Goa 2026 Builder Identity is ready 🌴\n\nSee you in Goa.`);

  // 1. Immediately open X window with fallback URL (prevents blank page)
  const fallbackUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&hashtags=FrameInGoa&url=${encodeURIComponent('https://hhgoa.com')}`;
  const xWindow = window.open(fallbackUrl, '_blank');
  if (xWindow) {
    console.log('[X SHARE] X window opened with fallback URL');
  }

  try {
    if (!canvas) {
      throw new Error('Canvas element not found');
    }
    console.log('[X SHARE] Canvas found');

    // Step A: Prepare Image
    console.log('[X SHARE] Preparing generated image');
    if (onStatusUpdate) onStatusUpdate('PREPARING...');
    const blob = await canvasToBlob(canvas);
    console.log('[X SHARE] Blob created:', blob.size, blob.type);

    // Step B: Upload Image to Persistent Public Storage
    console.log('[X SHARE] Upload attempt');
    if (onStatusUpdate) onStatusUpdate('UPLOADING...');
    const sanitizeName = (builder.name || 'builder').trim().replace(/\s+/g, '_');
    const filename = `HHGoa_2026_${mode.toUpperCase()}_${sanitizeName}.png`;

    let publicImageUrl: string | null = null;
    try {
      publicImageUrl = await uploadImageBlob(blob, filename);
    } catch (uploadErr) {
      console.warn('[X SHARE] Upload failed, using fallback:', uploadErr);
    }

    const finalShareUrl = publicImageUrl
      ? `${window.location.origin}/share/${Math.random().toString(36).substring(2, 10)}?img=${encodeURIComponent(publicImageUrl)}&mode=${mode}&name=${encodeURIComponent(builder.name || '')}&role=${encodeURIComponent(builder.role || '')}`
      : 'https://hhgoa.com';

    console.log('[X SHARE] Share URL created:', finalShareUrl);

    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&hashtags=FrameInGoa&url=${encodeURIComponent(finalShareUrl)}`;

    console.log('[X SHARE] Opening X');
    if (xWindow && !xWindow.closed) {
      xWindow.location.href = xUrl;
    } else {
      window.location.href = xUrl;
    }
  } catch (error) {
    console.error('[X SHARE] Error:', error);
    if (xWindow && !xWindow.closed) {
      xWindow.location.href = fallbackUrl;
    } else {
      window.location.href = fallbackUrl;
    }
  } finally {
    triggerConfetti();
  }
}

export function triggerConfetti(): void {
  confetti({
    particleCount: 70,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#00F0FF', '#FF4500', '#FF007A', '#10B981', '#FFD700']
  });
}
