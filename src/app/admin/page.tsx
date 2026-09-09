import type { Metadata } from "next";
import { AdminEditor } from "@/components/admin/AdminEditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl bg-ink px-6 pt-10 lg:px-8">
      <AdminEditor />
    </div>
  );
}
