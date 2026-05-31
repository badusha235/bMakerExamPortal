"use client";

import React from "react";
import { motion } from "framer-motion";
import { Atom, Droplets, Microscope, Beaker, FlaskConical, Globe } from "lucide-react";

const ChemistryOverview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 border border-white shadow-2xl p-8 md:p-12 mb-10"
    >
      {/* Dynamic Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/5 rounded-full blur-[120px] -ml-48 -mb-48" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column: Content */}
        <div className="order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-blue-200/50"
          >
            ⚗️ SSLC Chemistry
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight"
          >
            Explore the World of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Matter and Reactions</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 font-medium"
          >
            Chemistry is the branch of science that explores the composition, structure, properties, and transformations of matter. The Kerala SSLC Chemistry syllabus introduces students to atoms, molecules, chemical reactions, acids and bases, metals, non-metals, and the fascinating role of chemistry in everyday life. Through experiments, observations, and scientific reasoning, students develop a deeper understanding of the substances around them and the principles that govern the physical world.
          </motion.p>
          
          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              { text: "Atoms & Molecules", icon: Atom, color: "from-blue-500 to-cyan-500" },
              { text: "Chemical Reactions", icon: Droplets, color: "from-purple-500 to-indigo-500" },
              { text: "Acids & Bases", icon: FlaskConical, color: "from-pink-500 to-rose-500" },
              { text: "Metals & Non-Metals", icon: Beaker, color: "from-orange-500 to-amber-500" },
              { text: "Environmental Chemistry", icon: Globe, color: "from-teal-500 to-emerald-500" },
              { text: "Scientific Experiments", icon: Microscope, color: "from-blue-600 to-purple-600" },
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

        {/* Right Column: 3D Molecule Visualization */}
        <div className="order-1 lg:order-2 flex justify-center items-center py-12 lg:py-0">
          <div className="relative w-[300px] h-[300px] perspective-[1200px]">
             {/* Background Particles (Atoms) */}
             {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={`p-${i}`}
                  className="absolute w-2 h-2 rounded-full blur-[1px]"
                  style={{
                    background: i % 2 === 0 ? '#3B82F6' : '#D946EF',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 40 - 20],
                    y: [0, Math.random() * 40 - 20],
                    opacity: [0, 0.4, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                />
             ))}

             {/* Main Molecule Structure */}
             <div className="absolute inset-0 flex items-center justify-center transform-style-3d animate-molecule-rotate">
                {/* Central Atom */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_50px_rgba(139,92,246,0.6)] border border-white/30 z-20 flex items-center justify-center">
                  <Atom className="text-white opacity-40 animate-spin-slow" size={32} />
                </div>

                {/* Orbiting Atoms & Connections */}
                {[0, 72, 144, 216, 288].map((angle, i) => (
                   <div 
                     key={i} 
                     className="absolute w-[200px] h-[2px] transform-style-3d bg-white/20"
                     style={{ transform: `rotateZ(${angle}deg) rotateY(45deg)` }}
                   >
                      <div className="absolute right-0 -top-4 w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] border border-white/20 animate-float" style={{ animationDelay: `${i * 0.5}s` }} />
                      <div className="absolute left-0 -top-2 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-white/20 animate-float-reverse" style={{ animationDelay: `${i * 0.3}s` }} />
                   </div>
                ))}

                {/* Electron Orbits */}
                <div className="absolute w-[260px] h-[260px] border border-blue-400/20 rounded-full rotate-45 transform-style-3d">
                   <div className="absolute w-3 h-3 bg-cyan-400 rounded-full animate-electron-orbit-1" />
                </div>
                <div className="absolute w-[260px] h-[260px] border border-purple-400/20 rounded-full -rotate-45 transform-style-3d">
                   <div className="absolute w-3 h-3 bg-purple-400 rounded-full animate-electron-orbit-2" />
                </div>
             </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes molecule-rotate {
          from { transform: rotateY(0deg) rotateX(20deg); }
          to { transform: rotateY(360deg) rotateX(20deg); }
        }
        @keyframes electron-orbit-1 {
          from { transform: rotate(0deg) translateX(130px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(130px) rotate(-360deg); }
        }
        @keyframes electron-orbit-2 {
          from { transform: rotate(180deg) translateX(130px) rotate(-180deg); }
          to { transform: rotate(540deg) translateX(130px) rotate(-540deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-molecule-rotate {
          animation: molecule-rotate 15s linear infinite;
        }
        .animate-electron-orbit-1 {
          animation: electron-orbit-1 3s linear infinite;
        }
        .animate-electron-orbit-2 {
          animation: electron-orbit-2 4s linear infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 5s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </motion.div>
  );
};

export default ChemistryOverview;
