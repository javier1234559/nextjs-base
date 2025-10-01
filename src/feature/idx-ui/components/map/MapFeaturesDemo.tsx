import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MapLocation from './MapLocation';
import DirectionsMap from './DirectionsMap';
import MapViewDemo from './MapViewDemo';

// Example coordinates (Miami Beach, FL)
const EXAMPLE_LOCATION = {
    lat: 25.7907,
    lng: -80.1300,
    address: "Miami Beach, FL 33139"
};

const EXAMPLE_DESTINATION = {
    lat: 25.7617,
    lng: -80.1918,
    address: "Miami, FL 33101"
};

const MapFeaturesDemo = () => {
    const [activeTab, setActiveTab] = useState('location');

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">Map Features Demo</h1>
                <p className="text-muted-foreground">
                    Explore all the map features including multiple views, 3D perspective, and directions.
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="location">Location View</TabsTrigger>
                    <TabsTrigger value="directions">Directions</TabsTrigger>
                    <TabsTrigger value="styles">Map Styles</TabsTrigger>
                    <TabsTrigger value="info">Features Info</TabsTrigger>
                </TabsList>

                <TabsContent value="location" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Location with 3D View</CardTitle>
                            <CardDescription>
                                View a specific location with multiple map styles and 3D perspective toggle.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MapLocation
                                lat={EXAMPLE_LOCATION.lat}
                                lng={EXAMPLE_LOCATION.lng}
                                address={EXAMPLE_LOCATION.address}
                                isLoading={false}
                                error={null}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="directions" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Directions & Routing</CardTitle>
                            <CardDescription>
                                Get directions between two points with multiple transport modes.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DirectionsMap
                                destination={EXAMPLE_DESTINATION}
                                origin={EXAMPLE_LOCATION}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="styles" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Map Styles</CardTitle>
                            <CardDescription>
                                Explore all available Mapbox map styles in one view.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MapViewDemo />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="info" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Map Styles</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <h4 className="font-semibold">Available Styles:</h4>
                                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                                        <li>• <strong>Streets:</strong> Standard street view with buildings</li>
                                        <li>• <strong>Satellite:</strong> Pure satellite imagery</li>
                                        <li>• <strong>Satellite Streets:</strong> Satellite with street labels</li>
                                        <li>• <strong>Light:</strong> Clean, minimal light theme</li>
                                        <li>• <strong>Dark:</strong> Dark theme for low-light environments</li>
                                        <li>• <strong>Navigation Day/Night:</strong> Optimized for navigation</li>
                                        <li>• <strong>Outdoors:</strong> Perfect for outdoor activities</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>3D View</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <h4 className="font-semibold">Features:</h4>
                                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                                        <li>• <strong>Tilted Perspective:</strong> 45-degree pitch for 3D effect</li>
                                        <li>• <strong>Building Heights:</strong> 3D buildings when available</li>
                                        <li>• <strong>Terrain:</strong> Elevation data visualization</li>
                                        <li>• <strong>Toggle Control:</strong> Easy switch between 2D/3D</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Directions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <h4 className="font-semibold">Transport Modes:</h4>
                                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                                        <li>• <strong>Driving:</strong> Car routes with traffic consideration</li>
                                        <li>• <strong>Walking:</strong> Pedestrian-friendly routes</li>
                                        <li>• <strong>Cycling:</strong> Bike lanes and cycling paths</li>
                                        <li>• <strong>Transit:</strong> Public transportation routes</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Features:</h4>
                                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                                        <li>• <strong>Real-time Routing:</strong> Live route calculation</li>
                                        <li>• <strong>Distance & Duration:</strong> Accurate travel estimates</li>
                                        <li>• <strong>Visual Route:</strong> Clear path visualization</li>
                                        <li>• <strong>Current Location:</strong> Auto-detection when available</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Technical Features</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <h4 className="font-semibold">Mapbox Integration:</h4>
                                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                                        <li>• <strong>React Map GL:</strong> Modern React wrapper</li>
                                        <li>• <strong>TypeScript:</strong> Full type safety</li>
                                        <li>• <strong>Responsive Design:</strong> Mobile-friendly interface</li>
                                        <li>• <strong>Performance:</strong> Optimized rendering</li>
                                        <li>• <strong>Error Handling:</strong> Graceful fallbacks</li>
                                        <li>• <strong>Loading States:</strong> Smooth user experience</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default MapFeaturesDemo; 