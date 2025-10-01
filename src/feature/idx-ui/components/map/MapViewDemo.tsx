import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { globalConfig } from '@/globalConfig';
import { MapPinIcon } from '@/components/icons/map-pin-icon';
import MapViewSelector, { MapStyleType } from './MapViewSelector';

const MAPBOX_TOKEN = globalConfig.MAPBOX_TOKEN;

// Example coordinates (Miami, FL)
const EXAMPLE_COORDINATES = {
    lat: 25.7617,
    lng: -80.1918
};

const MapViewDemo = () => {
    const [mapStyle, setMapStyle] = useState<MapStyleType>('STREETS');

    const handleStyleChange = (style: MapStyleType) => {
        setMapStyle(style);
    };

    return (
        <div className="w-full h-[600px] relative">
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={{
                    latitude: EXAMPLE_COORDINATES.lat,
                    longitude: EXAMPLE_COORDINATES.lng,
                    zoom: 12
                }}
                style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                mapStyle={globalConfig.MAPBOX_STYLES[mapStyle]}
            >
                {/* Example Marker */}
                <Marker
                    longitude={EXAMPLE_COORDINATES.lng}
                    latitude={EXAMPLE_COORDINATES.lat}
                    anchor="center"
                >
                    <MapPinIcon />
                </Marker>
            </Map>

            {/* Map Style Selector */}
            <div className="absolute top-4 left-4">
                <div className="bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border">
                    <MapViewSelector
                        currentStyle={mapStyle}
                        onStyleChange={handleStyleChange}
                    />
                </div>
            </div>

            {/* Info Panel */}
            <div className="absolute top-4 right-4">
                <div className="bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border max-w-xs">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Map View Demo</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        This demo shows all available Mapbox map styles. Click on different view options to see how the map changes.
                    </p>
                    <div className="text-xs text-muted-foreground">
                        <p><strong>Current Style:</strong> {mapStyle}</p>
                        <p><strong>Location:</strong> Miami, FL</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapViewDemo; 