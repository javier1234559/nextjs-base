"use client";

import { memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AppBreadcrumbProps {
  breadcrumb: { title: string; href?: string }[];
  isHiddenBack?: boolean;
  className?: string;
}

function AppBreadcrumb({
  breadcrumb,
  isHiddenBack,
  className,
}: AppBreadcrumbProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={`border-b ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-4 flex justify-between items-center">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          {breadcrumb.map((item, index) => (
            <div key={index} className="flex items-center">
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-gray-900 cursor-pointer transition-colors"
                >
                  {item.title}
                </Link>
              ) : (
                <span
                  className={`${index === breadcrumb.length - 1
                    ? "text-gray-900 font-medium"
                    : ""
                    }`}
                >
                  {item.title}
                </span>
              )}
              {index < breadcrumb.length - 1 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
            </div>
          ))}
        </nav>

        {!isHiddenBack && (
          <Button
            onClick={handleGoBack}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export default memo(AppBreadcrumb);
