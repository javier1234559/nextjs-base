'use client';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AlertCircle, Check, Copy, MapPin, Settings, Navigation } from 'lucide-react';
import { globalConfig } from '@/globalConfig';
import { MapPinIcon } from '@/components/icons/map-pin-icon';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/hooks/use-copy';
import { useState, useEffect } from 'react';
import MapViewSelector, { MapStyleType } from './MapViewSelector';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import DirectionsMap from './DirectionsMap';
import { useCurrentLocation } from '../../hooks/use-current-location';

const MAPBOX_TOKEN = globalConfig.MAPBOX_TOKEN;

interface MapLocationProps {
    lat: number;
    lng: number;
    address: string;
    isLoading: boolean;
    error: Error | null;
}

const MapLocation = ({ lat, lng, address, isLoading, error }: MapLocationProps) => {
    const { copyToClipboard, isCopied } = useCopy();
    const [mapStyle, setMapStyle] = useState<MapStyleType>('STREETS');
    const [is3D, setIs3D] = useState(false);
    const [showDirections, setShowDirections] = useState(false);
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const { currentLocation, getCurrentLocation, isGettingLocation } = useCurrentLocation();

    if (isLoading) {
        return <MapLocationLoading />;
    }

    if (error) {
        return <MapLocationError />;
    }

    const handleStyleChange = (style: MapStyleType) => {
        setMapStyle(style);
    };

    const handle3DToggle = (is3D: boolean) => {
        setIs3D(is3D);
    };

    // Handle location permission state
    useEffect(() => {
        if (currentLocation?.latitude && currentLocation?.longitude) {
            console.log('currentLocation', currentLocation);
            console.log('hasLocationPermission', hasLocationPermission);
            console.log('destination', {
                lat,
                lng,
                address
            });
            setHasLocationPermission(true);
        }
    }, [currentLocation]);

    const handleRequestLocation = async () => {
        const location = await getCurrentLocation();
        if (location) {
            setHasLocationPermission(true);
        }
    };

    // Show DirectionsMap when directions mode is enabled
    if (showDirections) {
        if (!hasLocationPermission) {
            return (
                <div className="w-full h-[500px] relative">
                    <div className="w-full h-full rounded-lg bg-muted flex flex-col items-center justify-center border border-border">
                        <Navigation className="text-muted-foreground w-12 h-12 mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">Location Permission Required</h3>
                        <p className="text-muted-foreground text-center mb-6 max-w-sm">
                            To show directions to this property, we need access to your current location.
                        </p>
                        <div className="flex gap-3">
                            <Button
                                onClick={handleRequestLocation}
                                className="bg-primary text-primary-foreground"
                                disabled={isGettingLocation}
                            >
                                <Navigation className="w-4 h-4 mr-2" />
                                {isGettingLocation ? 'Requesting Location...' : 'Allow Location Access'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setShowDirections(false)}
                            >
                                <MapPin className="w-4 h-4 mr-2" />
                                Back to Property Map
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="w-full h-[500px] relative">
                <DirectionsMap
                    destination={{
                        lat,
                        lng,
                        address
                    }}
                    origin={currentLocation ? {
                        lat: currentLocation.latitude,
                        lng: currentLocation.longitude,
                        address: currentLocation.address
                    } : undefined}
                />

                {/* Back to Location View Button */}
                <div className="absolute bottom-10 right-6">
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-background/80 backdrop-blur-sm"
                        onClick={() => setShowDirections(false)}
                    >
                        <MapPin className="w-4 h-4 mr-2" />
                        Back to Location
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-[500px] relative">
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={{
                    latitude: lat,
                    longitude: lng,
                    zoom: 10,
                    pitch: is3D ? 45 : 0,
                    bearing: 0
                }}
                style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                mapStyle={globalConfig.MAPBOX_STYLES[mapStyle]}
                pitch={is3D ? 45 : 0}
            >
                {/* Current Location Marker */}
                {lat && lng && (
                    <Marker
                        longitude={lng}
                        latitude={lat}
                        anchor="center"
                    >
                        <MapPinIcon />
                    </Marker>
                )}
            </Map>

            {/* Map Style Selector */}
            <div className="absolute top-4 left-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
                            <Settings className="w-4 h-4 mr-2" />
                            View
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4" align="start">
                        <MapViewSelector
                            currentStyle={mapStyle}
                            onStyleChange={handleStyleChange}
                            is3D={is3D}
                            on3DToggle={handle3DToggle}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Directions Toggle Button */}
            <div className="absolute bottom-10 right-4">
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-background/80 backdrop-blur-sm"
                    onClick={() => setShowDirections(true)}
                >
                    <Navigation className="w-4 h-4 mr-2" />
                    Directions
                </Button>
            </div>

            {/* Copy Address Button */}
            <div className="absolute top-4 right-4">
                <Button variant="outline" className="w-full bg-background/80 backdrop-blur-sm" onClick={() => copyToClipboard(address)}>
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="text-sm">Copy Address</span>
                </Button>
            </div>
        </div>
    );
};

export default MapLocation;


const MapLocationLoading = () => {
    return (
        <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center animate-pulse">
            <MapPin className="text-muted-foreground w-10 h-10 animate-bounce" />
            <span className="ml-4 text-muted-foreground text-sm">Loading map...</span>
        </div>
    );
};

const MapLocationError = () => {
    return (
        <div className="w-full h-[500px] rounded-lg bg-muted flex flex-col items-center justify-center border border-border">
            <AlertCircle className="text-muted-foreground w-8 h-8 mb-2" />
            <span className="text-muted-foreground text-sm font-semibold">Failed to load map data</span>
        </div>
    );
};