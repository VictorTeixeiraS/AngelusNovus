import { useState, useCallback, TouchEvent, MouseEvent } from 'react';

interface SwipeConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

interface SwipeState {
  isDragging: boolean;
  offsetX: number;
  rotation: number;
}

export const useSwipe = ({ onSwipeLeft, onSwipeRight, threshold = 100 }: SwipeConfig) => {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isDragging: false,
    offsetX: 0,
    rotation: 0
  });
  
  const [startX, setStartX] = useState(0);

  const handleStart = useCallback((clientX: number) => {
    setStartX(clientX);
    setSwipeState(prev => ({ ...prev, isDragging: true }));
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!swipeState.isDragging) return;

    const deltaX = clientX - startX;
    const rotation = (deltaX / 1000) * 20; // Max 20deg rotation

    setSwipeState(prev => ({
      ...prev,
      offsetX: deltaX,
      rotation
    }));
  }, [swipeState.isDragging, startX]);

  const handleEnd = useCallback(() => {
    if (!swipeState.isDragging) return;

    const { offsetX } = swipeState;

    if (Math.abs(offsetX) > threshold) {
      if (offsetX > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }

    setSwipeState({
      isDragging: false,
      offsetX: 0,
      rotation: 0
    });
  }, [swipeState, threshold, onSwipeLeft, onSwipeRight]);

  // Touch handlers
  const onTouchStart = useCallback((e: TouchEvent) => {
    handleStart(e.touches[0].clientX);
  }, [handleStart]);

  const onTouchMove = useCallback((e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const onTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Mouse handlers
  const onMouseDown = useCallback((e: MouseEvent) => {
    handleStart(e.clientX);
  }, [handleStart]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    handleMove(e.clientX);
  }, [handleMove]);

  const onMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  const onMouseLeave = useCallback(() => {
    if (swipeState.isDragging) {
      setSwipeState({
        isDragging: false,
        offsetX: 0,
        rotation: 0
      });
    }
  }, [swipeState.isDragging]);

  return {
    swipeState,
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave
    }
  };
};
