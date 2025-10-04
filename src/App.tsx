import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "@/game/GameContext";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { GameScreen } from "@/components/screens/GameScreen";
import { SettingsScreen } from "@/components/screens/SettingsScreen";
import { I18nextProvider } from 'react-i18next';
import i18n from '@/services/LocalizationService';
import NotFound from "./pages/NotFound";
import { VirtualAssistant } from "@/components/VirtualAssistant";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    import('@/services/LocalizationService').then(({ initLocalization }) => {
      initLocalization().then(() => {
        setI18nReady(true);
      });
    });
  }, []);

  if (!i18nReady) {
    return (
      <div className="min-h-screen bg-game-bg flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading Farm Navigators...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <GameProvider>
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/game" element={<GameScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <VirtualAssistant />
            </GameProvider>
          </BrowserRouter>
        </TooltipProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};

export default App;
