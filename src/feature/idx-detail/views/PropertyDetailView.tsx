'use client'

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calculator, Calendar, Ruler, MapPin, Square, Bath, Bed, FileWarning, CircleAlert, Home, Car, TreePine, GraduationCap, Info } from "lucide-react";
import ImageGallery from "../components/image-gallery";
import { AgentContact } from "../form/contact-form";
import { PropertyDetail } from "../types/PropertyDetail";
import { formatNumber, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import MapLocation from "@/feature/idx-ui/components/map/MapLocation";
import MapFeaturesDemo from "@/feature/idx-ui/components/map/MapFeaturesDemo";

interface PropertyDetailViewProps {
    data: PropertyDetail | undefined;
    isLoading: boolean;
    error: Error | null;
}

// Transform API data to comprehensive property information
const transformPropertyData = (data: PropertyDetail) => {
    const address = [
        data.StreetNumber,
        data.StreetName,
        data.City,
        data.StateOrProvince
    ]
        .filter(Boolean)
        .join(" ")
        .toUpperCase() +
        (data.PostalCode ? `, ${data.PostalCode}`.toUpperCase() : "");

    return {
        // Basic Info
        id: data.ListingId || "Unknown",
        price: data.ListPrice || 0,
        address,
        city: data.City || "",
        zipCode: data.PostalCode || "",
        beds: data.BedroomsTotal || 0,
        baths: data.BathroomsTotalInteger || 0,
        sqft: data.LivingArea || 0,
        yearBuilt: data.YearBuilt || 0,
        pricePerSqft: data.ListPrice && data.LivingArea ? data.ListPrice / data.LivingArea : 0,
        monthlyPayment: data.ListPrice ? Math.round((data.ListPrice * 0.06) / 12) : 0,

        // Images
        // images: data.Media?.map(media => media.MediaURL) || [
        //     "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8407837/0adbf423-17fe-4118-a90a-bc78bc65b567.jpeg",
        //     "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8407837/194a0082-cb40-4253-b7fc-05017764af56.jpeg",
        //     "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8407837/198d0786-8a25-4c83-afff-a45dbfeb0f8d.jpeg",
        //     "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8407837/c24eaa1a-ebbf-4751-b02d-25ec332214eb.jpeg",
        //     "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8407837/169215ef-4127-46b2-b375-47d5b43d40aa.jpeg",
        //     "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8407837/6ff7c61a-ce3c-48ba-9d91-790b97a4c4d8.jpeg",
        //     "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8407837/54f15787-ebc1-43e6-85de-3f3db48b0d41.jpeg"
        // ],

        images: [
            "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8411561/e620c8d2-ba7d-48ab-9da0-3b25e994876d.jpeg",
            "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8407837/0adbf423-17fe-4118-a90a-bc78bc65b567.jpeg",
            "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8407837/194a0082-cb40-4253-b7fc-05017764af56.jpeg",
            "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8407837/198d0786-8a25-4c83-afff-a45dbfeb0f8d.jpeg",
            "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8407837/c24eaa1a-ebbf-4751-b02d-25ec332214eb.jpeg",
            "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8407837/169215ef-4127-46b2-b375-47d5b43d40aa.jpeg",
            "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8407837/6ff7c61a-ce3c-48ba-9d91-790b97a4c4d8.jpeg",
            "https://dlajgvw9htjpb.cloudfront.net/mlsgrid/mfrmls/MFRTB8407837/54f15787-ebc1-43e6-85de-3f3db48b0d41.jpeg"

        ],
        // Agent Info
        agent: {
            name: "Cyndi Kaszirer",
            email: "ckaszirer@smithandassociates.com",
            phone: "(813) 743-2847",
            avatar: "/cindy-agent.jpeg",
        },

        // About Section
        about: {
            description: data.PublicRemarks || "No description available for this property.",
            lotSize: data.LotSizeAcres ? `${data.LotSizeAcres} acres` : "N/A",
            propertyType: data.PropertySubType || data.PropertyType || "",
            status: data.MlsStatus || "",
            daysOnMarket: data.DaysOnMarket || 0,
        },

        // Features Section
        features: {
            mlsNumber: data.ListingId || "N/A",
            price: formatPrice(data.ListPrice),
            bedrooms: data.BedroomsTotal || 0,
            bathrooms: data.BathroomsTotalInteger || 0,
            fullBaths: data.BathroomsFull || 0,
            halfBaths: data.BathroomsHalf || 0,
            squareFootage: data.LivingArea || 0,
            acres: data.LotSizeAcres || 0,
            yearBuilt: data.YearBuilt || 0,
            type: data.PropertyType || "",
            subType: data.PropertySubType || "",
            style: data.ArchitecturalStyle?.join(", ") || "Custom",
            status: data.MlsStatus || "",
        },

        // Community Information
        community: {
            address: data.UnparsedAddress || address,
            area: data.City || "",
            subdivision: data.SubdivisionName || "N/A",
            city: data.City || "",
            county: data.CountyOrParish || "",
            state: data.StateOrProvince || "",
            zipCode: data.PostalCode || "",
        },

        // Amenities Section
        amenities: {
            parking: data.ParkingFeatures?.join(", ") || "",
            garages: data.GarageSpaces || 0,
            isWaterfront: data.WaterfrontYN || false,
            hasPool: data.PoolPrivateYN || false,
            seniorCommunity: data.SeniorCommunityYN || false,
        },

        // Interior Section
        interior: {
            features: data.InteriorFeatures?.join(", ") || "",
            appliances: data.Appliances?.join(", ") || "",
            heating: data.Heating?.join(", ") || "",
            cooling: data.Cooling?.join(", ") || "",
            fireplace: data.FireplaceYN ? "Yes" : "No",
            fireplaces: data.FireplaceFeatures?.join(", ") || "",
            stories: data.StoriesTotal || 1,
            furnished: data.Furnished || "",
        },

        // Exterior Section
        exterior: {
            features: data.ExteriorFeatures?.join(", ") || "",
            lotDescription: data.LotFeatures?.join(", ") || "",
            roof: data.Roof?.join(", ") || "",
            foundation: data.FoundationDetails?.join(", ") || "",
        },

        // School Information
        schools: {
            elementary: data.ElementarySchool || "N/A",
            middle: data.MiddleOrJuniorSchool || "N/A",
            high: data.HighSchool || "N/A",
            elementaryDistrict: data.ElementarySchoolDistrict || "",
            middleDistrict: data.MiddleOrJuniorSchoolDistrict || "",
            highDistrict: data.HighSchoolDistrict || "",
        },

        // Additional Information
        additional: {
            dateListed: data.OnMarketDate ? new Date(data.OnMarketDate).toLocaleDateString() : "N/A",
            daysOnMarket: data.DaysOnMarket || 0,
            zoning: data.Zoning || "N/A",
            floodZone: data.ZoningDescription || "N/A",
            foreclosure: "No",
            shortSale: "No",
            reoBankOwned: "No",
            hoaFees: data.AssociationFee ? `$${data.AssociationFee}` : "N/A",
            hoaFrequency: data.AssociationFeeFrequency || "N/A",
        },

        // History Section
        history: {
            listPrice: formatPrice(data.ListPrice),
            previousListPrice: data.PreviousListPrice ? formatPrice(data.PreviousListPrice) : null,
            daysOnMarket: data.DaysOnMarket || 0,
            status: data.MlsStatus || "",
            originalListPrice: data.OriginalListPrice ? formatPrice(data.OriginalListPrice) : null,
        },

        map: {
            lat: data.Latitude,
            lng: data.Longitude,
        },
    };
};

export default function PropertyDetailView({ data, isLoading, error }: PropertyDetailViewProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    if (isLoading) {
        return <PropertyDetailSkeleton />;
    }

    if (error) {
        return <PropertyDetailError error={error} />;
    }

    if (!data) {
        return <PropertyDetailNoData />;
    }

    const propertyData = transformPropertyData(data);

    const details = [
        {
            icon: Calculator,
            label: "Price per sqft",
            value: `$${propertyData.pricePerSqft.toFixed(2)}`,
        },
        {
            icon: Calendar,
            label: "Built in",
            value: propertyData.yearBuilt,
        },
        {
            icon: Ruler,
            label: "Property size",
            value: `${formatNumber(propertyData.sqft)} sqft`,
        },
    ];

    return (
        <div>
            {/* Page Content */}
            <div className="py-8">
                <ImageGallery
                    images={propertyData.images}
                    selectedIndex={selectedImageIndex}
                    onImageSelect={setSelectedImageIndex}
                    onLike={() => setIsLiked((prev) => !prev)}
                    isLiked={isLiked}
                />
            </div>

            <div className="pb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Right Section (Agent Contact) - order-1 on small screens, order-2 on lg */}
                <aside className="order-1 lg:order-2 lg:col-span-1">
                    <AgentContact agent={propertyData.agent} />
                </aside>

                {/* Left Section */}
                <div className="order-2 lg:order-1 lg:col-span-2 space-y-24">
                    {/* Property Stats */}
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            {/* Beds */}
                            <div className="flex items-center gap-1">
                                <Bed className="w-4 h-4" />
                                <span className="font-bold text-foreground">Beds:</span>
                                <span className="text-muted-foreground font-normal">{propertyData.beds}</span>
                            </div>
                            {/* Baths */}
                            <div className="flex items-center gap-1">
                                <Bath className="w-4 h-4" />
                                <span className="font-bold text-foreground">Baths:</span>
                                <span className="text-muted-foreground font-normal">{propertyData.baths}</span>
                            </div>
                            {/* Sqft */}
                            <div className="flex items-center gap-1">
                                <Square className="w-4 h-4" />
                                <span className="font-bold text-foreground">Sqft:</span>
                                <span className="text-muted-foreground font-normal">{formatNumber(propertyData.sqft)}</span>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold text-foreground mb-2">${propertyData.price.toLocaleString()}</h1>
                            <p className="text-xl text-foreground font-bold mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                {propertyData.address}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calculator className="w-4 h-4" />
                                <span>
                                    Est. payment: <strong>${formatNumber(propertyData.monthlyPayment)}/mo</strong>
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xs sm:max-w-none">
                            {details.map(({ icon: Icon, label, value }) => (
                                <Card
                                    key={label}
                                    className="hover:shadow-sm transition-shadow border border-border w-full h-28"
                                >
                                    <CardContent className="p-3 flex flex-col items-start justify-center h-full">
                                        <Icon className="w-5 h-5 text-muted-foreground mb-4" />
                                        <p className="text-xs font-bold text-foreground text-start leading-tight text-wrap">{label}</p>
                                        <p className="text-sm text-muted-foreground text-start leading-tight">{value}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* About Section */}
                    <section id="overview" className="space-y-8">
                        <h2 className="text-2xl font-semibold mb-6 text-foreground">About {propertyData.address}</h2>
                        <div className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed text-wrap">
                                {propertyData.about.description}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-2">
                                    <Home className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">Lot Size: <strong className="text-foreground">{propertyData.about.lotSize}</strong></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Info className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">Type: <strong className="text-foreground">{propertyData.about.propertyType}</strong></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">Days on Market: <strong className="text-foreground">{propertyData.about.daysOnMarket}</strong></span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <Info className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">Status: <strong className="text-foreground">{propertyData.about.status}</strong></span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section id="facts-features" className="space-y-8">
                        <h2 className="text-2xl font-semibold mb-6 text-foreground">Features of {propertyData.address}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">MLS® #</span>
                                    <span className="text-muted-foreground text-right">{propertyData.features.mlsNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Price</span>
                                    <span className="text-muted-foreground text-right">{propertyData.features.price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Bedrooms</span>
                                    <span className="text-muted-foreground text-right">{propertyData.features.bedrooms}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Bathrooms</span>
                                    <span className="text-muted-foreground text-right">{propertyData.features.bathrooms}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Full Baths</span>
                                    <span className="text-muted-foreground text-right">{propertyData.features.fullBaths}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Half Baths</span>
                                    <span className="text-muted-foreground text-right">{propertyData.features.halfBaths}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Square Footage</span>
                                    <span className="text-muted-foreground text-right">{formatNumber(propertyData.features.squareFootage)}</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Acres</span>
                                    <span className="text-muted-foreground text-right">{propertyData.features.acres}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Year Built</span>
                                    <span className="text-muted-foreground text-right">{propertyData.features.yearBuilt}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Type</span>
                                    <span className="text-muted-foreground text-right">{propertyData.features.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Sub Type</span>
                                    <span className="text-muted-foreground text-right">{propertyData.features.subType}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Style</span>
                                    <span className="text-muted-foreground text-right">{propertyData.features.style}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Status</span>
                                    <span className="text-muted-foreground text-right">{propertyData.features.status}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Community Information */}
                    <section id="community" className="space-y-8">
                        <h2 className="text-2xl font-semibold mb-6 text-foreground">Community Information: {propertyData.community.city}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Address</span>
                                    <span className="capitalize text-muted-foreground text-right">{propertyData.community.address}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Area</span>
                                    <span className="text-muted-foreground text-right">{propertyData.community.area}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Subdivision</span>
                                    <span className="text-muted-foreground text-right">{propertyData.community.subdivision}</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">City</span>
                                    <span className="text-muted-foreground text-right">{propertyData.community.city}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">County</span>
                                    <span className="text-muted-foreground text-right">{propertyData.community.county}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">State</span>
                                    <span className="text-muted-foreground text-right">{propertyData.community.state}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Zip Code</span>
                                    <span className="text-muted-foreground text-right">{propertyData.community.zipCode}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Amenities Section */}
                    <section id="amenities" className="space-y-8">
                        <h2 className="text-2xl font-semibold mb-6 text-foreground">Amenities of {propertyData.address}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Parking</span>
                                    <span className="capitalize text-muted-foreground">{propertyData.amenities.parking}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground"># of Garages</span>
                                    <span className="text-muted-foreground text-right">{propertyData.amenities.garages}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Is Waterfront</span>
                                    <span className="text-muted-foreground text-right">{propertyData.amenities.isWaterfront ? "Yes" : "No"}</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Has Pool</span>
                                    <span className="text-muted-foreground text-right   ">{propertyData.amenities.hasPool ? "Yes" : "No"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Senior Community</span>
                                    <span className="text-muted-foreground text-right">{propertyData.amenities.seniorCommunity ? "Yes" : "No"}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Interior Section */}
                    <section id="interior" className="space-y-8">
                        <h2 className="text-2xl font-semibold mb-6 text-foreground">Interior of {propertyData.address}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2">Interior Features</h3>
                                    <p className="text-right capitalize text-muted-foreground">{propertyData.interior.features || "N/A"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2">Appliances</h3>
                                    <p className="text-muted-foreground text-right">{propertyData.interior.appliances || "N/A"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2">Heating</h3>
                                    <p className="text-muted-foreground text-right">{propertyData.interior.heating || "N/A"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2">Fireplaces</h3>
                                    <p className="text-muted-foreground text-right">{propertyData.interior.fireplaces || "N/A"}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2">Cooling</h3>
                                    <p className="text-muted-foreground text-right">{propertyData.interior.cooling || "N/A"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2">Fireplace</h3>
                                    <p className="text-muted-foreground text-right">{propertyData.interior.fireplace}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2"># of Stories</h3>
                                    <p className="text-muted-foreground text-right">{propertyData.interior.stories}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2">Furnished</h3>
                                    <p className="text-muted-foreground text-right">{propertyData.interior.furnished || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Exterior Section */}
                    <section id="exterior" className="space-y-8">
                        <h2 className="text-2xl font-semibold mb-6 text-foreground">Exterior of {propertyData.address}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2">Exterior Features</h3>
                                    <p className="text-muted-foreground text-right">{propertyData.exterior.features || "N/A"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2">Lot Description</h3>
                                    <p className="text-muted-foreground text-right">{propertyData.exterior.lotDescription || "N/A"}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2">Roof</h3>
                                    <p className="text-muted-foreground text-right">{propertyData.exterior.roof || "N/A"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2">Foundation</h3>
                                    <p className="text-muted-foreground text-right">{propertyData.exterior.foundation || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* School Information */}
                    <section id="schools" className="space-y-8">
                        <h2 className="text-2xl font-semibold mb-6 text-foreground">School Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <h3 className="font-medium text-foreground">Elementary</h3>
                                <p className="text-muted-foreground">{propertyData.schools.elementary}</p>
                                {propertyData.schools.elementaryDistrict && (
                                    <p className="text-sm text-muted-foreground"><span className="font-medium">District:</span> {propertyData.schools.elementaryDistrict}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-medium text-foreground">Middle</h3>
                                <p className="text-muted-foreground">{propertyData.schools.middle}</p>
                                {propertyData.schools.middleDistrict && (
                                    <p className="text-sm text-muted-foreground"><span className="font-medium">District:</span> {propertyData.schools.middleDistrict}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-medium text-foreground">High</h3>
                                <p className="text-muted-foreground">{propertyData.schools.high}</p>
                                {propertyData.schools.highDistrict && (
                                    <p className="text-sm text-muted-foreground"><span className="font-medium">District:</span> {propertyData.schools.highDistrict}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Additional Information */}
                    <section id="additional" className="space-y-8">
                        <h2 className="text-2xl font-semibold mb-6 text-foreground">Additional Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Date Listed</span>
                                    <span className="text-muted-foreground text-right">{propertyData.additional.dateListed}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Days on Market</span>
                                    <span className="text-muted-foreground text-right">{propertyData.additional.daysOnMarket}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Zoning</span>
                                    <span className="text-muted-foreground text-right">{propertyData.additional.zoning}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Flood Zone</span>
                                    <span className="text-muted-foreground text-right">{propertyData.additional.floodZone}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">REO/Bank Owned</span>
                                    <span className="text-muted-foreground text-right">{propertyData.additional.reoBankOwned}</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Foreclosure</span>
                                    <span className="text-muted-foreground text-right">{propertyData.additional.foreclosure}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">Short Sale</span>
                                    <span className="text-muted-foreground text-right">{propertyData.additional.shortSale}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">HOA Fees</span>
                                    <span className="text-muted-foreground text-right">{propertyData.additional.hoaFees}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-foreground">HOA Frequency</span>
                                    <span className="text-muted-foreground text-right">{propertyData.additional.hoaFrequency}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* History Section */}
                    <section id="history" className="space-y-8">
                        <h2 className="text-2xl font-semibold mb-6 text-foreground">History</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2">List Price</h3>
                                    <p className="text-muted-foreground text-right">{propertyData.history.listPrice}</p>
                                </div>
                                {propertyData.history.previousListPrice && (
                                    <div className="flex justify-between">
                                        <h3 className="font-medium text-foreground mb-2">Previous List Price</h3>
                                        <p className="text-muted-foreground text-right">{propertyData.history.previousListPrice}</p>
                                    </div>
                                )}
                                {propertyData.history.originalListPrice && (
                                    <div className="flex justify-between">
                                        <h3 className="font-medium text-foreground mb-2">Original List Price</h3>
                                        <p className="text-muted-foreground text-right">{propertyData.history.originalListPrice}</p>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2">Days on Market</h3>
                                    <p className="text-muted-foreground text-right">{propertyData.history.daysOnMarket} days</p>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-foreground mb-2">Status</h3>
                                    <p className="text-muted-foreground text-right">{propertyData.history.status}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Map Section */}
                    <section id="map-directions" className="space-y-8">
                        <h2 className="text-2xl font-semibold mb-6 text-foreground">Map To {propertyData.address}</h2>
                        <MapLocation lat={propertyData.map.lat} lng={propertyData.map.lng} address={propertyData.address} isLoading={isLoading} error={error} />
                    </section>
                </div>
            </div>
        </div>
    );
}

function PropertyDetailSkeleton() {
    return (
        <div>
            {/* Image Gallery Skeleton */}
            <div className="py-8">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="flex gap-2 mt-4 overflow-x-auto">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="w-20 h-16 flex-shrink-0 rounded" />
                    ))}
                </div>
            </div>

            <div className="pb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Agent Contact Skeleton */}
                <aside className="order-1 lg:order-2 lg:col-span-1">
                    <Card className="sticky top-8 shadow-lg">
                        <CardContent className="p-6">
                            <div className="text-center mb-6">
                                <Avatar className="w-16 h-16 mx-auto mb-4 shadow-lg">
                                    <AvatarFallback className="text-xl font-bold text-muted-foreground">
                                        <Skeleton className="w-8 h-8 rounded-full" />
                                    </AvatarFallback>
                                </Avatar>
                                <Skeleton className="h-6 w-32 mx-auto mb-2" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-40 mx-auto" />
                                    <Skeleton className="h-4 w-32 mx-auto" />
                                </div>
                            </div>
                            <Skeleton className="w-full h-10 rounded" />
                        </CardContent>
                    </Card>
                </aside>

                {/* Main Content Skeleton */}
                <div className="order-2 lg:order-1 lg:col-span-2 space-y-24">
                    {/* Property Stats */}
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-1">
                                    <Skeleton className="w-4 h-4" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            ))}
                        </div>

                        <div>
                            <Skeleton className="h-12 w-48 mb-2" />
                            <Skeleton className="h-6 w-80 mb-4" />
                            <Skeleton className="h-4 w-64" />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xs sm:max-w-none">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Card key={i} className="w-full h-28">
                                    <CardContent className="p-3 flex flex-col items-start justify-center h-full">
                                        <Skeleton className="w-5 h-5 mb-4" />
                                        <Skeleton className="h-3 w-16 mb-2" />
                                        <Skeleton className="h-4 w-20" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Sections Skeleton */}
                    {Array.from({ length: 8 }).map((_, sectionIndex) => (
                        <section key={sectionIndex} className="space-y-8">
                            <Skeleton className="h-8 w-64" />
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}

function PropertyDetailError({ error }: { error: Error | null }) {
    return (
        <div className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="text-center flex flex-col items-center justify-center gap-2 text-2xl font-medium">
                <CircleAlert className="w-10 h-10 text-destructive" />
                <p className="text-destructive mb-2">Error loading property</p>
                <p className="text-muted-foreground">Sorry, something went wrong. Please try again later.</p>
                <p className="text-muted-foreground text-sm">{error?.message}</p>
                <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">
                    Reload
                </Button>
            </div>
        </div>
    );
}

function PropertyDetailNoData() {
    return (
        <div className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="text-center flex flex-col items-center justify-center gap-2">
                <FileWarning className="w-10 h-10 text-muted-foreground" />
                <p className="text-muted-foreground text-2xl font-medium">No property data available</p>
            </div>
        </div>
    );
}