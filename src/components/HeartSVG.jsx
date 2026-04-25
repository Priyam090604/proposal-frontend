export default function HeartSVG({ size=60, className='' }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899"/>
          <stop offset="100%" stopColor="#7c3aed"/>
        </linearGradient>
      </defs>
      <path d="M50 83C50 83 13 57 13 35c0-12 9-21 20-21 7 0 13 4 17 10 4-6 10-10 17-10 11 0 20 9 20 21 0 22-37 48-37 48z" fill="url(#hg)"/>
    </svg>
  );
}
