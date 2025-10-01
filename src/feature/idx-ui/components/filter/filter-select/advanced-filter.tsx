import type { UseFormReturn } from "react-hook-form"
import { ChevronRight } from "lucide-react"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface AdvancedFilterProps {
    form: UseFormReturn<any>
}

export default function AdvancedFilter({ form }: AdvancedFilterProps) {
    return (

        <AccordionItem value="advanced" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Advanced</span>
                        <Badge variant="secondary" className="text-xs">
                            Beta
                        </Badge>
                    </div>
                    <ChevronRight className="h-5 w-5 transition-transform duration-200" />
                </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-sm font-medium">Year built</Label>
                            <div className="flex gap-2 mt-1">
                                <FormField
                                    control={form.control}
                                    name="yearBuiltMin"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input placeholder="Min" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="yearBuiltMax"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input placeholder="Max" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <Label className="text-sm font-medium">Days on market</Label>
                            <div className="flex gap-2 mt-1">
                                <FormField
                                    control={form.control}
                                    name="daysOnMarketMin"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input placeholder="Min" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="daysOnMarketMax"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input placeholder="Max" {...field} />
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
