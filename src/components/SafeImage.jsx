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
  const [secondaryLoaded, setSecondaryLoaded] = useState(false);

  const fallbackUrl = '/images/fallback.jpg';
  const displaySrc = error || !src ? fallbackUrl : src;

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${containerClassName} group/img`}>
      {/* Beige Skeleton Shimmer */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#EDE3CF]/30 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#6B7A2A]/40 border-t-[#F5C400] animate-spin" />
        </div>
      )}

      {/* Primary Image */}
      <img
        src={displaySrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={`w-full h-full object-cover transition-all duration-700 ease-brand ${
          mixBlend ? 'mix-blend-multiply' : ''
        } ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${
          showHoverCrossfade && secondarySrc ? 'group-hover/img:opacity-0' : 'group-hover/img:scale-105'
        } ${className}`}
      />

      {/* Secondary Image for Desktop Hover Crossfade */}
      {showHoverCrossfade && secondarySrc && (
        <img
          src={secondarySrc}
          alt={`${alt} alternate angle`}
          loading="lazy"
          onLoad={() => setSecondaryLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-brand opacity-0 group-hover/img:opacity-100 group-hover/img:scale-105 ${
            mixBlend ? 'mix-blend-multiply' : ''
          }`}
        />
      )}
    </div>
  );
};
