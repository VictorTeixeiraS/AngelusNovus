import React, { createContext, useContext, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface SpeechBubbleContextType {
  showBubble: (message: string) => void;
  hideBubble: () => void;
  toggleBubble: () => void;
  isVisible: boolean;
  message: string;
}

const SpeechBubbleContext = createContext<SpeechBubbleContextType | undefined>(undefined);

export const SpeechBubbleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [lastMessage, setLastMessage] = useState('');

  const showBubble = useCallback((text: string) => {
    setMessage(text);
    setLastMessage(text);
    setIsVisible(true);
  }, []);

  const hideBubble = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setMessage('');
    }, 300); // Aguarda a animação de saída
  }, []);

  const toggleBubble = useCallback(() => {
    if (isVisible) {
      hideBubble();
    } else if (lastMessage) {
      showBubble(lastMessage);
    }
  }, [isVisible, lastMessage, hideBubble, showBubble]);

  return (
    <SpeechBubbleContext.Provider
      value={{
        showBubble,
        hideBubble,
        toggleBubble,
        isVisible,
        message
      }}
    >
      {children}
    </SpeechBubbleContext.Provider>
  );
};

export const useSpeechBubble = () => {
  const context = useContext(SpeechBubbleContext);
  if (!context) {
    throw new Error('useSpeechBubble must be used within SpeechBubbleProvider');
  }
  return context;
};
