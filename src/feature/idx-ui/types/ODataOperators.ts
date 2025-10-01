export enum FilterOp {
    Eq = "eq",               // Equal
    Ne = "ne",               // Not equal
    Gt = "gt",               // Greater than
    Ge = "ge",               // Greater than or equal
    Lt = "lt",               // Less than
    Le = "le",               // Less than or equal

    // Logical operators
    And = "and",
    Or = "or",
    Not = "not",

    // String functions
    Contains = "contains",   // contains(Field, 'value')
    StartsWith = "startswith", // startswith(Field, 'prefix')
    EndsWith = "endswith",     // endswith(Field, 'suffix')
    ToLower = "tolower",       // tolower(Field)

    // Date/time functions
    Date = "date",           // date(Field)
    Time = "time",           // time(Field)
    Year = "year",           // year(Field)
    Month = "month",         // month(Field)
    Day = "day",             // day(Field)
    Hour = "hour",           // hour(Field)
    Now = "now",             // now()

    // Geo functions
    GeoDistance = "geo.distance",    // geo.distance(Field, POINT(...)) for near filter
    GeoIntersects = "geo.intersects" // geo.intersects(Field, POLYGON(...)) for box and poly filters
}

export interface FilterExpr {
    field?: string; // Some functions (like geo.distance) may not use a direct field
    op: Exclude<FilterOp, FilterOp.And | FilterOp.Or | FilterOp.Not>;
    value?: string | number | boolean;
    args?: (string | number)[]; // For complex functions like geo.distance or contains
}

export type Filter =
    | FilterExpr
    | {
        and?: Filter[];
        or?: Filter[];
        not?: Filter;
    };
