"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  PenTool, 
  MessageSquare, 
  Library, 
  Mic2, 
  Lightbulb,
  Sparkles
} from "lucide-react";

const EnglishOverview = () => {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-amber-50/30 border border-white shadow-2xl p-8 md:p-12 mb-10"
    >
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[120px] -ml-48 -mb-48" />

      {/* Floating Letters in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ 
              x: Math.random() * 800, 
              y: Math.random() * 600, 
              opacity: 0,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 0.5, 0],
              rotate: [null, Math.random() * 360 + 90]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }}
            className="absolute text-4xl font-serif text-indigo-200 select-none"
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-indigo-200/50"
          >
            📚 English
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight"
          >
            Master the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-600">Communication</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 font-medium"
          >
            English is a language that empowers individuals to communicate, express ideas, and explore diverse perspectives. Through literature, poetry, storytelling, and language skills, students develop creativity, critical thinking, and confidence in both written and spoken communication. Learning English opens doors to knowledge, culture, and opportunities while fostering a lifelong appreciation for language and expression.
          </motion.p>
          
          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              { text: "Reading Skills", icon: Library, color: "from-indigo-500 to-blue-500" },
              { text: "Creative Writing", icon: PenTool, color: "from-purple-500 to-indigo-500" },
              { text: "Communication", icon: MessageSquare, color: "from-blue-500 to-cyan-500" },
              { text: "Literature", icon: BookOpen, color: "from-amber-500 to-orange-500" },
              { text: "Poetry & Stories", icon: Sparkles, color: "from-pink-500 to-purple-500" },
              { text: "Critical Thinking", icon: Lightbulb, color: "from-emerald-500 to-teal-500" },
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

        {/* Right Column: 3D Visualization */}
        <div className="order-1 lg:order-2 flex justify-center items-center py-12 lg:py-0">
          <div className="relative w-full max-w-[400px] h-[350px] perspective-[1500px]">
             {/* 3D Animated Book Simulation */}
             <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
                <div className="relative w-64 h-48 bg-amber-50 rounded-lg shadow-2xl border-l-[12px] border-amber-800/80 transform-style-3d rotate-x-12 rotate-y--12">
                   {/* Left Page */}
                   <div className="absolute inset-0 bg-white rounded-l-sm border-r border-slate-200 p-6 shadow-inner origin-right overflow-hidden">
                      <div className="space-y-2 opacity-20">
                         <div className="h-1 bg-slate-300 w-full" />
                         <div className="h-1 bg-slate-300 w-4/5" />
                         <div className="h-1 bg-slate-300 w-full" />
                         <div className="h-1 bg-slate-400 w-1/2 mt-4" />
                      </div>
                      <div className="absolute bottom-4 left-6 text-[10px] font-black text-amber-900/40">CHAPTER I</div>
                   </div>

                   {/* Right Page (Flipping Effect) */}
                   <div className="absolute inset-0 bg-white rounded-r-sm p-6 shadow-inner overflow-hidden animate-page-flip origin-left">
                      <div className="space-y-2 opacity-20">
                         <div className="h-1 bg-slate-300 w-full" />
                         <div className="h-1 bg-slate-300 w-full" />
                         <div className="h-1 bg-slate-300 w-3/4" />
                         <div className="h-1 bg-slate-400 w-1/3 mt-4" />
                      </div>
                      <div className="absolute bottom-4 right-6 text-[10px] font-black text-amber-900/40">PAGE 42</div>
                      
                      {/* Floating Element emerging from book */}
                      <motion.div
                        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      >
                         <Library className="text-amber-500/20" size={80} />
                      </motion.div>
                   </div>

                   {/* Secondary Pages (Thickness) */}
                   <div className="absolute top-1 -right-1 w-full h-full bg-white/80 rounded-r-sm -z-10 shadow-sm" />
                   <div className="absolute top-2 -right-2 w-full h-full bg-white/60 rounded-r-sm -z-20 shadow-sm" />
                </div>

                {/* Floating "Ink" Particles */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-indigo-500 rounded-full"
                    animate={{
                      y: [0, -60],
                      x: [0, (i % 2 === 0 ? 30 : -30)],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.2, 0]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.4
                    }}
                    style={{ bottom: '30%', left: '45%' }}
                  />
                ))}

                {/* Main Floating Icon */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 right-10 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-amber-500 border border-amber-50 z-30"
                >
                   <PenTool size={32} />
                </motion.div>

                {/* Glowing Halo */}
                <div className="absolute w-64 h-64 bg-amber-400/10 rounded-full blur-[80px] -z-30 animate-pulse" />
             </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes page-flip {
           0%, 100% { transform: rotateY(0deg); }
           50% { transform: rotateY(-3deg); }
        }
        .animate-page-flip {
           animation: page-flip 6s ease-in-out infinite;
           transform-origin: left;
           perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .perspective-1500 {
          perspective: 1500px;
        }
      `}</style>
    </motion.div>
  );
};

export default EnglishOverview;
