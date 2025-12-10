import { Product } from '@/types';

export const BASE_PRODUCTS: Omit<Product, 'price'>[] = [
  { icon: '🍎', name: 'Maçã', basePrice: 3 },
  { icon: '🍌', name: 'Banana', basePrice: 2 },
  { icon: '🥛', name: 'Leite', basePrice: 5 },
  { icon: '🍞', name: 'Pão', basePrice: 4 },
  { icon: '🥚', name: 'Ovos', basePrice: 6 },
  { icon: '🧀', name: 'Queijo', basePrice: 8 },
  { icon: '🍝', name: 'Macarrão', basePrice: 3 },
  { icon: '🍚', name: 'Arroz', basePrice: 5 },
  { icon: '🍅', name: 'Tomate', basePrice: 4 },
];

