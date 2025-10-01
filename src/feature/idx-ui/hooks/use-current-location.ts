import { useState } from "react";

interface CurrentLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationError {
  message: string;
  actionUrl?: string; // optional link to guide user
}

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [error, setError] = useState<LocationError | null>(null);

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError({
        message: "Geolocation is not supported by this browser.",
      });
      return null;
    }

    setIsGettingLocation(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 10000, // 10 seconds
        });
      });

      const { latitude, longitude } = position.coords;
      const location = { latitude, longitude };
      setCurrentLocation(location);
      return location;
    } catch (err) {
      const error =
        err instanceof GeolocationPositionError
          ? getGeolocationErrorData(err.code)
          : { message: "Unable to retrieve your location." };
      setError(error);
      return null;
    } finally {
      setIsGettingLocation(false);
    }
  };

  const getGeolocationErrorData = (code: number): LocationError => {
    switch (code) {
      case GeolocationPositionError.PERMISSION_DENIED:
        return {
          message: "Location access denied. Please enable location permissions.",
          actionUrl:
            "https://support.google.com/chrome/answer/142065?hl=en",
        };
      case GeolocationPositionError.POSITION_UNAVAILABLE:
        return {
          message: "Location information is unavailable. Try moving near a window or check GPS.",
        };
      case GeolocationPositionError.TIMEOUT:
        return {
          message: "Location request timed out. Please try again.",
        };
      default:
        return { message: "Unable to retrieve your location." };
    }
  };

  const clearLocation = () => {
    setCurrentLocation(null);
    setError(null);
  };

  return {
    currentLocation,
    isGettingLocation,
    error,
    getCurrentLocation,
    clearLocation,
  };
};
