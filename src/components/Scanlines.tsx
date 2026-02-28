export function Scanlines() {
  return (
    <>
      {/* Static scanlines overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.15) 2px,
            rgba(0, 0, 0, 0.15) 4px
          )`
        }}
      />

      {/* Moving scan line */}
      <div
        className="fixed left-0 right-0 h-px pointer-events-none z-50"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 176, 0, 0.1), transparent)',
          animation: 'scan 8s linear infinite',
          opacity: 0.5
        }}
      />

      {/* Vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.4) 100%)'
        }}
      />

      {/* CRT curvature simulation - subtle */}
      <div
        className="fixed inset-0 pointer-events-none z-30"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.3) 100%)'
        }}
      />
    </>
  );
}
