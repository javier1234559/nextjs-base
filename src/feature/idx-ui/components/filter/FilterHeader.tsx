import { Button } from "@/components/ui/button";
import { ForSaleFilter } from "./filter-popover/ForSaleFilter";
import { PriceRangeFilter } from "./filter-popover/PriceRangeFilter";
import { PropertyTypeFilter } from "./filter-popover/PropertyTypeFilter";
import { BedsFilter } from "./filter-popover/BedsFilter";
import { BathsFilter } from "./filter-popover/BathsFilter";
import { AllFilterTrigger } from "./modal/AllFilterTrigger";
import { FilterValues } from "./modal/FilterModal";
import AddressSearch from "./address-search/AddressSearch";
import { usePropertyFilterStore } from "@/feature/idx-ui/store/property-store";

export const FilterHeader = () => {
    const { filters, clearFilters } = usePropertyFilterStore();

    const handleSaveSearch = () => {
        console.log("Save search");
    };

    const filterValues: FilterValues = {
        listingType: "sale",
        priceMin: "",
        priceMax: "",
        priceRange: [1000, 50000],
        bedrooms: "any",
        bathrooms: "any",
        propertyTypes: [],
        listingStatus: [],
        squareFeetMin: "",
        squareFeetMax: "",
        lotSizeMin: "",
        lotSizeMax: "",
        yearBuiltMin: "",
        yearBuiltMax: "",
        daysOnMarket: "any",
        moveInDate: null,
    };

    const handleFilterChange = (values: FilterValues) => {
        console.log(values);
    };

    const filterCount = filters.length;

    return (
        <div className="border-b md:px-2 py-4 bg-muted rounded-lg">
            <div className="flex flex-col gap-4 lg:flex-row md:justify-between">
                {/* Search Input - Full Width */}
                <div className="md:w-full flex-1">
                    <AddressSearch />
                </div>

                {/* Filter Buttons - Wrap Naturally */}
                <div className="flex items-center gap-2 flex-wrap lg:flex-nowrap">
                    <ForSaleFilter />
                    <PriceRangeFilter />
                    <PropertyTypeFilter />
                    <BedsFilter />
                    <BathsFilter />
                </div>

                {/* Save Search Button - Full Width */}
                <div className="md:w-full flex justify-end gap-2">
                    <AllFilterTrigger filterValues={filterValues} handleFilterChange={handleFilterChange} />

                    {filterCount > 0 && (
                        <Button size="sm" onClick={clearFilters} variant="outline" className="w-fit">
                            Clear all ({filterCount} filters)
                        </Button>
                    )}
                    <Button size="sm" onClick={handleSaveSearch} className="w-fit">
                        Save search
                    </Button>
                </div>
            </div>
        </div>
    );
};