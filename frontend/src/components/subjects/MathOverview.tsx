"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  Box, 
  PieChart, 
  Puzzle, 
  Lightbulb,
  Divide,
  Plus,
  Minus,
  Equal
} from "lucide-react";

const MathOverview = () => {
  const symbols = ["π", "∑", "∞", "√", "x²", "sin", "θ", "∫"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/30 border border-white shadow-2xl p-8 md:p-12 mb-10"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[120px] -ml-40 -mb-40" />

      {/* Floating Math Symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {symbols.map((sym, i) => (
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
              duration: 8 + Math.random() * 8, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }}
            className="absolute text-3xl font-mono text-blue-800/30 select-none font-black"
          >
            {sym}
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-blue-200/50"
          >
            📐 Mathematics
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight"
          >
            Unlock the Power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Numbers & Logic</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 font-medium"
          >
            Mathematics is the language of patterns, logic, and problem-solving. It helps students develop analytical thinking, reasoning abilities, and the confidence to solve real-world challenges. Through numbers, algebra, geometry, statistics, and mathematical concepts, learners build a strong foundation for scientific understanding, innovation, and everyday decision-making.
          </motion.p>
          
          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              { text: "Numbers & Operations", icon: Calculator, color: "from-blue-500 to-cyan-500" },
              { text: "Algebra", icon: TrendingUp, color: "from-indigo-500 to-purple-500" },
              { text: "Geometry", icon: Box, color: "from-purple-500 to-pink-500" },
              { text: "Statistics", icon: PieChart, color: "from-cyan-500 to-blue-500" },
              { text: "Logical Reasoning", icon: Puzzle, color: "from-teal-500 to-emerald-500" },
              { text: "Problem Solving", icon: Lightbulb, color: "from-orange-500 to-amber-500" },
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

        {/* Right Column: Math Visualization */}
        <div className="order-1 lg:order-2 flex justify-center items-center py-12 lg:py-0">
          <div className="relative w-full max-w-[400px] h-[400px] flex items-center justify-center">
             {/* 3D Geometric Cube Simulation */}
             <div className="relative w-48 h-48 transform-style-3d animate-cube-rotate">
                {/* Faces of the cube */}
                {[
                  { transform: "rotateY(0deg) translateZ(96px)", icon: Plus },
                  { transform: "rotateY(180deg) translateZ(96px)", icon: Minus },
                  { transform: "rotateY(90deg) translateZ(96px)", icon: Divide },
                  { transform: "rotateY(-90deg) translateZ(96px)", icon: Calculator },
                  { transform: "rotateX(90deg) translateZ(96px)", icon: Equal },
                  { transform: "rotateX(-90deg) translateZ(96px)", icon: TrendingUp },
                ].map((face, i) => (
                  <div 
                    key={i}
                    className="absolute inset-0 bg-white/10 backdrop-blur-3xl border border-white/50 flex items-center justify-center text-blue-500 shadow-inner rounded-xl"
                    style={{ transform: face.transform }}
                  >
                     <face.icon size={48} className="opacity-40" />
                  </div>
                ))}
             </div>

             {/* Orbital Elements (Graphs & Shapes) */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute w-full h-full flex items-center justify-center pointer-events-none"
             >
                <div className="absolute translate-x-44 w-12 h-12 bg-white rounded-xl shadow-xl flex items-center justify-center text-indigo-500 border border-indigo-50 animate-float">
                   <TrendingUp size={24} />
                </div>
                <div className="absolute -translate-x-44 w-12 h-12 bg-white rounded-xl shadow-xl flex items-center justify-center text-purple-500 border border-purple-50 animate-float" style={{ animationDelay: '1s' }}>
                   <Box size={24} />
                </div>
                <div className="absolute translate-y-44 w-10 h-10 bg-white rounded-xl shadow-xl flex items-center justify-center text-cyan-500 border border-cyan-500 animate-float" style={{ animationDelay: '2s' }}>
                   <span className="font-black text-xs">f(x)</span>
                </div>
             </motion.div>

             {/* Connecting Lines / Coordinate Planes */}
             <div className="absolute inset-0 border border-blue-500/5 rounded-full animate-pulse -z-10" />
             <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rotate-45" />
             <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent -rotate-45" />

             {/* Floating Glowing Particle */}
             <motion.div
               animate={{ 
                 x: [50, -50, 50],
                 y: [-50, 50, -50],
                 opacity: [0.2, 0.8, 0.2]
               }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="absolute w-32 h-32 bg-blue-400/20 rounded-full blur-[40px] -z-20"
             />

             {/* Center Glow */}
             <div className="absolute w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -z-30 animate-pulse" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes cube-rotate {
           from { transform: perspective(1000px) rotateX(0) rotateY(0); }
           to { transform: perspective(1000px) rotateX(360deg) rotateY(360deg); }
        }
        @keyframes float {
           0%, 100% { transform: translateY(0) rotate(0); }
           50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-cube-rotate {
           animation: cube-rotate 20s linear infinite;
        }
        .animate-float {
           animation: float 4s ease-in-out infinite;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </motion.div>
  );
};

export default MathOverview;
