/**
 * Gera um valor aleatório entre 1 e 6 (simulando um dado)
 */
export function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}

/**
 * Calcula a soma dos valores dos dados
 */
export function calculateDiceSum(diceValues: (number | null)[]): number {
  return diceValues.reduce((sum: number, value) => {
    return sum + (value ?? 0);
  }, 0);
}

/**
 * Verifica se todos os dados foram rolados
 */
export function allDiceRolled(diceValues: (number | null)[]): boolean {
  return diceValues.every((value) => value !== null);
}

