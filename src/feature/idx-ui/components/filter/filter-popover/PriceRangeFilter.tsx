import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { usePropertyFilterStore } from "@/feature/idx-ui/store/property-store"
import debounce from "lodash/debounce"

const DEFAULT_MIN_PRICE = 90000
const DEFAULT_MAX_PRICE = 1000000

export const PriceRangeFilter = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [priceRange, setPriceRange] = useState<[number, number]>([DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE])
    const [minInput, setMinInput] = useState("")
    const [maxInput, setMaxInput] = useState("")
    const { updatePriceFilter } = usePropertyFilterStore()

    // Initialize input values
    useEffect(() => {
        setMinInput(formatCurrency(priceRange[0]))
        setMaxInput(formatCurrency(priceRange[1]))
    }, [])

    const formatCurrency = (value: number): string => {
        return `$${value.toLocaleString()}`
    }

    // Debounced function to apply price filter
    const debouncedApplyPriceFilter = useCallback(
        debounce((min: number, max: number) => {
            // Only apply filters if they're different from default
            const minFilter = min > DEFAULT_MIN_PRICE ? min : undefined
            const maxFilter = max < DEFAULT_MAX_PRICE ? max : undefined
            updatePriceFilter(minFilter, maxFilter)
        }, 500), // 500ms debounce
        [updatePriceFilter]
    )

    const handleSliderChange = (value: [number, number]) => {
        setPriceRange(value)
        setMinInput(formatCurrency(value[0]))
        setMaxInput(formatCurrency(value[1]))
        debouncedApplyPriceFilter(value[0], value[1])
    }

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        // Remove all non-numeric characters except for existing $
        const numericValue = value.replace(/[^0-9]/g, "")

        // Format with $ prefix
        const formattedValue = numericValue ? `$${Number.parseInt(numericValue).toLocaleString()}` : ""
        setMinInput(formattedValue)

        // Update slider if valid
        const parsedValue = Number.parseInt(numericValue)
        if (!isNaN(parsedValue) && parsedValue >= DEFAULT_MIN_PRICE && parsedValue <= DEFAULT_MAX_PRICE) {
            const newRange: [number, number] = [parsedValue, Math.max(parsedValue, priceRange[1])]
            setPriceRange(newRange)
            debouncedApplyPriceFilter(newRange[0], newRange[1])
        }
    }

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        // Remove all non-numeric characters except for existing $
        const numericValue = value.replace(/[^0-9]/g, "")

        // Format with $ prefix
        const formattedValue = numericValue ? `$${Number.parseInt(numericValue).toLocaleString()}` : ""
        setMaxInput(formattedValue)

        // Update slider if valid
        const parsedValue = Number.parseInt(numericValue)
        if (!isNaN(parsedValue) && parsedValue >= DEFAULT_MIN_PRICE && parsedValue <= DEFAULT_MAX_PRICE) {
            const newRange: [number, number] = [Math.min(priceRange[0], parsedValue), parsedValue]
            setPriceRange(newRange)
            debouncedApplyPriceFilter(newRange[0], newRange[1])
        }
    }

    const isDefaultRange = priceRange[0] === DEFAULT_MIN_PRICE && priceRange[1] === DEFAULT_MAX_PRICE

    const getButtonText = () => {
        if (isDefaultRange) {
            return "Any price"
        }
        return `${formatCurrency(priceRange[0])} - ${formatCurrency(priceRange[1])}`
    }

    // Cleanup debounced function on unmount
    useEffect(() => {
        return () => {
            debouncedApplyPriceFilter.cancel()
        }
    }, [debouncedApplyPriceFilter])

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant={isDefaultRange ? "outline" : "default"} size="sm" className="h-10 px-4 font-medium">
                    {getButtonText()}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="md:w-120 w-96 p-0 shadow-xl rounded-2xl border-0" align="start" sideOffset={8}>
                <div className="p-4 space-y-2">
                    <div className="flex items-center gap-6">
                        <div className="flex-1">
                            <Input
                                placeholder="No min"
                                value={minInput}
                                onChange={handleMinInputChange}
                                className="h-12 px-4 placeholder-muted-foreground hover:placeholder-muted-foreground text-foreground"
                            />
                        </div>
                        <span className="text-muted-foreground text-md font-light">to</span>
                        <div className="flex-1">
                            <Input
                                placeholder="No max"
                                value={maxInput}
                                onChange={handleMaxInputChange}
                                className="h-12 px-4"
                            />
                        </div>
                    </div>
                    <div className="px-0 py-2">
                        <Slider
                            value={priceRange}
                            onValueChange={handleSliderChange}
                            min={DEFAULT_MIN_PRICE}
                            max={DEFAULT_MAX_PRICE}
                            step={500}
                            className="w-full"
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
