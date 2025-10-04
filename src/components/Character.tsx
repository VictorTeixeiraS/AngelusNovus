import React from 'react';

interface CharacterProps {
  onClick: () => void;
  isChatOpen: boolean;
}

export const Character: React.FC<CharacterProps> = ({ onClick, isChatOpen }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className="fixed bottom-4 right-4 cursor-pointer z-50"
      onClick={handleClick}
      style={{ 
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
      }}
    >
      <img
        src="/src/assets/little-eliot.png"
        alt="Little Eliot"
        style={{
          width: '120px',
          height: 'auto',
          imageRendering: 'pixelated', // Para manter o estilo pixel art
          maxWidth: 'none'
        }}
      />
    </div>
  );
};
