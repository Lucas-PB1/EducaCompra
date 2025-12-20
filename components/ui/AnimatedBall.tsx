'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface AnimatedBallProps {
  onComplete: (finalValue: number) => void;
  targetHole: number;
  targetPosition: { x: number; y: number };
  isActive: boolean;
}

export const AnimatedBall: React.FC<AnimatedBallProps> = ({
  onComplete,
  targetHole,
  targetPosition,
  isActive,
}) => {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const [initialPosition, setInitialPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!isActive) {
      setIsVisible(false);
      setInitialPosition(null);
      controls.set({ opacity: 0, scale: 0 });
      return;
    }

    const animateBall = async () => {
      // Posição inicial (topo da tela)
      const startX = Math.random() * (window.innerWidth - 100) + 50;
      const startY = -100; // Começar um pouco mais acima

      setInitialPosition({ x: startX, y: startY });
      setIsVisible(true);

      // 1. Resetar e aparecer
      await controls.set({
        x: startX,
        y: startY,
        scale: 0.5,
        opacity: 0,
        rotateZ: 0,
      });

      // 2. Aparecer suavemente
      await controls.start({
        scale: 1,
        opacity: 1,
        transition: { duration: 0.3 }
      });

      // 3. Mover para o alvo com efeito de mola dinâmico
      await controls.start({
        x: targetPosition.x,
        y: targetPosition.y,
        rotateZ: 360 * 2, // Girar 2 vezes enquanto cai
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 80,
          mass: 1,
          duration: 1.5 // Fallback duration
        }
      });

      // 4. Efeito de "chegada" (pulso)
      await controls.start({
        scale: [1, 1.2, 0],
        opacity: [1, 1, 0],
        transition: { duration: 0.4, times: [0, 0.5, 1] }
      });

      // Finalizar
      onComplete(targetHole);
      setIsVisible(false);
    };

    animateBall();
  }, [isActive, targetHole, targetPosition, controls, onComplete]);

  if (!isVisible || !initialPosition) return null;

  return (
    <motion.div
      animate={controls}
      className="fixed z-[100] pointer-events-none flex items-center justify-center"
      style={{
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #ff4d4d, #cc0000)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.4), inset -3px -3px 6px rgba(0,0,0,0.4), 0 0 20px rgba(255, 77, 77, 0.3)',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '20px',
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
      }}
    >
      5
    </motion.div>
  );
};

