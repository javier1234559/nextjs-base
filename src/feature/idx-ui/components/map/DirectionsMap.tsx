import React, { useState, useEffect } from 'react';
import Map, { Marker, Source, Layer, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AlertCircle, Car, Bike, Bus, Navigation, X, PersonStanding, MapPin } from 'lucide-react';
import { globalConfig } from '@/globalConfig';
import { MapPinIcon } from '@/components/icons/map-pin-icon';
import { Button } from '@/components/ui/button';
import { directionsService, DirectionsRequest, RouteInfo } from '@/feature/idx-ui/service/directions-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCurrentLocation } from '@/feature/idx-ui/hooks/use-current-location';

const MAPBOX_TOKEN = globalConfig.MAPBOX_TOKEN;

interface DirectionsMapProps {
    destination: {
        lat: number;
        lng: number;
        address: string;
    };
    origin?: {
        lat: number;
        lng: number;
        address?: string;
    };
    className?: string;
}

type TransportMode = 'driving' | 'walking' | 'cycling' | 'transit';

const transportModes = [
    { key: 'driving' as TransportMode, icon: Car, label: 'Drive', color: '#3b82f6' },
    { key: 'walking' as TransportMode, icon: PersonStanding, label: 'Walk', color: '#10b981' },
    { key: 'cycling' as TransportMode, icon: Bike, label: 'Bike', color: '#f59e0b' },
    { key: 'transit' as TransportMode, icon: Bus, label: 'Transit', color: '#8b5cf6' }
];

const DirectionsMap = ({ destination, origin, className = '' }: DirectionsMapProps) => {
    const [route, setRoute] = useState<RouteInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [transportMode, setTransportMode] = useState<TransportMode>('driving');
    const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

    // Get current location if no origin provided
    useEffect(() => {
        if (!origin && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Error getting current location:', error);
                    setError('Unable to get current location');
                }
            );
        }
    }, [origin]);

    // Fetch directions when origin or destination changes
    useEffect(() => {
        const fetchDirections = async () => {
            const startPoint = origin || currentLocation;

            if (!startPoint) return;

            setIsLoading(true);
            setError(null);

            const request: DirectionsRequest = {
                from: startPoint,
                to: destination,
                profile: transportMode
            };

            try {
                const routeData = await directionsService.getDirections(request);

                if (routeData) {
                    setRoute(routeData);
                } else {
                    setError('Unable to find route');
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Unable to find route');
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (origin || currentLocation) {
            fetchDirections();
        }
    }, [origin, currentLocation, destination, transportMode]);

    const routeGeoJSON = route ? {
        type: 'Feature' as const,
        properties: {},
        geometry: {
            type: 'LineString' as const,
            coordinates: route.coordinates
        }
    } : null;

    const startPoint = origin || currentLocation;

    if (!startPoint) {
        return (
            <div className={`w-full h-[500px] rounded-lg bg-muted flex items-center justify-center ${className}`}>
                <div className="text-center">
                    <Navigation className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Getting your location...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full h-[500px] relative ${className}`}>
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={{
                    latitude: (startPoint.lat + destination.lat) / 2,
                    longitude: (startPoint.lng + destination.lng) / 2,
                    zoom: 12
                }}
                style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                mapStyle={globalConfig.MAPBOX_STYLES.STREETS}
            >
                {/* Start Marker */}
                <Marker longitude={startPoint.lng} latitude={startPoint.lat} anchor="center">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                </Marker>

                {/* Destination Marker */}
                <Marker longitude={destination.lng} latitude={destination.lat} anchor="center">
                    <MapPinIcon />
                </Marker>

                {/* Route Line */}
                {routeGeoJSON && (
                    <Source id="route" type="geojson" data={routeGeoJSON}>
                        <Layer
                            id="route-line"
                            type="line"
                            source="route"
                            paint={{
                                'line-color': transportModes.find(m => m.key === transportMode)?.color || '#3b82f6',
                                'line-width': 4,
                                'line-opacity': 0.8
                            }}
                        />
                    </Source>
                )}

                <NavigationControl position="top-right" />
            </Map>

            {/* Transport Mode Selector */}
            <div className="absolute top-4 left-4">
                <Card className="bg-background/90 backdrop-blur-sm border-border">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Transport Mode</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex gap-2">
                            {transportModes.map((mode) => {
                                const Icon = mode.icon;
                                const isActive = transportMode === mode.key;

                                return (
                                    <Button
                                        key={mode.key}
                                        variant={isActive ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setTransportMode(mode.key)}
                                        className="flex flex-col items-center gap-1 h-auto p-2"
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-xs">{mode.label}</span>
                                    </Button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Route Info */}
            {route && (
                <div className="absolute bottom-4 left-4 right-4">
                    <Card className="bg-background/90 backdrop-blur-sm border-border">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <p className="text-sm font-medium">Distance</p>
                                        <p className="text-lg font-bold text-primary">
                                            {directionsService.formatDistance(route.distance)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Duration</p>
                                        <p className="text-lg font-bold text-primary">
                                            {directionsService.formatDuration(route.duration)}
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="secondary">
                                    {transportModes.find(m => m.key === transportMode)?.label}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                        <p className="text-sm text-muted-foreground">Finding route...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="absolute bottom-4 left-4 right-4">
                    <Card className="bg-destructive/90 backdrop-blur-sm border-destructive">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                <p className="text-sm text-destructive-foreground">{error}</p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setError(null)}
                                    className="ml-auto h-6 w-6 p-0"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default DirectionsMap; 