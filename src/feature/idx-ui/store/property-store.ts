import { create } from "zustand";
import { LocationInfo } from "@/feature/idx-ui/utils";
import { Filter, FilterOp } from "@/feature/idx-ui/types/ODataOperators";
import { ODataPropertyField } from "@/feature/idx-ui/types/ODataTypeField";
import { buildGeoBoxFilter, buildGeoDistanceFilter, buildGeoPolyFilter, buildLocationFilter, convertFilterArrayToString, convertFilterStringToFilterArray } from "@/feature/idx-ui/types/OdataUtils";


interface PropertyFilterState {
    // Core filter state
    filters: Filter[];
    currentLocation: LocationInfo | undefined;
    polygonArea: [number, number][] | undefined;
    orderby: string | undefined;
    status: string | undefined;

    // Filter management actions
    setFilters: (filters: Filter[]) => void;
    addFilter: (filter: Filter) => void;
    removeFilter: (field: string) => void;
    updateFilter: (field: string, filter: Filter) => void;
    replaceFilters: (filters: Filter[]) => void;

    // Location conversion functions
    setLocationFromInfo: (location: LocationInfo) => void;
    setNearLocation: (longitude: number, latitude: number, radiusInMiles: number) => void;
    setBoundingBox: (box: [number, number, number, number]) => void;
    setPolygonArea: (polygon: [number, number][] | undefined) => void;

    // Text-based filter functions
    addCityFilter: (city: string) => void;
    addStateFilter: (state: string) => void;
    addPostalCodeFilter: (postalCode: string) => void;
    addAddressFilter: (address: string) => void;
    addPriceFilter: (minPrice?: number, maxPrice?: number) => void;
    updatePriceFilter: (minPrice?: number, maxPrice?: number) => void;
    removePriceFilter: () => void;
    addBedroomsFilter: (minBedrooms: number) => void;
    addBathroomsFilter: (minBathrooms: number) => void;
    addPropertyTypeFilter: (propertyType: string) => void;
    updatePropertyTypeFilters: (propertyTypes: string[]) => void;
    updateBathroomFilters: (bathrooms: string[]) => void;
    updateBedroomFilters: (bedrooms: string[]) => void;
    addSaleStatusFilter: (status: "Active" | "Pending" | "Closed" | "Withdrawn" | "Expired") => void;

    // Utility actions
    clearFilters: () => void;
    clearLocationFilters: () => void;
    clearTextFilters: () => void;

    // Computed properties
    hasFilters: boolean;
    hasLocationFilters: boolean;
    hasTextFilters: boolean;
    filterCount: number;
    isSearch: boolean;

    // Filter conversion
    getFilterString: () => string;

    // Sort by
    setOrderby: (orderby: string) => void;
    setStatus: (status: string) => void;
    setIsSearch: (isSearch: boolean) => void;

    // URL sync actions
    serializeToUrl: () => string;
    deserializeFromUrl: (urlParams: URLSearchParams) => void;
    syncWithUrl: (urlParams: URLSearchParams) => void;
}

