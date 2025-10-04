import { useCallback } from 'react';
import { GameState, PillarImpact, ImpactValue } from '@/types';

export const useGameLogic = () => {
  const calculatePillarPercentage = useCallback((value: ImpactValue): number => {
    // Convert -10 to 10 range to 0-100 percentage
    return ((value + 10) / 20) * 100;
  }, []);

  const getPillarStatus = useCallback((value: ImpactValue): 'critical' | 'low' | 'medium' | 'good' | 'excellent' => {
    if (value <= -8) return 'critical';
    if (value <= -4) return 'low';
    if (value <= 4) return 'medium';
    if (value <= 8) return 'good';
    return 'excellent';
  }, []);

  const getOverallStatus = useCallback((pillars: PillarImpact): 'critical' | 'struggling' | 'stable' | 'thriving' => {
    const values = Object.values(pillars);
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;

    if (values.some(v => v <= -8)) return 'critical';
    if (average < -2) return 'struggling';
    if (average < 5) return 'stable';
    return 'thriving';
  }, []);

  const formatImpact = useCallback((value: ImpactValue): string => {
    if (value === 0) return '0';
    return value > 0 ? `+${value}` : `${value}`;
  }, []);

  const getImpactColor = useCallback((value: ImpactValue): string => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-muted-foreground';
  }, []);

  return {
    calculatePillarPercentage,
    getPillarStatus,
    getOverallStatus,
    formatImpact,
    getImpactColor
  };
};
