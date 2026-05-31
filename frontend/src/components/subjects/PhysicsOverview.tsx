"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Lightbulb, 
  Battery, 
  Orbit, 
  Globe, 
  Rocket,
  Atom,
  Magnet
} from "lucide-react";

const PhysicsOverview = () => {
  const formulas = ["E=mc²", "F=ma", "v=u+at", "W=Fd", "P=VI", "λ=h/p"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sky-50/50 via-indigo-50/50 to-purple-50/30 border border-white shadow-2xl p-8 md:p-12 mb-10"
    >
      {/* Space-like Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
         {Array.from({ length: 40 }).map((_, i) => (
           <motion.div
             key={i}
             className="absolute bg-blue-300 rounded-full blur-[1px]"
             style={{
                width: Math.random() * 2 + "px",
                height: Math.random() * 2 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%"
             }}
             animate={{ 
               opacity: [0.1, 0.8, 0.1],
               scale: [1, 1.5, 1]
             }}
             transition={{ 
               duration: 2 + Math.random() * 3, 
               repeat: Infinity,
               delay: Math.random() * 5
             }}
           />
         ))}
      </div>

      {/* Cosmic Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] -mr-80 -mt-80" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[120px] -ml-40 -mb-40" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column: Content */}
        <div className="order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-sky-200/50"
          >
            ⚛️ Physics
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight"
          >
            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500">Laws of the Universe</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 font-medium"
          >
            Physics is the science that explains how the universe works, from the motion of everyday objects to the forces that govern planets, energy, light, and matter. Through observation, experimentation, and problem-solving, students develop a deeper understanding of natural phenomena and the fundamental principles that shape the world around us. Physics encourages curiosity, logical thinking, and innovation, helping learners explore the wonders of science and technology.
          </motion.p>
          
          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              { text: "Force & Motion", icon: Zap, color: "bg-cyan-600" },
              { text: "Light & Optics", icon: Lightbulb, color: "bg-blue-600" },
              { text: "Energy", icon: Battery, color: "bg-indigo-600" },
              { text: "Magnetism", icon: Magnet, color: "bg-purple-600" },
              { text: "Gravity", icon: Globe, color: "bg-electric-blue" },
              { text: "Scientific Exploration", icon: Rocket, color: "bg-teal-600" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm hover:shadow-md transition-all group"
              >
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-black/20 group-hover:rotate-12 transition-transform`}>
                  <item.icon size={20} />
                </div>
                <span className="font-bold text-slate-800 text-[13px]">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Physics Visualization */}
        <div className="order-1 lg:order-2 flex justify-center items-center py-12 lg:py-0">
          <div className="relative w-full max-w-[450px] h-[400px] flex items-center justify-center">
             {/* Central Atom Hub */}
             <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute w-full h-full border-2 border-cyan-500/30 rounded-full"
                />
                <motion.div 
                  animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[140%] h-[140%] border border-white/10 rounded-full"
                />
                <div className="w-16 h-16 bg-gradient-to-tr from-cyan-400 to-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.5)] z-20">
                   <Atom className="text-white animate-spin-slow" size={32} />
                </div>
             </div>

             {/* Orbital Electrons / Particles */}
             {[0, 120, 240].map((angle, i) => (
                <div 
                  key={i}
                  className="absolute w-[240px] h-[100px] border border-cyan-500/20 rounded-[50%] transform-style-3d"
                  style={{ transform: `rotate(${angle}deg) rotateX(70deg)` }}
                >
                   <motion.div 
                     animate={{ offsetDistance: ["0%", "100%"] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 1 }}
                     className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_cyan]"
                     style={{ offsetPath: "ellipse(120px 50px at 120px 50px)" }}
                   />
                </div>
             ))}

             {/* Floating Formulas */}
             {formulas.map((formula, i) => (
               <motion.span
                 key={i}
                 initial={{ opacity: 0 }}
                 animate={{ 
                    opacity: [0, 0.6, 0],
                    x: [(Math.random() * 200 - 100), (Math.random() * 200 - 100)],
                    y: [(Math.random() * 200 - 100), (Math.random() * 200 - 100)],
                    scale: [0.5, 1, 0.5]
                 }}
                 transition={{ 
                   duration: 5 + Math.random() * 5, 
                   repeat: Infinity, 
                   delay: i * 2 
                 }}
                 className="absolute text-cyan-500/40 font-mono text-sm font-black tracking-widest pointer-events-none"
               >
                 {formula}
               </motion.span>
             ))}

             {/* Light Beams Animation */}
             <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={`beam-${i}`}
                    animate={{ 
                       x: [-300, 500],
                       y: [200, -200],
                       opacity: [0, 0.2, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: i * 1.5,
                      ease: "linear"
                    }}
                    className="absolute w-[300px] h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rotate-[-30deg]"
                  />
                ))}
             </div>

             {/* Gravitational Waves Glow */}
             <div className="absolute w-[350px] h-[350px] border border-blue-500/5 rounded-full animate-pulse-slow -z-10" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
           animation: spin 8s linear infinite;
        }
        @keyframes spin {
           from { transform: rotate(0deg); }
           to { transform: rotate(360deg); }
        }
        .animate-pulse-slow {
           animation: pulse 10s ease-in-out infinite;
        }
        @keyframes pulse {
           0%, 100% { transform: scale(1); opacity: 0.1; }
           50% { transform: scale(1.2); opacity: 0.3; }
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </motion.div>
  );
};

export default PhysicsOverview;
