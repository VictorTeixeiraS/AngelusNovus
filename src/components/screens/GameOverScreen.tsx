import React, { useState } from 'react';
import { useGame } from '@/game/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scoreboard } from './ScoreboardScreen';
import { useTranslation } from 'react-i18next';

export const GameOverScreen: React.FC = () => {
  const { gameState, resetGame, saveScore } = useGame();
  const [name, setName] = useState('');
  const [nationFlag, setNationFlag] = useState('');
  const { t } = useTranslation();

  // Calculate final score: turns survived + pillar balance - earth index penalty
  const pillarValues = Object.values(gameState.pillars);
  const pillarSum = pillarValues.reduce((sum, val) => sum + val, 0);
  const pillarBalance = Math.min(...pillarValues.map(Math.abs)); // Reward balanced pillars
  const earthIndexPenalty = Math.max(0, (gameState.earthIndex - 1.0) * 500);
  
  const finalScore = Math.round(
    (gameState.turn * 100) + // Base points for turns survived
    (pillarSum * 50) + // Points for positive pillars
    (pillarBalance * 100) + // Bonus for keeping pillars balanced
    (gameState.gameResult === 'win' ? 1000 : 0) - // Win bonus
    earthIndexPenalty // Penalty for high consumption
  );

  // Calculate Earth Overshoot Day (July 24th is baseline for 1.75 Earth Index)
  const baselineDay = 205; // July 24th
  const daysPerEarth = 365 / gameState.earthIndex;
  const overshootDay = Math.floor(daysPerEarth);
  const overshootDate = new Date(2025, 0, overshootDay);

  const handleSaveScore = () => {
    if (name && nationFlag) {
      saveScore({
        name,
        nationFlag,
        score: finalScore,
        earthIndex: gameState.earthIndex,
        date: new Date().toLocaleDateString(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-game-bg overflow-y-auto p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {gameState.gameResult === 'win' ? '🎉 ' + t('gameOver.title') : '💔 ' + t('gameOver.title')}
          </h1>
          
          <div className="space-y-3 text-center mb-6">
            <p className="text-lg md:text-xl font-semibold">
              {t('gameOver.description', { score: finalScore, earthIndex: gameState.earthIndex.toFixed(2) })}
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              🌍 Earth Overshoot Day: {overshootDate.toLocaleDateString()}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground italic px-4">
              {t('gameOver.earthIndexInfo')}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-background rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-pillar-economy">{gameState.turn}</div>
              <div className="text-xs text-muted-foreground">{t('game.turn', { turn: '' }).replace(/\d+/, '').trim() || 'Turns'}</div>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-pillar-sustainability">{finalScore}</div>
              <div className="text-xs text-muted-foreground">{t('gameOver.finalScore')}</div>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-pillar-technology">{gameState.earthIndex.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">{t('game.earthIndex')}</div>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-pillar-people">{pillarSum > 0 ? '+' : ''}{pillarSum}</div>
              <div className="text-xs text-muted-foreground">Total Balance</div>
            </div>
          </div>

          {/* Save Score Form */}
          <div className="bg-background rounded-lg p-4 md:p-6 mb-4">
            <h3 className="text-lg font-semibold mb-4">{t('gameOver.saveScore')}</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="md:text-right">
                  {t('gameOver.name')}
                </Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="md:col-span-3" 
                  placeholder="Enter your name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="nationFlag" className="md:text-right">
                  {t('gameOver.nationFlag')}
                </Label>
                <Input 
                  id="nationFlag" 
                  value={nationFlag} 
                  onChange={(e) => setNationFlag(e.target.value)} 
                  className="md:col-span-3" 
                  placeholder="e.g., 🇧🇷, 🇺🇸, 🇯🇵"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button 
                onClick={handleSaveScore} 
                disabled={!name || !nationFlag}
                className="flex-1"
              >
                💾 {t('gameOver.saveScore')}
              </Button>
              <Button 
                onClick={resetGame} 
                variant="secondary"
                className="flex-1"
              >
                🔄 {t('gameOver.playAgain')}
              </Button>
            </div>
          </div>
        </div>

        {/* Scoreboard Section */}
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg">
          <Scoreboard t={t} />
        </div>
      </div>
    </div>
  );
};
