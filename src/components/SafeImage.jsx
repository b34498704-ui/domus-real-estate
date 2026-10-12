import { useEffect, useState } from 'react';
import { Home } from 'lucide-react';

export default function SafeImage({ src, alt = '', className = '', eager = false }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  if (failed) {
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={alt}>
        <Home size={30} strokeWidth={1.4} />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
