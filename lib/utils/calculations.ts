/**
 * Calcula o valor restante após subtrair o gasto do total disponível
 */
export function calculateRemaining(available: number, spent: number): number {
  return Math.max(0, available - spent);
}

/**
 * Formata um valor monetário para exibição (R$ X,00)
 */
export function formatCurrency(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

/**
 * Valida se um nome é válido (não vazio e sem apenas espaços)
 */
export function isValidName(name: string): boolean {
  return name.trim().length > 0;
}

