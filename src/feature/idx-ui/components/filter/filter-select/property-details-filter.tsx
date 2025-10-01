"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PropertyDetailsFilterProps {
    form: UseFormReturn<any>
}

export default function PropertyDetailsFilter({ form }: PropertyDetailsFilterProps) {
    return (
        <AccordionItem value="property-details" className="border rounded-xl bg-white shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="text-lg font-semibold">Property details</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label className="text-base font-medium mb-3 block">Square feet</Label>
                            <div className="flex gap-3">
                                <FormField
                                    control={form.control}
                                    name="squareFeetMin"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input placeholder="Min" {...field} className="h-12" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="squareFeetMax"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input placeholder="Max" {...field} className="h-12" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <Label className="text-base font-medium mb-3 block">Lot size</Label>
                            <div className="flex gap-3">
                                <FormField
                                    control={form.control}
                                    name="lotSizeMin"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input placeholder="Min" {...field} className="h-12" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lotSizeMax"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input placeholder="Max" {...field} className="h-12" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
