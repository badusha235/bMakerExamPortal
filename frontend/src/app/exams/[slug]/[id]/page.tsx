"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Calculator, 
  Beaker, 
  FlaskConical, 
  Dna, 
  Languages, 
  BookOpen, 
  Map, 
  Monitor, 
  ArrowLeft,
  ChevronRight,
  GraduationCap,
  Loader2,
  FileQuestion
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Icon mapping based on database icon_name field
const ICON_MAP: Record<string, any> = {
  Calculator, 
  Beaker, 
  FlaskConical, 
  Dna, 
  Languages, 
  BookOpen, 
  Map, 
  Monitor,
  FileQuestion
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
  
  // URL: /exams/[slug]/[id] 
  // Example: /exams/sslc/state -> slug='sslc' (Category), id='state' (Exam)
  const categorySlug = params.slug as string; 
  const examSlug = params.id as string;     
  
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [examName, setExamName] = useState("");

  useEffect(() => {
    if (!examSlug) return;
    
    // Fetch subjects for this specific exam (using examSlug from URL)
    fetch(`http://localhost:8000/api/exams/subjects/?exam_slug=${examSlug}`)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results ?? [];
        setSubjects(results);
      })
      .catch(() => setSubjects([]))
      .finally(() => setLoading(false));

    // Fetch exam details to get the proper name (e.g. "Kerala State Syllabus")
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
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="mb-8">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-400 hover:text-brand-blue transition-colors font-semibold"
            >
              <ArrowLeft size={18} /> Back
            </button>
          </div>

          <div className="max-w-4xl mb-12">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <GraduationCap size={14} />
                {examSlug?.toUpperCase()} Syllabus
             </div>
             <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{pageTitle}</h1>
             <p className="text-slate-500 text-lg">Select a subject to access Question Papers, Notes, and Mock Tests.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-brand-blue" size={40} />
            </div>
          ) : subjects.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
               <FileQuestion size={48} className="mx-auto text-slate-300 mb-4" />
               <h3 className="text-xl font-bold text-slate-800">No subjects found</h3>
               <p className="text-slate-400">Subjects for this exam haven't been added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subjects.map((sub, idx) => {
                const IconComp = ICON_MAP[sub.icon_name] || BookOpen;
                const style = STYLE_MAP[sub.slug] || { color: "text-blue-600", bg: "bg-blue-50" };
                
                return (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => router.push(`/exams/${categorySlug}/${examSlug}/${sub.slug}`)}
                    className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-brand-blue/30 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className={`w-14 h-14 ${style.bg} ${style.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                       <IconComp size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{sub.name}</h3>
                    <p className="text-slate-400 text-sm mb-6">Modular Learning Series</p>
                    <div className="flex items-center text-brand-blue font-bold text-sm">
                       Explore Module <ChevronRight size={16} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
