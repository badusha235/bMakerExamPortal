"use client";

import React, { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  CheckCircle2, 
  Bookmark, 
  Lightbulb,
  HelpCircle,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChapterProps {
  chapter: {
    id: string;
    title: string;
    summary: string;
    progress: number;
    formulas?: string[];
    keyPoints?: string[];
    oneMarkQuestions?: { q: string; a: string }[];
  };
  index: number;
}

export default function ChapterAccordion({ chapter, index }: ChapterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-6 cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 text-brand-blue flex items-center justify-center font-bold text-lg">
            {index + 1}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{chapter.title}</h3>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <BookOpen size={12} /> {chapter.summary}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
             <div 
               className="h-full bg-brand-blue" 
               style={{ width: `${chapter.progress}%` }} 
             />
          </div>
          <button className={`p-2 rounded-xl transition-colors ${isOpen ? "bg-slate-100" : "hover:bg-slate-50"}`}>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-50"
          >
            <div className="p-8 space-y-8">
              {/* Formulas */}
              {chapter.formulas && chapter.formulas.length > 0 && (
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-blue">
                    <Lightbulb size={16} /> Important Formulas
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {chapter.formulas.map((f, i) => (
                      <div key={i} className="bg-slate-50 p-4 rounded-2xl font-mono text-sm text-slate-700 border border-slate-100">
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Points */}
              {chapter.keyPoints && chapter.keyPoints.length > 0 && (
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-emerald-600">
                    <CheckCircle2 size={16} /> Key Concepts
                  </h4>
                  <ul className="space-y-2">
                    {chapter.keyPoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Review Questions */}
              {chapter.oneMarkQuestions && chapter.oneMarkQuestions.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-amber-600">
                    <HelpCircle size={16} /> Quick Review (1 Mark)
                  </h4>
                  <div className="space-y-4">
                    {chapter.oneMarkQuestions.map((q, i) => (
                      <div key={i} className="bg-amber-50/30 p-4 rounded-2xl border border-amber-100/50">
                        <p className="text-sm font-bold text-slate-800 mb-2">Q: {q.q}</p>
                        <p className="text-sm text-amber-800 font-medium">A: {q.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-8">
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                    isBookmarked ? "bg-amber-100 text-amber-600 border border-amber-200" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
                  {isBookmarked ? "Chapter Saved" : "Save for Revision"}
                </button>
                <div className="flex items-center gap-2">
                  <button className="px-6 py-3 bg-brand-blue text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-blue/10 flex items-center gap-2">
                    Mark as Complete <CheckCircle2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
