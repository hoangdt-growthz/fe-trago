import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import PlaceDetailActions from "../../../components/place-detail-actions";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";

type PlaceDetail = {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  rating: number | null;
  reviewCount: number | null;
  hoursText: string | null;
  thumbnail: string | null;
  images: string[];
  typeRaw: string | null;
  latitude: number | null;
  longitude: number | null;
  category: { name: string } | null;
  tags: { tag: { name: string } }[];
};

async function getPlace(id: string): Promise<{ item: PlaceDetail | null; apiOk: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/v1/places/${id}`, { cache: "no-store" });
    if (!res.ok) return { item: null, apiOk: false };
    return { item: (await res.json()) as PlaceDetail, apiOk: true };
  } catch {
    return { item: null, apiOk: false };
  }
}

export default async function PlaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getPlace(id);

  if (!result.apiOk || !result.item) {
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-4 pb-10 pt-6 sm:px-6">
        <Card className="p-6">
          <p className="text-sm text-neutral-600">Cannot load place detail. Make sure API is running at {API_BASE}.</p>
          <div className="mt-4">
            <Link href="/">
              <Button variant="outline">Back to discovery</Button>
            </Link>
          </div>
        </Card>
      </main>
    );
  }

  const place = result.item;
  const cover = place.images?.[0] ?? place.thumbnail ?? "https://placehold.co/1200x780/f7efe4/8f6b47?text=TraGo";
  const hasMap = typeof place.latitude === "number" && typeof place.longitude === "number";
  const mapSrc = hasMap
    ? `https://www.google.com/maps?q=${place.latitude},${place.longitude}&z=15&output=embed`
    : null;
  const mapLink = hasMap ? `https://maps.google.com/?q=${place.latitude},${place.longitude}` : null;

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-10 pt-6 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <Link href="/">
          <Button variant="outline">Back</Button>
        </Link>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-neutral-700">
          {place.category?.name ?? "Local"}
        </span>
      </div>

      <Card className="mb-4">
        <div className="aspect-[4/3] sm:aspect-[16/9]">
          <img src={cover} alt={place.name} className="h-full w-full object-cover" />
        </div>
        <CardContent className="space-y-3 p-5">
          <h1 className="text-2xl font-semibold text-neutral-900">{place.name}</h1>
          <p className="text-sm text-neutral-600">{place.typeRaw ?? "Local destination"}</p>

          {place.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {place.tags.slice(0, 5).map((entry) => (
                <span key={entry.tag.name} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-neutral-700">
                  {entry.tag.name}
                </span>
              ))}
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            <div className="rounded-2xl bg-muted p-2">
              <p className="text-xs text-neutral-500">Rating</p>
              <p className="font-semibold">{place.rating ? `${place.rating.toFixed(1)} (${place.reviewCount ?? 0})` : "No rating"}</p>
            </div>
            <div className="rounded-2xl bg-muted p-2">
              <p className="text-xs text-neutral-500">Open</p>
              <p className="font-semibold">{place.hoursText ?? "Unknown"}</p>
            </div>
            <div className="rounded-2xl bg-muted p-2">
              <p className="text-xs text-neutral-500">Price</p>
              <p className="font-semibold">--</p>
            </div>
            <div className="rounded-2xl bg-muted p-2">
              <p className="text-xs text-neutral-500">Distance</p>
              <p className="font-semibold">~ nearby</p>
            </div>
          </div>

          <p className="text-sm leading-6 text-neutral-700">{place.description ?? "No description available yet."}</p>

          <div className="space-y-1 text-sm text-neutral-700">
            <p>{place.address ?? "Address updating"}</p>
            {place.phone ? <p>Phone: {place.phone}</p> : null}
            {place.website ? (
              <a href={place.website} target="_blank" rel="noreferrer" className="text-primary underline-offset-2 hover:underline">
                Website
              </a>
            ) : null}
          </div>

          <div className="flex gap-2 pt-1">
            {mapLink ? (
              <a href={mapLink} target="_blank" rel="noreferrer" className="flex-1">
                <Button className="w-full">Open Map</Button>
              </a>
            ) : (
              <Button className="flex-1" disabled>
                Map unavailable
              </Button>
            )}
            <PlaceDetailActions placeId={place.id} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 sm:p-4">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">Map preview</h2>
          {mapSrc ? (
            <iframe
              title={`Map for ${place.name}`}
              src={mapSrc}
              loading="lazy"
              className="h-64 w-full rounded-2xl border border-border"
            />
          ) : (
            <div className="rounded-2xl border border-border bg-muted p-4 text-sm text-neutral-600">Coordinates are unavailable for this place.</div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
