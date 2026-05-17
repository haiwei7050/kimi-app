import { useState, useCallback } from 'react';
import { AppHeader } from '@/components/AppHeader';
import { QueryScreen } from '@/pages/QueryScreen';
import { ResultScreen } from '@/pages/ResultScreen';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'query' | 'result'>('query');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);

  const handleQuery = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen('result');
    }, 300);
  }, []);

  const handleBack = useCallback(() => {
    if (currentScreen === 'result') {
      setCurrentScreen('query');
    }
  }, [currentScreen]);

  return (
    <div className="h-screen w-full bg-[#F5F6FA] flex flex-col overflow-hidden max-w-md mx-auto relative">
      <AppHeader mode={currentScreen} onBack={handleBack} />
      <div className="flex-1 overflow-hidden relative">
        {isLoading && <LoadingScreen />}
        {currentScreen === 'query' ? (
          <QueryScreen
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            onQuery={handleQuery}
          />
        ) : (
          <ResultScreen year={selectedYear} />
        )}
      </div>
    </div>
  );
}
