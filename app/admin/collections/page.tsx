import { FolderOpen, Plus } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCard, AdminSearchBar, AdminStatusBadge } from "@/components/admin/admin-ui";
import { adminCollections } from "@/lib/admin-data";

export default function AdminCollectionsPage() {
  return (
    <AdminShell
      title="Collections"
      description="Curated place collections"
      actions={
        <button className="inline-flex h-9 items-center gap-2 rounded-xl bg-primary px-3 text-sm font-medium text-primary-foreground">
          <Plus className="h-4 w-4" />
          New Collection
        </button>
      }
    >
      <AdminSearchBar placeholder="Search collections..." />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminCollections.map((item) => (
          <AdminCard key={item.id} className="p-5">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <FolderOpen className="h-5 w-5 text-accent-foreground" />
              </div>
              <AdminStatusBadge status={item.status} />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-foreground">{item.name}</h3>
            <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.placesCount} places</span>
              <span>Updated {item.updatedAt}</span>
            </div>
          </AdminCard>
        ))}
      </div>
    </AdminShell>
  );
}
