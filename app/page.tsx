import { ChevronRight, MapPin } from "lucide-react";
import SearchBar from "@/components/search-bar";
import PlaceCard from "@/components/place-card";
import BottomNav from "@/components/bottom-nav";
import { categories, places } from "@/lib/mock-data";
import { getCategoryIcon, getHomePlaces } from "@/lib/discovery-api";

export default async function HomePage() {
  const { nearby: apiNearby, popular: apiPopular, apiOk } = await getHomePlaces();
  const nearby = apiOk && apiNearby.length > 0 ? apiNearby : places.slice(0, 4);
  const popular = apiOk && apiPopular.length > 0 ? apiPopular : places.slice(2, 6);

  return (
    <div className="app-shell min-h-screen pb-20">
      <div className="bg-primary px-4 pb-6 pt-12">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-foreground/70">Xin chao</p>
              <h1 className="text-lg font-bold text-primary-foreground">Kham pha quanh ban</h1>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-primary-foreground/15 px-3 py-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary-foreground" />
              <span className="text-xs font-medium text-primary-foreground">Ha Noi</span>
            </div>
          </div>
          <div className="mt-4">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4">
        <div className="mt-5">
          <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-1">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/listing?category=${category.id}`}
                className="flex flex-shrink-0 flex-col items-center gap-1.5 rounded-xl bg-card px-4 py-3 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span className="text-2xl">{getCategoryIcon(category.id) || category.icon}</span>
                <span className="text-xs font-medium text-foreground">{category.label}</span>
              </a>
            ))}
          </div>
        </div>

        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Gan ban</h2>
            <a href="/listing" className="flex items-center gap-0.5 text-xs font-medium text-primary">
              Xem tat ca <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="scrollbar-hide mt-3 flex gap-3 overflow-x-auto pb-1">
            {nearby.map((place) => (
              <PlaceCard key={place.id} place={place} variant="compact" />
            ))}
          </div>
        </section>

        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Pho bien</h2>
            <a href="/listing" className="flex items-center gap-0.5 text-xs font-medium text-primary">
              Xem tat ca <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {popular.map((place, index) => (
              <div
                key={place.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
              >
                <PlaceCard place={place} />
              </div>
            ))}
          </div>
        </section>

        <a
          href="/ai-suggest"
          className="mb-4 mt-6 flex w-full items-center gap-3 rounded-2xl bg-gradient-to-r from-badge-ai/10 to-tea-50 p-4 transition-shadow hover:shadow-card-hover"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-badge-ai/15 text-lg">✨</span>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">AI goi y cho ban</p>
            <p className="text-xs text-muted-foreground">De TraGo tim noi phu hop nhat</p>
          </div>
          <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
        </a>
      </div>

      <BottomNav />
    </div>
  );
}
