'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { BallTable } from '@/components/ui/BallTable';
import { AnimatedBall } from '@/components/ui/AnimatedBall';
import { Button } from '@/components/ui/Button';
import { allDiceRolled } from '@/lib/utils/dice';
import { rollDice } from '@/lib/utils/dice';

export const DiceRollerScreen: React.FC = () => {
  const { playerName, diceValues, diceSum, setDiceValue, setCurrentScreen } =
    useGameStore();

  const [holePositions, setHolePositions] = useState<Map<number, { x: number; y: number }[]>>(new Map());
  const [currentBallIndex, setCurrentBallIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedHole, setSelectedHole] = useState<number | null>(null);
  const [ballTarget, setBallTarget] = useState<{ value: number; position: { x: number; y: number } } | null>(null);

  const handleHolePositionsReady = useCallback((positions: Map<number, { x: number; y: number }[]>) => {
    setHolePositions(positions);
  }, []);

  const handleRollBall = () => {
    const nextIndex = diceValues.findIndex((value) => value === null);
    
    if (nextIndex === -1 || isAnimating || holePositions.size === 0) {
      return;
    }

    // Selecionar um buraco aleatório (valor de 1 a 6)
    const randomValue = rollDice();
    const positions = holePositions.get(randomValue);

    if (!positions || positions.length === 0) {
      return;
    }

    // Selecionar uma posição aleatória entre os buracos com esse valor
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];

    setIsAnimating(true);
    setCurrentBallIndex(nextIndex);
    setSelectedHole(randomValue);
    setBallTarget({ value: randomValue, position: randomPosition });
  };

  const handleBallComplete = useCallback((value: number) => {
    if (currentBallIndex === null) return;

    setDiceValue(currentBallIndex, value);
    setIsAnimating(false);
    setSelectedHole(null);
    setBallTarget(null);
    setCurrentBallIndex(null);
  }, [currentBallIndex, setDiceValue]);

  const handleContinue = () => {
    setCurrentScreen('shopping');
  };

  const allRolled = allDiceRolled(diceValues);
  const canRoll = !isAnimating && !allRolled && holePositions.size > 0;
  const remainingBalls = diceValues.filter((v) => v === null).length;

  return (
    <div className="text-center py-8 px-4 animate-fade-in min-h-screen flex flex-col">
      <h1 className="text-4xl md:text-5xl font-bold text-primary-pink mb-2">
        Olá, {playerName}! 👋
      </h1>
      <p className="text-xl md:text-2xl text-primary-teal mb-4">
        Jogue as bolinhas para ganhar dinheiro! 🎱
      </p>

      {remainingBalls > 0 && (
        <p className="text-lg text-gray-600 mb-4">
          {remainingBalls} bolinha{remainingBalls > 1 ? 's' : ''} restante{remainingBalls > 1 ? 's' : ''}
        </p>
      )}

      <div className="flex-1 flex items-center justify-center mb-8">
        <BallTable
          selectedHole={selectedHole}
          isAnimating={isAnimating}
          onHolePositionsReady={handleHolePositionsReady}
        />
      </div>

      {ballTarget && currentBallIndex !== null && (
        <AnimatedBall
          isActive={isAnimating}
          targetHole={ballTarget.value}
          targetPosition={ballTarget.position}
          onComplete={handleBallComplete}
        />
      )}

      {diceSum > 0 && (
        <div className="mb-8 p-6 bg-primary-teal/20 rounded-3xl border-4 border-primary-teal">
          <p className="text-3xl md:text-4xl font-bold text-primary-teal">
            💰 Você tem: R$ {diceSum},00
          </p>
        </div>
      )}

      {allRolled ? (
        <Button onClick={handleContinue} size="lg" fullWidth>
          🛒 Ir às Compras!
        </Button>
      ) : (
        <div className="space-y-4">
          <Button 
            onClick={handleRollBall} 
            size="lg" 
            fullWidth
            disabled={!canRoll}
          >
            🎱 Jogar Bolinha
          </Button>
          {!canRoll && !allRolled && (
            <p className="text-lg text-gray-600">
              💡 Jogue todas as 5 bolinhas para continuar!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

