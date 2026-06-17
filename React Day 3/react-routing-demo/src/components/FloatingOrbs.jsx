export default function FloatingOrbs() {
  const orbs = [
    { size: 340, top: '8%',  left: '10%',  color: 'rgba(124,108,248,0.07)', delay: '0s',   dur: '9s'  },
    { size: 260, top: '55%', left: '72%',  color: 'rgba(245,166,35,0.06)',  delay: '2s',   dur: '11s' },
    { size: 180, top: '30%', left: '50%',  color: 'rgba(124,108,248,0.05)', delay: '4s',   dur: '7s'  },
    { size: 140, top: '75%', left: '15%',  color: 'rgba(245,166,35,0.04)',  delay: '1.5s', dur: '13s' },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {orbs.map((o, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: o.size, height: o.size,
          top: o.top, left: o.left,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
          animation: `float ${o.dur} ease-in-out infinite`,
          animationDelay: o.delay,
          filter: 'blur(40px)',
        }} />
      ))}
    </div>
  );
}
