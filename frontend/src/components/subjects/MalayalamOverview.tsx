"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  PenTool, 
  Library, 
  MessageCircle, 
  Palmtree, 
  Lightbulb,
  Sparkles
} from "lucide-react";

const MalayalamOverview = () => {
  const letters = ["അ", "ആ", "ഇ", "ഈ", "ക", "ഖ", "ഗ", "ഘ", "ങ", "ച", "ഛ"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-50/50 via-amber-50/50 to-orange-50/30 border border-white shadow-2xl p-8 md:p-12 mb-10"
    >
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-400/10 rounded-full blur-[120px] -ml-40 -mb-40" />

      {/* Floating Malayalam Characters */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ 
              x: Math.random() * 800, 
              y: Math.random() * 600, 
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 0.6, 0],
              rotate: [0, Math.random() * 20 - 10]
            }}
            transition={{ 
              duration: 12 + Math.random() * 8, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }}
            className="absolute text-4xl font-black text-emerald-800/10 select-none"
          >
            {char}
          </motion.span>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column: Content */}
        <div className="order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-emerald-200/50"
          >
            📖 Malayalam
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight"
          >
            Discover the Beauty of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-amber-600 to-orange-600">Language & Literature</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 font-medium"
          >
            Malayalam is a language rich in history, culture, and literary excellence. Through poetry, stories, essays, and creative expression, students explore the beauty of language while developing reading, writing, and communication skills. Studying Malayalam nurtures imagination, cultural awareness, and an appreciation for the traditions, values, and artistic heritage preserved through generations.
          </motion.p>
          
          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              { text: "Literature", icon: Library, color: "from-emerald-500 to-teal-500" },
              { text: "Creative Writing", icon: PenTool, color: "from-orange-500 to-amber-500" },
              { text: "Poetry & Stories", icon: Sparkles, color: "from-pink-500 to-rose-500" },
              { text: "Communication Skills", icon: MessageCircle, color: "from-blue-500 to-indigo-500" },
              { text: "Culture & Heritage", icon: Palmtree, color: "from-amber-600 to-orange-400" },
              { text: "Language Development", icon: Lightbulb, color: "from-cyan-500 to-blue-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 p-3.5 bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-sm hover:shadow-md transition-all group"
              >
                <div className={`w-9 h-9 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-black/5 group-hover:rotate-12 transition-transform`}>
                  <item.icon size={18} />
                </div>
                <span className="font-bold text-slate-800 text-[13px]">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Cultural Visualization */}
        <div className="order-1 lg:order-2 flex justify-center items-center py-12 lg:py-0">
          <div className="relative w-full max-w-[400px] h-[350px] flex items-center justify-center">
             {/* Traditional Manuscript / Book Stack */}
             <div className="relative transform-style-3d rotate-x-12">
                {/* Palm Leaf Manuscript Representation */}
                <motion.div 
                  animate={{ rotate: [0, -2, 0], y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="w-72 h-16 bg-amber-100 rounded-lg shadow-lg border-2 border-amber-800/20 relative flex items-center px-8"
                >
                   <div className="flex gap-2 opacity-30 select-none text-[8px] font-black text-amber-900 tracking-[0.5em]">
                      {letters.slice(0, 5).join(" ")}
                   </div>
                   <div className="absolute top-1/2 left-4 w-4 h-4 rounded-full bg-amber-800/40 -translate-y-1/2 shadow-inner" />
                   <div className="absolute top-1/2 right-4 w-4 h-4 rounded-full bg-amber-800/40 -translate-y-1/2 shadow-inner" />
                </motion.div>

                {/* Sub-layers for depth */}
                <div className="absolute top-4 -z-10 w-72 h-16 bg-amber-100/80 rounded-lg border border-amber-800/10 translate-y-4" />
                <div className="absolute top-8 -z-20 w-72 h-16 bg-amber-100/60 rounded-lg border border-amber-800/10 translate-y-8" />
             </div>

             {/* Floating Elements */}
             <motion.div
               animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity }}
               className="absolute top-10 right-10 w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-emerald-600 border border-emerald-50 z-30"
             >
                <BookOpen size={40} />
             </motion.div>

             <motion.div
               animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, delay: 1 }}
               className="absolute bottom-10 left-10 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-orange-500 border border-orange-50 z-30"
             >
                <Palmtree size={32} />
             </motion.div>

             {/* Artistic Swirls / Particles */}
             {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: i % 2 === 0 ? '#10B981' : '#F59E0B',
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    x: [0, (Math.random() * 200 - 100)],
                    y: [0, (Math.random() * -200 - 50)],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
             ))}

             {/* Cultural Glow */}
             <div className="absolute w-64 h-64 bg-amber-400/10 rounded-full blur-[80px] -z-30 animate-pulse" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .transform-style-3d {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>
    </motion.div>
  );
};

export default MalayalamOverview;
