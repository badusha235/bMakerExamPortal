"use client";

import { useEffect, useState } from "react";
import {
  X,
  Upload,
  FileText,
  Loader2,
  Save,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { WizardPrefill } from "./constants";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

type AddQuestionPaperModalProps = {
  open: boolean;
  onClose: () => void;
  prefill?: WizardPrefill;
  onSuccess?: () => void;
};

export default function AddQuestionPaperModal({
  open,
  onClose,
  prefill,
  onSuccess,
}: AddQuestionPaperModalProps) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [file, setFile] = useState<File | null>(null);
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [subjectName, setSubjectName] = useState<string | null>(null);
  const [resolvingSubject, setResolvingSubject] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const resetForm = () => {
    setTitle("");
    setYear(String(currentYear));
    setFile(null);
    setError(null);
    setSuccess(false);
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    resetForm();

    const resolveSubject = async () => {
      const slug = prefill?.subjectSlug;
      if (!slug) {
        setSubjectId(null);
        setSubjectName(null);
        return;
      }

      setResolvingSubject(true);
      try {
        const params = new URLSearchParams({ slug });
        if (prefill.board) params.set("board", prefill.board);
        if (prefill.classLevel) params.set("class_level", prefill.classLevel);
        if (prefill.stream) params.set("stream", prefill.stream);

        const res = await fetch(`${API_BASE}/exams/subjects/?${params}`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.results ?? []);
        const match = list.find((s: { slug?: string }) => s.slug === slug) ?? list[0];

        if (match) {
          setSubjectId(String(match.id));
          setSubjectName(match.name);
        } else {
          setSubjectId(null);
          setSubjectName(null);
          setError("Could not find this subject. Open the page from a subject and try again.");
        }
      } catch {
        setSubjectId(null);
        setSubjectName(null);
        setError("Failed to load subject. Please try again.");
      } finally {
        setResolvingSubject(false);
      }
    };

    resolveSubject();

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, prefill?.subjectSlug, prefill?.board, prefill?.classLevel, prefill?.stream, currentYear]);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!subjectId) {
      setError("Subject is missing. Please use Add Question Paper from a subject page.");
      return;
    }
    if (!file) {
      setError("Please upload a PDF document.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("subject", subjectId);
    formData.append("title", title.trim());
    formData.append("year", year);
    formData.append("pdf_file", file);

    const token = localStorage.getItem("token");
    const headers: HeadersInit = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
      const res = await fetch(`${API_BASE}/exams/question-papers/`, {
        method: "POST",
        headers,
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(
          typeof err === "object" && err !== null
            ? Object.values(err).flat().join(" ") || "Upload failed."
            : "Upload failed."
        );
        return;
      }

      setSuccess(true);
      onSuccess?.();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-question-paper-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-label="Close dialog"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative w-full max-w-lg overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 id="add-question-paper-title" className="text-xl font-black text-slate-900">
                  Add Question Paper
                </h2>
                {subjectName && (
                  <p className="mt-0.5 text-xs font-semibold text-brand-blue">{subjectName}</p>
                )}
                {resolvingSubject && (
                  <p className="mt-0.5 text-xs text-slate-400">Loading subject…</p>
                )}
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            {success ? (
              <div className="px-6 py-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="mb-2 text-lg font-black text-slate-900">Uploaded!</h3>
                <p className="mb-6 text-sm text-slate-500">Question paper was added successfully.</p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white"
                >
                  Done
                </button>
              </div>
            ) : !prefill?.subjectSlug && !resolvingSubject ? (
              <div className="space-y-4 px-6 py-8 text-center">
                <p className="text-sm font-medium text-slate-600">
                  Open a subject&apos;s <strong>Question Papers</strong> tab, then click Add Question Paper
                  to upload here.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
                <div className="space-y-2">
                  <label
                    htmlFor="qp-title"
                    className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400"
                  >
                    Title
                  </label>
                  <input
                    id="qp-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 2025 Physics Annual Question Paper"
                    className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold text-slate-900 transition-all focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-blue/10"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="qp-year"
                    className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400"
                  >
                    Question Paper Year
                  </label>
                  <select
                    id="qp-year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold text-slate-900 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-blue/10"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Upload PDF Document
                  </label>
                  <div
                    className={`relative flex min-h-[140px] flex-col items-center justify-center rounded-2xl border-4 border-dashed transition-all ${
                      file ? "border-brand-blue bg-blue-50/30" : "border-slate-100 bg-slate-50"
                    }`}
                  >
                    {file ? (
                      <div className="flex items-center gap-3 px-4">
                        <FileText size={28} className="shrink-0 text-brand-blue" />
                        <p className="truncate text-sm font-bold text-slate-800">{file.name}</p>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="shrink-0 text-rose-500 hover:text-rose-600"
                          aria-label="Remove file"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center py-8">
                        <Upload size={28} className="mb-2 text-slate-300" />
                        <span className="text-sm font-bold text-slate-500">Click to upload PDF</span>
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {error && (
                  <div
                    className="flex items-start gap-2 rounded-2xl border border-rose-100 bg-rose-50 p-3 text-sm text-rose-600"
                    role="alert"
                  >
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 rounded-2xl bg-slate-100 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || resolvingSubject || !subjectId}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-lg disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <Save size={18} />
                        Publish
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
