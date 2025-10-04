import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Character } from './Character';
import { Chat } from './Chat';

export const VirtualAssistant: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCharacterVisible, setIsCharacterVisible] = useState(true);
  const characterContainerRef = useRef<HTMLDivElement>(null);

  const handleCharacterClick = () => {
    if (!isChatOpen) {
      // Animação de aproximação do personagem
      if (characterContainerRef.current) {
        gsap.to(characterContainerRef.current, {
          scale: 1.2,
          x: -20,
          y: -20,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            setIsChatOpen(true);
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
    } else {
      setIsChatOpen(false);
    }
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  // Efeito de visibilidade do personagem baseado no estado do chat
  useEffect(() => {
    if (characterContainerRef.current) {
      if (isChatOpen) {
        // Personagem fica mais sutil quando chat está aberto
        gsap.to(characterContainerRef.current, {
          opacity: 0.7,
          scale: 0.9,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        // Personagem volta ao normal quando chat fecha
        gsap.to(characterContainerRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  }, [isChatOpen]);

  return (
    <>
      <div
        ref={characterContainerRef}
        className="fixed bottom-4 right-4 z-40"
      >
        <Character 
          onClick={handleCharacterClick}
          isChatOpen={isChatOpen}
        />
      </div>
      
      <Chat 
        isOpen={isChatOpen}
        onClose={handleCloseChat}
      />
    </>
  );
};
