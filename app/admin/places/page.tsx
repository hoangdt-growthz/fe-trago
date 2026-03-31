"use client";

import { MoreHorizontal, Newspaper, Plus, Star, Upload } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminDialog, AdminSearchBar, AdminStatusBadge, AdminTable } from "@/components/admin/admin-ui";
import { adminPlaces, placeNewsMap } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

const RichTextEditor = dynamic(() => import("@/components/admin/rich-text-editor"), { ssr: false });

export default function AdminPlacesPage() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newsOpen, setNewsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "news">("details");
  const selected = adminPlaces.find((item) => item.id === selectedId) ?? null;
  const relatedNews = selected ? placeNewsMap[selected.id] ?? [] : [];

  return (
    <AdminShell
      title="Places"
      description="Manage all locations"
      actions={
        <button
          onClick={() => {
            setSelectedId(null);
            setActiveTab("details");
            setOpen(true);
          }}
          className="inline-flex h-9 items-center gap-2 rounded-xl bg-primary px-3 text-sm font-medium text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
          Add Place
        </button>
      }
    >
      <AdminSearchBar
        placeholder="Search places..."
        filters={[
          { label: "Status", options: ["Active", "Draft", "Inactive"] },
          { label: "Category", options: ["Cafe", "Restaurant", "Hotel", "Bar"] }
        ]}
      />

      <AdminTable
        headers={["Place", "Rating", "Category", "Status", ""]}
        currentPage={1}
        totalPages={3}
        rows={adminPlaces.map((item) => [
          <button
            key={`${item.id}-place`}
            onClick={() => {
              setSelectedId(item.id);
              setActiveTab("details");
              setOpen(true);
            }}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">P</div>
            <div>
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.city} · {item.category}
              </p>
            </div>
          </button>,
          <div key={`${item.id}-rating`} className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{item.rating}</span>
            <span className="text-xs text-muted-foreground">({item.reviews})</span>
          </div>,
          <span key={`${item.id}-category`}>{item.category}</span>,
          <AdminStatusBadge key={`${item.id}-status`} status={item.status} />,
          <button key={`${item.id}-more`} className="text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        ])}
      />

      <AdminDialog
        open={open}
        onClose={() => setOpen(false)}
        title={selected ? "Edit Place" : "Add New Place"}
        description={selected ? `Editing ${selected.name}` : "Fill in the details to create a new place."}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-2 rounded-xl bg-secondary p-1">
            <button
              onClick={() => setActiveTab("details")}
              className={cn("rounded-lg px-3 py-2 text-sm font-medium", activeTab === "details" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}
            >
              Details
            </button>
            {selected ? (
              <button
                onClick={() => setActiveTab("news")}
                className={cn("rounded-lg px-3 py-2 text-sm font-medium", activeTab === "news" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}
              >
                News {relatedNews.length ? `(${relatedNews.length})` : ""}
              </button>
            ) : null}
          </div>

          {activeTab === "details" ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Cover Image</label>
                <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-8 text-muted-foreground">
                  <Upload className="h-8 w-8" />
                  <p className="text-sm">Click to upload or drag and drop</p>
                  <p className="text-xs">PNG, JPG up to 5MB</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input defaultValue={selected?.name} className="h-10 w-full rounded-xl border border-border px-3 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <input defaultValue={selected?.city} className="h-10 w-full rounded-xl border border-border px-3 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select defaultValue={selected?.category ?? "Cafe"} className="h-10 w-full rounded-xl border border-border px-3 text-sm">
                    <option>Cafe</option>
                    <option>Restaurant</option>
                    <option>Hotel</option>
                    <option>Bar</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select defaultValue={selected?.status ?? "draft"} className="h-10 w-full rounded-xl border border-border px-3 text-sm">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea rows={4} className="w-full rounded-xl border border-border px-3 py-2 text-sm" placeholder="Describe this place..." />
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setOpen(false)} className="h-10 rounded-xl border border-border px-4 text-sm">
                  Cancel
                </button>
                <button onClick={() => setOpen(false)} className="h-10 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground">
                  Save Place
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {relatedNews.length} article{relatedNews.length !== 1 ? "s" : ""} for this place
                </p>
                <button
                  onClick={() => setNewsOpen(true)}
                  className="inline-flex h-9 items-center gap-2 rounded-xl border border-border px-3 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add News
                </button>
              </div>

              {relatedNews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Newspaper className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">No news articles yet</p>
                  <p className="mt-1 text-xs text-muted-foreground">Create a news article for {selected?.name}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {relatedNews.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                          <Newspaper className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.date} · {item.views.toLocaleString()} views
                          </p>
                        </div>
                      </div>
                      <AdminStatusBadge status={item.status} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </AdminDialog>

      <AdminDialog
        open={newsOpen}
        onClose={() => setNewsOpen(false)}
        title={`New Article for ${selected?.name ?? "Place"}`}
        description="Create a news article linked to this place."
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
            <input className="h-10 w-full rounded-xl border border-border px-3 text-sm" placeholder="Article title" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select defaultValue="draft" className="h-10 w-full rounded-xl border border-border px-3 text-sm">
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <RichTextEditor placeholder="Write the article content..." />
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setNewsOpen(false)} className="h-10 rounded-xl border border-border px-4 text-sm">
              Cancel
            </button>
            <button onClick={() => setNewsOpen(false)} className="h-10 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground">
              Publish Article
            </button>
          </div>
        </div>
      </AdminDialog>
    </AdminShell>
  );
}
