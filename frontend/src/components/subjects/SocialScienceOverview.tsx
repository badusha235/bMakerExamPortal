"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Map,
  Landmark,
  TrendingUp,
  Users,
  Lightbulb,
  MapPin,
  Compass,
  Navigation,
} from "lucide-react";

const SocialScienceOverview = () => {
  const landmarks = ["🏛️", "🗽", "🕌", "🏯", "⛩️", "🗼", "🏰"];
  const pins = [
    { x: "20%", y: "30%", delay: 0 },
    { x: "55%", y: "20%", delay: 0.5 },
    { x: "75%", y: "45%", delay: 1 },
    { x: "35%", y: "65%", delay: 1.5 },
    { x: "60%", y: "70%", delay: 2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-50/50 via-green-50/40 to-amber-50/30 border border-white shadow-2xl p-8 md:p-12 mb-10"
    >
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/8 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-400/8 rounded-full blur-[120px] -ml-40 -mb-40" />

      {/* Floating Landmark Emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {landmarks.map((lm, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl select-none"
            initial={{
              x: Math.random() * 800,
              y: Math.random() * 600,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -80 - 30],
              opacity: [0, 0.25, 0],
              rotate: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: 10 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          >
            {lm}
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
            🌍 Social Science
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight"
          >
            Explore{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-600 to-amber-600">
              People, Places & History
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 font-medium"
          >
            Social Science helps students understand the world around them by
            exploring history, geography, economics, civics, and human
            societies. It encourages critical thinking, cultural awareness, and
            a deeper appreciation of how people, communities, and nations
            interact. Through the study of past events, global landscapes, and
            social systems, learners gain valuable knowledge that helps them
            become informed and responsible citizens.
          </motion.p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              { text: "History", icon: Landmark, color: "from-amber-500 to-orange-500" },
              { text: "Geography", icon: Map, color: "from-green-500 to-teal-500" },
              { text: "Civics", icon: Globe, color: "from-blue-500 to-indigo-500" },
              { text: "Economics", icon: TrendingUp, color: "from-purple-500 to-indigo-500" },
              { text: "Culture & Society", icon: Users, color: "from-rose-500 to-pink-500" },
              { text: "Critical Thinking", icon: Lightbulb, color: "from-cyan-500 to-blue-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 p-3.5 bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-sm hover:shadow-md transition-all group"
              >
                <div
                  className={`w-9 h-9 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-black/5 group-hover:rotate-12 transition-transform`}
                >
                  <item.icon size={18} />
                </div>
                <span className="font-bold text-slate-800 text-[13px]">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Globe Visualization */}
        <div className="order-1 lg:order-2 flex justify-center items-center py-12 lg:py-0">
          <div className="relative w-full max-w-[400px] h-[380px] flex items-center justify-center">
            {/* Globe */}
            <div className="relative w-52 h-52 flex items-center justify-center">
              {/* Outer atmosphere rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-[240px] h-[240px] border border-blue-300/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute w-[210px] h-[210px] border border-green-300/20 rounded-full"
              />

              {/* Globe body */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-44 h-44 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-[0_0_60px_rgba(59,130,246,0.3)] relative overflow-hidden border border-blue-300/30 z-10"
              >
                {/* Landmasses (CSS shapes) */}
                <div className="absolute top-[18%] left-[12%] w-12 h-8 bg-green-400/50 rounded-full rotate-12" />
                <div className="absolute top-[30%] left-[45%] w-16 h-12 bg-green-500/50 rounded-2xl rotate-6" />
                <div className="absolute top-[55%] left-[20%] w-14 h-10 bg-green-400/40 rounded-xl rotate-[-10deg]" />
                <div className="absolute top-[60%] left-[55%] w-10 h-8 bg-yellow-400/30 rounded-full rotate-12" />
                {/* Latitude lines */}
                <div className="absolute top-[33%] left-0 right-0 h-[1px] bg-white/10" />
                <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-white/10" />
                <div className="absolute top-[66%] left-0 right-0 h-[1px] bg-white/10" />
                {/* Shine */}
                <div className="absolute top-3 left-4 w-10 h-6 bg-white/15 rounded-full blur-sm rotate-[-20deg]" />
              </motion.div>

              {/* Map Pins */}
              {pins.map((pin, i) => (
                <motion.div
                  key={i}
                  className="absolute z-20"
                  style={{ left: pin.x, top: pin.y }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: pin.delay,
                    ease: "easeInOut",
                  }}
                >
                  <MapPin
                    size={18}
                    className="text-red-500 drop-shadow-lg"
                    fill="#ef4444"
                  />
                </motion.div>
              ))}
            </div>

            {/* Orbiting Icons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute w-[320px] h-[320px] flex items-center justify-center pointer-events-none"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-amber-500 border border-amber-50">
                <Compass size={24} />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-green-500 border border-green-50">
                <Map size={24} />
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-500 border border-blue-50">
                <Navigation size={24} />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-rose-500 border border-rose-50">
                <Landmark size={24} />
              </div>
            </motion.div>

            {/* Glow */}
            <div className="absolute w-64 h-64 bg-blue-400/10 rounded-full blur-[80px] -z-10 animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialScienceOverview;
