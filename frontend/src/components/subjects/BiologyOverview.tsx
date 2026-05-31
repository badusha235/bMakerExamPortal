"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sprout, Heart, Microscope, Globe, Zap } from "lucide-react";

const BiologyOverview = () => {
  // DNA Animation Helper: Array of rungs
  const rungs = Array.from({ length: 24 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-cyan-50/50 border border-white shadow-2xl p-8 md:p-12"
    >
      {/* Glassmorphism Background Decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[100px] -ml-24 -mb-24" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Content */}
        <div className="order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-[0.2em] mb-6"
          >
            🧬 SSLC Biology
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight"
          >
            Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Science of Life</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 font-medium"
          >
            Biology is the fascinating study of life and living organisms. The Kerala SSLC Biology syllabus introduces students to the diversity of life, human body systems, reproduction, heredity, and environmental conservation. Through engaging concepts and scientific exploration, students develop a deeper understanding of the natural world and the importance of protecting it for future generations.
          </motion.p>
          
          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { text: "Diversity of Life", icon: Sprout, color: "bg-emerald-500" },
              { text: "Human Body Systems", icon: Heart, color: "bg-rose-500" },
              { text: "Heredity & Genetics", icon: Zap, color: "bg-blue-500" },
              { text: "Environmental Conservation", icon: Globe, color: "bg-cyan-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm transition-all"
              >
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-black/5`}>
                  <item.icon size={20} />
                </div>
                <span className="font-bold text-slate-800 text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: 3D DNA Visualization */}
        <div className="order-1 lg:order-2 flex justify-center items-center py-12 lg:py-0">
          <div className="relative w-[280px] h-[400px] perspective-[1000px]">
            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-[1px]"
                  initial={{ 
                    x: Math.random() * 280, 
                    y: Math.random() * 400, 
                    opacity: 0 
                  }}
                  animate={{ 
                    y: [null, Math.random() * -100],
                    opacity: [0, 0.8, 0],
                    scale: [1, 1.5, 0.5]
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 5, 
                    repeat: Infinity, 
                    delay: Math.random() * 5 
                  }}
                />
              ))}
            </div>

            {/* DNA Helix Container */}
            <div className="absolute inset-0 flex flex-col justify-between py-2 transform-style-3d animate-dna-rotate">
              {rungs.map((_, i) => (
                <div 
                  key={i} 
                  className="relative flex justify-between h-2 transform-style-3d"
                  style={{ 
                    transform: `rotateY(${i * 25}deg)`,
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] border border-emerald-300" />
                  <div className="h-[2px] flex-1 mt-2 bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-400 opacity-40 shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
                  <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)] border border-cyan-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dna-rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .animate-dna-rotate {
          animation: dna-rotate 10s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </motion.div>
  );
};

export default BiologyOverview;
