import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getProperties, PropertyParams } from "../service/property-service";
import { Property } from "@/types/common";

export const PROPERTY_KEY_FACTORY = {
    all: ["property"] as const,
    lists: () => [...PROPERTY_KEY_FACTORY.all, "list"] as const,
    list: (params: PropertyParams) =>
        [...PROPERTY_KEY_FACTORY.lists(), params] as const,
    details: () => [...PROPERTY_KEY_FACTORY.all, "detail"] as const,
    detail: (id: string) => [...PROPERTY_KEY_FACTORY.details(), id] as const,
};

export const usePropertyList = (
    params: PropertyParams,
    options?: UseQueryOptions<Property>,
) => {
    return useQuery({
        queryKey: PROPERTY_KEY_FACTORY.list(params),
        queryFn: () => getProperties(params),
        staleTime: 1000 * 60 * 1, // 1 minutes
        enabled: true,
        retry: 1,
        ...(typeof options === "object" ? options : {}),
    });
};
