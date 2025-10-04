import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/game/GameContext';
import { SaveGameService } from '@/services/SaveGameService';
import { useTranslation } from 'react-i18next';
import { Play, RotateCcw, Settings, Info } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { startNewGame, loadGame } = useGame();
  const { t } = useTranslation();
  const hasSave = SaveGameService.hasSave();

  const handleNewGame = () => {
    startNewGame();
    navigate('/game');
  };

  const handleContinue = () => {
    const loaded = loadGame();
    if (loaded) {
      navigate('/game');
    }
  };

  return (
    <div className="min-h-screen bg-game-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-pillar-sustainability via-pillar-technology to-pillar-people bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          <p className="text-xl font-semibold text-muted-foreground mb-3">
            {t('home.subtitle')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('home.tagline')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full text-lg h-14 bg-pillar-sustainability hover:bg-pillar-sustainability/90"
            onClick={handleNewGame}
          >
            <Play className="w-5 h-5 mr-2" />
            {t('home.play')}
          </Button>

          {hasSave && (
            <Button
              size="lg"
              variant="outline"
              className="w-full text-lg h-14"
              onClick={handleContinue}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              {t('home.continue')}
            </Button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/settings')}
            >
              <Settings className="w-4 h-4 mr-2" />
              {t('home.settings')}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <Info className="w-4 h-4 mr-2" />
              {t('home.about')}
            </Button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid grid-cols-4 gap-3">
          <div className="bg-pillar-economy/20 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">💰</div>
            <div className="text-xs font-medium">Economy</div>
          </div>
          <div className="bg-pillar-sustainability/20 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🌱</div>
            <div className="text-xs font-medium">Sustainability</div>
          </div>
          <div className="bg-pillar-technology/20 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🔧</div>
            <div className="text-xs font-medium">Technology</div>
          </div>
          <div className="bg-pillar-people/20 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">👥</div>
            <div className="text-xs font-medium">People</div>
          </div>
        </div>
      </div>
    </div>
  );
};
