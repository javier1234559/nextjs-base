"use client";

import { RouteNames } from "@/globalConfig";
import { useParams, usePathname } from "next/navigation";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import PropertyDetailView from "@/feature/idx-detail/views/PropertyDetailView";
import { usePropertyDetail } from "@/feature/idx-detail/hooks/use-property";
import { extractIdAndAddress } from "@/feature/idx-detail/utils";
import { useEffect } from "react";

const TABS = [
  { label: "Overview", id: "overview" },
  { label: "Facts & Features", id: "facts-features" },
  { label: "Map & Directions", id: "map-directions" },
];

export default function PropertyDetailPage() {
  const params = useParams<{ slug?: string }>();
  const pathname = usePathname();

  const slug = params?.slug || "";

  // 🌀 Scroll to hash support
  useEffect(() => {
    if (typeof window !== "undefined") {
      useScrollToHash([window.location.hash]);
    }
  }, []);

  // 🧭 Extract ID & Address
  const { id, address } = extractIdAndAddress(slug);
  const { data, isLoading, error } = usePropertyDetail(id);

  // Debug
  console.log("Slug:", slug);
  console.log("Extracted ID:", id);
  console.log("Extracted Address:", address);
  console.log("Pathname:", pathname);

  const breadcrumb = [
    { title: "Home", href: RouteNames.Home },
    { title: "Properties", href: RouteNames.Properties },
    {
      title: address || "Property Detail",
      href: "#overview",
    },
  ];

  return (
    <div className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">
      <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack className="mt-8 border-none" />

      {/* Tabs Skeleton */}
      <div className="rounded-lg bg-muted/50 py-2 px-0">
        <nav className="flex space-x-8 overflow-x-auto">
          {TABS.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className="py-4 px-1 border-b-2 font-medium text-sm border-transparent text-muted-foreground hover:text-foreground hover:border-border transition-colors"
            >
              {tab.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Page Content */}
      <PropertyDetailView data={data} isLoading={isLoading} error={error} />
    </div>
  );
}
