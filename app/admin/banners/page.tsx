"use client";

import { Image, MoreHorizontal, Plus, Upload } from "lucide-react";
import { useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminDialog, AdminStatusBadge, AdminTable } from "@/components/admin/admin-ui";
import { adminBanners } from "@/lib/admin-data";

export default function AdminBannersPage() {
  const [open, setOpen] = useState(false);

  return (
    <AdminShell
      title="Banners"
      description="Manage promotional banners"
      actions={
        <button onClick={() => setOpen(true)} className="inline-flex h-9 items-center gap-2 rounded-xl bg-primary px-3 text-sm font-medium text-primary-foreground">
          <Plus className="h-4 w-4" />
          New Banner
        </button>
      }
    >
      <AdminTable
        headers={["Banner", "Impressions", "CTR", "Status", ""]}
        rows={adminBanners.map((item) => [
          <div key={`${item.id}-banner`} className="flex items-center gap-3">
            <div className="flex h-10 w-16 items-center justify-center rounded bg-muted">
              <Image className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.placement}</p>
            </div>
          </div>,
          <span key={`${item.id}-imp`}>{item.impressions.toLocaleString()}</span>,
          <span key={`${item.id}-ctr`}>{item.impressions > 0 ? `${((item.clicks / item.impressions) * 100).toFixed(1)}%` : "—"}</span>,
          <AdminStatusBadge key={`${item.id}-status`} status={item.status} />,
          <button key={`${item.id}-more`} className="text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        ])}
      />

      <AdminDialog open={open} onClose={() => setOpen(false)} title="Create Banner" description="Set up a new promotional banner.">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Banner Image</label>
            <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-8 text-muted-foreground">
              <Upload className="h-8 w-8" />
              <p className="text-sm">Upload banner image</p>
              <p className="text-xs">Recommended: 1200x400px</p>
            </div>
          </div>
          <input className="h-10 w-full rounded-xl border border-border px-3 text-sm" placeholder="Banner title" />
          <select className="h-10 w-full rounded-xl border border-border px-3 text-sm">
            <option>Homepage Hero</option>
            <option>Search Results</option>
            <option>Place Detail</option>
          </select>
          <input className="h-10 w-full rounded-xl border border-border px-3 text-sm" placeholder="https://" />
          <div className="flex justify-end gap-3">
            <button onClick={() => setOpen(false)} className="h-10 rounded-xl border border-border px-4 text-sm">
              Cancel
            </button>
            <button onClick={() => setOpen(false)} className="h-10 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground">
              Create Banner
            </button>
          </div>
        </div>
      </AdminDialog>
    </AdminShell>
  );
}
