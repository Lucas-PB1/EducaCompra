'use client';

import React from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  calculateTotalPrice,
  canAddProduct,
} from '@/lib/utils/products';
import { calculateRemaining } from '@/lib/utils/calculations';

export const ShoppingScreen: React.FC = () => {
  const {
    diceSum,
    productsData,
    selectedProducts,
    selectProduct,
    deselectProduct,
    setCurrentScreen,
  } = useGameStore();

  const totalSpent = calculateTotalPrice(selectedProducts, productsData);
  const remaining = calculateRemaining(diceSum, totalSpent);

  const handleProductClick = (productName: string) => {
    const isSelected = selectedProducts.includes(productName);

    if (isSelected) {
      deselectProduct(productName);
    } else {
      if (canAddProduct(productName, selectedProducts, productsData, diceSum)) {
        selectProduct(productName);
      } else {
        alert(
          `⚠️ Você não tem dinheiro suficiente para ${productName}! Você tem R$ ${remaining},00 disponível.`
        );
      }
    }
  };

  const handleFinish = () => {
    if (totalSpent <= diceSum) {
      setCurrentScreen('questions');
    } else {
      alert('⚠️ Você não pode gastar mais do que tem! Remova alguns produtos.');
    }
  };

  return (
    <div className="py-8 px-4 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-primary-pink text-center mb-8">
        🛒 Hora de Comprar! 🛒
      </h1>

      <div className="space-y-4 mb-8">
        <div className="p-6 bg-primary-teal/20 rounded-3xl border-4 border-primary-teal text-center">
          <p className="text-2xl md:text-3xl font-bold text-primary-teal">
            💰 Você tem: R$ {diceSum},00
          </p>
        </div>

        <div className="p-6 bg-primary-pink/20 rounded-3xl border-4 border-primary-pink text-center">
          <p className="text-2xl md:text-3xl font-bold text-primary-pink">
            💸 Você gastou: R$ {totalSpent},00
          </p>
        </div>

        {remaining >= 0 ? (
          <div className="p-6 bg-primary-yellow/20 rounded-3xl border-4 border-primary-yellow text-center">
            <p className="text-2xl md:text-3xl font-bold text-primary-yellow">
              ✨ Sobrou: R$ {remaining},00
            </p>
          </div>
        ) : (
          <div className="p-4 bg-red-100 rounded-2xl border-4 border-red-500 text-center">
            <p className="text-xl font-bold text-red-600">
              ⚠️ Você está tentando gastar R$ {Math.abs(remaining)},00 a mais do que tem!
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {productsData.map((product) => {
          const isSelected = selectedProducts.includes(product.name);
          return (
            <Card
              key={product.name}
              selected={isSelected}
              onClick={() => handleProductClick(product.name)}
            >
              <div className="text-5xl mb-2">{product.icon}</div>
              <div className="text-xl font-bold mb-2">{product.name}</div>
              <div
                className={`text-2xl font-bold ${
                  isSelected ? 'text-primary-yellow' : 'text-primary-teal'
                }`}
              >
                R$ {product.price},00
              </div>
              <Button
                variant={isSelected ? 'secondary' : 'primary'}
                size="sm"
                className="mt-4 w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProductClick(product.name);
                }}
              >
                {isSelected ? '✅ Selecionado' : '➕ Selecionar'}
              </Button>
            </Card>
          );
        })}
      </div>

      <Button onClick={handleFinish} size="lg" fullWidth>
        ✅ Finalizar Compras
      </Button>
    </div>
  );
};

