"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface MoveInDateFilterProps {
    form: UseFormReturn<any>
}

export default function MoveInDateFilter({ form }: MoveInDateFilterProps) {
    return (
        <AccordionItem value="move-in-date" className="border rounded-xl bg-white shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="text-lg font-semibold">Move-in date</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
                <FormField
                    control={form.control}
                    name="moveInDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full h-12 justify-start text-left font-normal bg-transparent"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? format(field.value, "PPP") : "Select move-in date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date < new Date()}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </AccordionContent>
        </AccordionItem>
    )
}
