const RainOverlay = () => {
  const drops = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {drops.map((_, i) => {
        const left = Math.random() * 100; // random left %
        const delay = Math.random() * 3; // delay in seconds
        const duration = 1 + Math.random() * 1.5; // fall duration

        return (
          <div
            key={i}
            className="raindrop"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default RainOverlay;