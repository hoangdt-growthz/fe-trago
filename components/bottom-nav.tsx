"use client";

import { Bookmark, Home, Search, Sparkles, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Trang chu", icon: Home },
  { path: "/listing", label: "Kham pha", icon: Search },
  { path: "/ai-suggest", label: "AI Goi y", icon: Sparkles },
  { path: "/saved", label: "Da luu", icon: Bookmark },
  { path: "/profile", label: "Toi", icon: User }
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {navItems.map((item) => {
          const active = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", item.path === "/ai-suggest" && active && "text-badge-ai")} />
              <span className={cn("font-medium", item.path === "/ai-suggest" && active && "text-badge-ai")}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
