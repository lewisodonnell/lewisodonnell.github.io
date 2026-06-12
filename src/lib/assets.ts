import fs from 'node:fs';

// Build-time checks for assets the owner drops into public/ by hand.
// Sections and links that depend on them appear automatically once the
// files exist — no template edits required.
const inPublic = (file: string) =>
  fs.existsSync(new URL(`../../public/${file}`, import.meta.url));

export const hasCV = inPublic('cv.pdf');
export const hasHeadshot = inPublic('headshot.jpg');
