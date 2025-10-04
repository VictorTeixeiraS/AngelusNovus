import { Card } from '@/types';

export const sampleCards: Card[] = [
  {
    id: 'card-001',
    title: 'Survival Irrigation',
    description: 'SMAP data shows extremely low soil moisture in your region',
    dataSource: 'SMAP',
    question: 'Use emergency water reserves for immediate irrigation?',
    options: [
      {
        id: 'opt-001-left',
        label: 'Save Water',
        resultText: 'Conserved water but crops suffered short-term stress'
      },
      {
        id: 'opt-001-right',
        label: 'Use Reserves',
        resultText: 'Crops survived but water reserves depleted'
      }
    ],
    impacts: {
      left: {
        economy: -1,
        sustainability: 2,
        technology: 0,
        people: -1
      },
      right: {
        economy: 1,
        sustainability: -2,
        technology: 0,
        people: 1
      }
    },
    education: 'SMAP satellites monitor soil moisture globally, helping farmers make informed irrigation decisions.',
    metadata: {
      probability: 0.3,
      region: 'Arid zones'
    }
  },
  {
    id: 'card-002',
    title: 'Nutrient Optimization',
    description: 'MODIS vegetation indices suggest nutrient deficiency',
    dataSource: 'MODIS',
    question: 'Invest in precision fertilization technology?',
    options: [
      {
        id: 'opt-002-left',
        label: 'Traditional Method',
        resultText: 'Lower costs but uneven nutrient distribution'
      },
      {
        id: 'opt-002-right',
        label: 'Precision Tech',
        resultText: 'Higher upfront cost, optimized yields'
      }
    ],
    impacts: {
      left: {
        economy: 1,
        sustainability: -1,
        technology: -1,
        people: 0
      },
      right: {
        economy: -1,
        sustainability: 2,
        technology: 2,
        people: 1
      }
    },
    education: 'MODIS helps monitor crop health through vegetation indices, enabling targeted interventions.',
    metadata: {
      probability: 0.5,
      region: 'Agricultural zones'
    }
  },
  {
    id: 'card-003',
    title: 'Extreme Weather Risk',
    description: 'GPM data predicts severe rainfall in the next 48 hours',
    dataSource: 'GPM',
    question: 'Invest in early harvesting or wait for natural ripening?',
    options: [
      {
        id: 'opt-003-left',
        label: 'Wait',
        resultText: 'Better quality if weather holds, risk of loss if it doesn\'t'
      },
      {
        id: 'opt-003-right',
        label: 'Harvest Early',
        resultText: 'Secured crops but slightly lower market value'
      }
    ],
    impacts: {
      left: {
        economy: 2,
        sustainability: 0,
        technology: 0,
        people: -2
      },
      right: {
        economy: -1,
        sustainability: 1,
        technology: 1,
        people: 2
      }
    },
    education: 'GPM provides real-time precipitation data, crucial for planning harvest timing.',
    metadata: {
      probability: 0.7,
      region: 'Tropical zones'
    }
  }
];
