import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

interface BathroomsFilterProps {
    form: UseFormReturn<any>
}

const bathroomOptions = ["any", "1", "2", "3", "4", "5+"]

export default function BathroomsFilter({ form }: BathroomsFilterProps) {
    return (
        <AccordionItem value="bathrooms" className="border rounded-xl bg-white shadow-sm">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="text-lg font-semibold">Bathrooms</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
                <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex flex-wrap gap-3">
                                    {bathroomOptions.map((option) => (
                                        <Button
                                            key={option}
                                            type="button"
                                            variant={field.value === option ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => field.onChange(option)}
                                            className={`min-w-[80px] h-12 ${field.value === option
                                                ? "bg-black text-white hover:bg-black/90"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            {option === "any" ? "Any" : option}
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
