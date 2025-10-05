import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { GameState, Card, ScoreboardEntry } from '@/types';
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
  saveScore: (entry: ScoreboardEntry) => void;
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
  language: 'en',
  earthIndex: 1.75,
  scoreboard: [],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [deckManager] = useState(() => new DeckManager());
  const { showBubble } = useSpeechBubble();

  const saveScore = (entry: ScoreboardEntry) => {
    setGameState(prevState => {
      const newScoreboard = [...prevState.scoreboard, entry];
      const newState = { ...prevState, scoreboard: newScoreboard };
      SaveGameService.save(newState);
      return newState;
    });
  };

  const drawNextCard = useCallback(() => {
    const card = deckManager.drawCard();
    if (!card) {
      console.log('[GameContext] No card available to draw');
    }
    setCurrentCard(card);
    return card;
  }, [deckManager]);

  const startNewGame = useCallback(() => {
    console.log('[GameContext] Starting new game');
    deckManager.reset();
    // Preserve scoreboard from previous games
    const currentScoreboard = gameState.scoreboard || [];
    const newState = { ...initialGameState, scoreboard: currentScoreboard };
    setGameState(newState);
    drawNextCard();
  }, [deckManager, drawNextCard, gameState.scoreboard]);

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

  const makeDecision = (decision: 'left' | 'right') => {
    if (currentCard) {
      console.log('[GameContext] Making decision:', decision, 'Turn:', gameState.turn);
      
      // Discard the current card before processing
      deckManager.discard(currentCard);
      
      const impact = decision === 'left' ? currentCard.impacts.left : currentCard.impacts.right;
      const newState = TurnManager.processTurn(gameState, currentCard, decision);
      
      // Calculate earthIndex change based on sustainability impact
      // Negative sustainability increases earth consumption
      const sustainabilityImpact = impact.sustainability;
      const earthIndexChange = sustainabilityImpact < 0 ? Math.abs(sustainabilityImpact) * 0.03 : -sustainabilityImpact * 0.01;
      
      const updatedState = {
        ...newState,
        earthIndex: Math.max(1.0, Math.min(5.0, newState.earthIndex + earthIndexChange)),
      };

      console.log('[GameContext] State updated:', {
        turn: updatedState.turn,
        earthIndex: updatedState.earthIndex.toFixed(2),
        sustainabilityImpact,
        earthIndexChange: earthIndexChange.toFixed(3),
        gameOver: updatedState.gameOver
      });
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

      setGameState(updatedState);
      SaveGameService.save(updatedState);
      
      if (updatedState.gameOver) {
        console.log('[GameContext] Game Over!', updatedState.gameResult);
        setCurrentCard(null);
      } else {
        const nextCard = deckManager.drawCard();
        console.log('[GameContext] Drawing next card:', nextCard?.id);
        
        // If no more cards available, end the game
        if (!nextCard) {
          console.log('[GameContext] No more cards available - ending game');
          const finalState = {
            ...updatedState,
            gameOver: true,
            gameResult: 'win' as const // Player survived all cards!
          };
          setGameState(finalState);
          SaveGameService.save(finalState);
          setCurrentCard(null);
        } else {
          setCurrentCard(nextCard);
        }
      }
    } else {
      console.warn('[GameContext] makeDecision called but no current card');
    }
  };

  const resetGame = () => {
    console.log('[GameContext] Resetting game');
    // Preserve the scoreboard when resetting
    const currentScoreboard = gameState.scoreboard;
    SaveGameService.clearSave();
    deckManager.reset();
    const newState = { ...initialGameState, scoreboard: currentScoreboard };
    setGameState(newState);
    drawNextCard();
  };

  const contextValue: GameContextType = {
    gameState,
    currentCard,
    deckManager,
    startNewGame,
    loadGame,
    makeDecision,
    resetGame,
    saveScore,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
