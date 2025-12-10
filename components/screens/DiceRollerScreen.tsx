'use client';

import React from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { Dice } from '@/components/ui/Dice';
import { Button } from '@/components/ui/Button';
import { allDiceRolled } from '@/lib/utils/dice';

export const DiceRollerScreen: React.FC = () => {
  const { playerName, diceValues, diceSum, rollDice, setCurrentScreen } =
    useGameStore();

  const handleDiceRoll = (index: number) => {
    rollDice(index);
  };

  const handleContinue = () => {
    setCurrentScreen('shopping');
  };

  const allRolled = allDiceRolled(diceValues);

  return (
    <div className="text-center py-8 px-4 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-primary-pink mb-2">
        Olá, {playerName}! 👋
      </h1>
      <p className="text-xl md:text-2xl text-primary-teal mb-8">
        Clique nos dados para rolar! 🎲
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {diceValues.map((value, index) => (
          <Dice
            key={index}
            value={value}
            onRoll={() => handleDiceRoll(index)}
            disabled={value !== null}
          />
        ))}
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
        <p className="text-lg text-gray-600">💡 Role todos os dados para continuar!</p>
      )}
    </div>
  );
};

