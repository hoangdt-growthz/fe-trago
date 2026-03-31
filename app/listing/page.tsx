"use client";

import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/search-bar";
import PlaceCard from "@/components/place-card";
import BottomNav from "@/components/bottom-nav";
import { categories, places } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function ListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(searchParams.get("category"));

  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";

  const filtered = useMemo(() => {
    return places.filter((place) => {
      const matchCategory = activeCategory ? place.category === activeCategory : true;
      const haystack = `${place.name} ${place.address} ${place.tags.join(" ")}`.toLowerCase();
      const matchQuery = query ? haystack.includes(query) : true;
      return matchCategory && matchQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="app-shell min-h-screen pb-20">
      <div className="sticky top-0 z-40 border-b border-border bg-card/95 px-4 pb-3 pt-12 backdrop-blur-sm">
        <div className="mx-auto max-w-lg">
          <div className="mb-3 flex items-center gap-3">
            <button onClick={() => router.back()} className="text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Kham pha</h1>
          </div>
          <SearchBar defaultValue={searchParams.get("q") ?? ""} />
          <div className="scrollbar-hide mt-3 flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                !activeCategory ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              )}
            >
              Tat ca
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  activeCategory === category.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                )}
              >
                {category.icon} {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-4">
        <p className="mb-3 text-xs text-muted-foreground">{filtered.length} ket qua</p>
        <div className="grid gap-3">
          {filtered.map((place, index) => (
            <div
              key={place.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 60}ms`, animationFillMode: "backwards" }}
            >
              <PlaceCard place={place} variant="horizontal" />
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
