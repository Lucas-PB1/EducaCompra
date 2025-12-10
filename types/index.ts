export type Screen = 'welcome' | 'dice' | 'shopping' | 'questions' | 'result';

export interface Product {
  icon: string;
  name: string;
  price: number;
  basePrice: number;
}

export interface Answers {
  dinheiroTotal: number | null;
  gastou: number | null;
  sobrou: 'SIM' | 'NÃO' | null;
  sobrouValor: number | null;
  faltou: string | null;
  faltouValor: number | null;
  aprendeu: string;
}

export interface GameState {
  currentScreen: Screen;
  playerName: string;
  diceValues: (number | null)[];
  diceSum: number;
  selectedProducts: string[];
  productsData: Product[];
  answers: Answers;
}

export interface GameActions {
  setPlayerName: (name: string) => void;
  setCurrentScreen: (screen: Screen) => void;
  rollDice: (index: number) => void;
  selectProduct: (productName: string) => void;
  deselectProduct: (productName: string) => void;
  updateAnswer: (key: keyof Answers, value: Answers[keyof Answers]) => void;
  resetGame: () => void;
}

export interface GameStore extends GameState, GameActions {}

