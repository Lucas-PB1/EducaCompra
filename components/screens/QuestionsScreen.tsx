'use client';

import React from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const QuestionsScreen: React.FC = () => {
  const {
    answers,
    updateAnswer,
    setCurrentScreen,
  } = useGameStore();

  const handleNext = () => {
    if (!answers.aprendeu || !answers.aprendeu.trim()) {
      alert('⚠️ Por favor, responda a última pergunta sobre tudo o que você aprendeu!');
      return;
    }
    setCurrentScreen('result');
  };

  return (
    <div className="py-8 px-4 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-primary-pink text-center mb-8">
        📝 Vamos Refletir! 📝
      </h1>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Pergunta 1 */}
        <div className="bg-primary-yellow/10 p-6 rounded-3xl border-4 border-primary-yellow">
          <label className="block text-xl font-bold text-primary-teal mb-3">
            1. Quanto você tem em dinheiro? 💰
          </label>
          <Input
            type="number"
            min="0"
            placeholder="R$"
            onChange={(e) =>
              updateAnswer('dinheiroTotal', parseFloat(e.target.value) || 0)
            }
          />
        </div>

        {/* Pergunta 2 */}
        <div className="bg-primary-yellow/10 p-6 rounded-3xl border-4 border-primary-yellow">
          <label className="block text-xl font-bold text-primary-teal mb-3">
            2. Quanto gastou no mercado? 🛒
          </label>
          <Input
            type="number"
            min="0"
            placeholder="R$"
            onChange={(e) =>
              updateAnswer('gastou', parseFloat(e.target.value) || 0)
            }
          />
        </div>

        {/* Pergunta 3 */}
        <div className="bg-primary-yellow/10 p-6 rounded-3xl border-4 border-primary-yellow">
          <label className="block text-xl font-bold text-primary-teal mb-3">
            3. Sobrou dinheiro? 💵
          </label>
          <div className="flex gap-4 mb-4">
            <Button
              variant={answers.sobrou === 'SIM' ? 'primary' : 'secondary'}
              onClick={() => updateAnswer('sobrou', 'SIM')}
            >
              SIM
            </Button>
            <Button
              variant={answers.sobrou === 'NÃO' ? 'primary' : 'secondary'}
              onClick={() => updateAnswer('sobrou', 'NÃO')}
            >
              NÃO
            </Button>
          </div>
          {answers.sobrou === 'SIM' && (
            <Input
              type="number"
              min="0"
              placeholder="Se sim, quanto? R$"
              onChange={(e) =>
                updateAnswer('sobrouValor', parseFloat(e.target.value) || 0)
              }
            />
          )}
        </div>

        {/* Pergunta 4 */}
        <div className="bg-primary-yellow/10 p-6 rounded-3xl border-4 border-primary-yellow">
          <label className="block text-xl font-bold text-primary-teal mb-3">
            4. Faltou dinheiro para algo que queria? 🤔
          </label>
          <div className="space-y-2 mb-4">
            {['Sim, faltou R$', 'Não, deu exato', 'Não, sobrou R$'].map(
              (option) => (
                <Button
                  key={option}
                  variant={answers.faltou === option ? 'primary' : 'secondary'}
                  onClick={() => updateAnswer('faltou', option)}
                  fullWidth
                >
                  {option}
                </Button>
              )
            )}
          </div>
          {(answers.faltou === 'Sim, faltou R$' ||
            answers.faltou === 'Não, sobrou R$') && (
            <Input
              type="number"
              min="0"
              placeholder={
                answers.faltou === 'Sim, faltou R$'
                  ? 'Quanto faltou? R$'
                  : 'Quanto sobrou? R$'
              }
             
              onChange={(e) =>
                updateAnswer('faltouValor', parseFloat(e.target.value) || 0)
              }
            />
          )}
        </div>

        {/* Pergunta 5 */}
        <div className="bg-primary-yellow/10 p-6 rounded-3xl border-4 border-primary-yellow">
          <label className="block text-xl font-bold text-primary-teal mb-3">
            5. O que você aprendeu sobre compras? 📚
          </label>
          <textarea
            className="w-full px-4 py-3 text-lg rounded-2xl border-4 border-primary-yellow focus:outline-none focus:border-primary-pink transition-colors min-h-[100px]"
            placeholder="Escreva aqui o que você aprendeu..."
            onChange={(e) => updateAnswer('aprendeu', e.target.value)}
          />
        </div>

        <Button onClick={handleNext} size="lg" fullWidth>
          🎉 Ver Resultado!
        </Button>
      </div>
    </div>
  );
};

