"use client";

import { ArrowLeft, Bookmark, Clock, MapPin, Navigation, Phone, Share2, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { places } from "@/lib/mock-data";

export default function DetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const place = places.find((item) => item.id === params.id) ?? places[0];

  return (
    <div className="app-shell min-h-screen pb-6">
      <div className="relative">
        <img src={place.image} alt={place.name} className="h-64 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        <button
          onClick={() => router.back()}
          className="absolute left-4 top-12 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <div className="absolute right-4 top-12 flex gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm">
            <Share2 className="h-4 w-4 text-foreground" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm">
            <Bookmark className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4">
        <div className="relative -mt-6 rounded-2xl bg-card p-4 shadow-card">
          <h1 className="text-xl font-bold text-foreground">{place.name}</h1>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-star text-star" />
              <span className="text-sm font-semibold">{place.rating}</span>
              <span className="text-xs text-muted-foreground">({place.reviewCount} danh gia)</span>
            </div>
            <span className="text-sm font-semibold text-primary">{place.priceRange}</span>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>
                {place.address} · {place.distance}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <span className={place.openNow ? "font-medium text-primary" : "font-medium text-destructive"}>
                {place.openNow ? `Dang mo · den ${place.closingTime}` : "Da dong cua"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span>0123 456 789</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {place.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-tea-50 px-2.5 py-1 text-xs font-medium text-tea-600">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <section className="mt-4">
          <h2 className="text-sm font-bold text-foreground">Gioi thieu</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Mot trong nhung dia diem duoc yeu thich nhat khu vuc. Khong gian am cung, phuc vu tan tam, menu da dang phu
            hop moi lua tuoi. Noi day phu hop cho gap go ban be va gia dinh.
          </p>
        </section>

        <section className="mt-4">
          <h2 className="text-sm font-bold text-foreground">Hinh anh</h2>
          <div className="scrollbar-hide mt-2 flex gap-2 overflow-x-auto">
            {[place.image,
              "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop",
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop"].map((image, index) => (
              <img key={index} src={image} alt="" className="h-24 w-32 flex-shrink-0 rounded-xl object-cover" />
            ))}
          </div>
        </section>

        <div className="mt-6 flex gap-3">
          <Button className="h-12 flex-1 gap-2 rounded-xl text-sm font-semibold">
            <Navigation className="h-4 w-4" />
            Chi duong
          </Button>
          <Button variant="outline" className="h-12 flex-1 gap-2 rounded-xl border-primary text-sm font-semibold text-primary hover:bg-tea-50">
            <Phone className="h-4 w-4" />
            Goi dien
          </Button>
        </div>
      </div>
    </div>
  );
}