export const usePropertyFilterStore = create<PropertyFilterState>((set, get) => ({
    // Initial state
    filters: [],
    currentLocation: undefined,
    polygonArea: undefined,
    orderby: undefined,
    status: undefined,
    isSearch: false,

    setOrderby: (orderby: string | null) => set({ orderby }),
    setStatus: (status: string | null) => set({ status }),
    setIsSearch: (isSearch: boolean) => {
        set({ isSearch });
        if (!isSearch) {
            set({ filters: [], currentLocation: undefined, status: undefined, orderby: undefined });
        }
    },
    // Filter management actions
    setFilters: (filters: Filter[]) => set({ filters }),

    addFilter: (filter: Filter) =>
        set((state) => ({
            filters: [...state.filters, filter]
        })),

    removeFilter: (field: string) =>
        set((state) => ({
            filters: state.filters.filter(
                (f) => !("field" in f && f.field === field)
            ),
        })),

    updateFilter: (field: string, newFilter: Filter) =>
        set((state) => ({
            filters: state.filters.map((f) =>
                "field" in f && f.field === field ? newFilter : f
            ),
        })),

    replaceFilters: (filters: Filter[]) => set({ filters }),

    // Location conversion functions
    setLocationFromInfo: (location: LocationInfo) => {
        const locationFilters = buildLocationFilter(location);
        set({ filters: locationFilters, currentLocation: location });
    },

    setNearLocation: (longitude: number, latitude: number, radiusInMiles: number) => {
        const geoFilter = buildGeoDistanceFilter(
            ODataPropertyField.Coordinates,
            longitude,
            latitude,
            radiusInMiles
        );
        set({ filters: [geoFilter] });
    },

    setBoundingBox: (box: [number, number, number, number]) => {
        const boxFilter = buildGeoBoxFilter(ODataPropertyField.Coordinates, box);
        set({ filters: [boxFilter] });
    },

    setPolygonArea: (poly: [number, number][] | undefined) => {
        if (poly === undefined) {
            set({ polygonArea: undefined });
            return;
        }
        const polyFilter = buildGeoPolyFilter(ODataPropertyField.Coordinates, poly);
        set({ filters: [polyFilter], polygonArea: poly });
    },

    // Text-based filter functions
    addCityFilter: (city: string) => {
        const cityFilter: Filter = {
            field: ODataPropertyField.City,
            op: FilterOp.Contains,
            value: city
        };
        set((state) => ({ filters: [...state.filters, cityFilter] }));
    },

    addStateFilter: (state: string) => {
        const stateFilter: Filter = {
            field: ODataPropertyField.StateOrProvince,
            op: FilterOp.Contains,
            value: state
        };
        set((state) => ({ filters: [...state.filters, stateFilter] }));
    },

    addPostalCodeFilter: (postalCode: string) => {
        const postalFilter: Filter = {
            field: ODataPropertyField.PostalCode,
            op: FilterOp.Contains,
            value: postalCode
        };
        set((state) => ({ filters: [...state.filters, postalFilter] }));
    },

    addAddressFilter: (address: string) => {
        const addressFilter: Filter = {
            field: ODataPropertyField.UnparsedAddress,
            op: FilterOp.Contains,
            value: address
        };
        set((state) => ({ filters: [...state.filters, addressFilter] }));
    },

    addPriceFilter: (minPrice?: number, maxPrice?: number) => {
        const filters: Filter[] = [];

        if (minPrice !== undefined) {
            filters.push({
                field: ODataPropertyField.ListPrice,
                op: FilterOp.Ge,
                value: minPrice
            });
        }

        if (maxPrice !== undefined) {
            filters.push({
                field: ODataPropertyField.ListPrice,
                op: FilterOp.Le,
                value: maxPrice
            });
        }

        set((state) => ({ filters: [...state.filters, ...filters] }));
    },

    updatePriceFilter: (minPrice?: number, maxPrice?: number) => {
        // Remove existing price filters
        const nonPriceFilters = get().filters.filter(f => {
            if ("field" in f) {
                return f.field !== ODataPropertyField.ListPrice;
            }
            return true;
        });

        // Create new price filters
        const newPriceFilters: Filter[] = [];

        if (minPrice !== undefined) {
            newPriceFilters.push({
                field: ODataPropertyField.ListPrice,
                op: FilterOp.Ge,
                value: minPrice
            });
        }

        if (maxPrice !== undefined) {
            newPriceFilters.push({
                field: ODataPropertyField.ListPrice,
                op: FilterOp.Le,
                value: maxPrice
            });
        }

        // Combine non-price filters with new price filters
        set({ filters: [...nonPriceFilters, ...newPriceFilters] });
    },

    removePriceFilter: () => {
        set((state) => ({
            filters: state.filters.filter(f => {
                if ("field" in f && f.field === ODataPropertyField.ListPrice) {
                    return false;
                }
                return true;
            })
        }));
    },

    addBedroomsFilter: (minBedrooms: number) => {
        const bedroomFilter: Filter = {
            field: ODataPropertyField.BedroomsTotal,
            op: FilterOp.Ge,
            value: minBedrooms
        };
        set((state) => ({ filters: [...state.filters, bedroomFilter] }));
    },

    addBathroomsFilter: (minBathrooms: number) => {
        const bathroomFilter: Filter = {
            field: ODataPropertyField.BathroomsTotalInteger,
            op: FilterOp.Ge,
            value: minBathrooms
        };
        set((state) => ({ filters: [...state.filters, bathroomFilter] }));
    },

    addPropertyTypeFilter: (propertyType: string) => {
        const propertyTypeFilter: Filter = {
            field: ODataPropertyField.PropertyType,
            op: FilterOp.Eq,
            value: propertyType
        };
        set((state) => ({ filters: [...state.filters, propertyTypeFilter] }));
    },

    updatePropertyTypeFilters: (propertyTypes: string[]) => {
        // Remove existing property type filters
        const nonPropertyTypeFilters = get().filters.filter(f => {
            if ("field" in f) {
                return f.field !== ODataPropertyField.PropertyType;
            }
            // Also remove any OR filters that contain PropertyType filters
            if ("or" in f && Array.isArray(f.or)) {
                return !f.or.some(subFilter =>
                    "field" in subFilter && subFilter.field === ODataPropertyField.PropertyType
                );
            }
            return true;
        });

        // Create new property type filters
        if (propertyTypes.length === 0) {
            // No property types selected, just remove existing filters
            set({ filters: nonPropertyTypeFilters });
        } else if (propertyTypes.length === 1) {
            // Single property type - use equals
            const propertyTypeFilter: Filter = {
                field: ODataPropertyField.PropertyType,
                op: FilterOp.Eq,
                value: propertyTypes[0]
            };
            set({ filters: [...nonPropertyTypeFilters, propertyTypeFilter] });
        } else {
            // Multiple property types - use OR logic
            const propertyTypeFilters: Filter[] = propertyTypes.map(type => ({
                field: ODataPropertyField.PropertyType,
                op: FilterOp.Eq,
                value: type
            }));

            // Create OR filter for multiple property types
            const orFilter: Filter = {
                or: propertyTypeFilters
            };

            set({ filters: [...nonPropertyTypeFilters, orFilter] });
        }
    },

    updateBathroomFilters: (bathrooms: string[]) => {
        // Remove existing bathroom filters
        const nonBathroomFilters = get().filters.filter(f => {
            if ("field" in f) {
                return f.field !== ODataPropertyField.BathroomsTotalInteger;
            }
            // Also remove any OR filters that contain bathroom filters
            if ("or" in f && Array.isArray(f.or)) {
                return !f.or.some(subFilter =>
                    "field" in subFilter && subFilter.field === ODataPropertyField.BathroomsTotalInteger
                );
            }
            return true;
        });

        // Create new bathroom filters
        if (bathrooms.length === 0) {
            // No bathrooms selected, just remove existing filters
            set({ filters: nonBathroomFilters });
        } else if (bathrooms.length === 1) {
            // Single bathroom selection
            const bathroomValue = bathrooms[0];
            let bathroomFilter: Filter;

            if (bathroomValue === "5+") {
                // Handle "5+" as greater than or equal to 5
                bathroomFilter = {
                    field: ODataPropertyField.BathroomsTotalInteger,
                    op: FilterOp.Ge,
                    value: 5
                };
            } else {
                // Regular equals filter
                bathroomFilter = {
                    field: ODataPropertyField.BathroomsTotalInteger,
                    op: FilterOp.Eq,
                    value: parseInt(bathroomValue)
                };
            }
            set({ filters: [...nonBathroomFilters, bathroomFilter] });
        } else {
            // Multiple bathrooms - use OR logic
            const bathroomFilters: Filter[] = bathrooms.map(bathroom => {
                if (bathroom === "5+") {
                    return {
                        field: ODataPropertyField.BathroomsTotalInteger,
                        op: FilterOp.Ge,
                        value: 5
                    };
                } else {
                    return {
                        field: ODataPropertyField.BathroomsTotalInteger,
                        op: FilterOp.Eq,
                        value: parseInt(bathroom)
                    };
                }
            });

            // Create OR filter for multiple bathrooms
            const orFilter: Filter = {
                or: bathroomFilters
            };

            set({ filters: [...nonBathroomFilters, orFilter] });
        }
    },

    updateBedroomFilters: (bedrooms: string[]) => {
        // Remove existing bedroom filters
        const nonBedroomFilters = get().filters.filter(f => {
            if ("field" in f) {
                return f.field !== ODataPropertyField.BedroomsTotal;
            }
            // Also remove any OR filters that contain bedroom filters
            if ("or" in f && Array.isArray(f.or)) {
                return !f.or.some(subFilter =>
                    "field" in subFilter && subFilter.field === ODataPropertyField.BedroomsTotal
                );
            }
            return true;
        });

        // Create new bedroom filters
        if (bedrooms.length === 0) {
            // No bedrooms selected, just remove existing filters
            set({ filters: nonBedroomFilters });
        } else if (bedrooms.length === 1) {
            // Single bedroom selection
            const bedroomValue = bedrooms[0];
            let bedroomFilter: Filter;

            if (bedroomValue === "5+") {
                // Handle "5+" as greater than or equal to 5
                bedroomFilter = {
                    field: ODataPropertyField.BedroomsTotal,
                    op: FilterOp.Ge,
                    value: 5
                };
            } else if (bedroomValue === "studio") {
                // Handle "studio" as 0 bedrooms
                bedroomFilter = {
                    field: ODataPropertyField.BedroomsTotal,
                    op: FilterOp.Eq,
                    value: 0
                };
            } else {
                // Regular equals filter
                bedroomFilter = {
                    field: ODataPropertyField.BedroomsTotal,
                    op: FilterOp.Eq,
                    value: parseInt(bedroomValue)
                };
            }
            set({ filters: [...nonBedroomFilters, bedroomFilter] });
        } else {
            // Multiple bedrooms - use OR logic
            const bedroomFilters: Filter[] = bedrooms.map(bedroom => {
                if (bedroom === "5+") {
                    return {
                        field: ODataPropertyField.BedroomsTotal,
                        op: FilterOp.Ge,
                        value: 5
                    };
                } else if (bedroom === "studio") {
                    return {
                        field: ODataPropertyField.BedroomsTotal,
                        op: FilterOp.Eq,
                        value: 0
                    };
                } else {
                    return {
                        field: ODataPropertyField.BedroomsTotal,
                        op: FilterOp.Eq,
                        value: parseInt(bedroom)
                    };
                }
            });

            // Create OR filter for multiple bedrooms
            const orFilter: Filter = {
                or: bedroomFilters
            };

            set({ filters: [...nonBedroomFilters, orFilter] });
        }
    },

    addSaleStatusFilter: (status: "Active" | "Pending" | "Closed" | "Withdrawn" | "Expired") => {
        // First remove any existing status filters
        const currentFilters = get().filters.filter(f => {
            if ("field" in f) {
                return f.field !== ODataPropertyField.StandardStatus;
            }
            return true;
        });

        const statusFilter: Filter = {
            field: ODataPropertyField.StandardStatus,
            op: FilterOp.Eq,
            value: status
        };

        set({
            filters: [...currentFilters, statusFilter],
            status: status
        });
    },

    // Utility actions
    clearFilters: () => set({ filters: [], currentLocation: undefined, status: undefined }),

    clearLocationFilters: () => {
        set((state) => ({
            filters: state.filters.filter(f => {
                if ("op" in f) {
                    return f.op !== FilterOp.GeoDistance && f.op !== FilterOp.GeoIntersects;
                }
                return true;
            }),
            currentLocation: undefined
        }));
    },

    clearTextFilters: () => {
        set((state) => ({
            filters: state.filters.filter(f => {
                if ("op" in f) {
                    return f.op === FilterOp.GeoDistance || f.op === FilterOp.GeoIntersects;
                }
                return true;
            })
        }));
    },

    // Computed properties
    get hasFilters() {
        return get().filters.length > 0;
    },

    get hasLocationFilters() {
        return get().filters.some(f => {
            if ("op" in f) {
                return f.op === FilterOp.GeoDistance || f.op === FilterOp.GeoIntersects;
            }
            return false;
        });
    },

    get hasTextFilters() {
        return get().filters.some(f => {
            if ("op" in f) {
                return f.op === FilterOp.Contains || f.op === FilterOp.Eq || f.op === FilterOp.Ge || f.op === FilterOp.Le;
            }
            return false;
        });
    },

    get filterCount() {
        return get().filters.length;
    },

    // Filter conversion
    getFilterString: () => {
        const { filters } = get();
        if (filters.length === 0) return "";

        return convertFilterArrayToString(filters);
    },

    // URL sync actions
    serializeToUrl: () => {
        const { filters, currentLocation, orderby, status, isSearch } = get();
        const params = new URLSearchParams();

        if (isSearch) {
            params.set("search", "true");
        }
        if (orderby) {
            params.set("orderby", orderby);
        }
        if (status) {
            params.set("status", status);
        }
        if (currentLocation) {
            params.set("lat", currentLocation.coordinates[1]?.toString() || "");
            params.set("lng", currentLocation.coordinates[0]?.toString() || "");
            if (currentLocation.radius) {
                params.set("radius", currentLocation.radius.toString());
            }
        }

        const filterString = get().getFilterString();
        if (filterString) {
            params.set("filters", filterString);
        }

        return params.toString();
    },

    deserializeFromUrl: (urlParams: URLSearchParams) => {
        console.log("Deserializing from URL params:", Object.fromEntries(urlParams.entries()));

        const isSearch = urlParams.get("search") === "true";
        const orderby = urlParams.get("orderby");
        const status = urlParams.get("status");
        const lat = urlParams.get("lat");
        const lng = urlParams.get("lng");
        const radius = urlParams.get("radius");
        const filterString = urlParams.get("filters");

        console.log("Extracted values:", { isSearch, orderby, status, lat, lng, radius, filterString });

        set({
            isSearch,
            orderby,
            status,
            currentLocation: lat && lng ? {
                coordinates: [parseFloat(lng), parseFloat(lat)],
                radius: radius ? parseFloat(radius) : undefined
            } : undefined
        });

        if (filterString) {
            console.log("Parsing filter string:", filterString);
            const parsedFilters = convertFilterStringToFilterArray(filterString);
            console.log("Parsed filters:", parsedFilters);
            set({ filters: parsedFilters });
        } else {
            console.log("No filter string found, clearing filters");
            set({ filters: [] });
        }
    },

    syncWithUrl: (urlParams: URLSearchParams) => {
        const currentUrlParams = new URLSearchParams(window.location.search);
        const newUrlParams = new URLSearchParams(urlParams.toString());

        // Update URL if parameters have changed
        if (currentUrlParams.toString() !== newUrlParams.toString()) {
            window.history.pushState({}, "", `?${newUrlParams.toString()}`);
        }
    }
}));
