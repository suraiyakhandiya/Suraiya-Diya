import React, { useState } from 'react';
import { Store } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'HisabPro Commerce',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-800 text-stone-200 p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Store className="w-8 h-8 text-emerald-400 mb-3" />
        <span className="text-sm font-medium tracking-tight text-center">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
