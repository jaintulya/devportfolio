'use client';
export default function FilmGrain() {
  return (
    <div aria-hidden="true" style={{
      position: 'fixed', inset: '-50%', width: '200%', height: '200%',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: '128px 128px', opacity: 0.028, pointerEvents: 'none',
      zIndex: 9998, animation: 'grain 0.5s steps(1) infinite', mixBlendMode: 'multiply',
    }} />
  );
}
