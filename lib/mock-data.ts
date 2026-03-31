export interface Place {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance: string;
  priceRange: string;
  openNow: boolean;
  closingTime: string;
  address: string;
  tags: string[];
  description?: string;
  phone?: string;
  photos?: string[];
}

export const categories = [
  { id: "cafe", label: "Ca phe", icon: "☕" },
  { id: "food", label: "An uong", icon: "🍜" },
  { id: "tea", label: "Tra", icon: "🍵" },
  { id: "bakery", label: "Banh", icon: "🧁" },
  { id: "bar", label: "Bar", icon: "🍷" },
  { id: "sight", label: "Tham quan", icon: "🏛️" },
  { id: "shop", label: "Mua sam", icon: "🛍️" },
  { id: "spa", label: "Spa", icon: "💆" }
];

export const places: Place[] = [
  {
    id: "1",
    name: "Cong Ca Phe",
    category: "cafe",
    image: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 328,
    distance: "0.3 km",
    priceRange: "25k-60k",
    openNow: true,
    closingTime: "22:30",
    address: "152 Trieu Viet Vuong, Hai Ba Trung",
    tags: ["Yen tinh", "Wifi tot"]
  },
  {
    id: "2",
    name: "Pho Thin Bo Ho",
    category: "food",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 1205,
    distance: "0.8 km",
    priceRange: "45k-70k",
    openNow: true,
    closingTime: "21:00",
    address: "13 Lo Duc, Hai Ba Trung",
    tags: ["Dong khach", "Dac san"]
  },
  {
    id: "3",
    name: "The Coffee House",
    category: "cafe",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop",
    rating: 4.3,
    reviewCount: 567,
    distance: "0.5 km",
    priceRange: "30k-75k",
    openNow: true,
    closingTime: "23:00",
    address: "42 Nguyen Hue, Quan 1",
    tags: ["Rong rai", "May lanh"]
  },
  {
    id: "4",
    name: "Bun cha Huong Lien",
    category: "food",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 892,
    distance: "1.2 km",
    priceRange: "40k-65k",
    openNow: false,
    closingTime: "20:00",
    address: "24 Le Van Huu, Hai Ba Trung",
    tags: ["Obama da den", "Noi tieng"]
  },
  {
    id: "5",
    name: "Tra Sen Tay Ho",
    category: "tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 234,
    distance: "2.1 km",
    priceRange: "50k-120k",
    openNow: true,
    closingTime: "21:30",
    address: "12 Dang Thai Mai, Tay Ho",
    tags: ["View ho", "Tra ngon"]
  },
  {
    id: "6",
    name: "Tiem Banh Brodard",
    category: "bakery",
    image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 445,
    distance: "1.5 km",
    priceRange: "35k-90k",
    openNow: true,
    closingTime: "22:00",
    address: "11 Nguyen Thiep, Quan 1",
    tags: ["Banh ngon", "Lau doi"]
  }
];

export const aiSuggestions = [
  {
    id: "s1",
    query: "Tim quan ca phe yen tinh de lam viec gan day",
    results: [places[0], places[2]],
    reason: "Hai quan nay duoc danh gia cao ve khong gian yen tinh va wifi on dinh, phu hop de lam viec."
  },
  {
    id: "s2",
    query: "Doi bung, goi y quan an ngon gan day",
    results: [places[1], places[3]],
    reason: "Dua tren danh gia va khoang cach, day la 2 lua chon tot nhat cho bua an gan ban."
  },
  {
    id: "s3",
    query: "Cuoi tuan muon uong tra, ngam canh",
    results: [places[4]],
    reason: "Tra Sen Tay Ho co view ho dep va tra sen truyen thong, ly tuong cho cuoi tuan thu gian."
  }
];
