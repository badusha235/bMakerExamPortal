"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import ContentWizard from "@/components/admin/content-wizard/ContentWizard";
import { useSearchParams } from "next/navigation";

export default function AdminContentWizardPage() {
  const searchParams = useSearchParams();

  const prefill = {
    board: searchParams.get("board") ?? undefined,
    classLevel: searchParams.get("class") ?? undefined,
    stream: searchParams.get("stream") ?? undefined,
    subjectSlug: searchParams.get("subject") ?? undefined,
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="ml-72 flex-1 p-8 md:p-12">
        <ContentWizard variant="page" prefill={prefill} />
      </main>
    </div>
  );
}
