import { globalConfig } from '@/globalConfig';

export interface DirectionsRequest {
    from: {
        lat: number;
        lng: number;
    };
    to: {
        lat: number;
        lng: number;
    };
    profile?: 'driving' | 'walking' | 'cycling' | 'transit';
}

export interface DirectionsResponse {
    routes: Array<{
        geometry: {
            coordinates: [number, number][];
            type: string;
        };
        distance: number;
        duration: number;
        weight: number;
        weight_name: string;
    }>;
    waypoints: Array<{
        distance: number;
        name: string;
        location: [number, number];
    }>;
    code: string;
    uuid: string;
}

export interface RouteInfo {
    distance: number;
    duration: number;
    coordinates: [number, number][];
}

class DirectionsService {
    private token = globalConfig.MAPBOX_TOKEN;
    private baseUrl = globalConfig.MAPBOX_DIRECTIONS_API;

    async getDirections(request: DirectionsRequest): Promise<RouteInfo | null> {
        try {
            const { from, to, profile = 'driving' } = request;

            // Calculate distance between points to check if it's too far
            const distance = this.calculateDistance(from.lat, from.lng, to.lat, to.lng);
            const maxDistance = 10000; // 10,000 km limit (Mapbox limit is around 10,000 km)

            if (distance > maxDistance) {
                throw new Error(`Route distance (${this.formatDistance(distance * 1000)}) exceeds maximum limit of ${this.formatDistance(maxDistance * 1000)}. Please choose a closer destination.`);
            }

            const url = `${this.baseUrl}/${profile}/${from.lng},${from.lat};${to.lng},${to.lat}?geometries=geojson&access_token=${this.token}`;

            const response = await fetch(url);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                if (errorData.message?.includes('maximum distance limitation')) {
                    throw new Error(`Route distance is too far (${this.formatDistance(distance * 1000)}). Mapbox cannot provide directions for this distance.`);
                }
                throw new Error(`Directions API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
            }

            const data: DirectionsResponse = await response.json();

            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                return {
                    distance: route.distance,
                    duration: route.duration,
                    coordinates: route.geometry.coordinates
                };
            }

            return null;
        } catch (error) {
            console.error('Error fetching directions:', error);
            throw error; // Re-throw to handle in component
        }
    }

    // Calculate distance between two points using Haversine formula
    private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.deg2rad(lat2 - lat1);
        const dLng = this.deg2rad(lng2 - lng1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }

    formatDistance(meters: number): string {
        if (meters < 1000) {
            return `${Math.round(meters)}m`;
        }
        return `${(meters / 1000).toFixed(1)}km`;
    }

    formatDuration(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    }
}

export const directionsService = new DirectionsService(); 