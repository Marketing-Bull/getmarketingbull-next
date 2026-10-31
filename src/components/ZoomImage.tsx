'use client';

import { useRef } from 'react';

interface ZoomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Classes for the thumbnail <img>. */
  className?: string;
  /** Classes for the button that wraps the thumbnail. */
  buttonClassName?: string;
  caption?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * An image that opens full size in a modal <dialog> when clicked. Esc, the close
 * button or a click on the backdrop closes it; focus returns to the thumbnail.
 */
export default function ZoomImage({ src, alt, width, height, className = '', buttonClassName = '', caption, loading = 'lazy' }: ZoomImageProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const tall = height > width;

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className={`group relative block cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 ${buttonClassName}`}
        aria-label={`Enlarge: ${alt}`}
      >
        <img src={src} alt={alt} width={width} height={height} loading={loading} decoding="async" className={className} />
        <span className="pointer-events-none absolute right-2 bottom-2 rounded-full bg-slate-950/80 px-2 py-0.5 text-[11px] font-semibold text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition" aria-hidden="true">
          ⤢ Enlarge
        </span>
      </button>
      <dialog
        ref={dialog}
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
        className="m-auto max-w-[95vw] max-h-[95vh] bg-transparent p-0 backdrop:bg-slate-950/85"
        aria-label={alt}
      >
        <figure className="relative">
          <img src={src} alt={alt} width={width} height={height} className={`block w-auto h-auto rounded-xl shadow-2xl ${tall ? 'max-h-[88vh]' : 'max-w-[92vw] max-h-[85vh]'}`} />
          {caption && <figcaption className="mt-3 text-center text-sm font-semibold text-white">{caption}</figcaption>}
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="absolute top-2 right-2 h-9 w-9 rounded-full bg-white text-slate-900 text-lg font-bold shadow-lg hover:bg-slate-100"
            aria-label="Close"
          >
            ×
          </button>
        </figure>
      </dialog>
    </>
  );
}
