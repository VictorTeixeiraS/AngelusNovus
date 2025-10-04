import React from 'react';
import { Card as CardType } from '@/types';
import { useSwipe } from '@/hooks/useSwipe';
import { Database, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

interface CardProps {
  card: CardType;
  onDecision: (decision: 'left' | 'right') => void;
}

export const Card: React.FC<CardProps> = ({ card, onDecision }) => {
  const { t } = useTranslation();
  
  const { swipeState, handlers } = useSwipe({
    onSwipeLeft: () => onDecision('left'),
    onSwipeRight: () => onDecision('right'),
    threshold: 80
  });

  const opacity = Math.max(0.3, 1 - Math.abs(swipeState.offsetX) / 300);
  const showLeftHint = swipeState.offsetX < -20;
  const showRightHint = swipeState.offsetX > 20;

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Hint indicators */}
      {showLeftHint && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10">
          <div className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-medium shadow-lg">
            {card.options[0].label}
          </div>
        </div>
      )}
      
      {showRightHint && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10">
          <div className="bg-pillar-sustainability text-pillar-sustainability-foreground px-4 py-2 rounded-lg font-medium shadow-lg">
            {card.options[1].label}
          </div>
        </div>
      )}

      {/* Card */}
      <div
        className="bg-card rounded-2xl p-6 shadow-[var(--card-shadow)] cursor-grab active:cursor-grabbing select-none"
        style={{
          transform: `translateX(${swipeState.offsetX}px) rotate(${swipeState.rotation}deg)`,
          opacity,
          transition: swipeState.isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        {...handlers}
      >
        {/* Data Source Badge */}
        <div className="flex items-center gap-2 mb-4 text-muted-foreground">
          <Database className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wider">
            {t('game.dataSource')}: {card.dataSource}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-3 text-card-foreground">
          {card.title}
        </h2>

        {/* Description */}
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {card.description}
        </p>

        {/* Question */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <p className="font-medium text-card-foreground">
            {card.question}
          </p>
        </div>

        {/* Education Note */}
        <div className="bg-accent/30 rounded-lg p-3 mb-6 border border-accent">
          <p className="text-xs text-muted-foreground italic">
            💡 {card.education}
          </p>
        </div>

        {/* Swipe instruction */}
        <p className="text-center text-sm text-muted-foreground mb-4">
          {t('game.swipeLeft')}
        </p>

        {/* Decision buttons (mobile fallback) */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-2 hover:bg-destructive/10 hover:border-destructive"
            onClick={() => onDecision('left')}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {card.options[0].label}
          </Button>
          
          <Button
            variant="outline"
            className="flex-1 border-2 hover:bg-pillar-sustainability/10 hover:border-pillar-sustainability"
            onClick={() => onDecision('right')}
          >
            {card.options[1].label}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
