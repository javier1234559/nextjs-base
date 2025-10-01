import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ResidentialIcon } from "@/components/icons/residential-icon";
import { TownhomesIcon } from "@/components/icons/townhomes-icon";
import { CoopIcon } from "@/components/icons/coop-icon";
import { MultifamilyIcon } from "@/components/icons/multifamily-icon";
import { CondosIcon } from "@/components/icons/condos-icon";
import { CommercialIcon } from "@/components/icons/commercial-icon";
import { ManufacturedIcon } from "@/components/icons/manufactured-icon";
import { LandIcon } from "@/components/icons/land-icon";
import { OtherIcon } from "@/components/icons/other-icon";
import { usePropertyFilterStore } from "@/feature/idx-ui/store/property-store";
import { BusinessIcon } from "@/components/icons/bussines-icon";
import { FarmIcon } from "@/components/icons/farm-icon";
import { MobileHomeIcon } from "@/components/icons/mobile-home-icon";
import { RentalIcon } from "@/components/icons/rental-icon";
import { TimeshareIcon } from "@/components/icons/time-share-icon";
import { BoatSlipIcon } from "@/components/icons/boat-slip-icon";

const propertyTypes = [
    { id: "Residential", label: "Residential", icon: ResidentialIcon },
    { id: "Condominium", label: "Condos", icon: CondosIcon },
    { id: "Townhouse", label: "Townhomes", icon: TownhomesIcon },
    { id: "Co-op", label: "Co-op", icon: CoopIcon },
    { id: "MultiFamily", label: "Multi-family", icon: MultifamilyIcon },
    { id: "Commercial", label: "Commercial", icon: CommercialIcon },
    { id: "Business", label: "Business", icon: BusinessIcon },
    { id: "Land", label: "Land", icon: LandIcon },
    { id: "Farm", label: "Farm", icon: FarmIcon },
    { id: "ManufacturedHome", label: "Manufactured Home", icon: ManufacturedIcon },
    { id: "MobileHome", label: "Mobile Home", icon: MobileHomeIcon },
    { id: "Rental", label: "Rental", icon: RentalIcon },
    { id: "Timeshare", label: "Timeshare", icon: TimeshareIcon },
    { id: "BoatSlip", label: "Boat Slip", icon: BoatSlipIcon },
    { id: "Other", label: "Other", icon: OtherIcon },
]

export const PropertyTypeFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const { updatePropertyTypeFilters } = usePropertyFilterStore();

    const handleTypeToggle = (typeValue: string) => {
        const updatedSelection = selectedTypes.includes(typeValue)
            ? selectedTypes.filter(type => type !== typeValue)
            : [...selectedTypes, typeValue];

        setSelectedTypes(updatedSelection);
        updatePropertyTypeFilters(updatedSelection);
    };

    const getButtonText = () => {
        if (selectedTypes.length === 0) return "All property types";
        if (selectedTypes.length === 1) {
            const type = propertyTypes.find(t => t.id === selectedTypes[0]);
            return type?.label || "Property types";
        }
        return `Property types · ${selectedTypes.length}`;
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={selectedTypes.length > 0 ? "default" : "outline"}
                    size="sm"
                >
                    {getButtonText()}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-96 p-6 shadow-xl rounded-2xl border-0"
                align="start"
                sideOffset={8}
            >
                <div className="grid grid-cols-3 gap-3">
                    {propertyTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = selectedTypes.includes(type.id);

                        return (
                            <Button
                                key={type.id}
                                type="button"
                                variant="outline"
                                className={cn(
                                    "h-20 flex flex-col items-center justify-center gap-2 p-3 transition-all",
                                    isSelected
                                        ? "border-foreground bg-accent text-foreground"
                                        : "border-border hover:border-foreground/50"
                                )}
                                onClick={() => handleTypeToggle(type.id)}
                            >
                                <Icon />
                                <span className="text-xs font-medium text-center leading-tight text-wrap">
                                    {type.label}
                                </span>
                            </Button>
                        );
                    })}
                </div>
            </PopoverContent>
        </Popover>
    );
};