"use client";

import { Clock, MapPin, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Place } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface PlaceCardProps {
  place: Place;
  variant?: "default" | "compact" | "horizontal";
}

export default function PlaceCard({ place, variant = "default" }: PlaceCardProps) {
  const router = useRouter();
  const href = `/places/${place.id}`;

  if (variant === "horizontal") {
    return (
      <button
        onClick={() => router.push(href)}
        className="flex w-full gap-3 rounded-xl bg-card p-3 text-left shadow-card transition-shadow hover:shadow-card-hover"
      >
        <img src={place.image} alt={place.name} className="h-20 w-20 flex-shrink-0 rounded-lg object-cover" />
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <h3 className="truncate text-sm font-semibold text-foreground">{place.name}</h3>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">
                {place.distance} · {place.address}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-star text-star" />
              <span className="text-xs font-semibold">{place.rating}</span>
              <span className="text-xs text-muted-foreground">({place.reviewCount})</span>
            </div>
            <span className="text-xs font-semibold text-primary">{place.priceRange}</span>
          </div>
        </div>
      </button>
    );
  }

  if (variant === "compact") {
    return (
      <button onClick={() => router.push(href)} className="w-36 flex-shrink-0 text-left">
        <img src={place.image} alt={place.name} className="h-24 w-full rounded-xl object-cover" />
        <h3 className="mt-1.5 truncate text-sm font-semibold text-foreground">{place.name}</h3>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-star text-star" />
          <span className="text-xs font-medium">{place.rating}</span>
          <span className="text-xs text-muted-foreground">· {place.distance}</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => router.push(href)}
      className="group w-full overflow-hidden rounded-2xl bg-card text-left shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="relative">
        <img
          src={place.image}
          alt={place.name}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={cn(
            "absolute right-3 top-3 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            place.openNow ? "bg-primary/90 text-primary-foreground" : "bg-destructive/90 text-destructive-foreground"
          )}
        >
          <Clock className="h-3 w-3" />
          {place.openNow ? `Mo · den ${place.closingTime}` : "Da dong"}
        </div>
      </div>
      <div className="space-y-2 p-3">
        <h3 className="line-clamp-1 font-semibold text-foreground">{place.name}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="line-clamp-1">{place.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-star text-star" />
            <span className="font-semibold text-foreground">{place.rating}</span>
          </div>
          <span className="text-muted-foreground">•</span>
          <span className="font-semibold text-primary">{place.priceRange}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {place.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-tea-50 px-2 py-0.5 text-[10px] font-medium text-tea-600">
              {tag}
            </span>
          ))}
          {place.reviewCount > 0 ? (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {place.reviewCount} danh gia
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}
