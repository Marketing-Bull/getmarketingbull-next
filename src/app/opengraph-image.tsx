import { renderOg, OG_SIZE } from '@/lib/og';

export const alt = 'Marketing Bull — growth consultancy for law firms and medical practices';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOg({
    title: "Growth, engineered for the firms that can't afford to guess.",
    subtitle: 'We find where a firm is losing cases or patients, build the system that fixes it, and stay accountable for the number.',
  });
}
