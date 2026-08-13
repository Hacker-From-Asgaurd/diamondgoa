export type Mode = 'solo' | 'frame';

export interface BuilderData {
  name: string;
  handle: string;
  role: string;
  builderClass: string;
  techStack: string[];
  photoUrl: string | null;
  zoom: number;
  panX: number;
  panY: number;
  builderId: string;
  stickers: string[];
  beachBag: string[];
  currentlyShipping: string;
}

