"use client";

import { useState } from "react";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/bottom-nav";
import PlaceCard from "@/components/place-card";
import { places } from "@/lib/mock-data";

export default function SavedPage() {
  const router = useRouter();
  const [savedPlaces, setSavedPlaces] = useState(places.slice(0, 5));

  return (
    <div className="app-shell min-h-screen pb-20">
      <div className="sticky top-0 z-40 border-b border-border bg-card/95 px-4 pb-3 pt-12 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <button onClick={() => router.back()} className="rounded-full p-1.5 transition-colors hover:bg-muted">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="flex-1 text-base font-bold text-foreground">Da luu</h1>
          <span className="text-xs font-medium text-muted-foreground">{savedPlaces.length} dia diem</span>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-4">
        {savedPlaces.length > 0 ? (
          <div className="space-y-3">
            {savedPlaces.map((place) => (
              <div key={place.id} className="relative">
                <PlaceCard place={place} variant="horizontal" />
                <button
                  onClick={() => setSavedPlaces((current) => current.filter((item) => item.id !== place.id))}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/90 text-destructive shadow-sm transition-colors hover:bg-destructive/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tea-50">
              <Heart className="h-7 w-7 text-primary" />
            </div>
            <p className="mt-4 text-sm font-medium text-foreground">Chua co dia diem nao</p>
            <p className="mt-1 text-xs text-muted-foreground">Luu dia diem yeu thich de xem lai sau</p>
            <button
              onClick={() => router.push("/listing")}
              className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Kham pha ngay
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
