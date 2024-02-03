import { useEffect } from 'react';

import { WaterTexture } from '@/helpers';

export const useBubblesTrail = () => {
  useEffect(() => {
    const waterTexture = new WaterTexture();
    const onMouseMove = (ev: MouseEvent) => {
      const point = {
        x: ev.clientX / window.innerWidth,
        y: ev.clientY / window.innerHeight,
      };
      waterTexture.addPoint(point);
    };

    const tick = () => {
      waterTexture.update();
      requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove);
    tick();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
};
