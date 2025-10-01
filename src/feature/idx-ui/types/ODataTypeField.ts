export enum ODataPropertyField {
    /** Finished area within the structure that is at or above the surface of the ground. */
    AboveGradeFinishedArea = "AboveGradeFinishedArea",
    /** The source of the measurements for AboveGradeFinishedArea. */
    AboveGradeFinishedAreaSource = "AboveGradeFinishedAreaSource",
    /** The unit of measurement for the area (e.g., Square Feet, Square Meters). */
    AboveGradeFinishedAreaUnits = "AboveGradeFinishedAreaUnits",
    /** The code to gain access through a secured gate. */
    AccessCode = "AccessCode",
    /** A list of accessibility features included in the sale/lease. */
    AccessibilityFeatures = "AccessibilityFeatures",
    /** A list of additional parcel IDs included in the sale. */
    AdditionalParcelsDescription = "AdditionalParcelsDescription",
    /** A boolean indicating if more than one parcel is included in the sale. */
    AdditionalParcelsYN = "AdditionalParcelsYN",
    /** The main or most notable tenants of the shopping center or mall. */
    AnchorsCoTenants = "AnchorsCoTenants",
    /** A list of appliances included in the sale/lease. */
    Appliances = "Appliances",
    /** The approval status of the listing (e.g., Draft, Approved). */
    ApprovalStatus = "ApprovalStatus",
    /** A list describing the architectural style of the structure. */
    ArchitecturalStyle = "ArchitecturalStyle",
    /** Amenities provided by the Home Owners Association. */
    AssociationAmenities = "AssociationAmenities",
    /** The primary association fee. */
    AssociationFee = "AssociationFee",
    /** A secondary association fee, if applicable. */
    AssociationFee2 = "AssociationFee2",
    /** The frequency of the secondary association fee payment. */
    AssociationFee2Frequency = "AssociationFee2Frequency",
    /** The frequency of the primary association fee payment. */
    AssociationFeeFrequency = "AssociationFeeFrequency",
    /** A list of services included with the association fee. */
    AssociationFeeIncludes = "AssociationFeeIncludes",
    /** The name of the primary Home Owners Association. */
    AssociationName = "AssociationName",
    /** The name of the secondary Home Owners Association. */
    AssociationName2 = "AssociationName2",
    /** The phone number of the primary Home Owners Association. */
    AssociationPhone = "AssociationPhone",
    /** The phone number of the secondary Home Owners Association. */
    AssociationPhone2 = "AssociationPhone2",
    /** A boolean indicating if there is a Home Owners Association. */
    AssociationYN = "AssociationYN",
    /** A boolean indicating if the garage is attached to the dwelling. */
    AttachedGarageYN = "AttachedGarageYN",
    /** The date the property will be available for possession/occupation. */
    AvailabilityDate = "AvailabilityDate",
    /** A list of features and information about the basement. */
    Basement = "Basement",
    /** The number of full bathrooms. */
    BathroomsFull = "BathroomsFull",
    /** The number of half bathrooms. */
    BathroomsHalf = "BathroomsHalf",
    /** The number of one-quarter bathrooms. */
    BathroomsOneQuarter = "BathroomsOneQuarter",
    /** The total number of partial bathrooms. */
    BathroomsPartial = "BathroomsPartial",
    /** The number of three-quarter bathrooms. */
    BathroomsThreeQuarter = "BathroomsThreeQuarter",
    /** A decimal representation of the total number of bathrooms. */
    BathroomsTotalDecimal = "BathroomsTotalDecimal",
    /** The simple sum of the number of bathrooms (integer). */
    BathroomsTotalInteger = "BathroomsTotalInteger",
    /** The sum of BedroomsTotal plus other rooms that may be used as bedrooms. */
    BedroomsPossible = "BedroomsPossible",
    /** The total number of bedrooms in the dwelling. */
    BedroomsTotal = "BedroomsTotal",
    /** Finished area within the structure that is below ground. */
    BelowGradeFinishedArea = "BelowGradeFinishedArea",
    /** The source of the measurements for BelowGradeFinishedArea. */
    BelowGradeFinishedAreaSource = "BelowGradeFinishedAreaSource",
    /** The unit of measurement for BelowGradeFinishedArea. */
    BelowGradeFinishedAreaUnits = "BelowGradeFinishedAreaUnits",
    /** The type of mobile home. */
    BodyType = "BodyType",
    /** A timestamp representing when the record was last modified in the Bridge system. */
    BridgeModificationTimestamp = "BridgeModificationTimestamp",
    /** The builder's model name or number for the property. */
    BuilderModel = "BuilderModel",
    /** The name of the builder of the property. */
    BuilderName = "BuilderName",
    /** The source of the building area measurements. */
    BuildingAreaSource = "BuildingAreaSource",
    /** The total area of the structure, including finished and unfinished areas. */
    BuildingAreaTotal = "BuildingAreaTotal",
    /** The unit of measurement for the building area. */
    BuildingAreaUnits = "BuildingAreaUnits",
    /** Features or amenities of the building or business park. */
    BuildingFeatures = "BuildingFeatures",
    /** The name of the building or business park. */
    BuildingName = "BuildingName",
    /** The name of the business being sold. */
    BusinessName = "BusinessName",
    /** The type of business being sold. */
    BusinessType = "BusinessType",
    /** The commission to be paid to the buyer's agency. */
    BuyerAgencyCompensation = "BuyerAgencyCompensation",
    /** The type of compensation for the buyer's agency (e.g., $, %). */
    BuyerAgencyCompensationType = "BuyerAgencyCompensationType",
    /** The city in the property's address. */
    City = "City",
    /** The date the property transaction was closed. */
    CloseDate = "CloseDate",
    /** The final closing price of the property. */
    ClosePrice = "ClosePrice",
    /** A list of common walls shared with other properties. */
    CommonWalls = "CommonWalls",
    /** A list of features available within the community. */
    CommunityFeatures = "CommunityFeatures",
    /** A list describing the cooling features of the property. */
    Cooling = "Cooling",
    /** A boolean indicating if the property has cooling/air conditioning. */
    CoolingYN = "CoolingYN",
    /** Geographical coordinates (longitude, latitude). */
    Coordinates = "Coordinates",
    /** The country abbreviation in the property's address. */
    Country = "Country",
    /** The County, Parish, or other regional authority. */
    CountyOrParish = "CountyOrParish",
    /** The total number of covered parking spaces (garage and carport). */
    CoveredSpaces = "CoveredSpaces",
    /** The number of days the listing has been on the market. */
    DaysOnMarket = "DaysOnMarket",
    /** Driving directions to the property. */
    Directions = "Directions",
    /** The elementary school associated with the property. */
    ElementarySchool = "ElementarySchool",
    /** The elementary school district for the property. */
    ElementarySchoolDistrict = "ElementarySchoolDistrict",
    /** The date the listing agreement will expire. */
    ExpirationDate = "ExpirationDate",
    /** A list of exterior features of the property. */
    ExteriorFeatures = "ExteriorFeatures",
    /** A list of fencing types found at the property. */
    Fencing = "Fencing",
    /** A list of fireplace features. */
    FireplaceFeatures = "FireplaceFeatures",
    /** A boolean indicating if the property has a fireplace. */
    FireplaceYN = "FireplaceYN",
    /** The total number of fireplaces. */
    FireplacesTotal = "FireplacesTotal",
    /** A list of flooring types within the property. */
    Flooring = "Flooring",
    /** The number of garage spaces. */
    GarageSpaces = "GarageSpaces",
    /** A boolean indicating if the property has a garage. */
    GarageYN = "GarageYN",
    /** A list describing the heating features of the property. */
    Heating = "Heating",
    /** A boolean indicating if the property has heating. */
    HeatingYN = "HeatingYN",
    /** The high school associated with the property. */
    HighSchool = "HighSchool",
    /** The high school district for the property. */
    HighSchoolDistrict = "HighSchoolDistrict",
    /** A boolean indicating if a home warranty is included in the sale. */
    HomeWarrantyYN = "HomeWarrantyYN",
    /** A boolean indicating if horses are allowed on the property. */
    HorseYN = "HorseYN",
    /** A boolean indicating if the listing should participate in IDX. */
    IDXParticipationYN = "IDXParticipationYN",
    /** A list of interior features of the property. */
    InteriorFeatures = "InteriorFeatures",
    /** A boolean indicating if the property address can be displayed on the internet. */
    InternetAddressDisplayYN = "InternetAddressDisplayYN",
    /** A boolean indicating if an AVM can be displayed with the listing online. */
    InternetAutomatedValuationDisplayYN = "InternetAutomatedValuationDisplayYN",
    /** A boolean indicating if consumer comments are allowed for the listing online. */
    InternetConsumerCommentYN = "InternetConsumerCommentYN",
    /** A boolean indicating if the entire listing can be displayed online. */
    InternetEntireListingDisplayYN = "InternetEntireListingDisplayYN",
    /** The geographic latitude of the property. */
    Latitude = "Latitude",
    /** The full legal name of the brokerage representing the seller. */
    ListOfficeName = "ListOfficeName",
    /** The current price of the property. */
    ListPrice = "ListPrice",
    /** The lower price for Value Range Pricing. */
    ListPriceLow = "ListPriceLow",
    /** The nature of the agreement between the seller and the listing agent. */
    ListingAgreement = "ListingAgreement",
    /** The effective date of the listing agreement. */
    ListingContractDate = "ListingContractDate",
    /** The well-known identifier for the listing. */
    ListingId = "ListingId",
    /** A unique identifier for the listing record from the immediate source. */
    ListingKey = "ListingKey",
    /** A numeric-only unique identifier for the listing. */
    ListingKeyNumeric = "ListingKeyNumeric",
    /** The total livable area within the structure. */
    LivingArea = "LivingArea",
    /** The source of the living area measurements. */
    LivingAreaSource = "LivingAreaSource",
    /** The unit of measurement for the living area. */
    LivingAreaUnits = "LivingAreaUnits",
    /** A description of the lock box location. */
    LockBoxLocation = "LockBoxLocation",
    /** The serial number of the lockbox. */
    LockBoxSerialNumber = "LockBoxSerialNumber",
    /** The type of lock box. */
    LockBoxType = "LockBoxType",
    /** The geographic longitude of the property. */
    Longitude = "Longitude",
    /** A list of features or descriptions of the lot. */
    LotFeatures = "LotFeatures",
    /** The total acres of the lot. */
    LotSizeAcres = "LotSizeAcres",
    /** The total area of the lot. */
    LotSizeArea = "LotSizeArea",
    /** The dimensions of the lot. */
    LotSizeDimensions = "LotSizeDimensions",
    /** The source of the lot size measurements. */
    LotSizeSource = "LotSizeSource",
    /** The total square footage of the lot. */
    LotSizeSquareFeet = "LotSizeSquareFeet",
    /** The unit of measurement for the lot size. */
    LotSizeUnits = "LotSizeUnits",
    /** The major marketing area name as defined by the MLS. */
    MLSAreaMajor = "MLSAreaMajor",
    /** The minor/sub marketing area name as defined by the MLS. */
    MLSAreaMinor = "MLSAreaMinor",
    /** Local or regional status well known by users (maps to StandardStatus). */
    MlsStatus = "MlsStatus",
    /** The transactional timestamp of the last modification. */
    ModificationTimestamp = "ModificationTimestamp",
    /** A boolean indicating if the property is newly constructed. */
    NewConstructionYN = "NewConstructionYN",
    /** The date the listing was placed on the market. */
    OnMarketDate = "OnMarketDate",
    /** The transactional timestamp of when the listing became on-market. */
    OnMarketTimestamp = "OnMarketTimestamp",
    /** The original price of the property when first listed. */
    OriginalListPrice = "OriginalListPrice",
    /** The total number of parking spaces. */
    ParkingTotal = "ParkingTotal",
    /** A list of features or descriptions of the patio or porch. */
    PatioAndPorchFeatures = "PatioAndPorchFeatures",
    /** The transactional timestamp when the listing status changed to Pending. */
    PendingTimestamp = "PendingTimestamp",
    /** A boolean indicating if pets are allowed at the property. */
    PetsAllowed = "PetsAllowed",
    /** A timestamp of when the photos for this listing were last changed. */
    PhotosChangeTimestamp = "PhotosChangeTimestamp",
    /** The total number of pictures included with the listing. */
    PhotosCount = "PhotosCount",
    /** A list of features or descriptions of the pool. */
    PoolFeatures = "PoolFeatures",
    /** A boolean indicating if the property has a private pool. */
    PoolPrivateYN = "PoolPrivateYN",
    /** The official city per the postal service. */
    PostalCity = "PostalCity",
    /** The postal code (ZIP code) of the property. */
    PostalCode = "PostalCode",
    /** The +4 extension for the postal code. */
    PostalCodePlus4 = "PostalCodePlus4",
    /** The most recent previous list price of the listing. */
    PreviousListPrice = "PreviousListPrice",
    /** The transactional timestamp of the last price change. */
    PriceChangeTimestamp = "PriceChangeTimestamp",
    /** Remarks intended only for members of the listing agent's office. */
    PrivateOfficeRemarks = "PrivateOfficeRemarks",
    /** Remarks containing proprietary information restricted from public view. */
    PrivateRemarks = "PrivateRemarks",
    /** A boolean indicating if the primary structure is attached to another structure. */
    PropertyAttachedYN = "PropertyAttachedYN",
    /** A list describing the condition of the property. */
    PropertyCondition = "PropertyCondition",
    /** A subtype of the property (e.g., SFR, Condo, Townhouse). */
    PropertySubType = "PropertySubType",
    /** The main type of property (e.g., Residential, Lease, Commercial). */
    PropertyType = "PropertyType",
    /** Text remarks that may be displayed to the public. */
    PublicRemarks = "PublicRemarks",
    /** The date a purchase agreement was accepted. */
    PurchaseContractDate = "PurchaseContractDate",
    /** A list of roof types. */
    Roof = "Roof",
    /** The total number of rooms in the dwelling. */
    RoomsTotal = "RoomsTotal",
    /** A list of security features included in the sale/lease. */
    SecurityFeatures = "SecurityFeatures",
    /** A boolean indicating if the community is a senior community. */
    SeniorCommunityYN = "SeniorCommunityYN",
    /** A list describing the sewer or septic features. */
    Sewer = "Sewer",
    /** A list of special conditions for the listing (e.g., Short Sale, REO). */
    SpecialListingConditions = "SpecialListingConditions",
    /** A boolean indicating if the property has a spa. */
    SpaYN = "SpaYN",
    /** The standardized status of the listing (e.g., Active, Pending, Closed). */
    StandardStatus = "StandardStatus",
    /** The state or province abbreviation. */
    StateOrProvince = "StateOrProvince",
    /** The transactional timestamp of the last status change. */
    StatusChangeTimestamp = "StatusChangeTimestamp",
    /** The number of floors/stories in the property. */
    Stories = "Stories",
    /** The total number of floors/stories in the building. */
    StoriesTotal = "StoriesTotal",
    /** The street name portion of the address. */
    StreetName = "StreetName",
    /** The street number portion of the address. */
    StreetNumber = "StreetNumber",
    /** The integer portion of the street number. */
    StreetNumberNumeric = "StreetNumberNumeric",
    /** The suffix portion of the street address (e.g., St, Ave, Rd). */
    StreetSuffix = "StreetSuffix",
    /** The name of the subdivision, neighborhood, or community. */
    SubdivisionName = "SubdivisionName",
    /** Remarks for syndication purposes, which may differ from public remarks. */
    SyndicationRemarks = "SyndicationRemarks",
    /** The annual property tax amount. */
    TaxAnnualAmount = "TaxAnnualAmount",
    /** The year of the last tax assessment. */
    TaxYear = "TaxYear",
    /** The full, unparsed street address as a single string. */
    UnparsedAddress = "UnparsedAddress",
    /** A list of utilities available for the property. */
    Utilities = "Utilities",
    /** The total count of videos or virtual tours. */
    VideosCount = "VideosCount",
    /** A list describing the view from the property. */
    View = "View",
    /** A boolean indicating if the property has a view. */
    ViewYN = "ViewYN",
    /** A URL for a branded virtual tour. */
    VirtualTourURLBranded = "VirtualTourURLBranded",
    /** A URL for an unbranded virtual tour. */
    VirtualTourURLUnbranded = "VirtualTourURLUnbranded",
    /** A list of water sources for the property. */
    WaterSource = "WaterSource",
    /** A list of waterfront features. */
    WaterfrontFeatures = "WaterfrontFeatures",
    /** A boolean indicating if the property is on the waterfront. */
    WaterfrontYN = "WaterfrontYN",
    /** A list of window features. */
    WindowFeatures = "WindowFeatures",
    /** The year the property was built. */
    YearBuilt = "YearBuilt",
    /** The source of the Year Built information. */
    YearBuiltSource = "YearBuiltSource",
    /** The zoning code for the property. */
    Zoning = "Zoning",
    /** A textual description of the zoning. */
    ZoningDescription = "ZoningDescription",
}