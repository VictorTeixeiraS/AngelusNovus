import React, { useEffect } from 'react';
import { useGame } from '@/game/GameContext';
import { Card } from '@/components/card/Card';
import { StatBar } from '@/components/ui/StatBar';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Home, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GameScreen: React.FC = () => {
  const { gameState, currentCard, makeDecision, resetGame, startNewGame } = useGame();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentCard && !gameState.gameOver) {
      startNewGame();
    }
  }, [currentCard, gameState.gameOver, startNewGame]);

  if (gameState.gameOver) {
    return (
      <div className="min-h-screen bg-game-bg flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">
            {gameState.gameResult === 'win' ? '🎉 ' + t('result.success') : '💔 ' + t('result.failure')}
          </h1>
          
          <div className="bg-card rounded-2xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Final Scores</h2>
            <div className="space-y-3">
              <StatBar pillar="economy" value={gameState.pillars.economy} />
              <StatBar pillar="sustainability" value={gameState.pillars.sustainability} />
              <StatBar pillar="technology" value={gameState.pillars.technology} />
              <StatBar pillar="people" value={gameState.pillars.people} />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={resetGame} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              {t('result.restart')}
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="flex-1">
              <Home className="w-4 h-4 mr-2" />
              {t('result.menu')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-game-bg flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-game-bg p-4 pb-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
          >
            <Home className="w-4 h-4 mr-2" />
            Menu
          </Button>
          
          <div className="text-sm font-medium bg-card px-4 py-2 rounded-full shadow-sm">
            {t('game.turn', { turn: gameState.turn })}
          </div>
        </div>

        {/* Pillars Stats */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            <StatBar pillar="economy" value={gameState.pillars.economy} />
            <StatBar pillar="sustainability" value={gameState.pillars.sustainability} />
            <StatBar pillar="technology" value={gameState.pillars.technology} />
            <StatBar pillar="people" value={gameState.pillars.people} />
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="max-w-4xl mx-auto">
        <Card card={currentCard} onDecision={makeDecision} />
      </div>
    </div>
  );
};
