"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, ChevronRight, BookOpen } from "lucide-react";

interface SubjectCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  chapters: number;
  notes: number;
  progress: number;
  color: string;
}

const SubjectCard = ({ id, name, icon: Icon, description, chapters, notes, progress, color }: SubjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-premium hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-300 relative overflow-hidden h-full flex flex-col"
    >
      <div 
        className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-500 scale-125"
      >
        <Icon size={120} />
      </div>

      <div 
        className="w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-lg transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}15`, color: color }}
      >
        <Icon size={32} />
      </div>

      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-brand-blue transition-colors">{name}</h3>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-brand-blue" />
            <span>{chapters} Chapters</span>
          </div>
          <span>{notes} Notes</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400">Progress</span>
            <span className="text-[10px] font-black text-brand-blue">{progress}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-brand-blue"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-50">
          <button className="w-full py-4 bg-slate-50 hover:bg-brand-blue hover:text-white text-slate-600 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2">
            Explore Module <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SubjectCard;
