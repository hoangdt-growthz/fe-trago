"use client";

import { Globe, MapPin, MoreHorizontal, Newspaper, Plus, Upload } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminDialog, AdminSearchBar, AdminStatusBadge, AdminTable } from "@/components/admin/admin-ui";
import { adminNews } from "@/lib/admin-data";

const RichTextEditor = dynamic(() => import("@/components/admin/rich-text-editor"), { ssr: false });

export default function AdminNewsPage() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = adminNews.find((item) => item.id === selectedId) ?? null;

  return (
    <AdminShell
      title="News"
      description="Manage editorials and announcements"
      actions={
        <button
          onClick={() => {
            setSelectedId(null);
            setOpen(true);
          }}
          className="inline-flex h-9 items-center gap-2 rounded-xl bg-primary px-3 text-sm font-medium text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
          New Article
        </button>
      }
    >
      <AdminSearchBar
        placeholder="Search articles..."
        filters={[
          { label: "Type", options: ["Place News", "System"] },
          { label: "Status", options: ["Published", "Draft", "Archived"] }
        ]}
      />

      <AdminTable
        headers={["Article", "Type", "Date", "Status", ""]}
        rows={adminNews.map((item) => [
          <button
            key={`${item.id}-title`}
            onClick={() => {
              setSelectedId(item.id);
              setOpen(true);
            }}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.date} · Admin</p>
            </div>
          </button>,
          <div key={`${item.id}-type`} className="inline-flex w-fit items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-foreground">
            {item.type === "Place News" ? <MapPin className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
            {item.type === "Place News" ? item.placeName : "System"}
          </div>,
          <span key={`${item.id}-date`}>{item.date}</span>,
          <AdminStatusBadge key={`${item.id}-status`} status={item.status} />,
          <button key={`${item.id}-more`} className="text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        ])}
      />

      <AdminDialog
        open={open}
        onClose={() => setOpen(false)}
        title={selected ? "Edit Article" : "New Article"}
        description={selected ? `Editing "${selected.title}"` : "Create a news article for a place or system announcement."}
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Cover Image</label>
            <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-8 text-muted-foreground">
              <Upload className="h-8 w-8" />
              <p className="text-sm">Click to upload or drag and drop</p>
              <p className="text-xs">PNG, JPG up to 5MB</p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input defaultValue={selected?.title} className="h-10 w-full rounded-xl border border-border px-3 text-sm" placeholder="Article title" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select defaultValue={selected?.type ?? "System Announcement"} className="h-10 rounded-xl border border-border px-3 text-sm">
              <option>System Announcement</option>
              <option>Place News</option>
            </select>
            <select className="h-10 rounded-xl border border-border px-3 text-sm">
              <option>{selected?.placeName === "-" ? "Select place" : selected?.placeName ?? "Select place"}</option>
              <option>Cafe Botanical</option>
              <option>Harbor Bistro</option>
              <option>Mountain Lodge</option>
              <option>Sky Lounge Bar</option>
              <option>Ocean Breeze Resort</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select defaultValue={selected?.status ?? "draft"} className="h-10 w-full rounded-xl border border-border px-3 text-sm">
              <option>Published</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <RichTextEditor placeholder="Write the article content..." />
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setOpen(false)} className="h-10 rounded-xl border border-border px-4 text-sm">
              Cancel
            </button>
            <button onClick={() => setOpen(false)} className="h-10 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground">
              {selected ? "Save Changes" : "Publish Article"}
            </button>
          </div>
        </div>
      </AdminDialog>
    </AdminShell>
  );
}
