"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ListingTypeToggleProps {
    form: UseFormReturn<any>
}

export default function ListingTypeToggle({ form }: ListingTypeToggleProps) {
    return (
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
    )
}
