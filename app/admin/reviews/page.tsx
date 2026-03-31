import { Check, Eye, X } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminSearchBar, AdminStatusBadge, AdminTable, RatingStars } from "@/components/admin/admin-ui";
import { adminReviews } from "@/lib/admin-data";

export default function AdminReviewsPage() {
  return (
    <AdminShell title="Reviews" description="Moderate user reviews">
      <AdminSearchBar
        placeholder="Search reviews..."
        filters={[
          { label: "Status", options: ["Pending", "Approved", "Rejected", "Flagged"] },
          { label: "Rating", options: ["5 Stars", "4 Stars", "3 Stars", "1-2 Stars"] }
        ]}
      />

      <AdminTable
        headers={["User", "Place", "Rating", "Comment", "Status", "Actions"]}
        currentPage={1}
        totalPages={5}
        rows={adminReviews.map((item) => [
          <div key={`${item.id}-user`}>
            <p className="text-sm font-medium text-foreground">{item.user}</p>
            <p className="text-xs text-muted-foreground">{item.date}</p>
          </div>,
          <span key={`${item.id}-place`}>{item.place}</span>,
          <RatingStars key={`${item.id}-rating`} rating={item.rating} />,
          <p key={`${item.id}-comment`} className="max-w-xs truncate text-sm text-muted-foreground">
            {item.comment}
          </p>,
          <AdminStatusBadge key={`${item.id}-status`} status={item.status} />,
          <div key={`${item.id}-actions`} className="flex gap-1">
            <button className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50">
              <Check className="h-4 w-4" />
            </button>
            <button className="rounded-lg p-2 text-rose-600 hover:bg-rose-50">
              <X className="h-4 w-4" />
            </button>
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary">
              <Eye className="h-4 w-4" />
            </button>
          </div>
        ])}
      />
    </AdminShell>
  );
}
