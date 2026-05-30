import { useEffect, useState } from "react";

function CyberParticles() {

  const [particles, setParticles] =
    useState([]);

  useEffect(() => {

    const generated = Array.from(
      { length: 40 },
      (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 1 + 0.5,
      })
    );

    setParticles(generated);

  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">

      {particles.map((particle) => (

        <div
          key={particle.id}
          className="
            absolute rounded-full bg-green-400
            animate-pulse
          "
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: 0.5,
          }}
        />

      ))}

    </div>
  );
}

export default CyberParticles;