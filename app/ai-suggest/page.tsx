"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/bottom-nav";
import PlaceCard from "@/components/place-card";
import { aiSuggestions, places, type Place } from "@/lib/mock-data";
import { fetchPlaces } from "@/lib/discovery-api";
import { addSearchHistory } from "@/lib/user-state";

type SuggestionResult = {
  id: string;
  query: string;
  reason: string;
  results: Place[];
};

export default function AISuggestPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState<Place[]>(places);
  const [threads, setThreads] = useState<SuggestionResult[]>(aiSuggestions);

  useEffect(() => {
    let cancelled = false;

    fetchPlaces({ limit: 50 }).then((result) => {
      if (!cancelled && result.apiOk && result.items.length > 0) {
        setCatalog(result.items);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  function buildSuggestion(input: string): SuggestionResult {
    const normalized = input.toLowerCase();
    const scored = catalog
      .map((place) => {
        const haystack = `${place.name} ${place.address} ${place.category} ${place.tags.join(" ")}`.toLowerCase();
        let score = 0;
        for (const token of normalized.split(/\s+/)) {
          if (token && haystack.includes(token)) score += 1;
        }
        score += place.rating;
        return { place, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.place);

    return {
      id: `${Date.now()}`,
      query: input,
      reason: scored.length > 0 ? "TraGo uu tien cac dia diem co danh gia tot va lien quan den nhu cau ban vua nhap." : "Chua tim thay ket qua sat nghia. Thu mo rong tu khoa tim kiem.",
      results: scored
    };
  }

  function onSubmit() {
    const value = query.trim();
    if (!value) return;
    addSearchHistory(value);
    setThreads((current) => [buildSuggestion(value), ...current]);
    setQuery("");
  }

  return (
    <div className="app-shell min-h-screen pb-20">
      <div className="bg-gradient-to-br from-badge-ai/10 via-background to-tea-50 px-4 pb-6 pt-12">
        <div className="mx-auto max-w-lg">
          <div className="mb-4 flex items-center gap-3">
            <button onClick={() => router.back()} className="text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold text-foreground">AI Goi y</h1>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-card p-1.5 shadow-card">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-badge-ai/10">
              <Sparkles className="h-4 w-4 text-badge-ai" />
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onSubmit();
                }
              }}
              placeholder="Ban muon di dau, lam gi?"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button onClick={onSubmit} className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="scrollbar-hide mt-3 flex gap-2 overflow-x-auto">
            {["Ca phe yen tinh", "An trua ngon", "Date cuoi tuan", "Tra chieu"].map((item) => (
              <button
                key={item}
                onClick={() => setQuery(item)}
                className="flex-shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-4">
        {threads.map((suggestion, index) => (
          <div
            key={suggestion.id}
            className="mb-5 animate-fade-up"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
          >
            <div className="mb-2 ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5">
              <p className="text-sm text-primary-foreground">{suggestion.query}</p>
            </div>
            <div className="flex gap-2">
              <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-badge-ai/15">
                <Sparkles className="h-3.5 w-3.5 text-badge-ai" />
              </div>
              <div className="flex-1">
                <p className="mb-2 text-sm text-muted-foreground">{suggestion.reason}</p>
                <div className="space-y-2">
                  {suggestion.results.map((place) => (
                    <PlaceCard key={place.id} place={place} variant="horizontal" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
