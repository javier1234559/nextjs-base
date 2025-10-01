import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPropertyDetail } from "../service/property-service";
import { PropertyDetail } from "../types/PropertyDetail";

export const PROPERTY_KEY_FACTORY = {
    all: ["property"] as const,
    detail: (id: string) => [...PROPERTY_KEY_FACTORY.all, "detail", id] as const,
};

export const usePropertyDetail = (id: string, options?: UseQueryOptions<PropertyDetail>) => {
    return useQuery({
        queryKey: PROPERTY_KEY_FACTORY.detail(id),
        queryFn: () => getPropertyDetail(id),
        staleTime: 1000 * 60 * 10, // 10 minutes
        enabled: !!id,
        retry: 1,
        ...(typeof options === "object" ? options : {}),
    });
};
