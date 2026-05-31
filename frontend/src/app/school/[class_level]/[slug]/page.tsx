"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft, BookOpen, FileText, Zap, Eye, Search, Filter,
  Calculator, Beaker, FlaskConical, Dna, Languages, Map, Monitor,
  Loader2, ChevronRight, TrendingUp, LayoutTemplate, CheckCircle, Lightbulb,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import BiologyOverview from "@/components/subjects/BiologyOverview";
import ChemistryOverview from "@/components/subjects/ChemistryOverview";

interface QuestionPaper {
  id: number;
  title: string;
  year: number;
  pdf_file: string | null;
  marks?: number;
  pages?: number;
  duration?: string;
  is_new?: boolean;
}

type TabType = "overview" | "chapters" | "notes" | "papers" | "tests";

export default function SubjectModularDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const classLevel = params.class_level as string;          
  const slug = params.slug as string;  
  const boardParam = searchParams.get('board') || 'kerala_state';
  const streamParam = searchParams.get('stream') || 'general';

  const [activeTab, setActiveTab] = useState<TabType>("papers");
  const [yearFilter, setYearFilter] = useState<string>("All Years");
  const [searchQuery, setSearchQuery] = useState("");

  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [subjectData, setSubjectData] = useState<any>(null);
  const [loadingPapers, setLoadingPapers] = useState(false);

  const subjectName = subjectData?.name || "...";
  const boardName = boardParam === 'kerala_state' ? "Kerala State Syllabus" : "CBSE";

  const ICON_MAP: Record<string, any> = {
    Calculator, Beaker, FlaskConical, Dna, Languages, BookOpen, Map, Monitor, FileText
  };
  const SubjectIcon = ICON_MAP[subjectData?.icon_name] ?? Calculator;

  useEffect(() => {
    if (!slug) return;
    fetch(`http://localhost:8000/api/exams/subjects/?slug=${slug}&board=${boardParam}&class_level=${classLevel}&stream=${streamParam}`)
      .then((res) => res.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : data.results ?? [];
        if (results.length > 0) setSubjectData(results[0]);
      })
      .catch(console.error);
  }, [slug, boardParam, classLevel, streamParam]);

  useEffect(() => {
    if (!slug) return;
    setLoadingPapers(true);
    fetch(`http://localhost:8000/api/exams/question-papers/?subject__slug=${slug}&subject__board=${boardParam}&subject__class_level=${classLevel}&subject__stream=${streamParam}`)
      .then((res) => res.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : data.results ?? [];
        setPapers(results);
      })
      .catch(() => setPapers([]))
      .finally(() => setLoadingPapers(false));
  }, [slug, boardParam, classLevel, streamParam]);

  const yearOptions = ["All Years", "2025", "2024", "2023", "2022", "2021", "More"];

  const filteredPapers = papers.filter((paper) => {
    const matchesYear = yearFilter === "All Years" || paper.year.toString() === yearFilter || (yearFilter === "More" && paper.year < 2021);
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors text-sm font-semibold"
            >
              <ArrowLeft size={16} strokeWidth={2.5} /> Back to Subjects
            </button>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
            <div className="flex items-center gap-6">
               <div className="h-14 w-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-200/50">
                 <SubjectIcon size={26} strokeWidth={2} />
               </div>
               <div>
                  <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">{subjectName}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-brand-blue/10 text-brand-blue text-[11px] font-bold uppercase tracking-wider rounded-full">
                       <Zap size={12} fill="currentColor" /> {boardName}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Access Question Papers, Notes, and Mock Tests for {subjectName}.</p>
               </div>
            </div>
            <div className="flex items-center gap-8 md:gap-12 bg-white px-8 py-5 rounded-3xl shadow-sm border border-slate-100/50">
               <div className="text-center">
                 <p className="text-2xl font-bold text-slate-800">{subjectData?.chapters_count || 0}</p>
                 <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-1">Chapters</p>
               </div>
               <div className="text-center">
                 <p className="text-2xl font-bold text-slate-800">{subjectData?.notes_count || 0}</p>
                 <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-1">Notes</p>
               </div>
               <div className="text-center">
                 <p className="text-2xl font-bold text-slate-800">{subjectData?.mock_tests_count || 0}</p>
                 <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-1">Mock Tests</p>
               </div>
               <div className="text-center">
                 <p className="text-2xl font-bold text-slate-800">{subjectData?.question_papers_count || 0}</p>
                 <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-1">Question Papers</p>
               </div>
            </div>
          </div>
          <div className="flex items-center gap-8 border-b border-slate-200 mb-8 overflow-x-auto scrollbar-hide">
             {(["overview", "chapters", "notes", "papers", "tests"] as TabType[]).map((tab) => {
                const labels: Record<string, string> = {
                  overview: "Overview", chapters: "Chapters", notes: "Notes", papers: "Question Papers", tests: "Mock Tests"
                };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap px-2 py-4 text-sm font-bold transition-all relative ${
                      activeTab === tab ? "text-brand-blue" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {labels[tab]}
                    {activeTab === tab && (
                      <motion.div layoutId="activetab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue" />
                    )}
                  </button>
                )
             })}
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
               <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                  <div className="relative flex-1 w-full group">
                     <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-brand-blue" size={20} />
                     <input 
                       type="text" 
                       placeholder={`Search ${activeTab === 'papers' ? 'Question Papers' : 'Content'}...`}
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue shadow-sm transition-all text-sm font-medium"
                     />
                  </div>
                  <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-full shadow-sm text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all whitespace-nowrap">
                    <Filter size={18} /> Filters
                  </button>
               </div>
               <AnimatePresence mode="wait">
                 {activeTab === "papers" && (
                   <motion.div key="papers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Question Papers</h2>
                      <div className="flex flex-wrap items-center gap-3 mb-8">
                         {yearOptions.map((year, i) => (
                           <button
                             key={i}
                             onClick={() => setYearFilter(year)}
                             className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                               yearFilter === year 
                                ? "bg-blue-100 text-blue-700 shadow-inner" 
                                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 uppercase tracking-wide"
                             }`}
                           >
                             {year} {year === "All Years" || year === "More" ? " ⌄" : ""}
                           </button>
                         ))}
                      </div>
                      {loadingPapers ? (
                         <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-brand-blue" size={40} />
                         </div>
                      ) : (
                         <div className="space-y-4">
                            {filteredPapers.map((paper, idx) => (
                              <div key={paper.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:border-brand-blue/30 transition-all flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-brand-blue transition-colors"></div>
                                 <div className="flex items-center gap-5 w-full md:w-auto">
                                    <div className="h-10 w-10 border border-rose-100 bg-rose-50 text-rose-500 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-sm relative">
                                      <FileText size={18} />
                                      <span className="absolute -bottom-2 bg-rose-500 text-white text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full shadow-sm">PDF</span>
                                    </div>
                                    <div>
                                       <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors">{paper.title}</h3>
                                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Published {paper.year}</span>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                                    {idx === 0 && <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase px-2 py-1 rounded-lg border border-emerald-100">New</span>}
                                    <Link 
                                      href={`/viewer?file=${encodeURIComponent(paper.pdf_file || '')}&title=${encodeURIComponent(paper.title)}`}
                                      className="flex-1 md:flex-none px-6 py-3 bg-brand-blue text-white font-bold text-xs rounded-full shadow-md shadow-brand-blue/20 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
                                    >
                                      <Eye size={14} /> View Online
                                    </Link>

                                 </div>
                              </div>
                            ))}
                            {filteredPapers.length === 0 && (
                              <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                                <Search className="mx-auto text-slate-300 mb-4" size={36} />
                                <h3 className="text-xl font-bold text-slate-800 mb-1">No question papers found</h3>
                                <p className="text-slate-500">Try adjusting your filters or search term.</p>
                              </div>
                            )}
                         </div>
                      )}
                   </motion.div>
                 )}
                 {activeTab === "overview" && (
                   <div key="overview">
                      {slug === 'biology' ? (
                        <BiologyOverview />
                      ) : slug === 'chemistry' ? (
                        <ChemistryOverview />
                      ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center bg-white rounded-3xl border border-slate-100">
                           <LayoutTemplate size={36} className="mx-auto text-slate-200 mb-4" />
                           <h3 className="text-xl font-bold text-slate-800 mb-2">Overview Section</h3>
                           <p className="text-slate-500">This content is currently being prepared by our educators.</p>
                        </motion.div>
                      )}
                   </div>
                 )}
                 {activeTab !== "papers" && activeTab !== "overview" && (
                   <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center bg-white rounded-3xl border border-slate-100">
                      <LayoutTemplate size={36} className="mx-auto text-slate-200 mb-4" />
                      <h3 className="text-xl font-bold text-slate-800 mb-2 capitalize">{activeTab} section</h3>
                      <p className="text-slate-500">This content is currently being prepared by our educators.</p>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
            <div className="w-full lg:w-80 flex flex-col gap-6">
               <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 tracking-tight">Quick Access</h3>
                  <div className="space-y-1">
                     {[
                       { label: "Important Topics", icon: Lightbulb, color: "text-emerald-500", bg: "bg-emerald-50" },
                       { label: "Most Asked Questions", icon: Zap, color: "text-blue-500", bg: "bg-blue-50" },
                       { label: "Answer Keys", icon: CheckCircle, color: "text-amber-500", bg: "bg-amber-50" },
                       { label: "Exam Pattern", icon: LayoutTemplate, color: "text-rose-500", bg: "bg-rose-50" },
                     ].map((item, i) => (
                       <button key={i} className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                          <div className="flex items-center gap-3">
                             <div className={`h-7 w-7 ${item.bg} ${item.color} rounded-lg flex items-center justify-center`}>
                               <item.icon size={14} />
                             </div>
                             <span className="text-sm font-semibold text-slate-700 group-hover:text-brand-blue transition-colors">{item.label}</span>
                          </div>
                          <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-blue" />
                       </button>
                     ))}
                  </div>
               </div>
               <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-6 tracking-tight">Year Range</h3>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-3">
                     <span>2015</span>
                     <span>2025</span>
                  </div>
                  <div className="relative h-1.5 bg-slate-100 rounded-full">
                     <div className="absolute left-[10%] right-[10%] h-full bg-brand-blue rounded-full"></div>
                     <div className="absolute left-[10%] top-1/2 -translate-y-1/2 h-4 w-4 bg-brand-blue border-2 border-white rounded-full shadow-sm cursor-grab"></div>
                     <div className="absolute right-[10%] top-1/2 -translate-y-1/2 h-4 w-4 bg-brand-blue border-2 border-white rounded-full shadow-sm cursor-grab"></div>
                  </div>
               </div>
               <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 tracking-tight">Difficulty Level</h3>
                  <div className="space-y-3">
                     <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-4 w-4 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-emerald-500">
                           <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Easy</span>
                     </label>
                     <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-4 w-4 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-amber-500">
                           <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Medium</span>
                     </label>
                     <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="h-4 w-4 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-rose-500">
                           <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Difficult</span>
                     </label>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
