import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getMapCompleteAddress } from "../service/map-service";

export const MAP_KEY_FACTORY = {
    all: ["map"] as const,
    lists: () => [...MAP_KEY_FACTORY.all, "list"] as const,
    list: (params: string) =>
        [...MAP_KEY_FACTORY.lists(), params] as const,
    details: () => [...MAP_KEY_FACTORY.all, "detail"] as const,
    detail: (id: string) => [...MAP_KEY_FACTORY.details(), id] as const,
};

export const useMapCompleteAddress = (
    address: string,
    options?: UseQueryOptions<any>,
) => {
    return useQuery({
        queryKey: MAP_KEY_FACTORY.list(address),
        queryFn: () => getMapCompleteAddress(address),
        staleTime: 0,
        retry: false,
        enabled: address.length > 0 && address !== "",
        ...(typeof options === "object" ? options : {}),
    });
};
