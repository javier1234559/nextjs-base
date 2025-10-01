import { MapPin } from "lucide-react";
import { useCurrentLocation } from "../../../hooks/use-current-location";
import { convertCurrentLocationToLocationInfo } from "../../../utils";

interface CurrentLocationSelectProps {
    onSelect?: (placeName: string, coordinates: [number, number]) => void;
}

export default function CurrentLocationSelect({ onSelect }: CurrentLocationSelectProps) {
    const { currentLocation, isGettingLocation, error, getCurrentLocation } = useCurrentLocation();

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!currentLocation && !isGettingLocation) {
            // If no location and not currently getting it, start the process
            const location = await getCurrentLocation();
            if (location) {
                // Convert to LocationInfo format for consistency
                const locationInfo = convertCurrentLocationToLocationInfo(
                    location.latitude,
                    location.longitude,
                    "Current Location",
                );
                // Call onSelect after location is retrieved
                onSelect?.(locationInfo.fullPlaceName || "Current Location", locationInfo.coordinates);
            }
        } else if (currentLocation) {
            // Convert to LocationInfo format for consistency
            const locationInfo = convertCurrentLocationToLocationInfo(
                currentLocation.latitude,
                currentLocation.longitude,
                "Current Location",
            );
            // If location already exists, select it immediately
            onSelect?.(locationInfo.fullPlaceName || "Current Location", locationInfo.coordinates);
        }
        // If isGettingLocation is true, do nothing (wait for it to complete)
    };

    return (
        <div
            className="flex items-center gap-3 px-4 py-3 hover:bg-accent cursor-pointer transition-colors"
            onClick={handleClick}
        >
            <MapPin className="h-4 w-4 text-primary" />
            <div className="flex-1">
                <div className="font-medium">
                    {currentLocation ? "Current Location" : "Get Current Location"}
                </div>
                {currentLocation && (
                    <div className="text-sm text-muted-foreground">
                        {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
                    </div>
                )}
                {isGettingLocation && (
                    <div className="text-sm text-muted-foreground">
                        Getting location...
                    </div>
                )}
                {error && (
                    <div className="text-sm text-destructive">
                        {error.message}
                    </div>
                )}
            </div>
        </div>
    );
}
