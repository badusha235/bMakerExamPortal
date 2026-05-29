"use client";

import React from "react";
import { Search, ChevronRight, GraduationCap, ShieldCheck, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-3xl opacity-40" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue-soft border border-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              Trusted by 50,000+ Students
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Elevate Your <span className="text-brand-blue">Exam Prep</span> with ExamVault
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              The most comprehensive platform for Kerala PSC, NEET, JEE, and competitive exams. Expert syllabus, mock tests, and real-time alerts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center gap-4 max-w-2xl mx-auto mb-16"
          >
            <div className="relative w-full group">
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-blue transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search for SSLC, PSC, NEET, UPSC..."
                className="w-full pl-12 pr-4 py-4 md:py-5 bg-slate-50 border border-slate-200 rounded-2xl md:rounded-3xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:bg-white focus:border-brand-blue transition-all shadow-sm"
              />
            </div>
            <button className="w-full md:w-auto px-8 py-4 md:py-5 bg-brand-blue text-white font-bold rounded-2xl md:rounded-3xl hover:bg-brand-blue-deep transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2 active:scale-[0.98]">
              Search <ChevronRight size={18} />
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto border-t border-slate-100 pt-10"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Expert Content</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Verified Exams</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                <Trophy size={24} />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Success Rated</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
