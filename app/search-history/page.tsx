"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Search, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/bottom-nav";
import PlaceCard from "@/components/place-card";
import { places, type Place } from "@/lib/mock-data";
import { fetchPlaces } from "@/lib/discovery-api";
import { clearSearchHistory, getSearchHistory, getViewedPlaceIds, removeSearchHistory, type SearchHistoryItem } from "@/lib/user-state";

export default function SearchHistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [recentPlaces, setRecentPlaces] = useState<Place[]>(places.slice(0, 4));

  useEffect(() => {
    let cancelled = false;
    setHistory(getSearchHistory());

    fetchPlaces({ limit: 50 }).then((result) => {
      if (cancelled) return;
      const source = result.apiOk && result.items.length > 0 ? result.items : places;
      const viewedIds = getViewedPlaceIds();
      const next = source.filter((item) => viewedIds.includes(item.id)).sort((a, b) => viewedIds.indexOf(a.id) - viewedIds.indexOf(b.id));
      setRecentPlaces(next.length > 0 ? next.slice(0, 4) : source.slice(0, 4));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="app-shell min-h-screen pb-20">
      <div className="sticky top-0 z-40 border-b border-border bg-card/95 px-4 pb-3 pt-12 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <button onClick={() => router.back()} className="rounded-full p-1.5 transition-colors hover:bg-muted">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="flex-1 text-base font-bold text-foreground">Lich su tim kiem</h1>
          {history.length > 0 && (
            <button
              onClick={() => {
                clearSearchHistory();
                setHistory([]);
              }}
              className="flex items-center gap-1 text-xs font-medium text-destructive transition-colors hover:text-destructive/80"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Xoa tat ca
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-4">
        {history.length > 0 ? (
          <div className="space-y-1">
            {history.map((item) => (
              <div key={item.id} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted">
                <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                <button onClick={() => router.push(`/listing?q=${encodeURIComponent(item.query)}`)} className="flex flex-1 flex-col text-left">
                  <span className="text-sm font-medium text-foreground">{item.query}</span>
                  <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                </button>
                <button
                  onClick={() => setHistory(removeSearchHistory(item.id))}
                  className="rounded-full p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-border group-hover:opacity-100"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tea-50">
              <Search className="h-7 w-7 text-primary" />
            </div>
            <p className="mt-4 text-sm font-medium text-foreground">Chua co lich su tim kiem</p>
            <p className="mt-1 text-xs text-muted-foreground">Bat dau kham pha cac dia diem quanh ban</p>
          </div>
        )}

        <div className="mt-8">
          <h2 className="mb-3 text-sm font-bold text-foreground">Da xem gan day</h2>
          <div className="space-y-3">
            {recentPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} variant="horizontal" />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
