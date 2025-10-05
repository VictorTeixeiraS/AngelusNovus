export type PillarType = 'economy' | 'sustainability' | 'technology' | 'people';

export type ImpactValue = number;

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

export interface NASAGranule {
  granuleUr: string;
  title: string;
  dataCenter: string;
  granuleSize: number;
  timeStart: string;
  timeEnd: string;
  relatedUrls: Array<{
    url: string;
    type: string;
    description?: string;
  }>;
  spatialExtent?: {
    horizontalSpatialDomain?: {
      geometry?: {
        gpolygons?: Array<{
          boundary: {
            points: Array<{
              longitude: number;
              latitude: number;
            }>;
          };
        }>;
      };
    };
  };
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
  nasaGranule?: NASAGranule;
  metadata?: {
    probability?: number;
    region?: string;
  };
}

export interface GameState {
  earth: any;
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
