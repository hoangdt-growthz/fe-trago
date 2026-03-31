"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const STORAGE_KEY = "trago-admin-user";

type AdminUser = {
  name: string;
  email: string;
  role: string;
};

type AdminAuthContextValue = {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUser(JSON.parse(stored) as AdminUser);
    }
  }, []);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      isAuthenticated: !!user,
      user,
      login(email: string) {
        const nextUser = { name: "Admin User", email, role: "admin" };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
        setUser(nextUser);
        return true;
      },
      logout() {
        window.localStorage.removeItem(STORAGE_KEY);
        setUser(null);
      }
    }),
    [user]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}

export function AdminGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!isAuthenticated && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
    if (isAuthenticated && pathname === "/admin/login") {
      router.replace("/admin");
    }
  }, [isAuthenticated, pathname, ready, router]);

  if (!ready) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!isAuthenticated && pathname !== "/admin/login") {
    return null;
  }

  if (isAuthenticated && pathname === "/admin/login") {
    return null;
  }

  return <>{children}</>;
}
