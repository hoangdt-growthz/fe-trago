import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCard } from "@/components/admin/admin-ui";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Settings" description="System configuration">
      <div className="max-w-3xl space-y-6">
        <AdminCard className="p-6">
          <h2 className="mb-1 text-base font-semibold">Application</h2>
          <p className="mb-4 text-sm text-muted-foreground">General application settings</p>
          <div className="space-y-4">
            <input defaultValue="TraGo" className="h-10 w-full rounded-xl border border-border px-3 text-sm" />
            <input defaultValue="support@trago.app" className="h-10 w-full rounded-xl border border-border px-3 text-sm" />
            <label className="flex items-center justify-between text-sm"><span>Maintenance Mode</span><input type="checkbox" /></label>
          </div>
        </AdminCard>

        <AdminCard className="p-6">
          <h2 className="mb-1 text-base font-semibold">Content</h2>
          <p className="mb-4 text-sm text-muted-foreground">Content moderation preferences</p>
          <div className="space-y-4">
            <label className="flex items-center justify-between text-sm"><span>Auto-approve verified users</span><input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between text-sm"><span>Allow photo uploads in reviews</span><input type="checkbox" defaultChecked /></label>
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
