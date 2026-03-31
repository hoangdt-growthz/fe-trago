"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Bell,
  FolderOpen,
  Image,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  Newspaper,
  Settings,
  Sparkles,
  Users
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/components/admin/admin-auth";

const mainNav = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Places", href: "/admin/places", icon: MapPin },
  { title: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Collections", href: "/admin/collections", icon: FolderOpen },
  { title: "News", href: "/admin/news", icon: Newspaper },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart3 }
];

const configNav = [
  { title: "AI Settings", href: "/admin/ai-settings", icon: Sparkles },
  { title: "Banners", href: "/admin/banners", icon: Image },
  { title: "Settings", href: "/admin/settings", icon: Settings }
];

export function AdminShell({
  title,
  description,
  actions,
  children
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItemClass = (href: string) =>
    cn(
      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
      pathname === href || (href !== "/admin" && pathname.startsWith(href))
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    );

  const sidebar = (
    <aside className="flex h-full w-72 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-2.5 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <MapPin className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <p className="text-lg font-semibold tracking-tight text-foreground">TraGo</p>
          <p className="text-xs text-muted-foreground">Admin Console</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 pb-4">
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Main</div>
        <nav className="space-y-1">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className={navItemClass(item.href)} onClick={() => setMobileOpen(false)}>
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="mb-3 mt-6 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Configuration</div>
        <nav className="space-y-1">
          {configNav.map((item) => (
            <Link key={item.href} href={item.href} className={navItemClass(item.href)} onClick={() => setMobileOpen(false)}>
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-xl bg-secondary px-3 py-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">AD</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{user?.name ?? "Admin User"}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.email ?? "admin@trago.app"}</p>
          </div>
          <button
            onClick={() => {
              logout();
              router.replace("/admin/login");
            }}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_98.5%)] text-foreground">
      <div className="lg:hidden">
        <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-card px-4">
          <button onClick={() => setMobileOpen(true)} className="text-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold">TraGo Admin</span>
          <button className="text-muted-foreground">
            <Bell className="h-4 w-4" />
          </button>
        </div>
        {mobileOpen ? (
          <div className="fixed inset-0 z-50 bg-black/30" onClick={() => setMobileOpen(false)}>
            <div className="h-full w-72" onClick={(event) => event.stopPropagation()}>
              {sidebar}
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex min-h-screen">
        <div className="hidden lg:block">{sidebar}</div>
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-base font-semibold text-foreground">{title}</h1>
              {description ? <p className="hidden truncate text-xs text-muted-foreground sm:block">{description}</p> : null}
            </div>
            <div className="flex items-center gap-2">
              {actions}
              <button className="relative rounded-lg border border-border bg-background p-2 text-muted-foreground">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </button>
            </div>
          </header>

          <main className="p-4 pt-[4.5rem] lg:p-6 lg:pt-6">
            <div className="space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
