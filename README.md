# 🛒 Educa Compras

Aplicativo educativo sobre compras para crianças, desenvolvido com Next.js, React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilização
- **Zustand** - Gerenciamento de estado
- **Canvas Confetti** - Animações de celebração

## 📋 Funcionalidades

1. **Tela de Boas-vindas** - Coleta o nome do participante
2. **Rolagem de Dados** - 5 dados determinam o orçamento disponível
3. **Compras** - Seleção de produtos com validação de orçamento
4. **Perguntas Reflexivas** - 5 perguntas sobre a experiência
5. **Resultado** - Resumo com animações de celebração

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## 📦 Deploy na Vercel

1. Conecte seu repositório à Vercel
2. Configure o projeto (Next.js detectado automaticamente)
3. Deploy automático a cada push

Ou use a CLI:

```bash
npm i -g vercel
vercel
```

## 🎨 Princípios de Design

- **SOLID** - Código organizado e manutenível
- **DRY** - Componentes reutilizáveis
- **Clean Code** - Nomes descritivos e funções focadas
- **Mobile First** - Design responsivo

## 📁 Estrutura do Projeto

```
educa/
├── app/              # Next.js App Router
├── components/       # Componentes React
│   ├── ui/          # Componentes base
│   ├── screens/     # Telas principais
│   └── layout/      # Layout
├── lib/             # Lógica de negócio
│   ├── store/      # Zustand store
│   ├── utils/      # Funções utilitárias
│   └── constants/  # Constantes
└── types/          # TypeScript types
```

## 📝 Licença

Este projeto é educacional e de código aberto.

