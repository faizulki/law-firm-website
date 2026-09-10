import type { Metadata } from "next";
import { AdminNav } from "@/components/admin/AdminNav";
import { AvailabilityEditor } from "@/components/admin/AvailabilityEditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tillgänglighet – Admin",
  robots: { index: false, follow: false },
};

export default function AdminAvailabilityPage() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl bg-ink px-6 pt-10 lg:px-8">
      <AdminNav />
      <AvailabilityEditor />
    </div>
  );
}
