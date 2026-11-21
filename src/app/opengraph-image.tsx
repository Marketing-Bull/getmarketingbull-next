import { renderOg, OG_SIZE } from '@/lib/og';
import { SITE_OG_IMAGE } from '@/lib/metadata';

export const alt = SITE_OG_IMAGE.alt;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOg({
    title: 'Your next client is calling three firms. We make sure yours answers.',
    subtitle: 'We find where a firm is losing cases or patients, build the system that fixes it, and stay accountable for the number.',
  });
}
