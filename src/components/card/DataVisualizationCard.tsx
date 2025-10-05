import React from 'react';
import { NASAGranule } from '@/types';
import { Satellite, MapPin, Calendar, HardDrive, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataVisualizationCardProps {
  granule: NASAGranule;
}

export const DataVisualizationCard: React.FC<DataVisualizationCardProps> = ({ granule }) => {
  const browseImages = granule.relatedUrls?.filter(url => 
    url.type === 'GET RELATED VISUALIZATION' && url.url.startsWith('https://')
  ) || [];

  const dataUrl = granule.relatedUrls?.find(url => url.type === 'GET DATA')?.url;
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const coordinates = granule.spatialExtent?.horizontalSpatialDomain?.geometry?.gpolygons?.[0]?.boundary?.points;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-[var(--card-shadow)] border border-border">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Satellite className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-card-foreground text-sm mb-1">
            NASA Earth Data
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {granule.title}
          </p>
        </div>
      </div>

      {/* Browse Images */}
      {browseImages.length > 0 && (
        <div className="mb-4 rounded-lg overflow-hidden bg-muted">
          <img 
            src={browseImages[0].url} 
            alt="Satellite visualization"
            className="w-full h-40 object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Metadata Grid */}
      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-medium text-card-foreground">Observation Date</p>
            <p className="text-xs text-muted-foreground">
              {formatDate(granule.timeStart)}
            </p>
          </div>
        </div>

        {coordinates && coordinates.length > 0 && (
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-card-foreground">Location</p>
              <p className="text-xs text-muted-foreground">
                {coordinates[0].latitude.toFixed(2)}°, {coordinates[0].longitude.toFixed(2)}°
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2">
          <HardDrive className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-medium text-card-foreground">Data Size</p>
            <p className="text-xs text-muted-foreground">
              {granule.granuleSize.toFixed(2)} MB
            </p>
          </div>
        </div>
      </div>

      {/* Data Access Button */}
      {dataUrl && (
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={() => window.open(dataUrl, '_blank')}
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          View Raw Data
        </Button>
      )}

      {/* Data Center Badge */}
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Source: {granule.dataCenter}
        </p>
      </div>
    </div>
  );
};
