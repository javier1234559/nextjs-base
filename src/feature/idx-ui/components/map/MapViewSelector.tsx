import React from 'react';
import { Map, Satellite, Sun, Moon, Mountain, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { globalConfig } from '@/globalConfig';

export type MapStyleType = keyof typeof globalConfig.MAPBOX_STYLES;

interface MapViewSelectorProps {
    currentStyle: MapStyleType;
    onStyleChange: (style: MapStyleType) => void;
    is3D?: boolean;
    on3DToggle?: (is3D: boolean) => void;
    className?: string;
}

const mapStyleOptions = [
    {
        key: 'STREETS' as MapStyleType,
        label: 'Streets',
        icon: Map,
        description: 'Standard street view'
    },
    {
        key: 'SATELLITE' as MapStyleType,
        label: 'Satellite',
        icon: Satellite,
        description: 'Satellite imagery'
    },
    {
        key: 'SATELLITE_STREETS' as MapStyleType,
        label: 'Satellite Streets',
        icon: Satellite,
        description: 'Satellite with street labels'
    },
    {
        key: 'LIGHT' as MapStyleType,
        label: 'Light',
        icon: Sun,
        description: 'Light theme'
    },
    {
        key: 'DARK' as MapStyleType,
        label: 'Dark',
        icon: Moon,
        description: 'Dark theme'
    },
    {
        key: 'NAVIGATION_DAY' as MapStyleType,
        label: 'Navigation Day',
        icon: Navigation,
        description: 'Day navigation view'
    },
    {
        key: 'NAVIGATION_NIGHT' as MapStyleType,
        label: 'Navigation Night',
        icon: Navigation,
        description: 'Night navigation view'
    },
    {
        key: 'OUTDOORS' as MapStyleType,
        label: 'Outdoors',
        icon: Mountain,
        description: 'Outdoor recreation view'
    }
];

const MapViewSelector = ({ currentStyle, onStyleChange, is3D = false, on3DToggle, className = '' }: MapViewSelectorProps) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <div className="text-sm font-medium text-foreground mb-2">Map Style</div>
            <div className="grid grid-cols-2 gap-2">
                {mapStyleOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = currentStyle === option.key;

                    return (
                        <Button
                            key={option.key}
                            variant={isActive ? "default" : "outline"}
                            size="sm"
                            onClick={() => onStyleChange(option.key)}
                            className={`h-auto p-3 flex flex-col items-center gap-1 transition-all ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="text-xs font-medium">{option.label}</span>
                        </Button>
                    );
                })}
            </div>

            {/* 3D Toggle */}
            {on3DToggle && (
                <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-sm font-medium text-foreground mb-2">View Mode</div>
                    <Button
                        variant={is3D ? "default" : "outline"}
                        size="sm"
                        onClick={() => on3DToggle(!is3D)}
                        className="w-full h-auto p-3 flex items-center gap-2"
                    >
                        <div className="w-4 h-4 flex items-center justify-center">
                            {is3D ? (
                                <div className="w-3 h-3 bg-current rounded-sm"></div>
                            ) : (
                                <div className="w-3 h-3 border border-current rounded-sm"></div>
                            )}
                        </div>
                        <span className="text-sm font-medium">3D View</span>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MapViewSelector; 