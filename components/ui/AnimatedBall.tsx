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
      // Posição inicial (topo da tela, posição aleatória horizontal)
      const startX = Math.random() * (window.innerWidth - 100) + 50;
      const startY = -50;
      
      setInitialPosition({ x: startX, y: startY });
      setIsVisible(true);

      // Movimento intermediário (balanço 3D)
      const midX1 = startX + (Math.random() - 0.5) * 200;
      const midX2 = midX1 + (Math.random() - 0.5) * 150;
      const midY = window.innerHeight * 0.3;

      // Posição final antes dos quiques
      const finalY = targetPosition.y;

      // Inicializar posição e visibilidade
      await controls.start({
        x: startX,
        y: startY,
        scale: 1,
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        z: 0,
        transition: { duration: 0 },
      });

      // Queda inicial com balanço e rotação 3D
      await controls.start({
        x: [startX, midX1, midX2, targetPosition.x],
        y: [startY, midY, midY + 50, finalY],
        scale: [1, 1.2, 1.1, 1],
        rotateZ: [0, 180, 360, 540],
        rotateY: [0, 90, 180, 270],
        z: [0, 50, 30, 0],
        transition: {
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1],
          times: [0, 0.3, 0.6, 1],
        },
      });

      // Primeiro quique grande com rotação
      const bounce1Height = 50;
      await controls.start({
        y: finalY - bounce1Height,
        scale: 1.1,
        rotateZ: 720,
        z: 20,
        transition: {
          duration: 0.3,
          ease: [0.68, -0.55, 0.265, 1.55],
        },
      });

      // Queda do primeiro quique
      await controls.start({
        y: finalY - 8,
        scale: 0.95,
        rotateZ: 900,
        z: 0,
        transition: {
          duration: 0.25,
          ease: [0.4, 0, 0.2, 1],
        },
      });

      // Segundo quique médio
      const bounce2Height = 30;
      await controls.start({
        y: finalY - bounce2Height,
        scale: 1.05,
        rotateZ: 1080,
        z: 15,
        transition: {
          duration: 0.22,
          ease: [0.68, -0.55, 0.265, 1.55],
        },
      });

      // Queda do segundo quique
      await controls.start({
        y: finalY - 4,
        scale: 0.97,
        rotateZ: 1260,
        z: 0,
        transition: {
          duration: 0.18,
          ease: [0.4, 0, 0.2, 1],
        },
      });

      // Terceiro quique pequeno
      const bounce3Height = 15;
      await controls.start({
        y: finalY - bounce3Height,
        scale: 1.02,
        rotateZ: 1440,
        z: 8,
        transition: {
          duration: 0.15,
          ease: [0.68, -0.55, 0.265, 1.55],
        },
      });

      // Queda do terceiro quique
      await controls.start({
        y: finalY - 2,
        scale: 0.98,
        rotateZ: 1620,
        z: 0,
        transition: {
          duration: 0.12,
          ease: [0.4, 0, 0.2, 1],
        },
      });

      // Quarto quique muito pequeno
      const bounce4Height = 6;
      await controls.start({
        y: finalY - bounce4Height,
        scale: 1.01,
        rotateZ: 1800,
        z: 4,
        transition: {
          duration: 0.1,
          ease: [0.68, -0.55, 0.265, 1.55],
        },
      });

      // Finalização no buraco com rotação final
      await controls.start({
        y: finalY,
        scale: 0.85,
        rotateZ: 1980,
        z: 0,
        transition: {
          duration: 0.15,
          ease: 'easeIn',
        },
      });

      // Pequeno delay antes de chamar onComplete
      setTimeout(() => {
        onComplete(targetHole);
        setIsVisible(false);
      }, 200);
    };

    animateBall();
  }, [isActive, targetHole, targetPosition, controls, onComplete]);

  if (!isVisible || !initialPosition) return null;

  return (
    <motion.div
      animate={controls}
      className="fixed z-[100] pointer-events-none"
      style={{
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #FF6B6B, #C92A2A)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.4), inset -3px -3px 6px rgba(0,0,0,0.4), 0 0 20px rgba(255, 107, 107, 0.3)',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    />
  );
};

