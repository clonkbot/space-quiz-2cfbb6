import { useMemo } from 'react';

export function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`
          } as React.CSSProperties}
        />
      ))}

      {/* Occasional shooting star effect */}
      <div
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{
          top: '20%',
          left: '80%',
          boxShadow: '0 0 6px 2px rgba(255, 255, 255, 0.8)',
          animation: 'shootingStar 8s linear infinite',
          animationDelay: '3s'
        }}
      />
    </div>
  );
}
