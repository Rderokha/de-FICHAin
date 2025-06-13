"use client"; // obligatorio si estás usando App Router

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine); // usa slim para evitar conflictos
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: "#000000", opacity: 0 },
        particles: {
          number: { value: 120 },
          color: { value: "#FFB14A" },
          shape: { type: "circle" },
          opacity: { value: 0.7 },
          size: { value: 1.5 },
          move: { enable: true, speed: 0.3 },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.5, // entre 0 y 1 — cuanto más bajo, menos frecuente
              opacity: 1,
              color: { value: "#ffffff" }, // o un color que contraste
            },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: false, mode: "push" },
          },
          modes: {
            repulse: {
              distance: 25,   // distancia de repulsión (ajustable)
              duration: 2,  // cuánto dura el efecto
              speed: 0.1,       // qué tan rápido se alejan (opcional)
            },
            push: { quantity: 4 },
          },
        }
    }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // asegúrate de que el texto tenga mayor z-index
        pointerEvents: "none",
      }}
    />
  );
};

export default ParticlesBackground;
