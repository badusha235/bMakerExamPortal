"use client";

import AdminAddQuestionPaperButton from "@/components/admin/AdminAddQuestionPaperButton";
import { useAuth } from "@/context/AuthContext";
import { isAdminUser } from "@/lib/auth";

export default function AdminHomeActions() {
  const { user } = useAuth();

  if (!isAdminUser(user)) {
    return null;
  }

  return (
    <div className="container mx-auto flex justify-end px-4 pb-2 md:px-6">
      <AdminAddQuestionPaperButton />
    </div>
  );
}
