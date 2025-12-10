'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/lib/store/gameStore';
import { Button } from '@/components/ui/Button';
import { calculateTotalPrice } from '@/lib/utils/products';

const CONGRATULATIONS_MESSAGES = [
  'Você fez um ótimo trabalho aprendendo sobre compras! 🛒',
  'Que incrível! Você está se tornando um expert em economia! 💰',
  'Fantástico! Você aprendeu muito sobre como gerenciar dinheiro! 🌟',
  'Excelente! Você está no caminho certo para ser um comprador inteligente! 🎯',
];

export const ResultScreen: React.FC = () => {
  const {
    playerName,
    diceSum,
    selectedProducts,
    productsData,
    answers,
    resetGame,
  } = useGameStore();

  const totalGasto = calculateTotalPrice(selectedProducts, productsData);
  const randomMessage =
    CONGRATULATIONS_MESSAGES[
      Math.floor(Math.random() * CONGRATULATIONS_MESSAGES.length)
    ];

  useEffect(() => {
    // Animação de confetti
    if (typeof window !== 'undefined') {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, []);

  const handlePlayAgain = () => {
    resetGame();
  };

  const produtosNomes =
    selectedProducts.length > 0
      ? selectedProducts.join(', ')
      : 'Nenhum produto selecionado';

  return (
    <div className="text-center py-8 px-4 animate-fade-in">
      <div className="text-6xl mb-4">🎉 🎊 🎈</div>
      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-purple-light to-primary-purple-dark bg-clip-text text-transparent mb-2 animate-bounce-slow">
        Parabéns!
      </h1>
      <h2 className="text-3xl md:text-4xl font-bold text-primary-pink mb-8">
        {playerName}!
      </h2>

      <div className="max-w-2xl mx-auto space-y-6 mb-8">
        <div className="p-6 bg-primary-teal/20 rounded-3xl border-4 border-primary-teal">
          <p className="text-2xl md:text-3xl text-primary-teal">{randomMessage}</p>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-primary-teal mb-4">
            📊 Seu Resumo:
          </h3>
          <div className="p-6 bg-primary-pink/20 rounded-3xl border-4 border-primary-pink space-y-2 text-left">
            <p className="text-xl font-bold">
              <span className="text-primary-pink">💰 Dinheiro disponível:</span>{' '}
              R$ {diceSum},00
            </p>
            <p className="text-xl font-bold">
              <span className="text-primary-pink">🛒 Produtos comprados:</span>{' '}
              {produtosNomes}
            </p>
            <p className="text-xl font-bold">
              <span className="text-primary-pink">💸 Total gasto:</span> R${' '}
              {totalGasto},00
            </p>
          </div>
        </div>

        {answers.aprendeu && (
          <div className="p-6 bg-primary-teal/20 rounded-3xl border-4 border-primary-teal">
            <p className="text-xl font-bold text-primary-teal mb-2">
              📚 O que você aprendeu:
            </p>
            <p className="text-lg italic">&quot;{answers.aprendeu}&quot;</p>
          </div>
        )}
      </div>

      <Button onClick={handlePlayAgain} size="lg" fullWidth>
        🔄 Jogar Novamente!
      </Button>
    </div>
  );
};

