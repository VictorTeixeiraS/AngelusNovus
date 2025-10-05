import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Character } from './Character';
import { useSpeechBubble } from '@/contexts/SpeechBubbleContext';

export const VirtualAssistant: React.FC = () => {
  const [isCharacterVisible, setIsCharacterVisible] = useState(true);
  const characterContainerRef = useRef<HTMLDivElement>(null);
  const { toggleBubble } = useSpeechBubble();

  const handleCharacterClick = () => {
    // Animação de clique no personagem
    if (characterContainerRef.current) {
      gsap.to(characterContainerRef.current, {
        scale: 1.2,
        x: -20,
        y: -20,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          // Retornar personagem à posição original
          gsap.to(characterContainerRef.current, {
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });
    }
    
    // Toggle do balão de fala
    toggleBubble();
  };

  return (
    <div
      ref={characterContainerRef}
      className="fixed bottom-4 right-4 z-40"
    >
      <Character 
        onClick={handleCharacterClick}
        isChatOpen={false}
      />
    </div>
  );
};
