import { LocationInfo } from "../utils";
import { Filter, FilterOp } from "./ODataOperators";
import { ODataPropertyField } from "./ODataTypeField";

function formatValue(v: string | number | boolean): string {
    if (typeof v === "string") return `'${v.replace(/'/g, "''")}'`;
    return v.toString();
}

function buildFilter(filter: Filter): string {
    if ("field" in filter) {
        switch (filter.op) {
            case FilterOp.Contains:
            case FilterOp.StartsWith:
            case FilterOp.EndsWith:
                return `${filter.op}(${filter.field}, ${formatValue(filter.value)})`;

            case FilterOp.ToLower:
            case FilterOp.Date:
            case FilterOp.Time:
            case FilterOp.Year:
            case FilterOp.Month:
            case FilterOp.Day:
            case FilterOp.Hour:
                return `${filter.op}(${filter.field}) ${FilterOp.Eq} ${formatValue(
                    filter.value
                )}`;

            case FilterOp.GeoDistance:
                // Format: geo.distance(Coordinates, POINT(lng lat)) lt radius
                if (!filter.args || filter.args.length < 3) {
                    throw new Error("geo.distance requires [lng, lat, radius]");
                }
                const [lng, lat, radius] = filter.args;
                return `geo.distance(${filter.field}, POINT(${lng} ${lat})) lt ${radius}`;

            case FilterOp.GeoIntersects:
                // Format: geo.intersects(Coordinates, POLYGON(...))
                if (!filter.args) throw new Error("geo.intersects requires args");
                return `geo.intersects(${filter.field}, ${filter.args[0]})`;

            default:
                return `${filter.field} ${filter.op} ${formatValue(filter.value)}`;
        }
    }

    // Handle logical operators
    if ("and" in filter && filter.and) {
        return `(${filter.and.map(buildFilter).join(` ${FilterOp.And} `)})`;
    }
    if ("or" in filter && filter.or) {
        return `(${filter.or.map(buildFilter).join(` ${FilterOp.Or} `)})`;
    }
    if ("not" in filter && filter.not) {
        return `not(${buildFilter(filter.not)})`;
    }

    throw new Error("Invalid filter");
}

// ✅ Converts an array of filters to one combined string
export function convertFilterArrayToString(filters: Filter[], operator?: FilterOp): string {
    if (!filters || filters.length === 0) return "";
    if (filters.length === 1) return buildFilter(filters[0]);
    return `(${filters.map(buildFilter).join(` ${operator || FilterOp.And} `)})`;
}

// ✅ Converts a filter string back to an array of Filter objects
export function convertFilterStringToFilterArray(filterString: string): Filter[] {
    if (!filterString || filterString.trim() === "") return [];

    try {
        console.log("Parsing filter string:", filterString);

        // Simple parser for basic filter patterns
        const filters: Filter[] = [];

        // Split by AND/OR operators (simplified approach)
        const parts = filterString.split(/\s+(and|or)\s+/i);

        for (let i = 0; i < parts.length; i += 2) {
            const filterPart = parts[i].trim();
            const operator = parts[i + 1]?.toLowerCase();

            if (filterPart) {
                const filter = parseFilterPart(filterPart);
                if (filter) {
                    filters.push(filter);
                }
            }
        }

        // If no AND/OR found, try to parse as single filter
        if (filters.length === 0) {
            const filter = parseFilterPart(filterString);
            if (filter) {
                filters.push(filter);
            }
        }

        console.log("Parsed filters:", filters);
        return filters;
    } catch (error) {
        console.error("Error parsing filter string:", error);
        return [];
    }
}

