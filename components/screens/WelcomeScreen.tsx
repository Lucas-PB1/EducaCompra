'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { isValidName } from '@/lib/utils/calculations';

export const WelcomeScreen: React.FC = () => {
  const { playerName, setPlayerName, setCurrentScreen } = useGameStore();
  const [localName, setLocalName] = useState(playerName);
  const [error, setError] = useState('');

  const handleStart = () => {
    if (!isValidName(localName)) {
      setError('⚠️ Por favor, digite seu nome para começar!');
      return;
    }

    setPlayerName(localName.trim());
    setCurrentScreen('dice');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };

  return (
    <div className="text-center py-8 px-4 animate-fade-in">
      <h1 className="text-5xl md:text-6xl font-bold text-primary-pink mb-4 drop-shadow-lg">
        🛒 Educa Compras 🛒
      </h1>
      <p className="text-2xl md:text-3xl text-primary-teal mb-8">
        Vamos aprender sobre compras!
      </p>

      <div className="max-w-md mx-auto space-y-6">
        <Input
          placeholder="Digite seu nome aqui..."
          value={localName}
          onChange={(e) => {
            setLocalName(e.target.value);
            setError('');
          }}
          onKeyPress={handleKeyPress}
          error={error}
          className="text-center"
        />

        <Button onClick={handleStart} size="lg" fullWidth>
          🚀 Começar!
        </Button>
      </div>
    </div>
  );
};

