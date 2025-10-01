"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface PriceFilterProps {
    form: UseFormReturn<any>
}

export default function PriceFilter({ form }: PriceFilterProps) {
    return (
        <AccordionItem value="price" className="border rounded-xl shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="text-lg font-semibold">Price</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="priceMin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="$1,000"
                                                {...field}
                                                className="h-12 text-base"
                                                onChange={(e) => {
                                                    field.onChange(e.target.value)
                                                    const priceRange = form.getValues("priceRange") || [1000, 50000]
                                                    const minValue = Number.parseInt(e.target.value.replace(/[^0-9]/g, "")) || 1000
                                                    form.setValue("priceRange", [minValue, priceRange[1]])
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <span className="text-gray-500 font-medium">to</span>
                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="priceMax"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="$50,000"
                                                {...field}
                                                className="h-12 text-base"
                                                onChange={(e) => {
                                                    field.onChange(e.target.value)
                                                    const priceRange = form.getValues("priceRange") || [1000, 50000]
                                                    const maxValue = Number.parseInt(e.target.value.replace(/[^0-9]/g, "")) || 50000
                                                    form.setValue("priceRange", [priceRange[0], maxValue])
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="px-3">
                        <FormField
                            control={form.control}
                            name="priceRange"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Slider
                                            value={field.value || [1000, 50000]}
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                                form.setValue("priceMin", `$${value[0].toLocaleString()}`)
                                                form.setValue("priceMax", `$${value[1].toLocaleString()}`)
                                            }}
                                            min={1000}
                                            max={50000}
                                            step={500}
                                            className="w-full"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>$1,000</span>
                            <span>$50,000</span>
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
