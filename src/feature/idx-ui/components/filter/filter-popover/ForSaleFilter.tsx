import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePropertyFilterStore } from "@/feature/idx-ui/store/property-store";

export const ForSaleFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { status, addSaleStatusFilter } = usePropertyFilterStore();

    const options = [
        { value: "Active", label: "For sale", description: "Currently available" },
        { value: "Pending", label: "Pending", description: "Sale in progress" },
        { value: "Closed", label: "Sold", description: "Recently sold" }
    ];

    const handleOptionSelect = (option: "Active" | "Pending" | "Closed") => {
        addSaleStatusFilter(option);
        setIsOpen(false);
    };

    const getCurrentLabel = () => {
        switch (status) {
            case "Active":
                return "For sale";
            case "Pending":
                return "Pending";
            case "Closed":
                return "Sold";
            default:
                return "For sale";
        }
    };

    const isDefaultSelected = status === "Active" || !status;

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={isDefaultSelected ? "outline" : "default"}
                    size="sm"
                >
                    {getCurrentLabel()}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-60 px-4 py-2 shadow-lg rounded-xl bg-background"
                align="start"
                sideOffset={4}
            >
                <div className="py-2 space-y-2">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleOptionSelect(option.value as "Active" | "Pending" | "Closed")}
                            className={cn(
                                "w-full px-4 py-3 text-left text-sm hover:bg-muted/80 transition-colors flex items-center justify-between rounded-lg",
                                status === option.value && "bg-muted/80"
                            )}
                        >
                            <div className="flex flex-col items-start">
                                <span className="font-medium text-foreground">{option.label}</span>
                                <span className="text-xs text-muted-foreground">{option.description}</span>
                            </div>
                            {status === option.value && (
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