// Helper function to parse individual filter parts
function parseFilterPart(filterPart: string): Filter | null {
    // Remove outer parentheses
    const cleanPart = filterPart.replace(/^\(|\)$/g, '');

    // Parse different filter patterns

    // PropertyType eq 'Residential'
    const propertyTypeMatch = cleanPart.match(/PropertyType\s+(eq|ne)\s+'([^']+)'/i);
    if (propertyTypeMatch) {
        return {
            field: ODataPropertyField.PropertyType,
            op: propertyTypeMatch[1].toLowerCase() === 'eq' ? FilterOp.Eq : FilterOp.Ne,
            value: propertyTypeMatch[2]
        };
    }

    // ListPrice ge 200000
    const priceMatch = cleanPart.match(/ListPrice\s+(ge|le|eq|gt|lt)\s+(\d+)/i);
    if (priceMatch) {
        const op = priceMatch[1].toLowerCase();
        let filterOp: FilterOp;
        switch (op) {
            case 'ge': filterOp = FilterOp.Ge; break;
            case 'le': filterOp = FilterOp.Le; break;
            case 'eq': filterOp = FilterOp.Eq; break;
            case 'gt': filterOp = FilterOp.Gt; break;
            default: filterOp = FilterOp.Lt; break;
        }
        return {
            field: ODataPropertyField.ListPrice,
            op: filterOp,
            value: parseInt(priceMatch[2])
        };
    }

    // BathroomsTotalInteger eq 2
    const bathroomsMatch = cleanPart.match(/BathroomsTotalInteger\s+(eq|ge)\s+(\d+)/i);
    if (bathroomsMatch) {
        const op = bathroomsMatch[1].toLowerCase();
        return {
            field: ODataPropertyField.BathroomsTotalInteger,
            op: op === 'eq' ? FilterOp.Eq : FilterOp.Ge,
            value: parseInt(bathroomsMatch[2])
        };
    }

    // BedroomsTotal eq 2
    const bedroomsMatch = cleanPart.match(/BedroomsTotal\s+(eq|ge)\s+(\d+)/i);
    if (bedroomsMatch) {
        const op = bedroomsMatch[1].toLowerCase();
        return {
            field: ODataPropertyField.BedroomsTotal,
            op: op === 'eq' ? FilterOp.Eq : FilterOp.Ge,
            value: parseInt(bedroomsMatch[2])
        };
    }

    // StandardStatus eq 'Active'
    const statusMatch = cleanPart.match(/StandardStatus\s+eq\s+'([^']+)'/i);
    if (statusMatch) {
        return {
            field: ODataPropertyField.StandardStatus,
            op: FilterOp.Eq,
            value: statusMatch[1]
        };
    }

    // City contains 'Los Angeles'
    const cityMatch = cleanPart.match(/City\s+contains\s+'([^']+)'/i);
    if (cityMatch) {
        return {
            field: ODataPropertyField.City,
            op: FilterOp.Contains,
            value: cityMatch[1]
        };
    }

    // StateOrProvince contains 'CA'
    const stateMatch = cleanPart.match(/StateOrProvince\s+contains\s+'([^']+)'/i);
    if (stateMatch) {
        return {
            field: ODataPropertyField.StateOrProvince,
            op: FilterOp.Contains,
            value: stateMatch[1]
        };
    }

    // UnparsedAddress contains 'address'
    const addressMatch = cleanPart.match(/UnparsedAddress\s+contains\s+'([^']+)'/i);
    if (addressMatch) {
        return {
            field: ODataPropertyField.UnparsedAddress,
            op: FilterOp.Contains,
            value: addressMatch[1]
        };
    }

    // geo.distance(Coordinates, POINT(-118.2437 34.0522)) lt 10
    const geoDistanceMatch = cleanPart.match(/geo\.distance\(Coordinates,\s+POINT\(([^)]+)\)\)\s+lt\s+(\d+)/i);
    if (geoDistanceMatch) {
        const [lng, lat] = geoDistanceMatch[1].split(/\s+/).map(Number);
        return {
            field: ODataPropertyField.Coordinates,
            op: FilterOp.GeoDistance,
            args: [lng, lat, parseInt(geoDistanceMatch[2])]
        };
    }

    console.warn("Could not parse filter part:", cleanPart);
    return null;
}

export function buildLocationFilter(feature: LocationInfo): Filter[] {
    const filters: Filter[] = [];

    // Text-based filters using contains for flexible matching
    // if (feature.city) {
    //     filters.push({
    //         field: ODataPropertyField.City,
    //         op: FilterOp.Contains,
    //         value: feature.city,
    //     });
    // }

    if (feature.state) {
        filters.push({
            field: ODataPropertyField.StateOrProvince,
            op: FilterOp.Contains,
            value: feature.state,
        });
    }

    if (feature.postalCode) {
        filters.push({
            field: ODataPropertyField.PostalCode,
            op: FilterOp.Contains,
            value: feature.postalCode,
        });
    }

    if (feature.address) {
        filters.push({
            field: ODataPropertyField.UnparsedAddress,
            op: FilterOp.Contains,
            value: feature.address,
        });
    }

    // Geo-based filters using OData standard geo functions
    if (feature.near && feature.radius) {
        // Use geo.distance for near coordinates with radius
        // Format: geo.distance(Coordinates, POINT(lng lat)) lt radius
        filters.push({
            field: ODataPropertyField.Coordinates,
            op: FilterOp.GeoDistance,
            args: [feature.near[0], feature.near[1], feature.radius]
        });
    }

    if (feature.box) {
        // Use geo.intersects for bounding box
        const filter = buildGeoBoxFilter(ODataPropertyField.Coordinates, feature.box);
        filters.push(filter);
    }

    if (feature.poly && feature.poly.length > 2) {
        // Use geo.intersects for polygon
        const filter = buildGeoPolyFilter(ODataPropertyField.Coordinates, feature.poly);
        filters.push(filter);
    }

    return filters;
}

// Helper function to build geo distance filter
export function buildGeoDistanceFilter(
    field: string,
    longitude: number,
    latitude: number,
    radiusInMiles: number
): Filter {
    return {
        field,
        op: FilterOp.GeoDistance,
        args: [longitude, latitude, radiusInMiles]
    };
}

// Helper function to build geo intersects filter for bounding box
export function buildGeoBoxFilter(
    field: string,
    box: [number, number, number, number]
): Filter {
    const [lng1, lat1, lng2, lat2] = box;
    const polygon = `POLYGON((${lng1} ${lat1}, ${lng2} ${lat1}, ${lng2} ${lat2}, ${lng1} ${lat2}, ${lng1} ${lat1}))`;

    return {
        field,
        op: FilterOp.GeoIntersects,
        args: [polygon]
    };
}

// Helper function to build geo intersects filter for polygon
export function buildGeoPolyFilter(
    field: string,
    poly: [number, number][]
): Filter {
    if (poly.length < 3) {
        throw new Error("Polygon must have at least 3 points");
    }

    const polygonPoints = poly.map(p => `${p[0]} ${p[1]}`).join(', ');
    const polygon = `POLYGON((${polygonPoints}))`;

    return {
        field,
        op: FilterOp.GeoIntersects,
        args: [polygon]
    };
}
