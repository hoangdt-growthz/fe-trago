import { Eye, MapPin, MessageSquare, Users } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCard, AdminKpi } from "@/components/admin/admin-ui";
import { analyticsMonthly } from "@/lib/admin-data";

function BarChartCard({
  title,
  dataKey,
  color
}: {
  title: string;
  dataKey: "users" | "views" | "reviews";
  color: string;
}) {
  const max = Math.max(...analyticsMonthly.map((item) => item[dataKey]));

  return (
    <AdminCard className="p-5">
      <h2 className="mb-4 text-base font-medium text-foreground">{title}</h2>
      <div className="flex h-[280px] items-end gap-3">
        {analyticsMonthly.map((item) => (
          <div key={item.name} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-full w-full items-end">
              <div
                className="w-full rounded-t-md"
                style={{
                  height: `${(item[dataKey] / max) * 100}%`,
                  backgroundColor: color
                }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </AdminCard>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <AdminShell title="Analytics" description="Platform performance metrics">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminKpi title="Total Views" value="248K" change="+18.2% vs last month" icon={<Eye className="h-5 w-5" />} />
        <AdminKpi title="New Users" value="2,100" change="+16.7% vs last month" icon={<Users className="h-5 w-5" />} />
        <AdminKpi title="Places Added" value="142" change="+8.5% vs last month" icon={<MapPin className="h-5 w-5" />} />
        <AdminKpi title="Reviews" value="940" change="+14.6% vs last month" icon={<MessageSquare className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BarChartCard title="User Growth" dataKey="users" color="hsl(152 55% 36%)" />
        <BarChartCard title="Reviews Trend" dataKey="reviews" color="hsl(210 80% 52%)" />
      </div>
    </AdminShell>
  );
}
