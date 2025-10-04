import React from 'react';
import { PillarType, ImpactValue } from '@/types';
import { TrendingUp, TrendingDown, DollarSign, Leaf, Cpu, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StatBarProps {
  pillar: PillarType;
  value: ImpactValue;
  showLabel?: boolean;
}

const pillarIcons: Record<PillarType, React.ReactNode> = {
  economy: <DollarSign className="w-4 h-4" />,
  sustainability: <Leaf className="w-4 h-4" />,
  technology: <Cpu className="w-4 h-4" />,
  people: <Users className="w-4 h-4" />
};

const pillarColors: Record<PillarType, string> = {
  economy: 'bg-pillar-economy',
  sustainability: 'bg-pillar-sustainability',
  technology: 'bg-pillar-technology',
  people: 'bg-pillar-people'
};

export const StatBar: React.FC<StatBarProps> = ({ pillar, value, showLabel = true }) => {
  const { t } = useTranslation();
  const percentage = ((value + 10) / 20) * 100;
  const isPositive = value > 0;
  const isNegative = value < 0;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5">
          <span className={pillarColors[pillar] + ' p-1 rounded'}>{pillarIcons[pillar]}</span>
          {showLabel && (
            <span className="font-medium">{t(`game.pillars.${pillar}`)}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {isPositive && <TrendingUp className="w-3 h-3 text-green-600" />}
          {isNegative && <TrendingDown className="w-3 h-3 text-red-600" />}
          <span className={`font-mono text-xs ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-muted-foreground'}`}>
            {value > 0 ? '+' : ''}{value}
          </span>
        </div>
      </div>
      
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${pillarColors[pillar]}`}
          style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
        />
      </div>
    </div>
  );
};
