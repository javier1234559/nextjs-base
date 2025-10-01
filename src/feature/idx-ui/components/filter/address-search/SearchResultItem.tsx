import { MapPin } from "lucide-react";
import { LocationInfo } from "../../../utils";

interface SearchResultItemProps {
    feature: LocationInfo;
    onSelect: (feature: LocationInfo) => void;
}

export default function SearchResultItem({ feature, onSelect }: SearchResultItemProps) {
    const handleSelect = () => {
        console.log("feature", JSON.stringify(feature, null, 2));
        onSelect(feature);
    };

    return (
        <div
            className="p-3 hover:bg-muted/50 cursor-pointer border-b border-border/50 last:border-b-0 transition-colors"
            onClick={handleSelect}
        >
            <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-muted-foreground flex-shrink-0 bg-muted rounded-full p-1" />
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">
                        {feature.fullPlaceName}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                        {feature.address}
                    </div>
                    {/* {feature.context && feature.context.length > 0 && (
                        <div className="text-xs text-muted-foreground/70 mt-1 flex items-center gap-1">
                            <Navigation className="h-3 w-3" />
                            {getLocationContext(feature.context)}
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}
