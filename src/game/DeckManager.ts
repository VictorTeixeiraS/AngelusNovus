import { Card } from '@/types';
import { sampleCards } from '@/assets/cards';

export class DeckManager {
  private deck: Card[] = [];
  private discardPile: Card[] = [];

  constructor(cards: Card[] = sampleCards) {
    this.deck = this.shuffle([...cards]);
  }

  private shuffle(array: Card[]): Card[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  drawCard(): Card | null {
    if (this.deck.length === 0) {
      if (this.discardPile.length === 0) {
        console.log('[DeckManager] No cards available');
        return null;
      }
      // Reshuffle discard pile into deck
      console.log('[DeckManager] Reshuffling discard pile');
      this.deck = this.shuffle([...this.discardPile]);
      this.discardPile = [];
    }

    const card = this.deck.pop();
    if (card) {
      console.log('[DeckManager] Drew card:', card.id);
    }
    return card || null;
  }

  discard(card: Card): void {
    this.discardPile.push(card);
    console.log('[DeckManager] Discarded card:', card.id);
  }

  getRemainingCards(): number {
    return this.deck.length;
  }

  reset(): void {
    this.deck = this.shuffle([...sampleCards]);
    this.discardPile = [];
    console.log('[DeckManager] Deck reset');
  }
}
