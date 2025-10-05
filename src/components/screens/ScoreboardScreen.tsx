import React from 'react';
import { useGame } from '@/game/GameContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ScoreboardProps {
  t: (key: string) => string;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ t }) => {
  const { gameState } = useGame();

  // Sort scores in descending order and limit to top 10
  const sortedScores = [...gameState.scoreboard]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🏆 {t('scoreboard.title')}</h2>
      
      {sortedScores.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-lg">No scores yet!</p>
          <p className="text-sm">Be the first to save your score! 🌟</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">{t('scoreboard.rank')}</TableHead>
                <TableHead className="min-w-[120px]">{t('scoreboard.name')}</TableHead>
                <TableHead className="w-20 text-center">{t('scoreboard.nation')}</TableHead>
                <TableHead className="w-24 text-right">{t('scoreboard.score')}</TableHead>
                <TableHead className="w-28 text-right">{t('scoreboard.earthIndex')}</TableHead>
                <TableHead className="min-w-[100px]">{t('scoreboard.date')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedScores.map((entry, index) => (
                <TableRow key={index} className={index < 3 ? 'font-semibold' : ''}>
                  <TableCell>
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && `#${index + 1}`}
                  </TableCell>
                  <TableCell className="font-medium">{entry.name}</TableCell>
                  <TableCell className="text-center text-2xl">{entry.nationFlag}</TableCell>
                  <TableCell className="text-right font-mono">{entry.score}</TableCell>
                  <TableCell className="text-right font-mono">
                    <span className={entry.earthIndex < 1.5 ? 'text-green-600' : entry.earthIndex < 2.0 ? 'text-yellow-600' : 'text-red-600'}>
                      {entry.earthIndex.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{entry.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
