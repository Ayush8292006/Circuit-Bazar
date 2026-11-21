import React, { useState } from 'react';

export const SafeImage = ({
  src,
  secondarySrc,
  alt = 'Circuit component',
  className = '',
  aspectRatio = 'aspect-square',
  mixBlend = false,
  containerClassName = '',
  showHoverCrossfade = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const fallbackUrl = '/images/fallback.jpg';
  const displaySrc = error || !src ? fallbackUrl : src;

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${containerClassName} bg-[#DFD4BD]/20 group/img`}>
      {/* Subtle Skeleton Placeholder (no distracting spinning wheels) */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#EDE3CF] animate-pulse pointer-events-none" />
      )}

      {/* Primary Image - always visible, smoothly blends in without blank screen */}
      <img
        src={displaySrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={`w-full h-full object-cover transition-all duration-300 ${
          mixBlend ? 'mix-blend-multiply' : ''
        } ${loaded ? 'opacity-100' : 'opacity-90'} ${
          showHoverCrossfade && secondarySrc ? 'group-hover/img:opacity-0' : 'group-hover/img:scale-105'
        } ${className}`}
      />

      {/* Secondary Image for Desktop Hover Crossfade */}
      {showHoverCrossfade && secondarySrc && (
        <img
          src={secondarySrc}
          alt={`${alt} alternate angle`}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover/img:opacity-100 group-hover/img:scale-105 ${
            mixBlend ? 'mix-blend-multiply' : ''
          }`}
        />
      )}
    </div>
  );
};
