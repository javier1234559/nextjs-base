'use client'

import { SortByPopover } from "@/feature/idx-ui/components/filter/filter-popover/SortByPopover";
import { FilterHeader } from "@/feature/idx-ui/components/filter/FilterHeader";
import MapView from "@/feature/idx-ui/components/map/MapView";
import PropertyList from "@/feature/idx-ui/components/property/PropertyList";
import { usePropertyList } from "@/feature/idx-ui/hooks/use-property";
import AppPaginationUrl from "@/components/feature/AppPaginationUrl";
import usePaginationUrl from "@/hooks/usePaginationUrl";
import { convertFilterArrayToString } from "@/feature/idx-ui/types/OdataUtils";
import { usePropertyFilterStore } from "@/feature/idx-ui/store/property-store";
import { FilterOp } from "@/feature/idx-ui/types/ODataOperators";
import { useEffect } from "react";

const PropertiesHomeSearchPage = () => {
    const { filters, orderby, isSearch, syncWithUrl } = usePropertyFilterStore();
    const { page, perPage, updateQueryParams } =
        usePaginationUrl({
            defaultPage: 1,
            defaultPerPage: 10,
        });

    // Sync store changes to URL
    useEffect(() => {
        const urlParams = new URLSearchParams();
        urlParams.set("page", page.toString());
        urlParams.set("perPage", perPage.toString());

        // Add filter parameters
        const filterParams = new URLSearchParams();
        if (isSearch) filterParams.set("search", "true");
        if (orderby) filterParams.set("orderby", orderby);

        const filterString = convertFilterArrayToString(filters, isSearch ? FilterOp.Or : FilterOp.And);
        if (filterString) filterParams.set("filters", filterString);

        filterParams.forEach((value, key) => {
            if (value) urlParams.set(key, value);
        });

        syncWithUrl(urlParams);
    }, [filters, orderby, isSearch, page, perPage, syncWithUrl]);

    const { data: properties, isLoading, error } = usePropertyList({
        $top: perPage,
        $skip: (page - 1) * perPage,
        ...(filters.length > 0 && { $filter: convertFilterArrayToString(filters, isSearch ? FilterOp.Or : FilterOp.And) }),
        ...(orderby && { $orderby: orderby }),
        $expand: "Media",
    });

    //filfter to string
    console.log("isSearch", isSearch);
    console.log("filters", filters);
    console.log("FilterOp.Or", FilterOp.Or);
    console.log("FilterOp.And", FilterOp.And);
    console.log("Operator being used:", isSearch ? FilterOp.Or : FilterOp.And);
    console.log("Actual filter string:", convertFilterArrayToString(filters, isSearch ? FilterOp.Or : FilterOp.And));

    //orderby
    // console.log("orderby");
    // console.log(orderby);

    const dataCount = properties?.["@odata.count"] || 0;
    const totalPages = Math.ceil(dataCount / perPage);

    return (
        <div className="container mx-auto px-4 md:px-6 md:py-4">
            <FilterHeader />
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                    <h3 className="mt-4 text-xl font-bold">Real Estate & Homes for Sale</h3>
                    <div className="text-sm text-muted-foreground flex items-center justify-between gap-2">
                        <span className="text-sm text-muted-foreground font-light">{dataCount} results</span>
                        <SortByPopover />
                    </div>
                    <PropertyList properties={properties} isLoading={isLoading} error={error} />
                    {totalPages > 0 && (
                        <div className="w-full flex justify-center">
                            <div className="mt-4">
                                <AppPaginationUrl
                                    currentPage={page}
                                    totalPages={totalPages}
                                    onPageChange={(page) => updateQueryParams({ page })}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-full md:w-1/2 min-h-[900px] mt-4">
                    <MapView properties={properties} isLoading={isLoading} error={error} />
                </div>
            </div>
        </div>
    );
};

export default PropertiesHomeSearchPage;
