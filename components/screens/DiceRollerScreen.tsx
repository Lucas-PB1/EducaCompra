'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { BallTable } from '@/components/ui/BallTable';
import { Button } from '@/components/ui/Button';
import { allDiceRolled } from '@/lib/utils/dice';
import { rollDice } from '@/lib/utils/dice';

export const DiceRollerScreen: React.FC = () => {
  const { playerName, diceValues, diceSum, setDiceValue, setCurrentScreen } =
    useGameStore();
  
  // Helpers to create initial grid
  const createGrid = (): number[][] => {
    // 5x5 Grid = 25 slots
    // 6 numbers * 4 = 24 slots, +1 random = 25
    const allValues: number[] = [];
    
    // Add 4 of each number (1-6)
    for (let i = 1; i <= 6; i++) {
        for (let k = 0; k < 4; k++) {
            allValues.push(i);
        }
    }
    // Add 1 random extra number to complete 25
    allValues.push(Math.floor(Math.random() * 6) + 1);

    // Shuffle
    for (let i = allValues.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allValues[i], allValues[j]] = [allValues[j], allValues[i]];
    }

    // Create 5x5 grid
    const grid: number[][] = [];
    for (let row = 0; row < 5; row++) {
      const rowValues: number[] = [];
      for (let col = 0; col < 5; col++) {
        rowValues.push(allValues[row * 5 + col]);
      }
      grid.push(rowValues);
    }
    return grid;
  };

  const [grid] = useState<number[][]>(createGrid());
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleRollBall = () => {
    const nextIndex = diceValues.findIndex((value) => value === null);
    if (nextIndex === -1 || isAnimating) return;

    setIsAnimating(true);
    
    // 1. Decide the result
    const resultValue = rollDice();

    // 2. Find valid positions for this result
    const validKeys: string[] = [];
    const otherKeys: string[] = [];

    grid.forEach((row, rowIndex) => {
      row.forEach((val, colIndex) => {
        const key = `${val}-${rowIndex}-${colIndex}`;
        if (val === resultValue) {
          validKeys.push(key);
        } else {
          otherKeys.push(key);
        }
      });
    });

    // 3. Pick a winner key
    const targetKey = validKeys[Math.floor(Math.random() * validKeys.length)];

    // 4. Create animation sequence (decoys -> winner)
    // "Silvio Santos" style: flashes random numbers before stopping
    const sequenceLength = 8; // Number of flashes (Reduced from 15)
    const sequence: string[] = [];
    
    for (let i = 0; i < sequenceLength; i++) {
      // flash mostly random keys, or can mix in some nearby cells
      sequence.push(otherKeys[Math.floor(Math.random() * otherKeys.length)]);
    }
    sequence.push(targetKey);

    // 5. Run animation
    let step = 0;
    const intervalTime = 400; // Speed of flashes (Slower, increased from 150)

    const interval = setInterval(() => {
      if (step >= sequence.length) {
        clearInterval(interval);
        // End of animation
        setTimeout(() => {
          setDiceValue(nextIndex, resultValue);
          setIsAnimating(false);
          setActiveKey(null);
        }, 1000); // Keep lit for 1 second
        return;
      }

      setActiveKey(sequence[step]);
      
      // Play sound effect here if available?
      step++;
    }, intervalTime);
  };

  const handleContinue = () => {
    setCurrentScreen('shopping');
  };

  const allRolled = allDiceRolled(diceValues);
  const canRoll = !isAnimating && !allRolled;
  const remainingBalls = diceValues.filter((v) => v === null).length;

  return (
    <div className="text-center py-8 px-4 animate-fade-in min-h-screen flex flex-col">
      <h1 className="text-4xl md:text-5xl font-bold text-primary-pink mb-2">
        Olá, {playerName}! 👋
      </h1>
      <p className="text-xl md:text-2xl text-primary-teal mb-4">
        Tente a sorte para ganhar dinheiro! 🎰
      </p>

      {remainingBalls > 0 && (
        <p className="text-lg text-gray-600 mb-4">
           {remainingBalls} tentativa{remainingBalls > 1 ? 's' : ''} restante{remainingBalls > 1 ? 's' : ''}
        </p>
      )}

      <div className="flex-1 flex items-center justify-center mb-8">
        <BallTable
          grid={grid}
          activeKey={activeKey}
        />
      </div>

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
            🎰 Tentar a Sorte
          </Button>
          {!canRoll && !allRolled && (
            <p className="text-lg text-gray-600">
              💡 Boa sorte!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

