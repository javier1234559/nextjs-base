import AppLink from "@/components/common/app-link";
import { Value } from "@/types/property.test";
import { Heart, Send } from "lucide-react";

interface MapPopUpProps {
    property: Value;
    onClose: () => void;
}

export const MapPopUp = ({ property, onClose }: MapPopUpProps) => {
    // const image = property.Media && property.Media.length > 0
    //     ? property.Media[0].MediaURL
    //     : "/placeholder.svg";
    const image = "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8411561/e620c8d2-ba7d-48ab-9da0-3b25e994876d.jpeg";

    const address = `${property.StreetNumber ?? ""} ${property.StreetName ?? ""}, ${property.City ?? ""} ${property.StateOrProvince ?? ""}, ${property.PostalCode ?? ""}`.toUpperCase();
    const mls = property.ListingId || property.ListingKey || "-";
    const status = property.MlsStatus || "Active";
    const price = property.ListPrice;
    const bedrooms = property.BedroomsTotal;
    const bathrooms = property.BathroomsTotalDecimal;
    const livingArea = property.LivingArea;

    return (
        <div className="bg-background rounded-xl shadow-lg overflow-hidden min-w-[280px] max-w-[320px] border border-border">
            {/* Image Container */}
            <div className="relative w-full h-32">
                <AppLink href={`/properties/${property.ListingId}-${address}`} className="w-full h-full">
                    <img
                        src={image}
                        alt="Property"
                        className="w-full h-full object-cover"
                    />
                </AppLink>

                {/* Status Badge */}
                <span className="absolute top-2 left-2 bg-foreground/80 text-background text-xs font-semibold px-2 py-1 rounded-full">
                    {status}
                </span>

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex gap-1">
                    <button className="bg-background/90 hover:bg-background rounded-full p-1.5 shadow-sm transition-colors">
                        <Heart size={14} className="text-foreground" />
                    </button>
                    <button className="bg-background/90 hover:bg-background rounded-full p-1.5 shadow-sm transition-colors">
                        <Send size={14} className="text-foreground" />
                    </button>
                </div>
            </div>

            {/* Property Details */}
            <div className="p-3">
                <div className="text-lg font-bold text-foreground mb-1">
                    ${price?.toLocaleString() ?? "-"}
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                    {bedrooms ?? "-"} bd · {bathrooms ?? "-"} ba · {livingArea?.toLocaleString() ?? "-"} sqft
                </div>
                <div className="text-xs text-foreground mb-1 truncate">
                    {address}
                </div>
                <div className="text-xs text-muted-foreground/80">
                    MLS®: {mls}
                </div>
            </div>
        </div>
    );
};