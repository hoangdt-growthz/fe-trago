import { Eye, MapPin, MessageSquare, Users } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCard, AdminKpi, AdminStatusBadge, AdminTable, RatingStars } from "@/components/admin/admin-ui";
import { dashboardPlaces, dashboardReviews } from "@/lib/admin-data";

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Dashboard" description="Overview of your platform">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminKpi title="Total Places" value="2,847" change="+12.5% this month" icon={<MapPin className="h-5 w-5" />} />
        <AdminKpi title="Active Users" value="14,203" change="+8.2% this month" icon={<Users className="h-5 w-5" />} />
        <AdminKpi title="Reviews" value="8,429" change="+23.1% this month" icon={<MessageSquare className="h-5 w-5" />} />
        <AdminKpi title="Page Views" value="142K" change="-3.1% this month" icon={<Eye className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AdminTable
            headers={["Place", "Rating", "Views", "Status"]}
            rows={dashboardPlaces.map((item) => [
              <div key={`${item.id}-name`} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.city}</p>
                </div>
              </div>,
              <div key={`${item.id}-rating`} className="flex items-center gap-1">
                <span className="text-sm font-medium">{item.rating}</span>
              </div>,
              <span key={`${item.id}-views`} className="text-sm text-muted-foreground">
                {item.views.toLocaleString()}
              </span>,
              <AdminStatusBadge key={`${item.id}-status`} status={item.status} />
            ])}
          />
        </div>

        <AdminCard className="p-5">
          <h2 className="mb-4 text-base font-medium text-foreground">Recent Reviews</h2>
          <div className="space-y-4">
            {dashboardReviews.map((item) => (
              <div key={item.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{item.user}</p>
                    <p className="truncate text-xs text-muted-foreground">{item.place}</p>
                    <RatingStars rating={item.rating} />
                  </div>
                  <div className="text-right">
                    <AdminStatusBadge status={item.status} />
                    <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
