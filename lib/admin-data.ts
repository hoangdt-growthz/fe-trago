export type AdminStatus =
  | "active"
  | "inactive"
  | "pending"
  | "approved"
  | "rejected"
  | "draft"
  | "archived"
  | "published"
  | "flagged";

export const dashboardPlaces = [
  { id: "1", name: "Cafe Botanical", city: "Istanbul", rating: 4.8, status: "active" as const, views: 1240 },
  { id: "2", name: "The Hidden Garden", city: "Antalya", rating: 4.5, status: "pending" as const, views: 890 },
  { id: "3", name: "Mountain Lodge", city: "Bursa", rating: 4.9, status: "active" as const, views: 2100 },
  { id: "4", name: "Harbor Bistro", city: "Izmir", rating: 4.2, status: "draft" as const, views: 340 },
  { id: "5", name: "Sky Lounge Bar", city: "Ankara", rating: 4.6, status: "active" as const, views: 1560 }
];

export const dashboardReviews = [
  { id: "1", user: "Ayse K.", place: "Cafe Botanical", rating: 5, status: "approved" as const, date: "2h ago" },
  { id: "2", user: "Mehmet A.", place: "Mountain Lodge", rating: 4, status: "pending" as const, date: "4h ago" },
  { id: "3", user: "Zeynep T.", place: "Sky Lounge Bar", rating: 2, status: "flagged" as const, date: "6h ago" }
];

export const adminPlaces = [
  { id: "1", name: "Cafe Botanical", city: "Istanbul", category: "Cafe", rating: 4.8, reviews: 124, status: "active" as const },
  { id: "2", name: "The Hidden Garden", city: "Antalya", category: "Restaurant", rating: 4.5, reviews: 89, status: "pending" as const },
  { id: "3", name: "Mountain Lodge", city: "Bursa", category: "Hotel", rating: 4.9, reviews: 210, status: "active" as const },
  { id: "4", name: "Harbor Bistro", city: "Izmir", category: "Restaurant", rating: 4.2, reviews: 34, status: "draft" as const },
  { id: "5", name: "Sky Lounge Bar", city: "Ankara", category: "Bar", rating: 4.6, reviews: 156, status: "active" as const },
  { id: "6", name: "Ocean Breeze Resort", city: "Bodrum", category: "Hotel", rating: 4.7, reviews: 312, status: "active" as const },
  { id: "7", name: "Spice Market Deli", city: "Istanbul", category: "Cafe", rating: 4.1, reviews: 67, status: "inactive" as const }
];

export const adminReviews = [
  { id: "1", user: "Ayse K.", place: "Cafe Botanical", rating: 5, comment: "Amazing atmosphere and great coffee!", status: "pending" as const, date: "2025-03-30" },
  { id: "2", user: "Mehmet A.", place: "Mountain Lodge", rating: 4, comment: "Beautiful views, food could be better.", status: "pending" as const, date: "2025-03-30" },
  { id: "3", user: "Zeynep T.", place: "Sky Lounge Bar", rating: 2, comment: "Service was terrible, waited 45 minutes.", status: "flagged" as const, date: "2025-03-29" },
  { id: "4", user: "Ali R.", place: "Harbor Bistro", rating: 5, comment: "Best seafood in Izmir hands down!", status: "approved" as const, date: "2025-03-29" },
  { id: "5", user: "Fatma S.", place: "The Hidden Garden", rating: 4, comment: "Lovely spot, a bit pricey though.", status: "approved" as const, date: "2025-03-28" },
  { id: "6", user: "Can M.", place: "Spice Market Deli", rating: 1, comment: "Spam review content...", status: "rejected" as const, date: "2025-03-28" }
];

