import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePropertyFilterStore } from "@/feature/idx-ui/store/property-store";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

interface PaginationParams {
    defaultPage?: number;
    defaultPerPage?: number;
    debounceDelay?: number;
}

const usePaginationUrl = ({
    defaultPage = DEFAULT_PAGE,
    defaultPerPage = DEFAULT_PAGE_SIZE,
    debounceDelay = 1500,
}: PaginationParams = {}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { serializeToUrl, deserializeFromUrl, syncWithUrl } = usePropertyFilterStore();

    const getInitialValue = (key: string, fallback: any) => {
        if (!searchParams) return fallback;
        const value = searchParams.get(key);
        if (value === null) return fallback;
        if (typeof fallback === "number") return Number(value);
        return value;
    };

    const [page, setPage] = useState<number>(() => getInitialValue("page", defaultPage));
    const [perPage, setPerPage] = useState<number>(() => getInitialValue("perPage", defaultPerPage));
    const [searchValue, setSearchValue] = useState<string>(() => getInitialValue("search", ""));
    const [searchParam, setSearchParam] = useState<string>(() => getInitialValue("search", ""));
    const [tags, setTags] = useState<string[]>(() => {
        const tagsString = getInitialValue("tags", "");
        return tagsString ? tagsString.split(",").filter(Boolean).map((tag: any) => tag.toLowerCase()) : [];
    });

    const updateParams = useCallback(
        (newParams: {
            page?: number;
            perPage?: number;
            search?: string;
            tags?: string[];
        }) => {
            const urlParams = new URLSearchParams(searchParams?.toString() || "");

            if (newParams.page) urlParams.set("page", newParams.page.toString());
            if (newParams.perPage)
                urlParams.set("perPage", newParams.perPage.toString());

            if (typeof newParams.search === "string") {
                if (newParams.search.trim()) {
                    urlParams.set("search", newParams.search.trim());
                } else {
                    urlParams.delete("search");
                }
            }

            if (newParams.tags) {
                if (newParams.tags.length > 0) {
                    urlParams.set("tags", newParams.tags.join(","));
                } else {
                    urlParams.delete("tags");
                }
            }

            const filterParams = serializeToUrl();
            if (filterParams) {
                const filterUrlParams = new URLSearchParams(filterParams);
                filterUrlParams.forEach((value, key) => {
                    if (value) {
                        urlParams.set(key, value);
                    }
                });
            }

            router.push(`?${urlParams.toString()}`);
        },
        [router, searchParams, serializeToUrl],
    );

    const debouncedUpdateParams = useMemo(
        () =>
            debounce((value: string) => {
                updateParams({ search: value });
                setSearchParam(value.trim());
            }, debounceDelay),
        [updateParams, debounceDelay],
    );

    const parseTagsFromString = useCallback(
        (tagsString: string | null): string[] => {
            if (!tagsString) return [];
            return tagsString
                .split(",")
                .filter(Boolean)
                .map((tag) => tag.toLowerCase());
        },
        [],
    );

    useEffect(() => {
        if (!searchParams) return;
        const pageParam = searchParams.get("page");
        const perPageParam = searchParams.get("perPage");
        const searchParamValue = searchParams.get("search");
        const tagsParam = searchParams.get("tags");

        if (pageParam) setPage(Number(pageParam));
        else setPage(defaultPage);

        if (perPageParam) setPerPage(Number(perPageParam));
        else setPerPage(defaultPerPage);

        if (searchParamValue) {
            setSearchValue(searchParamValue);
            setSearchParam(searchParamValue);
        } else {
            setSearchValue("");
            setSearchParam("");
        }

        setTags(parseTagsFromString(tagsParam));

        // Deserialize property filters từ URL
        deserializeFromUrl(searchParams);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, parseTagsFromString, deserializeFromUrl, defaultPage, defaultPerPage]);

    useEffect(() => {
        return () => {
            debouncedUpdateParams.cancel();
        };
    }, [debouncedUpdateParams]);

    const handleSearch = useCallback(
        (value: string) => {
            setSearchValue(value);
            debouncedUpdateParams(value);
        },
        [debouncedUpdateParams],
    );

    const updateTags = useCallback(
        (newTags: string[]) => {
            updateParams({
                tags: newTags,
                page: 1,
            });
        },
        [updateParams],
    );

    const addTag = useCallback(
        (tag: string) => {
            if (!tags.includes(tag.toLowerCase())) {
                const newTags = [...tags, tag.toLowerCase()];
                updateTags(newTags);
            }
        },
        [tags, updateTags],
    );

    const removeTag = useCallback(
        (tag: string) => {
            const newTags = tags.filter((t) => t !== tag.toLowerCase());
            updateTags(newTags);
        },
        [tags, updateTags],
    );

    const toggleTag = useCallback(
        (tag: string) => {
            const lowercaseTag = tag.toLowerCase();
            const newTags = tags.includes(lowercaseTag)
                ? tags.filter((t) => t !== lowercaseTag)
                : [...tags, lowercaseTag];
            updateTags(newTags);
        },
        [tags, updateTags],
    );

    return {
        page,
        perPage,
        search: searchValue,
        searchParam,
        tags,
        setSearch: handleSearch,
        updateQueryParams: updateParams,
        updateTags,
        addTag,
        removeTag,
        toggleTag,
    };
};

export default usePaginationUrl;
