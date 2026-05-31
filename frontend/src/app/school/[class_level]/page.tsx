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

const ICON_MAP: Record<string, any> = {
  Calculator, Beaker, FlaskConical, Dna, Languages, BookOpen, Map, Monitor, FileQuestion, FileText
};

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
  board: string;
  class_level: string;
  stream: string;
  icon_name: string;
}

export default function ClassLevelPage() {
  const params = useParams();
  const router = useRouter();
  
  const classLevel = params.class_level as string; 
  
  const [board, setBoard] = useState("kerala_state");
  const [stream, setStream] = useState(classLevel === "sslc" ? "general" : "science");

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  // Derive title from classLevel
  const classLevelName = {
    "sslc": "SSLC",
    "plus_one": "Plus One",
    "plus_two": "Plus Two"
  }[classLevel] || classLevel.toUpperCase();

  useEffect(() => {
    setLoading(true);
    let url = `http://localhost:8000/api/exams/subjects/?class_level=${classLevel}&board=${board}`;
    if (classLevel !== "sslc") {
        url += `&stream=${stream}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results ?? [];
        setSubjects(results);
      })
      .catch(() => setSubjects([]))
      .finally(() => setLoading(false));
  }, [classLevel, board, stream]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
          {/* Breadcrumb */}
          <div className="mb-8">
            <button 
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors text-sm font-semibold"
            >
              <ArrowLeft size={16} strokeWidth={2.5} /> Back to Home
            </button>
          </div>

          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 relative">
            <div className="max-w-2xl relative z-10">
               <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100/80 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-sm border border-blue-200/50">
                  <GraduationCap size={14} />
                  {classLevelName} LEVEL
               </div>
               <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
                 {classLevelName} Subjects
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

          {/* Filtering Controls */}
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 inline-flex flex-wrap gap-2 mb-8">
             <button
               onClick={() => setBoard("kerala_state")}
               className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${board === "kerala_state" ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20" : "text-slate-500 hover:bg-slate-50"}`}
             >
               Kerala State Syllabus
             </button>
             <button
               onClick={() => setBoard("cbse")}
               className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${board === "cbse" ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20" : "text-slate-500 hover:bg-slate-50"}`}
             >
               CBSE
             </button>
          </div>

          {classLevel !== "sslc" && (
            <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
               {["science", "commerce", "humanities"].map((s) => (
                 <button
                   key={s}
                   onClick={() => setStream(s)}
                   className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${stream === s ? "bg-slate-800 text-white border-slate-800" : "bg-transparent text-slate-500 border-slate-200 hover:border-slate-400"}`}
                 >
                   {s}
                 </button>
               ))}
            </div>
          )}

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
                 <p className="text-slate-500 mt-2">Subjects for this criteria haven't been added yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {subjects.map((sub, idx) => {
                  const IconComp = ICON_MAP[sub.icon_name] || BookOpen;
                  const style = STYLE_MAP[sub.slug] || { color: "text-blue-600", bg: "bg-blue-50" };
                  const chapterCount = Math.floor(Math.random() * 10) + 15;
                  const notesCount = Math.floor(Math.random() * 100) + 200;
                  
                  return (
                    <motion.div
                      key={sub.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => router.push(`/school/${classLevel}/${sub.slug}?board=${board}&stream=${stream}`)}
                      className="group bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all cursor-pointer relative flex flex-col justify-between overflow-hidden min-h-[200px]"
                    >
                      <div>
                        <div className={`w-10 h-10 ${style.bg} ${style.color} rounded-xl flex items-center justify-center mb-5`}>
                           <IconComp size={20} strokeWidth={2} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{sub.name}</h3>
                        <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider mb-6">Modular Learning Series</p>
                      </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {[
               { icon: FileText, title: "Question Papers", sub: "2015 - 2025", color: "text-blue-600", bg: "bg-blue-50" },
               { icon: FileText, title: "Chapter-wise Notes", sub: "Detailed & Quick Notes", color: "text-emerald-600", bg: "bg-emerald-50" },
               { icon: Zap, title: "Mock Tests", sub: "Practice & Evaluate", color: "text-blue-500", bg: "bg-blue-50" },
               { icon: Lightbulb, title: "Study Smart", sub: "Learn Better", color: "text-indigo-600", bg: "bg-indigo-50" }
             ].map((feature, i) => (
                <div key={i} className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-slate-100 flex items-center gap-4 hover:border-brand-blue/30 transition-colors cursor-pointer">
                   <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${feature.bg} ${feature.color}`}>
                     <feature.icon size={18} strokeWidth={2} />
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
