import { Property } from "@/types/common";
import { PropertyCard, PropertyCardSkeleton } from "./PropertyCard";

interface PropertyListProps {
  properties: Property;
  isLoading: boolean;
  error: Error | null;
}

const PropertyList = ({ properties, isLoading, error }: PropertyListProps) => {
  if (error) return <PropertyListError error={error} />;

  if (isLoading) return <PropertyListSkeleton />;

  if (properties?.value.length === 0) return <PropertyListEmpty />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-0 md:py-4 overflow-y-auto thin-scrollbar px-2 h-[800px]">
      {properties?.value.map((property) => {
        const key = property.ListingKey || property.ListingId || `${property.StreetNumber}-${property.StreetName}`;
        return <PropertyCard key={key} property={property} />;
      })}
    </div>
  );
};

export default PropertyList;

const PropertyListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:py-4 md:px-0">
      {Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
    </div>
  );
};


const PropertyListEmpty = () => {
  return (
    <div className="p-8 text-center">
      <div className="text-2xl font-bold">No properties found</div>
      <div className="text-sm text-gray-500">Please try again with different filters</div>
    </div>
  );
};


const PropertyListError = ({ error }: { error: Error }) => {
  return (
    <div className="p-8 text-center">
      <div className="text-2xl font-bold">There is an error</div>
      <div className="text-sm text-gray-500">Please try again later</div>
    </div>
  );
};