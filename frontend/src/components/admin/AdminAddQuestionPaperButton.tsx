"use client";

import { Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { isAdminUser } from "@/lib/auth";
import { useQuestionPaperModal } from "@/components/admin/QuestionPaperModalContext";

type AdminAddQuestionPaperButtonProps = {
  board?: string;
  classLevel?: string;
  stream?: string;
  subjectSlug?: string;
  className?: string;
};

export default function AdminAddQuestionPaperButton({
  board,
  classLevel,
  stream,
  subjectSlug,
  className = "",
}: AdminAddQuestionPaperButtonProps) {
  const { user } = useAuth();
  const { openAddQuestionPaper } = useQuestionPaperModal();

  if (!isAdminUser(user)) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() =>
        openAddQuestionPaper({
          board,
          classLevel,
          stream,
          subjectSlug,
        })
      }
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition-all hover:bg-slate-800 active:scale-[0.98] ${className}`}
    >
      <Plus size={18} className="text-brand-blue-light" />
      Add Question Paper
    </button>
  );
}
