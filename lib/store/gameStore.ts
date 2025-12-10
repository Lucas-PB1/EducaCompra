import { create } from 'zustand';
import { GameStore, Screen, Answers, Product } from '@/types';
import { rollDice, calculateDiceSum } from '@/lib/utils/dice';
import { calculateProductPrices } from '@/lib/utils/products';

const initialAnswers: Answers = {
  dinheiroTotal: null,
  gastou: null,
  sobrou: null,
  sobrouValor: null,
  faltou: null,
  faltouValor: null,
  aprendeu: '',
};

export const useGameStore = create<GameStore>((set, get) => ({
  // Estado inicial
  currentScreen: 'welcome',
  playerName: '',
  diceValues: [null, null, null, null, null],
  diceSum: 0,
  selectedProducts: [],
  productsData: [],
  answers: initialAnswers,

  // Actions
  setPlayerName: (name: string) => {
    set({ playerName: name });
  },

  setCurrentScreen: (screen: Screen) => {
    set({ currentScreen: screen });
  },

  rollDice: (index: number) => {
    const { diceValues } = get();
    const newDiceValues = [...diceValues];
    newDiceValues[index] = rollDice();
    
    const newDiceSum = calculateDiceSum(newDiceValues);
    
    set({
      diceValues: newDiceValues,
      diceSum: newDiceSum,
    });

    // Calcular preços dos produtos quando todos os dados forem rolados
    if (newDiceValues.every((value) => value !== null)) {
      const productsData = calculateProductPrices(newDiceSum);
      set({ productsData });
    }
  },

  selectProduct: (productName: string) => {
    const { selectedProducts } = get();
    if (!selectedProducts.includes(productName)) {
      set({ selectedProducts: [...selectedProducts, productName] });
    }
  },

  deselectProduct: (productName: string) => {
    const { selectedProducts } = get();
    set({
      selectedProducts: selectedProducts.filter((name) => name !== productName),
    });
  },

  updateAnswer: (key, value) => {
    const { answers } = get();
    set({
      answers: {
        ...answers,
        [key]: value,
      },
    });
  },

  resetGame: () => {
    set({
      currentScreen: 'welcome',
      playerName: '',
      diceValues: [null, null, null, null, null],
      diceSum: 0,
      selectedProducts: [],
      productsData: [],
      answers: initialAnswers,
    });
  },
}));

