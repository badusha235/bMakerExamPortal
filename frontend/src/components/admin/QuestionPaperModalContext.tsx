"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import AddQuestionPaperModal from "@/components/admin/content-wizard/AddQuestionPaperModal";
import type { WizardPrefill } from "@/components/admin/content-wizard/constants";

type QuestionPaperModalContextValue = {
  openAddQuestionPaper: (prefill?: WizardPrefill) => void;
  closeAddQuestionPaper: () => void;
};

const QuestionPaperModalContext = createContext<QuestionPaperModalContextValue | undefined>(
  undefined
);

export function QuestionPaperModalProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<WizardPrefill | undefined>();

  const openAddQuestionPaper = useCallback((nextPrefill?: WizardPrefill) => {
    setPrefill(nextPrefill);
    setOpen(true);
  }, []);

  const closeAddQuestionPaper = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSuccess = useCallback(() => {
    router.refresh();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("question-papers-updated"));
    }
  }, [router]);

  return (
    <QuestionPaperModalContext.Provider value={{ openAddQuestionPaper, closeAddQuestionPaper }}>
      {children}
      <AddQuestionPaperModal
        open={open}
        onClose={closeAddQuestionPaper}
        prefill={prefill}
        onSuccess={handleSuccess}
      />
    </QuestionPaperModalContext.Provider>
  );
}

export function useQuestionPaperModal() {
  const ctx = useContext(QuestionPaperModalContext);
  if (!ctx) {
    throw new Error("useQuestionPaperModal must be used within QuestionPaperModalProvider");
  }
  return ctx;
}
