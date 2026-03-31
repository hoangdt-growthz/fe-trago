"use client";

import { Bell, ChevronRight, Clock, Heart, HelpCircle, LogOut, MapPin, Settings, Shield, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNav from "@/components/bottom-nav";
import { useRouter } from "next/navigation";

const menuItems = [
  { icon: Clock, label: "Lich su tim kiem", path: "/search-history" },
  { icon: Heart, label: "Dia diem yeu thich", path: "/saved" },
  { icon: Star, label: "Danh gia cua toi", path: "#" },
  { icon: Bell, label: "Thong bao", path: "#" },
  { icon: Shield, label: "Quyen rieng tu", path: "#" },
  { icon: HelpCircle, label: "Tro giup va ho tro", path: "#" }
];

const stats = [
  { value: "12", label: "Da luu" },
  { value: "8", label: "Danh gia" },
  { value: "24", label: "Da ghe" }
];

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="app-shell min-h-screen pb-20">
      <div className="bg-primary px-4 pb-8 pt-12">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-primary-foreground">Tai khoan</h1>
            <button className="rounded-full p-2 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10">
              <Settings className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary-foreground/20">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face" alt="Nguyen Minh" />
              <AvatarFallback className="bg-tea-100 text-lg font-bold text-primary">TG</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-bold text-primary-foreground">Nguyen Minh</h2>
              <p className="text-sm text-primary-foreground/70">minh.nguyen@email.com</p>
              <div className="mt-1 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-primary-foreground/60" />
                <span className="text-xs text-primary-foreground/60">Ha Noi, Viet Nam</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-around rounded-2xl bg-primary-foreground/10 px-4 py-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-xs text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-6">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => item.path !== "#" && router.push(item.path)}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted ${
                index !== menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-tea-50">
                <item.icon className="h-[18px] w-[18px] text-primary" />
              </div>
              <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/20 bg-destructive/5 py-3.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          Dang xuat
        </button>

        <p className="mt-6 text-center text-xs text-muted-foreground">TraGo v1.0.0</p>
      </div>

      <BottomNav />
    </div>
  );
}
