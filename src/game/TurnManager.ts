import { GameState, Card, PillarImpact, TurnHistory, ImpactValue } from '@/types';

export class TurnManager {
  private static readonly WIN_THRESHOLD = 10;
  private static readonly LOSE_THRESHOLD = -10;
  private static readonly MAX_TURNS = 20;

  static applyImpact(currentPillars: PillarImpact, impact: PillarImpact): PillarImpact {
    return {
      economy: this.clampPillar(currentPillars.economy + impact.economy),
      sustainability: this.clampPillar(currentPillars.sustainability + impact.sustainability),
      technology: this.clampPillar(currentPillars.technology + impact.technology),
      people: this.clampPillar(currentPillars.people + impact.people)
    };
  }

  private static clampPillar(value: number): ImpactValue {
    return Math.max(-10, Math.min(10, value)) as ImpactValue;
  }

  static checkGameOver(gameState: GameState): { isOver: boolean; result?: 'win' | 'lose' } {
    const { pillars, turn } = gameState;

    // Check if any pillar hit critical low
    const values = Object.values(pillars);
    if (values.some(v => v <= this.LOSE_THRESHOLD)) {
      return { isOver: true, result: 'lose' };
    }

    // Check max turns
    if (turn >= this.MAX_TURNS) {
      // Win if all pillars are positive
      const allPositive = values.every(v => v > 0);
      return { isOver: true, result: allPositive ? 'win' : 'lose' };
    }

    // Check win condition (all pillars above threshold)
    if (values.every(v => v >= this.WIN_THRESHOLD)) {
      return { isOver: true, result: 'win' };
    }

    return { isOver: false };
  }

  static processTurn(
    gameState: GameState,
    card: Card,
    decision: 'left' | 'right'
  ): GameState {
    const impact = decision === 'left' ? card.impacts.left : card.impacts.right;
    const newPillars = this.applyImpact(gameState.pillars, impact);

    const turnHistory: TurnHistory = {
      turn: gameState.turn,
      cardId: card.id,
      decision,
      impacts: impact,
      timestamp: Date.now()
    };

    const newState: GameState = {
      ...gameState,
      turn: gameState.turn + 1,
      pillars: newPillars,
      history: [...gameState.history, turnHistory]
    };

    const gameOverCheck = this.checkGameOver(newState);
    if (gameOverCheck.isOver) {
      newState.gameOver = true;
      newState.gameResult = gameOverCheck.result;
    }

    console.log('[TurnManager] Turn processed:', {
      turn: newState.turn,
      decision,
      newPillars,
      gameOver: newState.gameOver
    });

    return newState;
  }
}
