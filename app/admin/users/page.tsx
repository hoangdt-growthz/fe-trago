import { MoreHorizontal } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminSearchBar, AdminStatusBadge, AdminTable } from "@/components/admin/admin-ui";
import { adminUsers } from "@/lib/admin-data";

export default function AdminUsersPage() {
  return (
    <AdminShell title="Users" description="Manage platform users">
      <AdminSearchBar placeholder="Search users..." filters={[{ label: "Status", options: ["Active", "Inactive"] }]} />

      <AdminTable
        headers={["User", "Reviews", "Saved Places", "Joined", "Status", ""]}
        currentPage={1}
        totalPages={3}
        rows={adminUsers.map((item) => [
          <div key={`${item.id}-user`} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
              {item.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.email}</p>
            </div>
          </div>,
          <span key={`${item.id}-reviews`}>{item.reviews}</span>,
          <span key={`${item.id}-places`}>{item.places}</span>,
          <span key={`${item.id}-joined`}>{item.joined}</span>,
          <AdminStatusBadge key={`${item.id}-status`} status={item.status} />,
          <button key={`${item.id}-more`} className="text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        ])}
      />
    </AdminShell>
  );
}
