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
    // Impact values range from -2 to 2 representing negative to positive effects
    impacts: {
      left: {
        economy: -1,        // Minor economic loss due to reduced yield
        sustainability: 2,  // Major sustainability gain by conserving water
        technology: 0,      // No tech impact
        people: -1          // Minor negative impact on farmers' immediate needs
      },
      right: {
        economy: 1,         // Short-term economic gain from saved crops
        sustainability: -2, // Major sustainability loss from depleting reserves
        technology: 0,      // No tech impact
        people: 1           // Minor positive impact on immediate livelihoods
      }
    },
    // Educational content about the NASA data source
    education: 'SMAP satellites monitor soil moisture globally, helping farmers make informed irrigation decisions.',
    // Actual NASA granule data for this scenario
    nasaGranule: {
      granuleUr: 'NCALDAS_NOAH0125_D.A20161231.002.nc4',
      title: 'NCALDAS_NOAH0125_D.2.0:NCALDAS_NOAH0125_D.A20161231.002.nc4',
      dataCenter: 'GES_DISC',
      granuleSize: 12.637405395507812,
      timeStart: '2016-12-31T00:00:00.000Z',
      timeEnd: '2016-12-31T23:59:59.000Z',
      // URLs to access actual data and related resources
      relatedUrls: [
        {
          url: 'https://data.gesdisc.earthdata.nasa.gov/data/NCALDAS/NCALDAS_NOAH0125_D.2.0/2016/12/NCALDAS_NOAH0125_D.A20161231.002.nc4',
          type: 'GET DATA',
          description: 'Download NCALDAS_NOAH0125_D.A20161231.002.nc4'
        },
        {
          url: 's3://gesdisc-cumulus-prod-protected/NCALDAS/NCALDAS_NOAH0125_D.2.0/2016/12/NCALDAS_NOAH0125_D.A20161231.002.nc4',
          type: 'GET DATA VIA DIRECT ACCESS',
          description: 'This link provides direct download access via S3 to the granule'
        },
        {
          url: 'https://hydro1.gesdisc.eosdis.nasa.gov/opendap/NCALDAS/NCALDAS_NOAH0125_D.2.0/2016/12/NCALDAS_NOAH0125_D.A20161231.002.nc4',
          type: 'USE SERVICE API',
          description: 'The OPENDAP location for the granule.'
        },
        {
          url: 'https://data.gesdisc.earthdata.nasa.gov/s3credentials',
          type: 'VIEW RELATED INFORMATION',
          description: 'API endpoint to retrieve temporary credentials valid for same-region direct s3 access'
        }
      ],
      // Geographic coverage of the data
      spatialExtent: {
        horizontalSpatialDomain: {
          geometry: {
            gpolygons: [
              {
                boundary: {
                  points: [
                    { longitude: -125, latitude: 25 },
                    { longitude: -67, latitude: 25 },
                    { longitude: -67, latitude: 53 },
                    { longitude: -125, latitude: 53 },
                    { longitude: -125, latitude: 25 }
                  ]
                }
              }
            ]
          }
        }
      }
    },
    // Additional metadata for game mechanics
    metadata: {
      probability: 0.3,    // 30% chance of this card appearing
      region: 'Arid zones'  // Geographic context for the scenario
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
    // Impact values for each decision option
    impacts: {
      left: {
        economy: 1,         // Short-term economic gain from cost savings
        sustainability: -1, // Minor sustainability loss from over-fertilization
        technology: -1,     // Tech progress hindered
        people: 0           // Neutral impact on people
      },
      right: {
        economy: -1,        // Initial economic cost
        sustainability: 2,  // Major sustainability gain through efficient resource use
        technology: 2,      // Significant technological advancement
        people: 1           // Minor benefit to workers and community
      }
    },
    education: 'MODIS helps monitor crop health through vegetation indices, enabling targeted interventions.',
    // NASA granule information for this scenario
    nasaGranule: {
      granuleUr: 'MOD11A1.A2025262.h13v11.061.2025263214912',
      title: 'MOD11A1.A2025262.h13v11.061.2025263214912',
      dataCenter: 'LPCLOUD',
      granuleSize: 3.363279342651367,
      timeStart: '2025-09-19T00:00:00.000Z',
      timeEnd: '2025-09-19T23:59:59.000Z',
      relatedUrls: [
        {
          url: 'https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/MOD11A1.061/MOD11A1.A2025262.h13v11.061.2025263214912/MOD11A1.A2025262.h13v11.061.2025263214912.hdf',
          type: 'GET DATA',
          description: 'Download MOD11A1.A2025262.h13v11.061.2025263214912.hdf'
        },
        {
          url: 'https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-public/MOD11A1.061/MOD11A1.A2025262.h13v11.061.2025263214912/BROWSE.MOD11A1.A2025262.h13v11.061.2025263214915.1.jpg',
          type: 'GET RELATED VISUALIZATION',
          description: 'Browse image 1'
        },
        {
          url: 'https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-public/MOD11A1.061/MOD11A1.A2025262.h13v11.061.2025263214912/BROWSE.MOD11A1.A2025262.h13v11.061.2025263214915.2.jpg',
          type: 'GET RELATED VISUALIZATION',
          description: 'Browse image 2'
        }
      ],
      spatialExtent: {
        horizontalSpatialDomain: {
          geometry: {
            gpolygons: [
              {
                boundary: {
                  points: [
                    { longitude: -57.735, latitude: -30 },
                    { longitude: -45.9945, latitude: -30.0223 },
                    { longitude: -42.3891, latitude: -19.9283 },
                    { longitude: -53.202, latitude: -19.9071 },
                    { longitude: -57.735, latitude: -30 }
                  ]
                }
              }
            ]
          }
        }
      }
    },
    metadata: {
      probability: 0.5,     // 50% chance of appearing
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
    // Decision impacts
    impacts: {
      left: {
        economy: 2,        // High potential economic gain if weather forecast is wrong
        sustainability: 0, // No sustainability impact
        technology: 0,     // No technology impact
        people: -2         // High risk to farmers if crops are destroyed
      },
      right: {
        economy: -1,       // Small economic loss from lower quality harvest
        sustainability: 1, // Small sustainability gain from reducing potential waste
        technology: 1,     // Small tech gain from utilizing forecasting
        people: 2          // Major benefit to people by securing food supply
      }
    },
    education: 'GPM provides real-time precipitation data, crucial for planning harvest timing.',
    // NASA granule data for Global Precipitation Measurement
    nasaGranule: {
    granuleUr: '3B-HHR.MS.MRG.3IMERG.20250531-S233000-E235959.1410.V07B.HDF5',
    title: 'GPM_3IMERGHH.07:3B-HHR.MS.MRG.3IMERG.20250531-S233000-E235959.1410.V07B.HDF5',
    dataCenter: 'GES_DISC',
    granuleSize: 7.896713256835938,
    timeStart: '2025-05-31T23:30:00.000Z',
    timeEnd: '2025-05-31T23:59:59.999Z',
    relatedUrls: [
      {
        url: 'https://data.gesdisc.earthdata.nasa.gov/data/GPM_L3/GPM_3IMERGHH.07/2025/151/3B-HHR.MS.MRG.3IMERG.20250531-S233000-E235959.1410.V07B.HDF5',
        type: 'GET DATA',
        description: 'Download 3B-HHR.MS.MRG.3IMERG.20250531-S233000-E235959.1410.V07B.HDF5'
      },
      {
        url: 's3://gesdisc-cumulus-prod-protected/GPM_L3/GPM_3IMERGHH.07/2025/151/3B-HHR.MS.MRG.3IMERG.20250531-S233000-E235959.1410.V07B.HDF5',
        type: 'GET DATA VIA DIRECT ACCESS',
        description: 'This link provides direct download access via S3 to the granule'
      },
      {
        url: 'https://gpm1.gesdisc.eosdis.nasa.gov/opendap/GPM_L3/GPM_3IMERGHH.07/2025/151/3B-HHR.MS.MRG.3IMERG.20250531-S233000-E235959.1410.V07B.HDF5',
        type: 'USE SERVICE API',
        description: 'The OPENDAP location for the granule.'
      },
      {
        url: 'https://data.gesdisc.earthdata.nasa.gov/s3credentials',
        type: 'VIEW RELATED INFORMATION',
        description: 'API endpoint to retrieve temporary credentials for S3 access'
      },
      {
        url: 'https://docserver.gesdisc.eosdis.nasa.gov/public/project/Images/GPCPDAY_V33.png',
        type: 'GET RELATED VISUALIZATION',
        description: 'GPCP Daily Precipitation - Visualization Image'
      }
    ],
    // Global coverage for this precipitation data
    spatialExtent: {
      horizontalSpatialDomain: {
        geometry: {
          gpolygons: [
            {
              boundary: {
                points: [
                  { longitude: -180, latitude: -90 },
                  { longitude: 180, latitude: -90 },
                  { longitude: 180, latitude: 90 },
                  { longitude: -180, latitude: 90 },
                  { longitude: -180, latitude: -90 }
                ]
              }
            }
          ]
        }
      }
    }
  },
    metadata: {
      probability: 0.7,    // 70% chance of appearing
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
    ],
    // Impact values
    impacts: {
      left: {
        economy: -1,       // Minor economic cost from schedule adjustments
        sustainability: 2, // Major sustainability gain from labor practices
        technology: 0,     // No tech impact
        people: 2          // Major benefit to worker welfare
      },
      right: {
        economy: 2,        // Short-term economic gain
        sustainability: -2,// Major sustainability loss through exploitative practices
        technology: 0,     // No tech impact
        people: -2         // Major negative impact on worker health
      }
    },
    education: 'MODIS LST detects surface temperature, helping protect worker wellbeing and plan safe labor routines.',
    // NASA MODIS Land Surface Temperature data
    nasaGranule: {
    granuleUr: 'MOD11A1.A2025276.h10v06.061.2025277095431',
    title: 'MOD11A1.A2025276.h10v06.061.2025277095431',
    dataCenter: 'LPCLOUD',
    granuleSize: 1.1373262405395508,
    timeStart: '2025-10-03T00:00:00.000Z',
    timeEnd: '2025-10-03T23:59:59.000Z',
    relatedUrls: [
      {
        url: 'https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/MOD11A1.061/MOD11A1.A2025276.h10v06.061.2025277095431/MOD11A1.A2025276.h10v06.061.2025277095431.hdf',
        type: 'GET DATA',
        description: 'Download MOD11A1.A2025276.h10v06.061.2025277095431.hdf'
      },
      {
        url: 's3://lp-prod-protected/MOD11A1.061/MOD11A1.A2025276.h10v06.061.2025277095431/MOD11A1.A2025276.h10v06.061.2025277095431.hdf',
        type: 'GET DATA VIA DIRECT ACCESS',
        description: 'Direct S3 access for granule file'
      },
      {
        url: 'https://doi.org/10.5067/MODIS/MOD11A1.061',
        type: 'VIEW RELATED INFORMATION',
        description: 'Product Landing Page'
      },
      {
        url: 'https://opendap.earthdata.nasa.gov/collections/C1748058432-LPCLOUD/granules/MOD11A1.A2025276.h10v06.061.2025277095431',
        type: 'USE SERVICE API',
        description: 'OPeNDAP API endpoint'
      },
      {
        url: 'https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/MOD11A1.061/MOD11A1.A2025276.h10v06.061.2025277095431/MOD11A1.A2025276.h10v06.061.2025277095431.cmr.xml',
        type: 'VIEW RELATED INFORMATION',
        description: 'Download granule metadata .xml file'
      },
      {
        url: 's3://lp-prod-protected/MOD11A1.061/MOD11A1.A2025276.h10v06.061.2025277095431/MOD11A1.A2025276.h10v06.061.2025277095431.cmr.xml',
        type: 'VIEW RELATED INFORMATION',
        description: 'Direct S3 access for granule metadata'
      },
      {
        url: 'https://data.lpdaac.earthdatacloud.nasa.gov/s3credentials',
        type: 'VIEW RELATED INFORMATION',
        description: 'API for temporary S3 credentials'
      },
      // Visualization images for quicklook/browse
      {
        url: 'https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-public/MOD11A1.061/MOD11A1.A2025276.h10v06.061.2025277095431/BROWSE.MOD11A1.A2025276.h10v06.061.2025277095434.1.jpg',
        type: 'GET RELATED VISUALIZATION',
        description: 'Browse image 1'
      },
    ],
    spatialExtent: {
      horizontalSpatialDomain: {
        geometry: {
          gpolygons: [
            {
              boundary: {
                points: [
                  { longitude: -85.1199, latitude: 19.8973 },
                  { longitude: -74.213, latitude: 19.9339 },
                  { longitude: -80.5352, latitude: 30.0384 },
                  { longitude: -92.376, latitude: 30 },
                  { longitude: -85.1199, latitude: 19.8973 }
                ]
              }
            }
          ]
        }
      }
    }
  },
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
      nasaGranule: {
    granuleUr: 'MOD13A1.A2025257.h10v05.061.2025275114423',
    title: 'MOD13A1.A2025257.h10v05.061.2025275114423',
    dataCenter: 'LPCLOUD',
    granuleSize: 71.38634490966797,
    timeStart: '2025-09-14T00:00:00.000Z',
    timeEnd: '2025-09-29T23:59:59.000Z',
    relatedUrls: [
      {
        url: 'https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/MOD13A1.061/MOD13A1.A2025257.h10v05.061.2025275114423/MOD13A1.A2025257.h10v05.061.2025275114423.hdf',
        type: 'GET DATA',
        description: 'Download MOD13A1.A2025257.h10v05.061.2025275114423.hdf'
      },
      {
        url: 's3://lp-prod-protected/MOD13A1.061/MOD13A1.A2025257.h10v05.061.2025275114423/MOD13A1.A2025257.h10v05.061.2025275114423.hdf',
        type: 'GET DATA VIA DIRECT ACCESS',
        description: 'Direct S3 access for granule file'
      },
      {
        url: 'https://doi.org/10.5067/MODIS/MOD13A1.061',
        type: 'VIEW RELATED INFORMATION',
        description: 'Product Landing Page'
      },
      {
        url: 'https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/MOD13A1.061/MOD13A1.A2025257.h10v05.061.2025275114423/MOD13A1.A2025257.h10v05.061.2025275114423.cmr.xml',
        type: 'VIEW RELATED INFORMATION',
        description: 'Download MOD13A1.A2025257.h10v05.061.2025275114423.cmr.xml'
      },
      {
        url: 's3://lp-prod-protected/MOD13A1.061/MOD13A1.A2025257.h10v05.061.2025275114423/MOD13A1.A2025257.h10v05.061.2025275114423.cmr.xml',
        type: 'VIEW RELATED INFORMATION',
        description: 'Direct S3 access for granule metadata'
      },
      {
        url: 'https://data.lpdaac.earthdatacloud.nasa.gov/s3credentials',
        type: 'VIEW RELATED INFORMATION',
        description: 'API for temporary S3 credentials'
      },
      // Visualization images for quicklook/browse
      {
        url: 'https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-public/MOD13A1.061/MOD13A1.A2025257.h10v05.061.2025275114423/BROWSE.MOD13A1.A2025257.h10v05.061.2025275114423.1.jpg',
        type: 'GET RELATED VISUALIZATION',
        description: 'Browse image 1'
      },
      {
        url: 'https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-public/MOD13A1.061/MOD13A1.A2025257.h10v05.061.2025275114423/BROWSE.MOD13A1.A2025257.h10v05.061.2025275114423.2.jpg',
        type: 'GET RELATED VISUALIZATION',
        description: 'Browse image 2'
      },
      {
        url: 's3://lp-prod-public/MOD13A1.061/MOD13A1.A2025257.h10v05.061.2025275114423/BROWSE.MOD13A1.A2025257.h10v05.061.2025275114423.1.jpg',
        type: 'GET RELATED VISUALIZATION',
        description: 'S3 direct access for Browse image 1'
      },
      {
        url: 's3://lp-prod-public/MOD13A1.061/MOD13A1.A2025257.h10v05.061.2025275114423/BROWSE.MOD13A1.A2025257.h10v05.061.2025275114423.2.jpg',
        type: 'GET RELATED VISUALIZATION',
        description: 'S3 direct access for Browse image 2'
      }
    ],
    spatialExtent: {
      horizontalSpatialDomain: {
        geometry: {
          gpolygons: [
            {
              boundary: {
                points: [
                  { longitude: -92.3012, latitude: 29.8411 },
                  { longitude: -80.5776, latitude: 29.8962 },
                  { longitude: -91.1741, latitude: 40.0638 },
                  { longitude: -104.4326, latitude: 40 },
                  { longitude: -92.3012, latitude: 29.8411 }
                ]
              }
            }
          ]
        }
      }
    }
  },
    metadata: {
      probability: 0.6,
      region: 'Semi-arid zones'
    }
  },
];
