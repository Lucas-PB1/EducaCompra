import React from 'react';

export interface DiceProps {
  value: number | null;
  onRoll: () => void;
  disabled?: boolean;
}

export const Dice: React.FC<DiceProps> = ({ value, onRoll, disabled = false }) => {
  const isRolled = value !== null;

  return (
    <button
      onClick={onRoll}
      disabled={disabled || isRolled}
      className={`
        w-24 h-24 md:w-28 md:h-28
        rounded-3xl
        border-4
        font-bold
        text-4xl md:text-5xl
        transition-all duration-200
        disabled:cursor-not-allowed
        ${
          isRolled
            ? 'bg-gradient-to-r from-pink-400 to-red-500 border-primary-pink text-white scale-105'
            : 'bg-gradient-to-r from-primary-purple-light to-primary-purple-dark border-primary-yellow text-white hover:scale-110 active:scale-95'
        }
        ${disabled && !isRolled ? 'opacity-50' : ''}
      `}
      aria-label={isRolled ? `Dado com valor ${value}` : 'Rolar dado'}
    >
      {isRolled ? value : '🎲'}
    </button>
  );
};

