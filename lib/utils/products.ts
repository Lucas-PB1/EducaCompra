import { Product } from '@/types';
import { BASE_PRODUCTS } from '@/lib/constants/products';

/**
 * Calcula os preços dos produtos baseado na soma dos dados.
 * Os preços são proporcionais ao dinheiro disponível.
 */
export function calculateProductPrices(diceSum: number): Product[] {
  if (diceSum === 0) {
    return BASE_PRODUCTS.map((product) => ({
      ...product,
      price: product.basePrice,
    }));
  }

  // Calcula um fator de escala baseado na soma dos dados
  // A soma mínima é 5 (todos dados = 1) e máxima é 30 (todos dados = 6)
  const minSum = 5;
  const maxSum = 30;
  const normalizedSum = Math.max(minSum, Math.min(diceSum, maxSum));

  // Fator de escala: quanto maior a soma, maiores os preços
  const scaleFactor = normalizedSum / 15.0; // 15 é um valor médio

  return BASE_PRODUCTS.map((product) => {
    const price = Math.max(1, Math.floor(product.basePrice * scaleFactor));
    return {
      ...product,
      price,
    };
  });
}

/**
 * Calcula o preço total dos produtos selecionados
 */
export function calculateTotalPrice(
  selectedProducts: string[],
  productsData: Product[]
): number {
  const productDict = new Map(
    productsData.map((p) => [p.name, p.price])
  );

  return selectedProducts.reduce((total, productName) => {
    return total + (productDict.get(productName) ?? 0);
  }, 0);
}

/**
 * Verifica se pode adicionar um produto sem exceder o limite
 */
export function canAddProduct(
  productName: string,
  selectedProducts: string[],
  productsData: Product[],
  diceSum: number
): boolean {
  const currentTotal = calculateTotalPrice(selectedProducts, productsData);
  const product = productsData.find((p) => p.name === productName);

  if (!product) {
    return false;
  }

  const newTotal = currentTotal + product.price;
  return newTotal <= diceSum;
}

