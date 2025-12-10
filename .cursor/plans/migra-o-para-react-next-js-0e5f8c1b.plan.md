<!-- 0e5f8c1b-9063-4a62-9050-16876a26cd30 d9adc592-96d4-44f5-92a6-d49179514d68 -->
# Migração Educa Compras para React/Next.js

## Visão Geral

Migração completa do aplicativo Streamlit para uma aplicação React moderna usando Next.js 14 (App Router), TypeScript, Tailwind CSS e Zustand, seguindo princípios SOLID, DRY e Clean Code.

## Estrutura do Projeto

```
educa/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Rota raiz (Welcome)
│   ├── globals.css               # Estilos globais Tailwind
│   └── api/                      # API routes (se necessário)
├── components/                   # Componentes React
│   ├── ui/                       # Componentes base reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Dice.tsx
│   ├── screens/                  # Telas principais
│   │   ├── WelcomeScreen.tsx
│   │   ├── DiceRollerScreen.tsx
│   │   ├── ShoppingScreen.tsx
│   │   ├── QuestionsScreen.tsx
│   │   └── ResultScreen.tsx
│   └── layout/                   # Componentes de layout
│       └── Container.tsx
├── lib/                          # Lógica de negócio
│   ├── store/                    # Zustand stores
│   │   └── gameStore.ts
│   ├── utils/                    # Funções utilitárias
│   │   ├── dice.ts
│   │   ├── products.ts
│   │   └── calculations.ts
│   └── constants/                # Constantes
│       └── products.ts
├── types/                        # TypeScript types
│   └── index.ts
├── public/                       # Assets estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Arquitetura e Princípios

### SOLID

- **Single Responsibility**: Cada componente/utilitário tem uma única responsabilidade
- **Open/Closed**: Componentes base extensíveis via props
- **Liskov Substitution**: Interfaces consistentes para componentes similares
- **Interface Segregation**: Types específicos por domínio
- **Dependency Inversion**: Dependências injetadas via props/hooks

### DRY

- Componentes UI reutilizáveis (`Button`, `Card`, `Input`)
- Hooks customizados para lógica compartilhada
- Utilitários centralizados
- Constantes compartilhadas

### Clean Code

- Nomes descritivos e semânticos
- Funções pequenas e focadas
- Separação clara de concerns (UI, lógica, estado)
- TypeScript para type safety

## Implementação Detalhada

### 1. Configuração Inicial

**Arquivos a criar:**

- `package.json`: Dependências (Next.js 14, React 18, TypeScript, Tailwind, Zustand)
- `tsconfig.json`: Configuração TypeScript estrita
- `tailwind.config.ts`: Tema customizado com cores do design infantil
- `next.config.js`: Configuração Next.js para Vercel

### 2. Types e Interfaces (`types/index.ts`)

```typescript
export type Screen = 'welcome' | 'dice' | 'shopping' | 'questions' | 'result';

export interface Product {
  icon: string;
  name: string;
  price: number;
  basePrice: number;
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

export interface Answers {
  dinheiroTotal: number | null;
  gastou: number | null;
  sobrou: 'SIM' | 'NÃO' | null;
  sobrouValor: number | null;
  faltou: string | null;
  faltouValor: number | null;
  aprendeu: string;
}
```

### 3. Zustand Store (`lib/store/gameStore.ts`)

Store centralizado seguindo Single Source of Truth:

- Estado do jogo
- Actions para modificar estado
- Computed values (selectors)
- Reset function

### 4. Componentes UI Base (`components/ui/`)

Componentes reutilizáveis com props tipadas:

- **Button**: Variantes (primary, secondary), tamanhos, estados
- **Card**: Container flexível com variantes
- **Input**: Input controlado com validação
- **Dice**: Componente de dado com animação

### 5. Telas (`components/screens/`)

Cada tela como componente isolado:

- **WelcomeScreen**: Input de nome, validação, navegação
- **DiceRollerScreen**: Grid de 5 dados, cálculo de soma, animações
- **ShoppingScreen**: Grid de produtos, seleção, validação de orçamento
- **QuestionsScreen**: Formulário com 5 perguntas, validação
- **ResultScreen**: Exibição de resultados, animações, botão reiniciar

### 6. Utilitários (`lib/utils/`)

Funções puras e testáveis:

- `dice.ts`: rollDice, calculateDiceSum, allDiceRolled
- `products.ts`: calculateProductPrices, calculateTotalPrice, canAddProduct
- `calculations.ts`: Funções de cálculo reutilizáveis

### 7. Constantes (`lib/constants/products.ts`)

Dados estáticos dos produtos com tipos.

### 8. Roteamento e Navegação

Usar estado do Zustand para controlar qual tela exibir no `page.tsx` principal, evitando rotas múltiplas para simplicidade (SPA-like).

### 9. Estilização Tailwind

- Design system com cores do tema infantil
- Classes utilitárias reutilizáveis
- Responsividade mobile-first
- Animações com Tailwind
- Gradientes e efeitos visuais

### 10. Animações e UX

- Transições suaves entre telas
- Animações de dados (rolagem)
- Feedback visual em interações
- Estados de loading/disabled
- Confetti/celebração na tela de resultado

## Dependências Principais

```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.2.0",
  "zustand": "^4.4.0",
  "tailwindcss": "^3.3.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  "canvas-confetti": "^1.9.0" // Para animações
}
```

## Funcionalidades a Implementar

1. ✅ Tela de boas-vindas com input de nome
2. ✅ Rolagem de 5 dados com soma automática
3. ✅ Seleção de produtos com validação de orçamento
4. ✅ Formulário de 5 perguntas reflexivas
5. ✅ Tela de resultado com resumo
6. ✅ Reiniciar jogo
7. ❌ Salvamento CSV (removido conforme escolha)

## Melhorias em Relação ao Streamlit

- Performance: React otimizado vs Streamlit server-side
- UX: Transições suaves, animações nativas
- Mobile: Melhor responsividade
- SEO: Meta tags e estrutura semântica
- Deploy: Vercel com CDN global
- Type Safety: TypeScript em todo código
- Manutenibilidade: Código organizado e testável

## Próximos Passos Após Implementação

1. Testes unitários (Jest + React Testing Library)
2. Otimização de imagens/assets
3. Analytics (opcional)
4. PWA (Progressive Web App)
5. Internacionalização (i18n) se necessário

### To-dos

- [ ] Configurar projeto Next.js com TypeScript, Tailwind CSS e dependências
- [ ] Criar types e interfaces TypeScript para type safety
- [ ] Implementar Zustand store para gerenciamento de estado global
- [ ] Criar funções utilitárias (dice, products, calculations) seguindo princípios SOLID
- [ ] Desenvolver componentes UI base reutilizáveis (Button, Card, Input, Dice)
- [ ] Implementar WelcomeScreen com validação e navegação
- [ ] Implementar DiceRollerScreen com animações e lógica de dados
- [ ] Implementar ShoppingScreen com grid de produtos e validação de orçamento
- [ ] Implementar QuestionsScreen com formulário de 5 perguntas
- [ ] Implementar ResultScreen com resumo e animações de celebração
- [ ] Configurar roteamento principal e navegação entre telas
- [ ] Aplicar estilização Tailwind com tema infantil e responsividade
- [ ] Adicionar animações e transições suaves entre telas
- [ ] Configurar para deploy na Vercel (next.config.js, vercel.json se necessário)