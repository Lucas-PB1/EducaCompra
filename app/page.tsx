'use client';

import { useGameStore } from '@/lib/store/gameStore';
import { Container } from '@/components/layout/Container';
import { WelcomeScreen } from '@/components/screens/WelcomeScreen';
import { DiceRollerScreen } from '@/components/screens/DiceRollerScreen';
import { ShoppingScreen } from '@/components/screens/ShoppingScreen';
import { QuestionsScreen } from '@/components/screens/QuestionsScreen';
import { ResultScreen } from '@/components/screens/ResultScreen';

export default function Home() {
  const currentScreen = useGameStore((state) => state.currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'dice':
        return <DiceRollerScreen />;
      case 'shopping':
        return <ShoppingScreen />;
      case 'questions':
        return <QuestionsScreen />;
      case 'result':
        return <ResultScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return <Container>{renderScreen()}</Container>;
}

