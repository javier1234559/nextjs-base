import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { usePropertyFilterStore } from "@/feature/idx-ui/store/property-store";

const bedOptions = [
    { value: "any", label: "Any" },
    { value: "studio", label: "Studio" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5+", label: "5+" }
];

export const BedsFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBeds, setSelectedBeds] = useState<string[]>(["any"]);
    const { updateBedroomFilters } = usePropertyFilterStore();

    const handleBedToggle = (bedValue: string) => {
        let updatedSelection: string[];

        if (bedValue === "any") {
            // Reset all selections when "Any" is clicked
            updatedSelection = ["any"];
        } else if (selectedBeds.includes(bedValue)) {
            // Remove if already selected
            updatedSelection = selectedBeds.filter(bed => bed !== bedValue);
            // If no selections left, default to "any"
            if (updatedSelection.length === 0) {
                updatedSelection = ["any"];
            }
        } else {
            // Add to selection (but remove "any" if it was selected)
            updatedSelection = [...selectedBeds.filter(bed => bed !== "any"), bedValue];
        }

        setSelectedBeds(updatedSelection);

        // Convert "any" to empty array for store, otherwise use the selected bedrooms
        const bedroomsForStore = updatedSelection.includes("any") ? [] : updatedSelection;
        updateBedroomFilters(bedroomsForStore);
    };

    const getButtonText = () => {
        // If only "any" is selected or no selection, show "All beds"
        if (selectedBeds.length === 0 || (selectedBeds.length === 1 && selectedBeds.includes("any"))) {
            return "All beds";
        }

        // Sort the selected beds to handle range display
        const sortedBeds = selectedBeds.filter(bed => bed !== "any").sort((a, b) => {
            const aIndex = bedOptions.findIndex(option => option.value === a);
            const bIndex = bedOptions.findIndex(option => option.value === b);
            return aIndex - bIndex;
        });

        if (sortedBeds.length === 1) {
            const bed = bedOptions.find(b => b.value === sortedBeds[0]);
            return `${bed?.label} beds`;
        }

        // Check if it's a continuous range
        const bedIndices = sortedBeds.map(bed =>
            bedOptions.findIndex(option => option.value === bed)
        );

        const isContinuous = bedIndices.every((index, i) =>
            i === 0 || index === bedIndices[i - 1] + 1
        );

        if (isContinuous && sortedBeds.length > 1) {
            const firstBed = bedOptions.find(b => b.value === sortedBeds[0]);
            const lastBed = bedOptions.find(b => b.value === sortedBeds[sortedBeds.length - 1]);

            // Handle special cases
            if (firstBed?.value === "studio") {
                return `${firstBed.label} - ${lastBed?.label} beds`;
            } else {
                return `${firstBed?.label} - ${lastBed?.label} beds`;
            }
        }

        // Multiple non-continuous selections
        return `${sortedBeds.length} beds`;
    };

    const isSelected = (bedValue: string) => selectedBeds.includes(bedValue);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={selectedBeds.length > 0 && !selectedBeds.includes("any") ? "default" : "outline"}
                    size="sm"
                    className={cn(
                        selectedBeds.length > 0 && !selectedBeds.includes("any") && "bg-foreground text-background border-foreground"
                    )}
                >
                    {getButtonText()}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-80 p-4 shadow-lg rounded-xl bg-background"
                align="start"
                sideOffset={4}
            >
                <div className="flex flex-wrap gap-2">
                    {bedOptions.map((option) => (
                        <Button
                            key={option.value}
                            variant={isSelected(option.value) ? "default" : "outline"}
                            size="sm"
                            className={cn(
                                "min-w-[60px]",
                                isSelected(option.value)
                                    ? "bg-foreground text-background border-foreground"
                                    : "border-border hover:border-foreground/50"
                            )}
                            onClick={() => handleBedToggle(option.value)}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};