import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { GameState, Card } from '@/types';
import { DeckManager } from './DeckManager';
import { TurnManager } from './TurnManager';
import { SaveGameService } from '@/services/SaveGameService';
import { langflowService } from '@/services/LangflowService';
import { useSpeechBubble } from '@/contexts/SpeechBubbleContext';

interface GameContextType {
  gameState: GameState;
  currentCard: Card | null;
  deckManager: DeckManager;
  startNewGame: () => void;
  loadGame: () => boolean;
  makeDecision: (decision: 'left' | 'right') => void;
  resetGame: () => void;
}

const initialGameState: GameState = {
  turn: 1,
  pillars: {
    economy: 0,
    sustainability: 0,
    technology: 0,
    people: 0
  },
  history: [],
  gameOver: false,
  language: 'en'
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [deckManager] = useState(() => new DeckManager());
  const { showBubble } = useSpeechBubble();

  const drawNextCard = useCallback(() => {
    const card = deckManager.drawCard();
    setCurrentCard(card);
    return card;
  }, [deckManager]);

  const startNewGame = useCallback(() => {
    console.log('[GameContext] Starting new game');
    deckManager.reset();
    setGameState(initialGameState);
    drawNextCard();
  }, [deckManager, drawNextCard]);

  const loadGame = useCallback((): boolean => {
    const savedState = SaveGameService.load();
    if (savedState) {
      console.log('[GameContext] Loading saved game');
      setGameState(savedState);
      drawNextCard();
      return true;
    }
    return false;
  }, [drawNextCard]);

  const makeDecision = useCallback((decision: 'left' | 'right') => {
    if (!currentCard || gameState.gameOver) return;

    console.log('[GameContext] Decision made:', decision);
    
    // Fazer requisição para Langflow usando a função já pronta
    if (langflowService.isConfigured()) {
      const gameStatus = {
        turn: gameState.turn,
        pillars: gameState.pillars,
        gameOver: gameState.gameOver,
        history: gameState.history.length
      };
      
      const cardDetails = {
        id: currentCard.id,
        title: currentCard.title,
        description: currentCard.description,
        question: currentCard.question,
        dataSource: currentCard.dataSource,
        education: currentCard.education,
        options: currentCard.options.map(opt => ({
          label: opt.label,
          resultText: opt.resultText
        }))
      };
      
      const actionDetails = {
        decision: decision,
        timestamp: new Date().toISOString(),
        turnNumber: gameState.turn
      };
      
      const message = JSON.stringify({
        game_status: gameStatus,
        card_details: cardDetails,
        action_details: actionDetails
      });
      
      // Enviar mensagem e mostrar resposta no balão
      langflowService.sendMessage(message)
        .then(response => {
          // Mostrar resposta no balão de fala (permanece até ser clicada)
          showBubble(response);
        })
        .catch(error => {
          console.warn('Erro ao enviar mensagem para Langflow:', error);
          showBubble('Ops! Não consegui processar sua decisão. Tente novamente!');
        });
    }
    
    // Discard current card
    deckManager.discard(currentCard);

    // Process turn and update state
    const newState = TurnManager.processTurn(gameState, currentCard, decision);
    setGameState(newState);

    // Save game
    SaveGameService.save(newState);

    // Draw next card if game continues
    if (!newState.gameOver) {
      setTimeout(() => {
        drawNextCard();
      }, 300);
    } else {
      setCurrentCard(null);
    }
  }, [currentCard, gameState, deckManager, drawNextCard]);

  const resetGame = useCallback(() => {
    SaveGameService.clearSave();
    startNewGame();
  }, [startNewGame]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        currentCard,
        deckManager,
        startNewGame,
        loadGame,
        makeDecision,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
