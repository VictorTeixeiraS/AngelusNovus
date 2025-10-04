export type PillarType = 'economy' | 'sustainability' | 'technology' | 'people';

export type ImpactValue = -2 | -1 | 0 | 1 | 2;

export interface PillarImpact {
  economy: ImpactValue;
  sustainability: ImpactValue;
  technology: ImpactValue;
  people: ImpactValue;
}

export interface Option {
  id: string;
  label: string;
  resultText: string;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  dataSource: string;
  question: string;
  options: Option[];
  impacts: {
    right: PillarImpact;
    left: PillarImpact;
  };
  education: string;
  metadata?: {
    probability?: number;
    region?: string;
  };
}

export interface GameState {
  turn: number;
  pillars: PillarImpact;
  history: TurnHistory[];
  gameOver: boolean;
  gameResult?: 'win' | 'lose';
  language: 'en' | 'pt';
}

export interface TurnHistory {
  turn: number;
  cardId: string;
  decision: 'left' | 'right';
  impacts: PillarImpact;
  timestamp: number;
}

export interface SaveData {
  version: string;
  gameState: GameState;
  savedAt: number;
}
