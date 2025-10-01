import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

interface DaysOnMarketFilterProps {
    form: UseFormReturn<any>
}

const daysOptions = [
    { value: "any", label: "Any" },
    { value: "1", label: "1 day" },
    { value: "7", label: "7 days" },
    { value: "14", label: "14 days" },
    { value: "30", label: "1 month" },
    { value: "90", label: "3 months" },
    { value: "180", label: "6 months" },
    { value: "365", label: "12 months" },
]

export default function DaysOnMarketFilter({ form }: DaysOnMarketFilterProps) {
    return (
        <AccordionItem value="days-on-market" className="border rounded-xl bg-white shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="text-lg font-semibold">Days on market</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
                <FormField
                    control={form.control}
                    name="daysOnMarket"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex flex-wrap gap-3">
                                    {daysOptions.map((option) => (
                                        <Button
                                            key={option.value}
                                            type="button"
                                            variant={field.value === option.value ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => field.onChange(option.value)}
                                            className={`px-4 py-2 h-10 ${field.value === option.value
                                                ? "bg-black text-white hover:bg-black/90"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            {option.label}
                                        </Button>
                                    ))}
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </AccordionContent>
        </AccordionItem>
    )
}