export const adminUsers = [
  { id: "1", name: "Ayse Kaya", email: "ayse@email.com", reviews: 24, places: 5, status: "active" as const, joined: "Jan 2025" },
  { id: "2", name: "Mehmet Arslan", email: "mehmet@email.com", reviews: 18, places: 3, status: "active" as const, joined: "Feb 2025" },
  { id: "3", name: "Zeynep Tan", email: "zeynep@email.com", reviews: 42, places: 12, status: "active" as const, joined: "Dec 2024" },
  { id: "4", name: "Ali Rezai", email: "ali@email.com", reviews: 7, places: 1, status: "inactive" as const, joined: "Mar 2025" },
  { id: "5", name: "Fatma Sari", email: "fatma@email.com", reviews: 31, places: 8, status: "active" as const, joined: "Nov 2024" }
];

export const adminCollections = [
  { id: "1", name: "Best Rooftop Bars", description: "Curated list of the best rooftop bars across Turkey", placesCount: 12, status: "published" as const, updatedAt: "2 days ago" },
  { id: "2", name: "Hidden Gems Istanbul", description: "Under-the-radar spots in Istanbul", placesCount: 24, status: "published" as const, updatedAt: "1 week ago" },
  { id: "3", name: "Family Friendly Hotels", description: "Top hotels for families with kids", placesCount: 8, status: "draft" as const, updatedAt: "3 days ago" },
  { id: "4", name: "Coffee Lovers Guide", description: "Specialty coffee shops you must visit", placesCount: 16, status: "published" as const, updatedAt: "5 days ago" }
];

export const adminNews = [
  { id: "1", title: "TraGo launches spring discovery campaign", type: "System Announcement", status: "published" as const, placeName: "-", date: "2025-03-29" },
  { id: "2", title: "Cafe Botanical wins editor pick", type: "Place News", status: "published" as const, placeName: "Cafe Botanical", date: "2025-03-27" },
  { id: "3", title: "Weekend collection refresh draft", type: "System Announcement", status: "draft" as const, placeName: "-", date: "2025-03-25" }
];

export const placeNewsMap: Record<
  string,
  { id: string; title: string; status: "published" | "draft" | "archived"; date: string; views: number }[]
> = {
  "1": [
    { id: "n1", title: "Grand Opening Weekend Special", status: "published", date: "2026-03-28", views: 1240 },
    { id: "n2", title: "New Spring Menu Available", status: "draft", date: "2026-03-30", views: 0 }
  ],
  "2": [{ id: "n3", title: "Garden Night Event This Saturday", status: "published", date: "2026-03-25", views: 560 }],
  "4": [{ id: "n4", title: "New Menu Launch - Spring Collection", status: "published", date: "2026-03-27", views: 890 }],
  "5": [{ id: "n5", title: "Live Music Every Friday", status: "published", date: "2026-03-22", views: 670 }],
  "6": [{ id: "n6", title: "Renovation Complete - Reopening", status: "archived", date: "2026-03-15", views: 2100 }]
};

export const adminBanners = [
  { id: "1", title: "Summer Sale - Hotels", placement: "Homepage Hero", status: "active" as const, impressions: 45200, clicks: 1230, startDate: "2025-03-01" },
  { id: "2", title: "New Places in Istanbul", placement: "Search Results", status: "active" as const, impressions: 22100, clicks: 890, startDate: "2025-03-15" },
  { id: "3", title: "App Download CTA", placement: "Place Detail", status: "draft" as const, impressions: 0, clicks: 0, startDate: "2025-04-01" },
  { id: "4", title: "Winter Collection", placement: "Homepage Hero", status: "inactive" as const, impressions: 68300, clicks: 2100, startDate: "2024-12-01" }
];

export const analyticsMonthly = [
  { name: "Oct", users: 820, views: 24000, reviews: 340 },
  { name: "Nov", users: 1100, views: 31000, reviews: 520 },
  { name: "Dec", users: 1400, views: 42000, reviews: 680 },
  { name: "Jan", users: 1350, views: 38000, reviews: 590 },
  { name: "Feb", users: 1800, views: 52000, reviews: 820 },
  { name: "Mar", users: 2100, views: 61000, reviews: 940 }
];
