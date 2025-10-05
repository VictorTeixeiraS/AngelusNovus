import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useSpeechBubble } from '@/contexts/SpeechBubbleContext';

export const SpeechBubble: React.FC = () => {
  const { isVisible, message, toggleBubble } = useSpeechBubble();
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bubbleRef.current) {
      if (isVisible) {
        // Animação de entrada
        gsap.fromTo(bubbleRef.current, 
          { 
            scale: 0,
            opacity: 0,
            y: 20
          },
          { 
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.7)"
          }
        );
      } else {
        // Animação de saída
        gsap.to(bubbleRef.current, {
          scale: 0,
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "back.in(1.7)"
        });
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={bubbleRef}
      className="fixed bottom-32 right-4 z-50 max-w-xs"
      onClick={toggleBubble}
    >
      <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-200 relative">
        {/* Seta do balão */}
        <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-white border-r-2 border-b-2 border-gray-200 transform rotate-45"></div>
        
        {/* Conteúdo do balão */}
        <div className="text-gray-800 text-sm leading-relaxed">
          {message}
        </div>
        
        {/* Indicador de clique para fechar/reabrir */}
        <div className="text-xs text-gray-500 mt-2 text-center">
          Clique para {isVisible ? 'fechar' : 'reabrir'}
        </div>
      </div>
    </div>
  );
};
