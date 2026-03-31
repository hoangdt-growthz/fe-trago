import { Sparkles, Zap } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCard } from "@/components/admin/admin-ui";

export default function AdminAISettingsContent() {
  return (
    <AdminShell title="AI Settings" description="Configure AI-powered features">
      <div className="max-w-2xl space-y-6">
        <AdminCard className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <Sparkles className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-base font-semibold">AI Content Generation</h2>
              <p className="text-sm text-muted-foreground">Auto-generate descriptions and summaries for places</p>
            </div>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between text-sm"><span>Enable AI descriptions</span><input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between text-sm"><span>Auto-translate content</span><input type="checkbox" /></label>
            <div className="space-y-2">
              <label className="text-sm font-medium">Model</label>
              <select className="h-10 w-full rounded-xl border border-border px-3 text-sm">
                <option>GPT-4o</option>
                <option>GPT-3.5 Turbo</option>
                <option>Claude 3.5 Sonnet</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">System Prompt</label>
              <textarea
                rows={4}
                className="w-full rounded-xl border border-border px-3 py-2 text-sm"
                defaultValue="You are a travel content writer. Generate engaging, accurate descriptions for places and attractions."
              />
            </div>
          </div>
        </AdminCard>

        <AdminCard className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <Zap className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Review Moderation AI</h2>
              <p className="text-sm text-muted-foreground">Automatic review screening and spam detection</p>
            </div>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between text-sm"><span>Auto-flag spam reviews</span><input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between text-sm"><span>Sentiment analysis</span><input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between text-sm"><span>Auto-approve high-confidence reviews</span><input type="checkbox" /></label>
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
