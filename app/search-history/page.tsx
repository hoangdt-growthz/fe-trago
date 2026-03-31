"use client";

import { useState } from "react";
import { ArrowLeft, Clock, Search, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/bottom-nav";
import PlaceCard from "@/components/place-card";
import { places } from "@/lib/mock-data";

const initialHistory = [
  { id: "1", query: "Ca phe view dep", timestamp: "Hom nay, 10:30" },
  { id: "2", query: "Pho Ha Noi", timestamp: "Hom nay, 08:15" },
  { id: "3", query: "Quan an gan day", timestamp: "Hom qua, 19:00" },
  { id: "4", query: "Tra sua Thai Nguyen", timestamp: "Hom qua, 14:20" },
  { id: "5", query: "Nha hang hai san", timestamp: "3 ngay truoc" },
  { id: "6", query: "Quan bar rooftop", timestamp: "5 ngay truoc" }
];

export default function SearchHistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState(initialHistory);

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
              onClick={() => setHistory([])}
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
                  onClick={() => setHistory((current) => current.filter((entry) => entry.id !== item.id))}
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
            {places.slice(0, 4).map((place) => (
              <PlaceCard key={place.id} place={place} variant="horizontal" />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
