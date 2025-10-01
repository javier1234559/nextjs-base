'use client'

import React, { useEffect } from 'react';
import Map, { Marker, Popup, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { AlertCircle, MapPin, SquareMousePointer, Settings } from 'lucide-react';
import { globalConfig } from '@/globalConfig';
import { MapPopUp } from './MapPopUp';
import { formatPropertyPrice } from '@/lib/utils';
import { usePropertyFilterStore } from '@/feature/idx-ui/store/property-store';
import { MapPinIcon } from '@/components/icons/map-pin-icon';
import { Button } from '@/components/ui/button';
import MapViewSelector, { MapStyleType } from './MapViewSelector';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Property, Value } from '@/types/common';

const MAPBOX_TOKEN = globalConfig.MAPBOX_TOKEN;

console.log('TEST' + MAPBOX_TOKEN)

interface MapViewProps {
  properties: Property;
  isLoading: boolean;
  error: Error | null;
}

const MapView = ({ properties, isLoading, error }: MapViewProps) => {
  const [selected, setSelected] = React.useState<Value | null>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [mapRef, setMapRef] = React.useState<any>(null);
  const [mapStyle, setMapStyle] = React.useState<MapStyleType>('STREETS');
  const drawRef = React.useRef<any>(null);
  const { currentLocation, polygonArea, setPolygonArea } = usePropertyFilterStore();

  // Determine initial view state
  const getInitialViewState = () => {
    // If we have a current location, focus on it
    if (currentLocation?.coordinates) {
      return {
        longitude: currentLocation.coordinates[0],
        latitude: currentLocation.coordinates[1],
        zoom: 10
      };
    }

    // If we have properties, focus on the first one
    const first = properties?.value[0];
    if (first) {
      return {
        longitude: first.Longitude,
        latitude: first.Latitude,
        zoom: 11
      };
    }

    // Default view
    return {
      longitude: 106.7,
      latitude: 10.7,
      zoom: 6
    };
  };

  const initialView = getInitialViewState();

  // Initialize Mapbox Draw
  useEffect(() => {
    console.log('MapView: useEffect triggered, mapRef:', !!mapRef);
    if (!mapRef) return;

    // Dynamically import MapboxDraw to avoid SSR issues
    const initDraw = async () => {
      try {
        console.log('MapView: Starting to initialize MapboxDraw...');
        const MapboxDraw = (await import('@mapbox/mapbox-gl-draw')).default;
        console.log('MapView: MapboxDraw imported successfully');

        const draw = new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            polygon: true,
            trash: true
          },
          defaultMode: 'draw_polygon'
        });

        console.log('MapView: MapboxDraw instance created');
        mapRef.addControl(draw);
        console.log('MapView: Draw control added to map');
        drawRef.current = draw;

        // Handle draw events
        mapRef.on('draw.create', handleDrawCreate);
        mapRef.on('draw.delete', handleDrawDelete);
        mapRef.on('draw.update', handleDrawUpdate);
        console.log('MapView: Draw event listeners added');

        console.log('MapView: Mapbox Draw initialized successfully');
      } catch (error) {
        console.error('MapView: Failed to initialize Mapbox Draw:', error);
      }
    };

    initDraw();

    return () => {
      console.log('MapView: Cleanup - removing draw control');
      if (drawRef.current && mapRef) {
        try {
          mapRef.removeControl(drawRef.current);
          console.log('MapView: Draw control removed successfully');
        } catch (error) {
          console.error('MapView: Error removing draw control:', error);
        }
      }
    };
  }, [mapRef]);

  // Handle draw create event
  const handleDrawCreate = (e: any) => {
    console.log('MapView: Draw create event triggered', e);
    if (!drawRef.current) {
      console.error('MapView: Draw ref is null in handleDrawCreate');
      return;
    }

    try {
      const data = drawRef.current.getAll();
      console.log('MapView: Draw data:', data);
      if (data.features.length > 0) {
        const coordinates = data.features[0].geometry.coordinates[0];
        console.log('MapView: Polygon created with coordinates:', coordinates);
        // setPolygonArea(coordinates);
        setIsDrawing(false);
        console.log('MapView: Polygon area set and drawing mode disabled');
      } else {
        console.log('MapView: No features found in draw data');
      }
    } catch (error) {
      console.error('MapView: Error handling draw create:', error);
    }
  };

  // Handle draw delete event
  const handleDrawDelete = () => {
    console.log('MapView: Draw delete event triggered');
    setPolygonArea(undefined);
    console.log('MapView: Polygon area cleared');
  };

  // Handle draw update event
  const handleDrawUpdate = (e: any) => {
    console.log('MapView: Draw update event triggered', e);
    if (!drawRef.current) {
      console.error('MapView: Draw ref is null in handleDrawUpdate');
      return;
    }

    try {
      const data = drawRef.current.getAll();
      console.log('MapView: Updated draw data:', data);
      if (data.features.length > 0) {
        const coordinates = data.features[0].geometry.coordinates[0];
        console.log('MapView: Polygon updated with coordinates:', coordinates);
        setPolygonArea(coordinates);
      } else {
        console.log('MapView: No features found in updated draw data');
      }
    } catch (error) {
      console.error('MapView: Error handling draw update:', error);
    }
  };

  // Handle map click to close popup
  const handleMapClick = (event: any) => {
    // Only close if clicking on the map itself, not on markers or popup
    if (event.originalEvent.target.classList.contains('mapboxgl-canvas')) {
      setSelected(null);
    }
  };

  // Handle drawing mode toggle
  const toggleDrawingMode = () => {
    console.log('MapView: Toggle drawing mode called, isDrawing:', isDrawing, 'drawRef:', !!drawRef.current);
    if (!drawRef.current) {
      console.error('MapView: Draw control not initialized');
      return;
    }

    try {
      if (isDrawing) {
        // Cancel drawing
        console.log('MapView: Cancelling drawing mode');
        drawRef.current.deleteAll();
        setIsDrawing(false);
        console.log('MapView: Drawing cancelled');
      } else {
        // Start drawing
        console.log('MapView: Activating drawing mode');
        drawRef.current.changeMode('draw_polygon');
        setIsDrawing(true);
        console.log('MapView: Drawing mode activated');
      }
    } catch (error) {
      console.error('MapView: Error toggling drawing mode:', error);
    }
  };

  // Clear active polygon
  const clearPolygonArea = () => {
    console.log('MapView: Clear polygon area called, drawRef:', !!drawRef.current, 'polygonArea:', !!polygonArea);
    if (drawRef.current) {
      try {
        console.log('MapView: Deleting all drawn features');
        drawRef.current.deleteAll();
        console.log('MapView: Polygon area cleared');
      } catch (error) {
        console.error('MapView: Error clearing polygon area:', error);
      }
    }
    setPolygonArea(undefined);
    console.log('MapView: Polygon area state cleared');
  };

  // Create GeoJSON for active polygon
  const createActivePolygonGeoJSON = () => {
    if (!polygonArea) return null;

    return {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [polygonArea]
      },
      properties: {}
    };
  };

  const activePolygonGeoJSON = createActivePolygonGeoJSON();

  const handleStyleChange = (style: MapStyleType) => {
    setMapStyle(style);
  };

  if (isLoading) {
    return <MapViewLoading />;
  }

  if (error || !properties || !properties.value) {
    return <MapViewError />;
  }

  return (
    <div className="w-full h-full py-8 relative">
      <Map
        ref={setMapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={initialView}
        style={{ width: '100%', height: '100%', borderRadius: '10px' }}
        mapStyle={globalConfig.MAPBOX_STYLES[mapStyle]}
        onClick={handleMapClick}
      >
        {/* Current Location Marker */}
        {currentLocation?.coordinates && (
          <Marker
            longitude={currentLocation.coordinates[0]}
            latitude={currentLocation.coordinates[1]}
            anchor="center"
          >
            <MapPinIcon />
          </Marker>
        )}

        {/* Property Markers */}
        {properties?.value.map((property) => {
          if (!property.Longitude || !property.Latitude) return null;

          const price = property.ListPrice;
          const formattedPrice = formatPropertyPrice(price);

          return (
            <Marker
              key={property.ListingKey || property.ListingId}
              longitude={property.Longitude}
              latitude={property.Latitude}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelected(property);
              }}
            >
              <div className="cursor-pointer">
                {formattedPrice ? (
                  <div className="bg-background text-foreground text-xs font-semibold px-2 py-1 rounded-full shadow-md border border-border hover:shadow-lg transition-shadow">
                    {formattedPrice}
                  </div>
                ) : (
                  <div className="w-3 h-3 bg-foreground rounded-full shadow-md hover:shadow-lg transition-shadow"></div>
                )}
              </div>
            </Marker>
          );
        })}

        {/* Active Polygon Layer */}
        {activePolygonGeoJSON && (
          <Source id="active-polygon" type="geojson" data={activePolygonGeoJSON}>
            <Layer
              id="active-polygon-fill"
              type="fill"
              source="active-polygon"
              paint={{
                'fill-color': '#10b981',
                'fill-opacity': 0.3
              }}
            />
            <Layer
              id="active-polygon-outline"
              type="line"
              source="active-polygon"
              paint={{
                'line-color': '#10b981',
                'line-width': 3
              }}
            />
          </Source>
        )}

        {selected && (
          <Popup
            longitude={selected.Longitude}
            latitude={selected.Latitude}
            onClose={() => setSelected(null)}
            closeOnClick={false}
            anchor="top"
            offset={10}
            closeButton={false}
            className="custom-map-popup"
          >
            <MapPopUp
              property={selected}
              onClose={() => setSelected(null)}
            />
          </Popup>
        )}
      </Map>

      {/* Map Style Selector */}
      <div className="absolute top-24 left-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm shadow-lg">
              <Settings className="w-4 h-4 mr-2" />
              View
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="start">
            <MapViewSelector
              currentStyle={mapStyle}
              onStyleChange={handleStyleChange}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Drawing Controls */}
      <div className="absolute top-12 left-4 flex flex-col gap-2">
        <Button
          onClick={toggleDrawingMode}
          variant={isDrawing ? "destructive" : "default"}
          size="sm"
          className="shadow-lg"
        >
          <SquareMousePointer className="w-4 h-4 mr-2" />
          {isDrawing ? "Cancel Draw" : "Draw"}
        </Button>

        {polygonArea && !isDrawing && (
          <Button
            onClick={clearPolygonArea}
            variant="outline"
            size="sm"
            className="shadow-lg"
          >
            Clear Area
          </Button>
        )}
      </div>

      {/* Drawing Instructions */}
      {isDrawing && (
        <div className="absolute top-16 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-medium text-foreground">
            Click on the map to draw your boundary area
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Double-click to complete the polygon
          </p>
        </div>
      )}
    </div>
  );
};

export default MapView;

const MapViewLoading = () => {
  return (
    <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center animate-pulse">
      <MapPin className="text-muted-foreground w-10 h-10 animate-bounce" />
      <span className="ml-4 text-muted-foreground text-sm">Loading map...</span>
    </div>
  );
};

const MapViewError = () => {
  return (
    <div className="w-full h-[500px] rounded-lg bg-muted flex flex-col items-center justify-center border border-border">
      <AlertCircle className="text-muted-foreground w-8 h-8 mb-2" />
      <span className="text-muted-foreground text-sm font-semibold">Failed to load map data</span>
    </div>
  );
};