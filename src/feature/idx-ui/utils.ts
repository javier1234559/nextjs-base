import { MapboxResponse } from "./types/MapBox";

const defaultRadius = 10;

export interface LocationInfo {
    coordinates: [number, number];
    country?: string;
    address?: string;
    city?: string;
    state?: string;
    district?: string;
    postalCode?: string;
    fullPlaceName?: string;
    radius?: number;
    near?: [number, number];
    box?: [number, number, number, number];
    poly?: [number, number][];
}

export function convertToLocationInfoArray(
    mapboxData: MapboxResponse | null,
): LocationInfo[] {
    // Handle null/undefined input
    if (!mapboxData || !Array.isArray(mapboxData.features)) {
        return [];
    }

    const results: LocationInfo[] = [];

    for (const feature of mapboxData.features) {
        try {
            // Basic validation
            if (!feature || !feature.geometry || !feature.text) {
                continue;
            }

            // Extract context information
            const contextMap: Record<string, string> = {};
            if (Array.isArray(feature.context)) {
                for (const ctx of feature.context) {
                    if (ctx && typeof ctx.id === 'string') {
                        const type = ctx.id.split(".")[0];
                        contextMap[type] = ctx.text;
                    }
                }
            }

            // Create LocationInfo object
            const locationInfo: LocationInfo = {
                coordinates: feature.geometry.coordinates as [number, number],
                address: feature.text,
                fullPlaceName: feature.place_name,
                city: contextMap["place"] || contextMap["locality"] || undefined,
                state: contextMap["region"] || undefined,
                district: contextMap["district"] || undefined,
                postalCode: contextMap["postcode"] || undefined,
                country: contextMap["country"] || undefined,
                radius: defaultRadius
            };

            // Add bbox as box property if available
            if (feature.bbox && Array.isArray(feature.bbox) && feature.bbox.length === 4) {
                locationInfo.box = feature.bbox as [number, number, number, number];
            }

            results.push(locationInfo);

        } catch (error) {
            console.error("Failed to process feature:", error);
            continue;
        }
    }

    return results;
}

export function convertCurrentLocationToLocationInfo(
    latitude: number,
    longitude: number,
    label: string = "Current Location",
): LocationInfo {
    return {
        coordinates: [longitude, latitude], // Mapbox uses [lng, lat] format
        near: [longitude, latitude], // Use near for current location coordinates
        address: label,
        fullPlaceName: label,
        // Current location typically doesn't have city/state/postal code
        // These will be undefined and won't be included in the object
        radius: defaultRadius
    };
}

export function extractMapboxLocationToOData(mapboxData: MapboxResponse): LocationInfo[] {
    // Check for valid input
    if (!mapboxData || !Array.isArray(mapboxData.features)) {
        console.error("Invalid Mapbox data: FeatureCollection with features array expected.");
        return [];
    }

    const results: LocationInfo[] = [];

    for (const feature of mapboxData.features) {
        try {
            // Basic validation
            if (!feature || !feature.geometry || !feature.text) {
                continue;
            }

            // Extract context information
            const contextMap: Record<string, string> = {};
            if (Array.isArray(feature.context)) {
                for (const ctx of feature.context) {
                    if (ctx && typeof ctx.id === 'string') {
                        const type = ctx.id.split(".")[0];
                        contextMap[type] = ctx.text;
                    }
                }
            }

            // Create LocationInfo object
            const locationInfo: LocationInfo = {
                coordinates: feature.geometry.coordinates as [number, number],
                address: feature.text,
                fullPlaceName: feature.place_name,
                city: contextMap["place"] || contextMap["locality"],
                state: contextMap["region"],
                district: contextMap["district"],
                postalCode: contextMap["postcode"],
                country: contextMap["country"]
            };

            // Add bbox as box property if available
            if (feature.bbox && Array.isArray(feature.bbox) && feature.bbox.length === 4) {
                locationInfo.box = feature.bbox as [number, number, number, number];
            }

            results.push(locationInfo);

        } catch (error) {
            console.error("Failed to process feature:", error);
            continue;
        }
    }

    return results;
}

export function extractMapboxLocationDetails(mapboxData: any) {
    // 1. Check for valid top-level input
    if (!mapboxData || !Array.isArray(mapboxData.features)) {
        console.error("Invalid Mapbox data: An array of features is expected.");
        return [];
    }

    const results: any[] = [];

    for (const feature of mapboxData.features) {
        // 2. Use a try-catch block to make the loop resilient to a single bad feature
        try {
            // Basic check for a valid feature object
            if (!feature || !feature.geometry || !feature.text) {
                console.warn("Skipping a malformed feature:", feature);
                continue; // Skip to the next iteration
            }

            const contextMap: Record<string, string> = {};
            if (Array.isArray(feature.context)) {
                for (const c of feature.context) {
                    // 3. Defensive check on the context ID before splitting
                    if (c && typeof c.id === 'string') {
                        const type = c.id.split(".")[0];
                        contextMap[type] = c.text;
                    }
                }
            }

            // Assemble the final object
            const locationInfo: any = {
                coordinates: feature.geometry.coordinates,
                // Using a more descriptive name to avoid ambiguity
                featureName: feature.text,
                fullPlaceName: feature.place_name,
                // Explicitly add address only for address-type features
                ...(feature.place_type.includes("address") && { address: feature.text }),
            };

            // Add optional fields if they exist
            const city = contextMap["place"] || contextMap["locality"];
            if (city) locationInfo.city = city;

            const state = contextMap["region"];
            if (state) locationInfo.state = state;

            const district = contextMap["district"];
            if (district) locationInfo.district = district;

            const postalCode = contextMap["postcode"];
            if (postalCode) locationInfo.postalCode = postalCode;

            const country = contextMap["country"];
            if (country) locationInfo.country = country;

            // Add bbox as box property if available
            if (feature.bbox && Array.isArray(feature.bbox) && feature.bbox.length === 4) {
                locationInfo.box = feature.bbox;
            }

            results.push(locationInfo);

        } catch (error) {
            console.error("Failed to process a feature due to an unexpected error. Skipping.", {
                feature: feature,
                error: error,
            });
        }
    }

    return results;
}