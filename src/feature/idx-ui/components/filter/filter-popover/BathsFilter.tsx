import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { usePropertyFilterStore } from "@/feature/idx-ui/store/property-store";

const bathOptions = [
    { value: "any", label: "Any" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5+", label: "5+" }
];

export const BathsFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBaths, setSelectedBaths] = useState<string[]>(["any"]);
    const { updateBathroomFilters } = usePropertyFilterStore();

    const handleBathToggle = (bathValue: string) => {
        let updatedSelection: string[];

        if (bathValue === "any") {
            // Reset all selections when "Any" is clicked
            updatedSelection = ["any"];
        } else if (selectedBaths.includes(bathValue)) {
            // Remove if already selected
            updatedSelection = selectedBaths.filter(bath => bath !== bathValue);
            // If no selections left, default to "any"
            if (updatedSelection.length === 0) {
                updatedSelection = ["any"];
            }
        } else {
            // Add to selection (but remove "any" if it was selected)
            updatedSelection = [...selectedBaths.filter(bath => bath !== "any"), bathValue];
        }

        setSelectedBaths(updatedSelection);

        // Convert "any" to empty array for store, otherwise use the selected bathrooms
        const bathroomsForStore = updatedSelection.includes("any") ? [] : updatedSelection;
        updateBathroomFilters(bathroomsForStore);
    };

    const getButtonText = () => {
        // If only "any" is selected or no selection, show "All baths"
        if (selectedBaths.length === 0 || (selectedBaths.length === 1 && selectedBaths.includes("any"))) {
            return "All baths";
        }

        // Sort the selected baths to handle range display
        const sortedBaths = selectedBaths.filter(bath => bath !== "any").sort((a, b) => {
            const aIndex = bathOptions.findIndex(option => option.value === a);
            const bIndex = bathOptions.findIndex(option => option.value === b);
            return aIndex - bIndex;
        });

        if (sortedBaths.length === 1) {
            const bath = bathOptions.find(b => b.value === sortedBaths[0]);
            return `${bath?.label} baths`;
        }

        // Check if it's a continuous range
        const bathIndices = sortedBaths.map(bath =>
            bathOptions.findIndex(option => option.value === bath)
        );

        const isContinuous = bathIndices.every((index, i) =>
            i === 0 || index === bathIndices[i - 1] + 1
        );

        if (isContinuous && sortedBaths.length > 1) {
            const firstBath = bathOptions.find(b => b.value === sortedBaths[0]);
            const lastBath = bathOptions.find(b => b.value === sortedBaths[sortedBaths.length - 1]);

            return `${firstBath?.label} - ${lastBath?.label} baths`;
        }

        // Multiple non-continuous selections
        return `${sortedBaths.length} baths`;
    };

    const isSelected = (bathValue: string) => selectedBaths.includes(bathValue);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={selectedBaths.length > 0 && !selectedBaths.includes("any") ? "default" : "outline"}
                    size="sm"
                    className={cn(
                        selectedBaths.length > 0 && !selectedBaths.includes("any") && "bg-foreground text-background border-foreground"
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
                    {bathOptions.map((option) => (
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
                            onClick={() => handleBathToggle(option.value)}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};