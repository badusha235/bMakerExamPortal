"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Zap,
  Target,
  Download,
  Eye,
  Search,
  Filter,
  Calendar,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Types ─────────────────────────────────────────────────────────────────
interface QuestionPaper {
  id: number;
  title: string;
  year: number;
  exam_type: string; // "ANNUAL" | "MODEL" | "SUPPLEMENTARY"
  subject_name: string;
  pdf_file: string | null;
}

interface Chapter {
  id: number;
  title: string;
  order: number;
}

type TabType = "notes" | "papers" | "tests";

const EXAM_TYPE_LABEL: Record<string, string> = {
  ANNUAL: "Annual Exam",
  MODEL: "Model Exam",
};

const TESTS_DATA = [
  { title: "Chapter 1: Full Quiz", questions: 20, time: "30m", taken: true, score: "18/20" },
  { title: "Term 1 Mock Exam", questions: 40, time: "60m", taken: false },
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function SubjectModularDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;          // e.g. "sslc"
  const id = params.id as string;              // e.g. "state"
  const subjectId = params.subject as string;  // e.g. "physics", "chemistry"

  const [activeTab, setActiveTab] = useState<TabType>("notes");
  const [yearFilter, setYearFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // API data
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loadingPapers, setLoadingPapers] = useState(false);
  const [loadingChapters, setLoadingChapters] = useState(false);

  const subjectName = subjectId
    ? subjectId
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Subject";
  const boardName = id === "state" ? "Kerala State Syllabus" : id.toUpperCase();

  // Fetch Question Papers for THIS subject only
  useEffect(() => {
    if (!subjectId) return;
    setLoadingPapers(true);
    fetch(`http://localhost:8000/api/exams/question-papers/?subject_slug=${subjectId}`)
      .then((res) => res.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : data.results ?? [];
        setPapers(results);
      })
      .catch(() => setPapers([]))
      .finally(() => setLoadingPapers(false));
  }, [subjectId]);

  // Fetch Chapters for THIS subject only
  useEffect(() => {
    if (!subjectId) return;
    setLoadingChapters(true);
    fetch(`http://localhost:8000/api/exams/chapters/?subject_slug=${subjectId}`)
      .then((res) => res.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : data.results ?? [];
        setChapters(results);
      })
      .catch(() => setChapters([]))
      .finally(() => setLoadingChapters(false));
  }, [subjectId]);

  // Derive unique years from fetched papers
  const availableYears = ["All", ...Array.from(new Set(papers.map((p) => p.year.toString()))).sort((a, b) => Number(b) - Number(a))];
  const types = ["All", "Annual Exam", "Model Exam"];

  const filteredPapers = papers.filter((paper) => {
    const typeLabel = EXAM_TYPE_LABEL[paper.exam_type] ?? paper.exam_type;
    const matchesYear = yearFilter === "All" || paper.year.toString() === yearFilter;
    const matchesType = typeFilter === "All" || typeLabel === typeFilter;
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesType && matchesSearch;
  });

  const filteredChapters = chapters.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Back button */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-400 hover:text-brand-blue transition-colors font-semibold"
            >
              <ArrowLeft size={18} /> Back to Subjects
            </button>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{subjectName}</h1>
              <p className="text-slate-500 font-medium">
                {boardName} • {slug.toUpperCase()}
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="h-10 w-10 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                <Target size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Status</p>
                <p className="text-sm font-bold text-slate-900 leading-none">In Progress</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm w-fit">
            {(["notes", "papers", "tests"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSearchQuery(""); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab ? "bg-brand-blue text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {tab === "notes" && <BookOpen size={18} />}
                {tab === "papers" && <FileText size={18} />}
                {tab === "tests" && <Zap size={18} />}
                {tab === "notes" ? "Notes" : tab === "papers" ? "Question Papers" : "Mock Tests"}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="max-w-5xl">
            {/* Search bar */}
            {(activeTab === "notes" || activeTab === "papers") && (
              <div className="relative mb-8 max-w-xl group">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-blue transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder={`Search in ${activeTab === "notes" ? "Notes" : "Question Papers"}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue shadow-sm transition-all text-sm font-medium"
                />
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* ── Notes Tab ── */}
              {activeTab === "notes" && (
                <motion.div
                  key="notes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {loadingChapters ? (
                    <div className="flex justify-center py-20">
                      <Loader2 className="animate-spin text-brand-blue" size={32} />
                    </div>
                  ) : filteredChapters.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                      <BookOpen size={40} className="mx-auto text-slate-300 mb-3" />
                      <p className="text-slate-400 font-medium">No chapters available yet for {subjectName}.</p>
                    </div>
                  ) : (
                    filteredChapters.map((chapter) => (
                      <div key={chapter.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-brand-blue/20 transition-all">
                        <h3 className="font-bold text-slate-900">{chapter.title}</h3>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {/* ── Question Papers Tab ── */}
              {activeTab === "papers" && (
                <motion.div
                  key="papers"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {/* Filters */}
                  <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 flex gap-4">
                      <div className="flex-1 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-2 px-4 focus-within:border-brand-blue transition-colors">
                        <Calendar size={18} className="text-slate-400" />
                        <select
                          value={yearFilter}
                          onChange={(e) => setYearFilter(e.target.value)}
                          className="bg-transparent text-sm font-bold text-slate-700 outline-none w-full"
                        >
                          {availableYears.map((y) => (
                            <option key={y} value={y}>{y === "All" ? "All Years" : y}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-2 px-4 focus-within:border-brand-blue transition-colors">
                        <Filter size={18} className="text-slate-400" />
                        <select
                          value={typeFilter}
                          onChange={(e) => setTypeFilter(e.target.value)}
                          className="bg-transparent text-sm font-bold text-slate-700 outline-none w-full"
                        >
                          {types.map((t) => (
                            <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {loadingPapers ? (
                    <div className="flex justify-center py-20">
                      <Loader2 className="animate-spin text-brand-blue" size={32} />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredPapers.map((paper) => {
                        const typeLabel = EXAM_TYPE_LABEL[paper.exam_type] ?? paper.exam_type;
                        const isAnnual = paper.exam_type === "ANNUAL";
                        return (
                          <div
                            key={paper.id}
                            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-brand-blue/20 transition-all group overflow-hidden relative"
                          >
                            <div className="flex justify-between items-start mb-6">
                              <div className="p-3 bg-brand-blue/10 rounded-2xl text-brand-blue">
                                <FileText size={20} />
                              </div>
                              <span
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
                                  isAnnual
                                    ? "bg-amber-100 text-amber-700 border border-amber-200"
                                    : "bg-indigo-100 text-indigo-700 border border-indigo-200"
                                }`}
                              >
                                {typeLabel}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">{paper.title}</h3>
                            <p className="text-sm text-slate-400 mb-6 font-medium">{paper.year}</p>
                            <div className="flex gap-2">
                              {paper.pdf_file ? (
                                <a
                                  href={`http://localhost:8000${paper.pdf_file}`}
                                  download
                                  className="flex-1 py-3 bg-brand-blue text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-blue/10 flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                                >
                                  <Download size={14} /> Download PDF
                                </a>
                              ) : (
                                <span className="flex-1 py-3 bg-slate-100 text-slate-400 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                                  <Download size={14} /> No PDF Yet
                                </span>
                              )}
                              {paper.pdf_file && (
                                <a
                                  href={`http://localhost:8000${paper.pdf_file}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
                                >
                                  <Eye size={14} /> View Online
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {filteredPapers.length === 0 && (
                        <div className="md:col-span-2 text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                          <FileText size={40} className="mx-auto text-slate-300 mb-3" />
                          <p className="text-slate-400 font-medium tracking-tight">
                            No question papers found for <span className="text-brand-blue font-bold">{subjectName}</span>.
                          </p>
                          <p className="text-slate-300 text-sm mt-1">Papers added by admin will appear here.</p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── Mock Tests Tab ── */}
              {activeTab === "tests" && (
                <motion.div
                  key="tests"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {TESTS_DATA.map((test, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${test.taken ? "bg-emerald-100 text-emerald-600" : "bg-brand-blue/5 text-brand-blue"}`}>
                          <Zap size={24} fill={test.taken ? "currentColor" : "none"} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{test.title}</h4>
                          <span className="text-xs text-slate-400 font-medium">{test.questions} Qs • {test.time}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => router.push("/mock-tests/active")}
                        className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${
                          test.taken
                            ? "border border-slate-100 text-slate-600 hover:bg-slate-50"
                            : "bg-brand-blue text-white shadow-lg shadow-brand-blue/10"
                        }`}
                      >
                        {"score" in test && test.taken ? `Retake (${test.score})` : "Start Test"}
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
