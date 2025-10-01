import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useState } from "react";
import FilterModal, { FilterValues } from "./FilterModal";

interface AllFilterTriggerProps {
    filterValues: FilterValues
    handleFilterChange: (values: FilterValues) => void
}

export const AllFilterTrigger = ({ filterValues, handleFilterChange }: AllFilterTriggerProps) => {
    const [showFilterModal, setShowFilterModal] = useState(false);

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setShowFilterModal(true)}
            >
                <Filter className="h-4 w-4" />
                All filters
            </Button>
            <FilterModal
                open={showFilterModal}
                onOpenChange={setShowFilterModal}
                filterValues={filterValues}
                onFilterChange={handleFilterChange}
            />
        </>
    )
}