/**
 * NASADataAdapter - Contract for ingesting NASA data sources
 * MVP implementation uses mock data
 * Future: Integrate with actual NASA APIs (SMAP, MODIS, GPM, etc.)
 */

export interface NASADataPoint {
  source: string;
  value: number;
  timestamp: number;
  region?: string;
  unit?: string;
}

export class NASADataAdapter {
  /**
   * Mock fetch for SMAP (Soil Moisture Active Passive) data
   */
  static async fetchSMAPData(region?: string): Promise<NASADataPoint> {
    // Mock implementation
    return {
      source: 'SMAP',
      value: Math.random() * 100,
      timestamp: Date.now(),
      region: region || 'Global',
      unit: 'percent'
    };
  }

  /**
   * Mock fetch for MODIS (Moderate Resolution Imaging Spectroradiometer) data
   */
  static async fetchMODISData(region?: string): Promise<NASADataPoint> {
    return {
      source: 'MODIS',
      value: Math.random() * 100,
      timestamp: Date.now(),
      region: region || 'Global',
      unit: 'index'
    };
  }

  /**
   * Mock fetch for GPM (Global Precipitation Measurement) data
   */
  static async fetchGPMData(region?: string): Promise<NASADataPoint> {
    return {
      source: 'GPM',
      value: Math.random() * 200,
      timestamp: Date.now(),
      region: region || 'Global',
      unit: 'mm'
    };
  }

  /**
   * Generic data fetch based on source type
   */
  static async fetchData(source: string, region?: string): Promise<NASADataPoint> {
    switch (source.toUpperCase()) {
      case 'SMAP':
        return this.fetchSMAPData(region);
      case 'MODIS':
        return this.fetchMODISData(region);
      case 'GPM':
        return this.fetchGPMData(region);
      default:
        throw new Error(`Unknown data source: ${source}`);
    }
  }
}
