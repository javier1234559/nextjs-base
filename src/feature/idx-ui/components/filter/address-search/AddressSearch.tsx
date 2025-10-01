import { Input } from "@/components/ui/input";
import { useMapCompleteAddress } from "@/feature/idx-ui/hooks/use-map";
import { Search } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import SearchResultItem from "./SearchResultItem";
import CurrentLocationSelect from "./CurrentLocationSelect";
import { convertToLocationInfoArray, LocationInfo } from "@/feature/idx-ui/utils";
import debounce from "lodash/debounce";
import { usePropertyFilterStore } from "@/feature/idx-ui/store/property-store";

export default function AddressSearch() {
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Use the store
    const { setLocationFromInfo, setNearLocation, clearFilters, setIsSearch } = usePropertyFilterStore();

    // Create debounced search function
    const debouncedSearch = useMemo(
        () => debounce((value: string) => {
            setSearchQuery(value);
        }, 2000),
        []
    );

    // Use the existing hook with the debounced search query
    const { data: mapData, isLoading: isMapLoading } = useMapCompleteAddress(searchQuery);

    // Handle click outside to close results
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Cleanup debounced function on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleSendSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const currentValue = e.currentTarget.value;
            setSearchQuery(currentValue);
            setShowResults(true);
        }
    };

    const handleSelectAddress = (feature: LocationInfo) => {
        clearFilters();
        setSearch(feature.fullPlaceName || "");
        setLocationFromInfo(feature);
        setShowResults(false);
        setIsSearch(true);
    };

    const handleCurrentLocationSelect = (placeName: string, coordinates: [number, number]) => {
        clearFilters();
        setSearch(placeName);
        setNearLocation(coordinates[0], coordinates[1], 100);
        setShowResults(false);
        setIsSearch(true);
    };

    const handleInputFocus = () => {
        setIsFocused(true);
        // Show current location option when focused
        setShowResults(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value); // Update UI immediately
        debouncedSearch(value); // Debounce the actual search
    };

    const formattedMapboxData = convertToLocationInfoArray(mapData);

    return (
        <div className="relative w-full rounded-lg">
            {/* Blur background */}
            {isFocused && <div className="fixed inset-0 bg-black/50 z-20" />}

            {/* Main Container with Ref */}
            <div ref={searchRef} className="relative z-30">
                {/* Input Container */}
                <div className="z-20 relative bg-background rounded-tr-lg rounded-tl-lg  border border-border/50 focus-within:p-2 transition-all duration-300">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="City, neighborhood, ZIP code..."
                        value={search}
                        onChange={handleInputChange}
                        className="pl-10 w-[280px] border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent outline-none focus-visible:outline-none"
                        onKeyDown={handleSendSearch}
                        onFocus={handleInputFocus}
                    />
                    {isMapLoading && searchQuery.length > 0 && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground"></div>
                        </div>
                    )}
                </div>

                {/* Current Location - Show when focused */}
                {isFocused && (
                    <div className="z-20 absolute left-0 border-t border-border/50 top-full w-full bg-background rounded-b-lg">
                        <CurrentLocationSelect onSelect={handleCurrentLocationSelect} />
                    </div>
                )}

                {/* Search Results */}
                {showResults && mapData?.features && mapData.features.length > 0 && (
                    <div className="z-20 absolute left-0 border-t border-border/50 top-full w-full bg-background max-h-60 overflow-hidden rounded-b-lg">
                        <div className="max-h-80 overflow-y-auto thin-scrollbar">
                            {formattedMapboxData.map((feature: LocationInfo) => (
                                <SearchResultItem
                                    key={feature.fullPlaceName}
                                    feature={feature}
                                    onSelect={handleSelectAddress}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
