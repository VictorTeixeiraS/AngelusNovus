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
  },
  {
    id: 'card-004',
    title: 'Heatwave Alert',
    description: 'MODIS Land Surface Temperature shows extreme ground heat',
    dataSource: 'MODIS LST',
    question: 'Adjust work schedules or risk labor exhaustion?',
    options: [
      {
        id: 'opt-004-left',
        label: 'Adjust Schedules',
        resultText: 'Reduced health risks, but increased labor costs'
      },
      {
        id: 'opt-004-right',
        label: 'Maintain Hours',
        resultText: 'Saved money, but workers’ health impacted'
      }
    ],
    impacts: {
      left: {
        economy: -1,
        sustainability: 2,
        technology: 0,
        people: 2
      },
      right: {
        economy: 2,
        sustainability: -2,
        technology: 0,
        people: -2
      }
    },
    education: 'MODIS LST detects surface temperature, helping protect worker wellbeing and plan safe labor routines.',
    metadata: {
      probability: 0.4,
      region: 'Temperate zones'
    }
  },

  {
    id: 'card-005',
    title: 'Resilient Planting',
    description: 'NDVI data reveals patchy crop growth after a dry season',
    dataSource: 'MODIS NDVI',
    question: 'Switch to drought-resistant crops?',
    options: [
      {
        id: 'opt-005-left',
        label: 'Stay with Current Crop',
        resultText: 'Potentially high output if rains return, risky bet'
      },
      {
        id: 'opt-005-right',
        label: 'Switch Crops',
        resultText: 'Lower immediate yield but better resilience long-term'
      }
    ],
    impacts: {
      left: {
        economy: 2,
        sustainability: -1,
        technology: -1,
        people: 0
      },
      right: {
        economy: -2,
        sustainability: 2,
        technology: 1,
        people: 1
      }
    },
    education: 'NDVI time series allow farmers to track crop health and adapt planting choices to environmental stress.',
    metadata: {
      probability: 0.6,
      region: 'Semi-arid zones'
    }
  },

  {
    id: 'card-006',
    title: 'Water Usage Dispute',
    description: 'SMAP reveals declining soil moisture across multiple farms',
    dataSource: 'SMAP',
    question: 'Negotiate water sharing with neighboring farms?',
    options: [
      {
        id: 'opt-006-left',
        label: 'Negotiate',
        resultText: 'Shared resources but possible conflicts arise'
      },
      {
        id: 'opt-006-right',
        label: 'Prioritize Own Crops',
        resultText: 'Immediate gain, but harmed relationships'
      }
    ],
    impacts: {
      left: {
        economy: 0,
        sustainability: 2,
        technology: 1,
        people: -1
      },
      right: {
        economy: 1,
        sustainability: -2,
        technology: 0,
        people: -2
      }
    },
    education: 'SMAP’s regional data helps communities manage shared water under stress.',
    metadata: {
      probability: 0.5,
      region: 'Agricultural clusters'
    }
  },

  {
    id: 'card-007',
    title: 'Pesticide Dilemma',
    description: 'MODIS VI and weather data suggest pest outbreak after unseasonal rains',
    dataSource: 'MODIS + GPM',
    question: 'Apply chemical pesticides or attempt biological control?',
    options: [
      {
        id: 'opt-007-left',
        label: 'Chemical',
        resultText: 'Immediate pest reduction, but sustainability drops'
      },
      {
        id: 'opt-007-right',
        label: 'Biological',
        resultText: 'Potential delayed effect, ecosystem preserved'
      }
    ],
    impacts: {
      left: {
        economy: 2,
        sustainability: -2,
        technology: 0,
        people: -1
      },
      right: {
        economy: -1,
        sustainability: 1,
        technology: 2,
        people: 2
      }
    },
    education: 'MODIS and GPM can warn of conditions favoring pests, supporting decisions on crop protection strategies.',
    metadata: {
      probability: 0.4,
      region: 'Subtropical zones'
    }
  },

  {
    id: 'card-008',
    title: 'Tech Upgrade Funding',
    description: 'Vegetation and soil data show potential for yield increase with new tech',
    dataSource: 'MODIS + SMAP',
    question: 'Invest in AI-powered monitoring or maintain traditional practices?',
    options: [
      {
        id: 'opt-008-left',
        label: 'Invest in AI',
        resultText: 'Requires high investment, but increases long-term efficiency'
      },
      {
        id: 'opt-008-right',
        label: 'Maintain Tradition',
        resultText: 'Saves money now, may lose out on future yield gains'
      }
    ],
    impacts: {
      left: {
        economy: -2,
        sustainability: 1,
        technology: 2,
        people: 1
      },
      right: {
        economy: 2,
        sustainability: -1,
        technology: -1,
        people: 0
      }
    },
    education: 'Combining satellite sources enables real-time decision support for agricultural investment.',
    metadata: {
      probability: 0.3,
      region: 'Advanced farming zones'
    }
  },
  {
    id: 'card-009',
    title: 'Climate Insurance Decision',
    description: 'GPM and MODIS data indicate rising risk of unseasonal storms',
    dataSource: 'GPM + MODIS',
    question: 'Purchase climate insurance before high-risk season?',
    options: [
      {
        id: 'opt-009-left',
        label: 'Buy Insurance',
        resultText: 'Protected from losses, but increased expenses'
      },
      {
        id: 'opt-009-right',
        label: 'Skip Insurance',
        resultText: 'Saved money now, but risk financial disaster if storms hit'
      }
    ],
    impacts: {
      left: {
        economy: -2,
        sustainability: 1,
        technology: 1,
        people: 2
      },
      right: {
        economy: 2,
        sustainability: -2,
        technology: 0,
        people: -2
      }
    },
    education: 'Satellite data support insurance decisions by predicting risks and potential impacts.',
    metadata: {
      probability: 0.6,
      region: 'Storm-prone zones'
    }
  },

  {
    id: 'card-010',
    title: 'Community Training Program',
    description: 'MODIS and SMAP analytics show local farmers underusing tech resources',
    dataSource: 'MODIS + SMAP',
    question: 'Organize workshops to train on new farming technologies?',
    options: [
      {
        id: 'opt-010-left',
        label: 'Host Workshops',
        resultText: 'Community knowledge improved, but reduced short-term output'
      },
      {
        id: 'opt-010-right',
        label: 'Skip Training',
        resultText: 'Production stays high, but innovations lag behind'
      }
    ],
    impacts: {
      left: {
        economy: -1,
        sustainability: 2,
        technology: 2,
        people: 2
      },
      right: {
        economy: 1,
        sustainability: -1,
        technology: -2,
        people: -1
      }
    },
    education: 'Training initiatives boost long-term sustainability and innovation via satellite-informed practices.',
    metadata: {
      probability: 0.4,
      region: 'Smallholder zones'
    }
  },
];
