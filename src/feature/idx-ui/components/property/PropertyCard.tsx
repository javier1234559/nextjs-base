import { Heart, Send } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import AppLink from "@/components/common/app-link";
import { Value } from "@/types/common";

interface PropertyCardProps {
  property: Value;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  // const image = property.Media && property.Media.length > 0 ? property.Media[0].MediaURL : "/placeholder.svg";
  const image = "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8411561/e620c8d2-ba7d-48ab-9da0-3b25e994876d.jpeg";
  const address = [
    property.StreetNumber,
    property.StreetName,
    property.City,
    property.StateOrProvince
  ]
    .filter(Boolean)
    .join(" ")
    .toUpperCase() +
    (property.PostalCode ? `, ${property.PostalCode}`.toUpperCase() : "");

  const mls = property.ListingId || property.ListingKey || "-";
  const status = property.MlsStatus || "Active";


  return (
    <div className="relative group cursor-pointer">
      {/* Image Container with 16:8 aspect ratio */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
        <AppLink href={`/properties/${property.ListingId}-${address}`} className="w-full h-full">
          <img src={image} alt="Property" className="w-full h-full object-cover" />
        </AppLink>

        {/* Status Badge */}
        <span className="absolute top-3 left-3 bg-foreground/80 text-background text-xs font-semibold px-3 py-1 rounded-full">
          {status}
        </span>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="bg-background/90 hover:bg-background rounded-full p-2 shadow-sm transition-colors">
            <Heart size={18} className="text-foreground" />
          </button>
          <button className="bg-background/90 hover:bg-background rounded-full p-2 shadow-sm transition-colors">
            <Send size={18} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Property Details */}
      <div className="mt-3 p-1">
        <div className="text-lg font-bold text-foreground">
          ${property.ListPrice?.toLocaleString()}
        </div>
        <div className="text-md text-muted-foreground mb-1">
          {property.BedroomsTotal ?? "-"} bd · {property.BathroomsTotalDecimal ?? "-"} ba · {property.LivingArea?.toLocaleString() ?? "-"} sqft
        </div>
        <div className="text-sm text-foreground mb-1 truncate">
          {address}
        </div>
        <div className="text-sm text-muted-foreground/80">
          MLS®: {mls}
        </div>
      </div>
    </div>
  );
};

export const PropertyCardSkeleton = () => (
  <div className="relative">
    <div className="w-full aspect-[16/8] rounded-2xl overflow-hidden">
      <Skeleton className="w-full h-full" />
      <span className="absolute top-3 left-3">
        <Skeleton className="w-14 h-6 rounded-full" />
      </span>
      <div className="absolute top-3 right-3 flex gap-2">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
    <div className="mt-3">
      <Skeleton className="w-28 h-7 mb-2" />
      <Skeleton className="w-24 h-4 mb-2" />
      <Skeleton className="w-40 h-3 mb-1" />
      <Skeleton className="w-24 h-3" />
    </div>
  </div>
);

export default PropertyCard; 