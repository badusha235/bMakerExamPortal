"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  ArrowLeft,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  Save,
  BookOpen,
  Calendar,
  Layers,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Subject {
  id: number;
  name: string;
  slug: string;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 8 }, (_, i) => CURRENT_YEAR - i);

export default function AdminAddPaper() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(String(CURRENT_YEAR));
  const [subjectId, setSubjectId] = useState<string>("");
  const [examType, setExamType] = useState<"ANNUAL" | "MODEL" | "SUPPLEMENTARY">("ANNUAL");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Load subjects from the API
  useEffect(() => {
    fetch("http://localhost:8000/api/exams/subjects/")
      .then((r) => r.json())
      .then((data) => {
        const list: Subject[] = Array.isArray(data) ? data : data.results ?? [];
        setSubjects(list);
        if (list.length > 0) setSubjectId(String(list[0].id));
      })
      .catch(() => {});
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) { setError("Please enter a title."); return; }
    if (!subjectId)     { setError("Please select a subject."); return; }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("year", year);
    formData.append("subject", subjectId);
    formData.append("exam_type", examType);
    if (file) formData.append("pdf_file", file);


    try {
      const res = await fetch("http://localhost:8000/api/exams/question-papers/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setError(JSON.stringify(errData) || "Something went wrong. Please try again.");
      } else {
        setSuccess(true);
        setTitle("");
        setFile(null);
        setYear(String(CURRENT_YEAR));
        setExamType("ANNUAL");
        if (subjects.length > 0) setSubjectId(String(subjects[0].id));
      }
    } catch {
      setError("Network error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />

      <main className="flex-1 ml-72 p-8 md:p-12">
        <header className="mb-12">
          <Link
            href="/admin/papers"
            className="flex items-center gap-2 text-slate-400 hover:text-brand-blue transition-colors font-semibold mb-4"
          >
            <ArrowLeft size={18} /> Back to Question Papers
          </Link>
          <h1 className="text-3xl font-black text-slate-900">
            Create New <span className="text-brand-blue">Question Paper</span>
          </h1>
          <p className="text-slate-500">Upload a PDF and map it to the right Kerala State SSLC subject.</p>
        </header>

        <div className="max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
              
              {/* Row 1: Title + Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Question Paper Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Physics Annual Exam 2024"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:bg-white focus:border-brand-blue transition-all font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Academic Year
                  </label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:bg-white focus:border-brand-blue transition-all font-semibold appearance-none"
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 2: Subject + Exam Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Subject
                  </label>
                  <div className="relative">
                    <BookOpen size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={subjectId}
                      onChange={(e) => setSubjectId(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:bg-white focus:border-brand-blue transition-all font-semibold appearance-none"
                    >
                      {subjects.length === 0 && (
                        <option value="">Loading subjects...</option>
                      )}
                      {subjects.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Exam Type
                  </label>
                  <div className="relative">
                    <Layers size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={examType}
                      onChange={(e) => setExamType(e.target.value as "ANNUAL" | "MODEL" | "SUPPLEMENTARY")}
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:bg-white focus:border-brand-blue transition-all font-semibold appearance-none"
                    >
                      <option value="ANNUAL">Annual Exam</option>
                      <option value="MODEL">Model Exam</option>
                      <option value="SUPPLEMENTARY">Supplementary</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* PDF Upload */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Upload PDF Document
                </label>
                <div
                  className={`border-4 border-dashed rounded-[2.5rem] p-12 flex flex-col items-center justify-center transition-all ${
                    file ? "border-brand-blue bg-brand-blue/5" : "border-slate-100 hover:border-brand-blue/30 hover:bg-slate-50"
                  }`}
                >
                  {file ? (
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-brand-blue text-white rounded-3xl flex items-center justify-center mb-4 shadow-xl">
                        <FileText size={32} />
                      </div>
                      <p className="text-lg font-bold text-slate-800 mb-1">{file.name}</p>
                      <p className="text-xs text-slate-400 font-medium mb-6">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document
                      </p>
                      <button
                        onClick={(e) => { e.preventDefault(); setFile(null); }}
                        className="px-4 py-2 bg-white text-rose-500 font-bold text-xs rounded-xl border border-rose-100 hover:bg-rose-50 transition-colors flex items-center gap-2"
                      >
                        <X size={14} /> Remove File
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mb-6">
                        <Upload size={32} />
                      </div>
                      <p className="text-lg font-bold text-slate-800 mb-2">Drag and drop PDF here</p>
                      <p className="text-slate-400 text-sm mb-8">Files up to 50MB are supported.</p>
                      <label className="px-8 py-4 bg-brand-blue text-white font-bold rounded-2xl cursor-pointer hover:opacity-90 transition-all shadow-lg shadow-brand-blue/20">
                        Browse Files
                        <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-3 text-rose-600 bg-rose-50 border border-rose-100 rounded-2xl px-6 py-4 font-medium">
                <AlertCircle size={18} className="flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <AlertCircle size={18} />
                Title and Subject are required.
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                {loading ? "Publishing..." : "Publish Question Paper"}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-sm w-full text-center"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-4">Paper Published!</h2>
              <p className="text-slate-500 mb-10 leading-relaxed font-medium">
                The question paper has been saved and is now visible on the corresponding subject page.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="w-full py-5 bg-brand-blue text-white font-bold rounded-2xl shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-all"
              >
                Close & Finish
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
