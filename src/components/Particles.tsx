import { useMemo } from 'react';

const Particles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 15,
      opacity: Math.random() * 0.4 + 0.1,
      color:
        Math.random() > 0.5
          ? 'rgba(0, 212, 255, VAR_OPACITY)'
          : 'rgba(124, 58, 237, VAR_OPACITY)',
    }));
  }, []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color.replace('VAR_OPACITY', String(p.opacity)),
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 3}px ${p.color.replace('VAR_OPACITY', String(p.opacity * 0.5))}`,
          }}
        />
      ))}
    </>
  );
};

export default Particles;
