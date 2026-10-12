import { Link } from 'react-router-dom';

export function LogoMark({ size = 26 }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 26 30" fill="none" aria-hidden="true">
      <path d="M2 29V13a11 11 0 0 1 22 0v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8.5 29V15a4.5 4.5 0 0 1 9 0v14" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo${light ? ' logo--light' : ''}`} aria-label="DOMUS — башкы бет">
      <LogoMark />
      <span className="logo__word">DOMUS</span>
    </Link>
  );
}
