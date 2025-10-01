import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePropertyFilterStore } from "@/feature/idx-ui/store/property-store";
import { ODataPropertyField } from "@/feature/idx-ui/types/ODataTypeField";

export type SortByOption = "newest" | "oldest" | "price-asc" | "price-desc" | 'square-feet';

export const SortByPopover = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SortByOption>("newest");
    const { orderby, setOrderby } = usePropertyFilterStore();

    const options = [
        { value: "newest", label: "Newest" },
        { value: "oldest", label: "Oldest" },
        { value: "price-asc", label: "Price (asc)" },
        { value: "price-desc", label: "Price (desc)" },
        { value: "square-feet", label: "Square feet" }
    ];

    const formatLabel = (option: SortByOption) => {
        switch (option) {
            case "newest":
                return "Newest";
            case "oldest":
                return "Oldest";
            case "price-asc":
                return "Price (asc)";
            case "price-desc":
                return "Price (desc)";
            case "square-feet":
                return "Square feet";
        }
    }


    const handleConvertToODataString = (option: SortByOption) => {
        switch (option) {
            case "newest":
                return ODataPropertyField.DaysOnMarket + " desc";
            case "oldest":
                return ODataPropertyField.DaysOnMarket + " asc";
            case "price-asc":
                return ODataPropertyField.ListPrice + " asc";
            case "price-desc":
                return ODataPropertyField.ListPrice + " desc";
            case "square-feet":
                return ODataPropertyField.LivingArea + " desc";
        }
    };

    const handleConvertToSortByOption = (odataString: string) => {
        switch (odataString) {
            case ODataPropertyField.DaysOnMarket + " desc":
                return "newest";
            case ODataPropertyField.DaysOnMarket + " asc":
                return "oldest";
            case ODataPropertyField.ListPrice + " asc":
                return "price-asc";
            case ODataPropertyField.ListPrice + " desc":
                return "price-desc";
            case ODataPropertyField.LivingArea + " desc":
                return "square-feet";
        }
    }


    useEffect(() => {
        if (orderby) {
            const sortByOption = handleConvertToSortByOption(orderby);
            console.log("orderby sync", sortByOption);
            setSelectedOption(sortByOption);
        }
    }, [orderby]);


    const handleOptionSelect = (option: SortByOption) => {
        setSelectedOption(option);
        const odataString = handleConvertToODataString(option);
        console.log(odataString);
        setOrderby(odataString);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                >
                    <span className="text-sm text-muted-foreground font-light capitalize">{formatLabel(selectedOption)}</span>
                    <ChevronsUpDown className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-60 px-4 py-2 shadow-lg rounded-xl"
                align="start"
                sideOffset={4}
            >
                <div className="py-2 space-y-2">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleOptionSelect(option.value as SortByOption)}
                            className={cn(
                                "w-full px-4 py-3 text-left text-sm hover:bg-muted transition-colors flex items-center justify-between rounded-lg",
                                selectedOption === option.value && "bg-muted/80"
                            )}
                        >
                            <span className="font-medium text-foreground">{formatLabel(option.value as SortByOption)}</span>
                            {selectedOption === option.value && (
                                <div className="w-5 h-5 bg-foreground rounded flex items-center justify-center">
                                    <Check className="h-3 w-3 text-background stroke-[3]" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};