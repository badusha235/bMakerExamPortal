"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  Upload,
  CheckCircle2,
  X,
  FileText,
  Save,
  Loader2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BOARDS,
  CLASSES,
  STREAMS,
  CONTENT_TYPES,
  type SubjectOption,
  type WizardPrefill,
} from "./constants";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

type ContentWizardProps = {
  variant?: "page" | "modal";
  questionPaperOnly?: boolean;
  prefill?: WizardPrefill;
  onSuccess?: () => void;
  onClose?: () => void;
};

const emptySelection = () => ({
  board: "",
  class: "",
  stream: "",
  subject: "",
  type: "",
});

const emptyDetails = () => ({
  title: "",
  year: String(new Date().getFullYear()),
  file: null as File | null,
  link: "",
  description: "",
  weightage: "0",
});

export default function ContentWizard({
  variant = "page",
  questionPaperOnly = false,
  prefill,
  onSuccess,
  onClose,
}: ContentWizardProps) {
  const isModal = variant === "modal";
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selection, setSelection] = useState(emptySelection);
  const [subjects, setSubjects] = useState<SubjectOption[]>([]);
  const [details, setDetails] = useState(emptyDetails);

  const resetWizard = useCallback(() => {
    setStep(1);
    setError(null);
    setSuccess(false);
    setSelection({
      ...emptySelection(),
      type: questionPaperOnly ? "papers" : "",
      board: prefill?.board ?? "",
      class: prefill?.classLevel ?? "",
      stream: prefill?.stream ?? "",
    });
    setDetails(emptyDetails());
  }, [questionPaperOnly, prefill]);

  useEffect(() => {
    resetWizard();
  }, [resetWizard, prefill?.board, prefill?.classLevel, prefill?.stream, prefill?.subjectSlug]);

  useEffect(() => {
    const subjectSlug = prefill?.subjectSlug;
    if (!subjectSlug || subjects.length === 0) return;
    const match = subjects.find((s) => s.slug === subjectSlug);
    if (match) {
      setSelection((prev) => ({ ...prev, subject: String(match.id) }));
    }
  }, [prefill?.subjectSlug, subjects]);

  useEffect(() => {
    if (selection.board && selection.class && selection.stream) {
      fetch(
        `${API_BASE}/exams/subjects/?board=${selection.board}&class_level=${selection.class}&stream=${selection.stream}`
      )
        .then((res) => res.json())
        .then((data) => {
          const list = Array.isArray(data) ? data : (data.results ?? []);
          setSubjects(list);
        })
        .catch(() => setSubjects([]));
    } else {
      setSubjects([]);
    }
  }, [selection.board, selection.class, selection.stream]);

  const maxStep = questionPaperOnly ? 6 : 6;
  const skipTypeStep = questionPaperOnly;

  const handleNext = () => {
    if (step === 1 && !selection.board) return;
    if (step === 2 && !selection.class) return;
    if (step === 3 && selection.class !== "sslc" && !selection.stream) return;
    if (step === 2 && selection.class === "sslc") {
      setSelection((prev) => ({ ...prev, stream: "general" }));
      setStep(4);
      return;
    }
    if (step === 4 && skipTypeStep) {
      setSelection((prev) => ({ ...prev, type: "papers" }));
      setStep(6);
      return;
    }
    setStep((s) => Math.min(s + 1, maxStep));
  };

  const handleBack = () => {
    if (step === 6 && skipTypeStep) {
      setStep(4);
      return;
    }
    if (step === 4 && selection.class === "sslc") {
      setStep(2);
      return;
    }
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const typeConfig = CONTENT_TYPES.find((t) => t.id === selection.type);
    if (!typeConfig) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("subject", selection.subject);
    formData.append("title", details.title);

    if (selection.type === "papers") {
      formData.append("year", details.year);
    }
    if (selection.type === "mock_test") {
      formData.append("link", details.link);
    }
    if (selection.type === "material") {
      formData.append("material_type", "PDF");
      formData.append("url", details.link);
    }
    if (selection.type === "topic") {
      formData.append("description", details.description);
      formData.append("weightage_marks", details.weightage);
    }
    if (details.file) {
      formData.append("pdf_file", details.file);
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers: HeadersInit = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
      const res = await fetch(`${API_BASE}/exams/${typeConfig.endpoint}/`, {
        method: "POST",
        headers,
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        setError(typeof err === "string" ? err : JSON.stringify(err));
      } else {
        setSuccess(true);
        onSuccess?.();
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    if (isModal) {
      onClose?.();
      resetWizard();
    } else {
      window.location.reload();
    }
  };

  const handleAddMore = () => {
    setSuccess(false);
    resetWizard();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const stepLabel =
    step === 1
      ? "Choose Board"
      : step === 2
        ? "Select Grade"
        : step === 3
          ? "Pick Stream"
          : step === 4
            ? "Select Subject"
            : step === 5
              ? "Content Type"
              : "Finalize Details";

  const cardRound = isModal ? "rounded-2xl" : "rounded-[3rem]";
  const gridGap = isModal ? "gap-4" : "gap-6";

  const wizardBody = (
    <>
      <div className={isModal ? "mb-6" : "mb-12 flex justify-between items-start"}>
        {!isModal && (
          <div>
            <Link
              href="/admin/dashboard"
              className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-brand-blue"
            >
              <ArrowLeft size={16} /> Dashboard
            </Link>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Content <span className="text-brand-blue">Wizard</span>
            </h1>
          </div>
        )}
        <div className={isModal ? "w-full" : ""}>
          {isModal && (
            <p className="mb-3 text-sm font-medium text-slate-500">
              Step {step}: {stepLabel}
            </p>
          )}
          {!isModal && (
            <p className="mt-1 font-medium text-slate-500">
              Step {step}: {stepLabel}
            </p>
          )}
          <div className={`flex gap-2 ${isModal ? "mt-2" : "mt-4"}`}>
            {[1, 2, 3, 4, 5, 6].map((i) => {
              const visible = skipTypeStep ? i !== 5 : true;
              if (!visible) return null;
              return (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    step >= i ? "bg-brand-blue shadow-[0_0_8px_rgba(37,99,235,0.4)]" : "bg-slate-200"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className={isModal ? "" : "max-w-5xl"}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`grid grid-cols-1 md:grid-cols-2 ${gridGap}`}
            >
              {BOARDS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    setSelection((prev) => ({ ...prev, board: b.id }));
                    setStep(2);
                  }}
                  className={`group border-4 p-6 text-center transition-all md:p-8 ${cardRound} ${
                    selection.board === b.id
                      ? "border-brand-blue bg-white shadow-2xl"
                      : "border-white bg-white hover:border-slate-200"
                  }`}
                >
                  <div className="mb-4 text-4xl transition-transform group-hover:scale-110 md:text-6xl md:mb-6">
                    {b.icon}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 md:text-2xl">{b.name}</h3>
                </button>
              ))}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`grid grid-cols-1 md:grid-cols-3 ${gridGap}`}
            >
              {CLASSES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    if (c.id === "sslc") {
                      setSelection((prev) => ({ ...prev, class: c.id, stream: "general" }));
                      setStep(4);
                    } else {
                      setSelection((prev) => ({ ...prev, class: c.id }));
                      setStep(3);
                    }
                  }}
                  className={`group border-4 p-6 text-center transition-all ${cardRound} ${
                    selection.class === c.id
                      ? "border-emerald-500 bg-white shadow-2xl"
                      : "border-white bg-white hover:border-slate-200"
                  }`}
                >
                  <div className="mb-4 text-4xl">{c.icon}</div>
                  <h3 className="text-lg font-black text-slate-900">{c.name}</h3>
                </button>
              ))}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`grid grid-cols-2 lg:grid-cols-4 ${gridGap}`}
            >
              {STREAMS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelection((prev) => ({ ...prev, stream: s.id }));
                    setStep(4);
                  }}
                  className={`group border-4 p-5 text-center transition-all ${cardRound} ${
                    selection.stream === s.id
                      ? "border-violet-500 bg-white shadow-2xl"
                      : "border-white bg-white hover:border-slate-200"
                  }`}
                >
                  <div className="mb-3 text-3xl">{s.icon}</div>
                  <h3 className="text-sm font-black text-slate-900 md:text-lg">{s.name}</h3>
                </button>
              ))}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`border border-white bg-white p-6 shadow-xl md:p-10 ${cardRound}`}
            >
              <h3 className="mb-6 text-lg font-black text-slate-900">Which Subject?</h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {subjects.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      setSelection((prev) => ({
                        ...prev,
                        subject: String(sub.id),
                        ...(skipTypeStep ? { type: "papers" } : {}),
                      }));
                      setStep(skipTypeStep ? 6 : 5);
                    }}
                    className={`rounded-2xl border-2 p-3 text-left font-bold transition-all ${
                      selection.subject === String(sub.id)
                        ? "border-brand-blue bg-brand-blue text-white"
                        : "border-slate-50 bg-slate-50 text-slate-600 hover:border-brand-blue/30"
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
                {subjects.length === 0 && (
                  <p className="col-span-full py-8 text-center font-bold italic text-slate-400">
                    No subjects found for this selection.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {step === 5 && !skipTypeStep && (
            <motion.div
              key="s5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`grid grid-cols-1 md:grid-cols-3 ${gridGap}`}
            >
              {CONTENT_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setSelection((prev) => ({ ...prev, type: t.id }));
                    setStep(6);
                  }}
                  className={`group flex flex-col items-center border-4 p-6 text-center transition-all ${cardRound} ${
                    selection.type === t.id
                      ? "scale-105 border-brand-blue bg-white shadow-2xl"
                      : "border-white bg-white hover:border-slate-200"
                  }`}
                >
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
                      selection.type === t.id ? "bg-brand-blue text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <t.icon size={28} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">{t.name}</h3>
                </button>
              ))}
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="s6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`relative overflow-hidden border border-white bg-white p-6 shadow-2xl md:p-10 ${cardRound}`}
            >
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 md:text-3xl">Post Details</h3>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {subjects.find((s) => String(s.id) === selection.subject)?.name}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Entry Title
                  </label>
                  <input
                    type="text"
                    required
                    value={details.title}
                    onChange={(e) => setDetails({ ...details, title: e.target.value })}
                    placeholder="e.g. 2025 Physics Annual Question Paper"
                    className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 font-bold transition-all focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/5"
                  />
                </div>

                {selection.type === "papers" && (
                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Question Paper Year
                    </label>
                    <select
                      className="w-full appearance-none rounded-2xl border border-slate-100 bg-slate-50 p-4 font-bold"
                      value={details.year}
                      onChange={(e) => setDetails({ ...details, year: e.target.value })}
                    >
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {(selection.type === "notes" || selection.type === "papers") && (
                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Upload PDF Document
                    </label>
                    <div
                      className={`relative flex h-32 flex-col items-center justify-center rounded-2xl border-4 border-dashed transition-all ${
                        details.file ? "border-brand-blue bg-blue-50/30" : "border-slate-100"
                      }`}
                    >
                      {details.file ? (
                        <div className="flex items-center gap-3 px-4">
                          <FileText size={28} className="text-brand-blue" />
                          <p className="truncate font-bold text-slate-800">{details.file.name}</p>
                          <button
                            type="button"
                            onClick={() => setDetails({ ...details, file: null })}
                            className="text-rose-500"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
                          <Upload size={24} className="mb-2 text-slate-300" />
                          <span className="text-sm font-bold text-slate-400">Click to upload PDF</span>
                          <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) =>
                              e.target.files && setDetails({ ...details, file: e.target.files[0] })
                            }
                          />
                        </label>
                      )}
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-xs font-bold text-rose-500">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-slate-400 hover:bg-slate-50"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-3 rounded-2xl bg-slate-900 px-8 py-4 font-black text-white shadow-xl disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                    {loading ? "Publishing..." : "Publish"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {step > 1 && step < 6 && (
          <div
            className={`mt-8 flex items-center justify-between rounded-2xl border border-white bg-white/60 p-4 shadow-lg backdrop-blur-md ${
              isModal ? "" : "sticky bottom-8"
            }`}
          >
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={(step === 4 && !selection.subject) || (step === 5 && !selection.type)}
              className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
            >
              Continue <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md rounded-3xl border-8 border-slate-50 bg-white p-10 text-center shadow-2xl"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-2xl">
                <CheckCircle2 size={40} strokeWidth={3} />
              </div>
              <h2 className="mb-2 text-2xl font-black text-slate-900">Success!</h2>
              <p className="mb-8 font-bold text-slate-500">Question paper added successfully.</p>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleAddMore}
                  className="w-full rounded-2xl bg-slate-900 py-4 font-bold text-white"
                >
                  Add Another
                </button>
                <button
                  type="button"
                  onClick={handleSuccessClose}
                  className="w-full rounded-2xl bg-slate-50 py-4 font-bold text-slate-500"
                >
                  {isModal ? "Close" : "Return to Dashboard"}
                </button>
                {!isModal && (
                  <Link
                    href="/admin/dashboard"
                    className="w-full rounded-2xl bg-slate-50 py-4 font-bold text-slate-400"
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  if (isModal) {
    return wizardBody;
  }

  return wizardBody;
}
