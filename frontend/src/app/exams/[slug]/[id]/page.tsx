"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Calculator, Beaker, FlaskConical, Dna, Languages, BookOpen, Map, Monitor, 
  ArrowLeft, ChevronRight, GraduationCap, Loader2, FileQuestion, ArrowRight,
  FileText, LayoutTemplate, Zap, Lightbulb, CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Icon mapping based on database icon_name field
const ICON_MAP: Record<string, any> = {
  Calculator, Beaker, FlaskConical, Dna, Languages, BookOpen, Map, Monitor, FileQuestion, FileText
};

// Default styling mapping
const STYLE_MAP: Record<string, { color: string; bg: string }> = {
  mathematics: { color: "text-blue-600", bg: "bg-blue-50" },
  physics: { color: "text-emerald-600", bg: "bg-emerald-50" },
  chemistry: { color: "text-orange-600", bg: "bg-orange-50" },
  biology: { color: "text-pink-600", bg: "bg-pink-50" },
  english: { color: "text-indigo-600", bg: "bg-indigo-50" },
  malayalam: { color: "text-rose-600", bg: "bg-rose-50" },
  "social-science": { color: "text-teal-600", bg: "bg-teal-50" },
  it: { color: "text-cyan-600", bg: "bg-cyan-50" },
};

interface Subject {
  id: number;
  name: string;
  slug: string;
  icon_name: string;
  description: string;
}

export default function ExamCategoryLevelPage() {
  const params = useParams();
  const router = useRouter();
  
  const categorySlug = params.slug as string; 
  const examSlug = params.id as string;     
  
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [examName, setExamName] = useState("");

  useEffect(() => {
    if (!examSlug) return;
    
    fetch(`http://localhost:8000/api/exams/subjects/?exam_slug=${examSlug}`)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results ?? [];
        setSubjects(results);
      })
      .catch(() => setSubjects([]))
      .finally(() => setLoading(false));

    fetch(`http://localhost:8000/api/exams/exams/?slug=${examSlug}`)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results ?? [];
        if (results.length > 0) setExamName(results[0].name);
      })
      .catch(() => {});
  }, [examSlug]);

  const pageTitle = examName || (examSlug === "state" ? "Kerala State Syllabus" : examSlug?.toUpperCase());

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
          {/* Breadcrumb */}
          <div className="mb-8">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors text-sm font-semibold"
            >
              <ArrowLeft size={16} strokeWidth={2.5} /> Back to {categorySlug.toUpperCase()}
            </button>
          </div>

          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 relative">
            <div className="max-w-2xl relative z-10">
               <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100/80 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-sm border border-blue-200/50">
                  <GraduationCap size={14} />
                  {categorySlug.toUpperCase()} LEVEL
               </div>
               <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
                 {pageTitle}
               </h1>
               <p className="text-slate-500 text-lg lg:text-xl font-medium">
                 Select a subject to access <span className="text-brand-blue font-bold">Question Papers</span>, Notes, and Mock Tests.
               </p>
            </div>
            {/* Decals for Hero Area */}
            <div className="hidden lg:flex w-[400px] h-[250px] relative shrink-0 opacity-80 pointer-events-none">
                <div className="absolute top-10 right-10 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-32 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Subject Grid */}
          <div className="mb-16">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-brand-blue" size={40} />
              </div>
            ) : subjects.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
                 <FileQuestion size={48} className="mx-auto text-slate-300 mb-4" />
                 <h3 className="text-2xl font-bold text-slate-800 tracking-tight">No subjects found</h3>
                 <p className="text-slate-500 mt-2">Subjects for this exam haven't been added yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {subjects.map((sub, idx) => {
                  const IconComp = ICON_MAP[sub.icon_name] || BookOpen;
                  const style = STYLE_MAP[sub.slug] || { color: "text-blue-600", bg: "bg-blue-50" };
                  // Note: Mocking chapters/notes counts since not returned in current subjects list API natively
                  const chapterCount = Math.floor(Math.random() * 10) + 15;
                  const notesCount = Math.floor(Math.random() * 100) + 200;
                  
                  return (
                    <motion.div
                      key={sub.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => router.push(`/exams/${categorySlug}/${examSlug}/${sub.slug}`)}
                      className="group bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all cursor-pointer relative flex flex-col justify-between overflow-hidden min-h-[220px]"
                    >
                      {/* Top content */}
                      <div>
                        <div className={`w-14 h-14 ${style.bg} ${style.color} rounded-2xl flex items-center justify-center mb-6`}>
                           <IconComp size={28} strokeWidth={2} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{sub.name}</h3>
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-8">Modular Learning Series</p>
                      </div>

                      {/* Bottom stats row */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                           <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                             <LayoutTemplate size={12} className={style.color} /> {chapterCount} Chapters
                           </div>
                           <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                             <BookOpen size={12} className={style.color} /> {notesCount}+ Notes
                           </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full ${style.color.replace('text', 'bg')} flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110`}>
                           <ArrowRight size={16} strokeWidth={3} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {[
               { icon: FileText, title: "Question Papers", sub: "2015 - 2025", color: "text-blue-600", bg: "bg-blue-50" },
               { icon: FileText, title: "Chapter-wise Notes", sub: "Detailed & Quick Notes", color: "text-emerald-600", bg: "bg-emerald-50" },
               { icon: Zap, title: "Mock Tests", sub: "Practice & Evaluate", color: "text-blue-500", bg: "bg-blue-50" },
               { icon: Lightbulb, title: "Study Smart", sub: "Learn Better", color: "text-indigo-600", bg: "bg-indigo-50" }
             ].map((feature, i) => (
                <div key={i} className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100 flex items-center gap-4 hover:border-brand-blue/30 transition-colors cursor-pointer">
                   <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${feature.bg} ${feature.color}`}>
                     <feature.icon size={22} strokeWidth={2} />
                   </div>
                   <div>
                     <h4 className="font-bold text-sm text-slate-900 mb-0.5">{feature.title}</h4>
                     <p className="text-xs font-semibold text-slate-500">{feature.sub}</p>
                   </div>
                </div>
             ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
