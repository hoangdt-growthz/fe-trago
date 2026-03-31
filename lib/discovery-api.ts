import type { Place } from "@/lib/mock-data";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";

export type DiscoveryCategory = {
  id: string;
  label: string;
  icon: string;
};

type ApiCategory = {
  slug: string;
  name: string;
};

type ApiPlace = {
  id: string;
  name: string;
  address: string | null;
  thumbnail: string | null;
  images: string[];
  rating: number | null;
  reviewCount: number | null;
  hoursText: string | null;
  category: ApiCategory | null;
};

type PlacesResponse = {
  total: number;
  items: ApiPlace[];
};

const categoryIcons: Record<string, string> = {
  cafe: "☕",
  food: "🍜",
  tea: "🍵",
  bakery: "🧁",
  bar: "🍷",
  sight: "🏛️",
  shop: "🛍️",
  spa: "💆"
};

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function inferCategorySlug(category: ApiCategory | null) {
  if (!category) return "food";

  const normalized = normalizeText(category.slug || category.name);
  if (normalized.includes("cafe") || normalized.includes("ca phe")) return "cafe";
  if (normalized.includes("tea") || normalized.includes("tra")) return "tea";
  if (normalized.includes("bakery") || normalized.includes("banh")) return "bakery";
  if (normalized.includes("bar")) return "bar";
  if (normalized.includes("spa")) return "spa";
  if (normalized.includes("shop") || normalized.includes("mua sam")) return "shop";
  if (normalized.includes("sight") || normalized.includes("tham quan")) return "sight";
  return "food";
}

function inferCategoryLabel(slug: string) {
  const labels: Record<string, string> = {
    cafe: "Ca phe",
    food: "An uong",
    tea: "Tra",
    bakery: "Banh",
    bar: "Bar",
    sight: "Tham quan",
    shop: "Mua sam",
    spa: "Spa"
  };

  return labels[slug] ?? "Dia diem";
}

function mapPlace(item: ApiPlace): Place {
  const category = inferCategorySlug(item.category);
  const image = item.thumbnail ?? item.images[0] ?? "https://placehold.co/600x400/f7efe4/8f6b47?text=TraGo";
  const hours = item.hoursText ?? "";
  const openNow = !hours || !/closed|dong/i.test(hours);

  return {
    id: item.id,
    name: item.name,
    category,
    image,
    rating: item.rating ?? 0,
    reviewCount: item.reviewCount ?? 0,
    distance: "Gan ban",
    priceRange: "--",
    openNow,
    closingTime: hours || "Khong ro",
    address: item.address ?? "Dang cap nhat dia chi",
    tags: [item.category?.name ?? inferCategoryLabel(category)].filter(Boolean)
  };
}

export function getCategoryIcon(slug: string) {
  return categoryIcons[slug] ?? "📍";
}

export function getFallbackCategories(): DiscoveryCategory[] {
  return Object.keys(categoryIcons).map((slug) => ({
    id: slug,
    label: inferCategoryLabel(slug),
    icon: getCategoryIcon(slug)
  }));
}

export async function fetchPlaces(params?: { limit?: number; category?: string; q?: string }): Promise<{ items: Place[]; total: number; apiOk: boolean }> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.category) searchParams.set("category", params.category);
    if (params?.q) searchParams.set("q", params.q);

    const query = searchParams.toString();
    const res = await fetch(`${API_BASE}/v1/places${query ? `?${query}` : ""}`, { cache: "no-store" });
    if (!res.ok) {
      return { items: [], total: 0, apiOk: false };
    }

    const data = (await res.json()) as PlacesResponse;
    return {
      items: data.items.map(mapPlace),
      total: data.total,
      apiOk: true
    };
  } catch {
    return { items: [], total: 0, apiOk: false };
  }
}

export async function getHomePlaces(): Promise<{ nearby: Place[]; popular: Place[]; apiOk: boolean }> {
  const result = await fetchPlaces({ limit: 8 });
  return {
    nearby: result.items.slice(0, 4),
    popular: result.items.slice(0, 6),
    apiOk: result.apiOk
  };
}
