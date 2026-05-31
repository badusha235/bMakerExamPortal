"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Monitor, 
  Globe, 
  ShieldCheck, 
  Settings, 
  Cpu, 
  BarChart3,
  Code2,
  Cloud,
  Network
} from "lucide-react";

const ITOverview = () => {
  const codeSymbols = ["{ }", "</>", "101", "if", "[]", "main()", "var", "const"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-50/40 via-cyan-50/40 to-indigo-50/30 border border-white shadow-2xl p-8 md:p-12 mb-10"
    >
      {/* Soft Background Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
         {Array.from({ length: 30 }).map((_, i) => (
           <motion.div
             key={i}
             className="absolute bg-blue-300 rounded-full blur-[1px]"
             style={{
               width: Math.random() * 3 + 1 + "px",
               height: Math.random() * 3 + 1 + "px",
               left: Math.random() * 100 + "%",
               top: Math.random() * 100 + "%",
             }}
             animate={{
               opacity: [0, 0.6, 0],
               y: [0, -40]
             }}
             transition={{
               duration: 3 + Math.random() * 4,
               repeat: Infinity,
               delay: Math.random() * 5
             }}
           />
         ))}
      </div>

      {/* Cyber Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[100px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-400/5 rounded-full blur-[100px] -ml-24 -mb-24" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column: Content */}
        <div className="order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-blue-200/50"
          >
            💻 Information Technology
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight"
          >
            Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500">Digital World</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 font-medium"
          >
            Information Technology is the foundation of the modern digital age, connecting people, devices, and information across the globe. Through the study of computers, software, networking, cybersecurity, and emerging technologies, students develop problem-solving, logical thinking, and digital literacy skills. IT empowers learners to understand, create, and innovate with technology while preparing them for a rapidly evolving digital future.
          </motion.p>
          
          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              { text: "Computer Fundamentals", icon: Monitor, color: "bg-cyan-600" },
              { text: "Internet & Networking", icon: Globe, color: "bg-blue-600" },
              { text: "Cyber Security", icon: ShieldCheck, color: "bg-indigo-600" },
              { text: "Software Applications", icon: Settings, color: "bg-purple-600" },
              { text: "Emerging Technologies", icon: Cpu, color: "bg-pink-600" },
              { text: "Digital Literacy", icon: BarChart3, color: "bg-teal-600" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm hover:shadow-md transition-all group"
              >
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-black/5 group-hover:rotate-12 transition-transform`}>
                  <item.icon size={20} />
                </div>
                <span className="font-bold text-slate-800 text-[13px]">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Technology Visualization */}
        <div className="order-1 lg:order-2 flex justify-center items-center py-12 lg:py-0">
          <div className="relative w-full max-w-[400px] h-[400px] flex items-center justify-center">
             {/* Central Hub */}
             <motion.div 
               animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
               transition={{ duration: 8, repeat: Infinity }}
               className="relative w-40 h-40 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-3xl p-1 shadow-[0_0_40px_rgba(34,211,238,0.2)] z-20"
             >
                <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center border border-white/50 overflow-hidden relative">
                   <Code2 className="text-cyan-500" size={56} strokeWidth={1.5} />
                   {/* Scanning line effect */}
                   <motion.div 
                     animate={{ top: ["-10%", "110%"] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className="absolute w-full h-[1px] bg-cyan-400/30 shadow-[0_0_10px_cyan]"
                   />
                </div>
             </motion.div>

             {/* Orbital Elements */}
             {[
               { icon: Cloud, label: "Cloud", angle: 0 },
               { icon: Network, label: "Network", angle: 72 },
               { icon: ShieldCheck, label: "Security", angle: 144 },
               { icon: Cpu, label: "AI", angle: 216 },
               { icon: Globe, label: "Web", angle: 288 },
             ].map((node, i) => (
                <div 
                  key={i}
                  className="absolute w-full h-full flex items-center justify-center pointer-events-none"
                  style={{ transform: `rotate(${node.angle}deg)` }}
                >
                   <motion.div 
                     animate={{ rotate: -node.angle, y: [0, -8, 0] }}
                     transition={{ duration: 5, repeat: Infinity, delay: i * 0.7 }}
                     className="absolute translate-x-32 w-11 h-11 bg-white/80 backdrop-blur-xl rounded-xl border border-white flex items-center justify-center text-cyan-500 shadow-xl pointer-events-auto hover:scale-110 transition-transform"
                   >
                      <node.icon size={22} />
                      {/* Connection Line */}
                      <div className="absolute right-full w-20 h-[1px] bg-gradient-to-l from-cyan-400/20 to-transparent -translate-x-0" />
                   </motion.div>
                </div>
             ))}

             {/* Floating Code Snippets */}
             {codeSymbols.map((sym, i) => (
               <motion.span
                 key={`sym-${i}`}
                 initial={{ opacity: 0 }}
                 animate={{ 
                    opacity: [0, 0.4, 0],
                    x: [0, Math.random() * 30 - 15],
                    y: [0, Math.random() * -80],
                    scale: [0.9, 1.1, 0.9]
                 }}
                 transition={{ 
                   duration: 5 + Math.random() * 5, 
                   repeat: Infinity, 
                   delay: i * 1.2 
                 }}
                 className="absolute text-cyan-600/30 font-mono text-[11px] font-bold tracking-widest whitespace-nowrap"
                 style={{ 
                   left: `${15 + (i * 12)}%`, 
                   bottom: '15%' 
                 }}
               >
                 {sym}
               </motion.span>
             ))}

             {/* Orbital Ring Decorations */}
             <div className="absolute w-[300px] h-[300px] border border-cyan-500/5 rounded-full animate-spin-slow pointer-events-none -z-10" />
             <div className="absolute w-[350px] h-[350px] border border-blue-500/5 rounded-full animate-spin-reverse pointer-events-none -z-10" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
           from { transform: rotate(0deg); }
           to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
           from { transform: rotate(360deg); }
           to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
           animation: spin-slow 40s linear infinite;
        }
        .animate-spin-reverse {
           animation: spin-reverse 55s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default ITOverview;
