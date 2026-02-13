import { useEffect, useMemo, useState } from 'react';
import ReactParticles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

interface Props {
  celebration?: boolean;
}

export default function Particles({ celebration = false }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = useMemo(() => {
    if (celebration) {
      return {
        fullScreen: { enable: true, zIndex: 50 },
        particles: {
          number: { value: 80 },
          color: {
            value: ['#e84393', '#fd79a8', '#ffd700', '#ff6b6b', '#fff5c0'],
          },
          shape: {
            type: ['heart', 'circle'],
          },
          opacity: {
            value: { min: 0.4, max: 1 },
            animation: { enable: true, speed: 0.5, startValue: 'max', destroy: 'min' },
          },
          size: {
            value: { min: 4, max: 12 },
          },
          move: {
            enable: true,
            speed: { min: 2, max: 6 },
            direction: 'none' as const,
            outModes: { default: 'destroy' as const },
            gravity: { enable: true, acceleration: 2 },
          },
          life: {
            duration: { value: 4, sync: false },
            count: 1,
          },
        },
        emitters: {
          position: { x: 50, y: 30 },
          rate: { quantity: 10, delay: 0.15 },
          life: { duration: 3, count: 1 },
          size: { width: 80, height: 0 },
        },
      };
    }

    return {
      fullScreen: { enable: true, zIndex: -1 },
      particles: {
        number: { value: 15, density: { enable: true } },
        color: { value: ['#e84393', '#fd79a8', '#b83279'] },
        shape: { type: 'circle' },
        opacity: {
          value: { min: 0.05, max: 0.2 },
        },
        size: {
          value: { min: 2, max: 6 },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'none' as const,
          outModes: { default: 'out' as const },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: false },
          onClick: { enable: false },
        },
      },
    };
  }, [celebration]);

  if (!ready) return null;

  return <ReactParticles id={celebration ? 'celebration-particles' : 'ambient-particles'} options={options} />;
}
