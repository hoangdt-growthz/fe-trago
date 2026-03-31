import type { ReactNode } from "react";
import { AdminAuthProvider, AdminGuard } from "@/components/admin/admin-auth";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminGuard>{children}</AdminGuard>
    </AdminAuthProvider>
  );
}
