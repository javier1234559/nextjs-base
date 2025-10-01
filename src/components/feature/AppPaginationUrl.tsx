import { memo } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function AppPaginationUrl({
    currentPage,
    totalPages,
    onPageChange,
}: AppPaginationProps) {
    const isMobile = useIsMobile();

    const generatePaginationItems = () => {
        // Show only current page on small screens
        if (isMobile) {
            return (
                <PaginationItem key={currentPage}>
                    <PaginationLink isActive={true}>{currentPage}</PaginationLink>
                </PaginationItem>
            );
        }

        const items = [];
        const maxVisiblePages = 5;

        // Always show first page
        items.push(
            <PaginationItem key={1}>
                <PaginationLink
                    onClick={() => onPageChange(1)}
                    isActive={currentPage === 1}
                >
                    1
                </PaginationLink>
            </PaginationItem>,
        );

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is small
            for (let i = 2; i <= totalPages; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={() => onPageChange(i)}
                            isActive={currentPage === i}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>,
                );
            }
        } else {
            // Show ellipsis and surrounding pages for current page
            if (currentPage > 3) {
                items.push(<PaginationEllipsis key="ellipsis-1" />);
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            onClick={() => onPageChange(i)}
                            isActive={currentPage === i}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>,
                );
            }

            if (currentPage < totalPages - 2) {
                items.push(<PaginationEllipsis key="ellipsis-2" />);
            }

            // Always show last page
            if (totalPages > 1) {
                items.push(
                    <PaginationItem key={totalPages}>
                        <PaginationLink
                            onClick={() => onPageChange(totalPages)}
                            isActive={currentPage === totalPages}
                        >
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>,
                );
            }
        }

        return items;
    };

    return (
        <Pagination className="w-fit m-0">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        className={`${currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                            }`}
                    >
                        {isMobile ? "" : "Previous"}
                    </PaginationPrevious>
                </PaginationItem>

                {generatePaginationItems()}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        className={`${currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                            }`}
                    >
                        {isMobile ? "" : "Next"}
                    </PaginationNext>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default memo(AppPaginationUrl);
