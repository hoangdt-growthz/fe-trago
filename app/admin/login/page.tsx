"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/admin-auth";
import { AdminCard } from "@/components/admin/admin-ui";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("admin@trago.app");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    login(email, password);
    router.replace("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-primary">
            <MapPin className="h-8 w-8" />
            <span className="text-2xl font-bold tracking-tight text-foreground">TraGo</span>
          </div>
          <p className="text-sm text-muted-foreground">Admin Dashboard</p>
        </div>

        <AdminCard className="p-6">
          <div className="mb-5">
            <h1 className="text-xl font-semibold text-foreground">Sign in</h1>
            <p className="mt-1 text-sm text-muted-foreground">Use any email and password to enter the mock admin.</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-card px-3 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-card px-3 text-sm"
              />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <button className="h-10 w-full rounded-xl bg-primary text-sm font-medium text-primary-foreground">Sign in</button>
          </form>
        </AdminCard>
      </div>
    </div>
  );
}
