"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { ChevronLeft, ChevronRight, Search, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminStatus } from "@/lib/admin-data";

export function AdminCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-xl border border-border bg-card shadow-sm", className)} {...props} />;
}

export function AdminKpi({
  title,
  value,
  change,
  icon
}: {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
}) {
  return (
    <AdminCard className="p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
          <p className="text-xs font-medium text-primary">{change}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">{icon}</div>
      </div>
    </AdminCard>
  );
}

export function AdminStatusBadge({ status }: { status: AdminStatus }) {
  const styles: Record<AdminStatus, string> = {
    active: "bg-emerald-100 text-emerald-700",
    approved: "bg-emerald-100 text-emerald-700",
    published: "bg-emerald-100 text-emerald-700",
    inactive: "bg-slate-100 text-slate-600",
    draft: "bg-slate-100 text-slate-600",
    archived: "bg-slate-100 text-slate-600",
    pending: "bg-amber-100 text-amber-700",
    flagged: "bg-amber-100 text-amber-700",
    rejected: "bg-rose-100 text-rose-700"
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", styles[status])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function AdminSearchBar({
  placeholder = "Search...",
  filters = []
}: {
  placeholder?: string;
  filters?: { label: string; options: string[] }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-[240px] flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder={placeholder}
          className="h-10 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm outline-none ring-0"
        />
      </div>
      {filters.map((filter) => (
        <select key={filter.label} className="h-10 rounded-xl border border-border bg-card px-3 text-sm text-foreground">
          <option>{filter.label}</option>
          {filter.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ))}
    </div>
  );
}

export function AdminTable<T extends { id: string | number }>({
  headers,
  rows,
  currentPage,
  totalPages
}: {
  headers: string[];
  rows: ReactNode[][];
  currentPage?: number;
  totalPages?: number;
}) {
  return (
    <AdminCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-secondary/60">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-border">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 text-sm text-foreground">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {currentPage && totalPages ? (
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-1">
            <button className="rounded-lg border border-border p-2 text-muted-foreground" disabled={currentPage <= 1}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="rounded-lg border border-border p-2 text-muted-foreground" disabled={currentPage >= totalPages}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </AdminCard>
  );
}

export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={cn("h-3.5 w-3.5", index < rating ? "fill-amber-400 text-amber-400" : "text-muted")} />
      ))}
    </div>
  );
}

export function AdminDialog({
  open,
  title,
  description,
  children,
  onClose
}: {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/35 p-4" onClick={onClose}>
      <div className="h-full w-full max-w-lg overflow-auto rounded-2xl bg-card p-6 shadow-xl" onClick={(event) => event.stopPropagation()}>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {children}
      </div>
    </div>
  );
}
