import React from "react"
import { useForm } from "react-hook-form"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import PriceFilter from "../filter-select/price-filter"

export interface FilterValues {
    listingType: string
    priceMin: string
    priceMax: string
    priceRange: number[]
    bedrooms: string
    bathrooms: string
    propertyTypes: string[]
    listingStatus: string[]
    squareFeetMin: string
    squareFeetMax: string
    lotSizeMin: string
    lotSizeMax: string
    yearBuiltMin: string
    yearBuiltMax: string
    daysOnMarket: string
    moveInDate: Date | null
}

interface FilterModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    filterValues: FilterValues
    onFilterChange: (values: FilterValues) => void
}

export default function FilterModal({ open, onOpenChange, filterValues, onFilterChange }: FilterModalProps) {
    const form = useForm<FilterValues>({
        defaultValues: filterValues,
    })

    const listingType = form.watch("listingType")

    // Reset form when modal opens with current filter values
    React.useEffect(() => {
        if (open) {
            form.reset(filterValues)
        }
    }, [open, filterValues, form])

    const handleReset = () => {
        const resetValues: FilterValues = {
            listingType: "sale",
            priceMin: "",
            priceMax: "",
            priceRange: [1000, 50000],
            bedrooms: "any",
            bathrooms: "any",
            propertyTypes: [],
            listingStatus: [],
            squareFeetMin: "",
            squareFeetMax: "",
            lotSizeMin: "",
            lotSizeMax: "",
            yearBuiltMin: "",
            yearBuiltMax: "",
            daysOnMarket: "any",
            moveInDate: null,
        }

        form.reset(resetValues)
        onFilterChange(resetValues)
        console.log("Filters reset")
    }

    const handleSave = () => {
        console.log("login so save")
    }

    const handleApplyFilters = () => {
        const currentValues = form.getValues()
        console.log("All filter values:", currentValues)
        onFilterChange(currentValues)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden bg-background rounded-lg">
                {/* Header */}
                <DialogHeader className="sticky top-0 z-10 border-b px-8 py-4">
                    <div className="flex items-center justify-center">
                        <DialogTitle className="text-lg font-light">Filters</DialogTitle>
                    </div>
                </DialogHeader>


                <Form {...form}>
                    <form className="flex flex-col h-full">

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-8 space-y-8">
                                {/* Listing Type Toggle */}
                                <FormField
                                    control={form.control}
                                    name="listingType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroup value={field.value} onValueChange={field.onChange} className="flex rounded-lg bg-gray-100 p-1">
                                                    <div className="flex-1">
                                                        <RadioGroupItem value="sale" id="sale" className="sr-only" />
                                                        <Label
                                                            htmlFor="sale"
                                                            className={`flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${field.value === "sale" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                                                                }`}
                                                        >
                                                            For sale
                                                        </Label>
                                                    </div>
                                                    <div className="flex-1">
                                                        <RadioGroupItem value="rent" id="rent" className="sr-only" />
                                                        <Label
                                                            htmlFor="rent"
                                                            className={`flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${field.value === "rent" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                                                                }`}
                                                        >
                                                            For rent
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {/* Conditional Filter Sections */}
                                {listingType === "sale" ? (
                                    <>
                                        {/* <PriceFilter form={form} /> */}
                                        {/* <BedroomsFilter form={form} />
                                        <BathroomsFilter form={form} />
                                        <PropertyTypesFilter form={form} />
                                        <ListingStatusFilter form={form} />
                                        <PropertyDetailsFilter form={form} />
                                        <DaysOnMarketFilter form={form} /> */}
                                    </>
                                ) : (
                                    <>
                                        {/* <PriceFilter form={form} /> */}
                                        {/* <BedroomsFilter form={form} />
                                        <BathroomsFilter form={form} />
                                        <PropertyTypesFilter form={form} />
                                        <ListingStatusFilter form={form} />
                                        <PropertyDetailsFilter form={form} />
                                        <DaysOnMarketFilter form={form} />
                                        <MoveInDateFilter form={form} /> */}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 z-10 border-t px-8 py-6">
                            <div className="flex items-center justify-between gap-4">
                                <Button type="button" variant="outline" onClick={handleReset} >
                                    Reset filters
                                </Button>
                                <div className="flex items-center gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleSave}
                                    >
                                        Save search
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={handleApplyFilters}
                                    >
                                        See 93.1k properties
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
