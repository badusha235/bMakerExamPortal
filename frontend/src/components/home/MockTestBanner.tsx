"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gamepad2, Clock, Trophy, Zap, Star } from "lucide-react";

const perks = [
  { emoji: "🎮", label: "Like a game" },
  { emoji: "⏱️", label: "Beat the clock" },
  { emoji: "🏅", label: "Earn badges" },
  { emoji: "⚡", label: "Quick scores" },
];

export default function MockTestBanner() {
  return (
    <section className="px-4 py-14 md:py-16">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] border-4 border-violet-200 bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-500 p-8 shadow-xl md:p-12"
        >
          <span className="pointer-events-none absolute -right-4 -top-6 text-7xl opacity-20">🎯</span>
          <span className="pointer-events-none absolute -bottom-6 -left-4 text-6xl opacity-20">⭐</span>

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-5 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/20 px-3 py-1.5 text-xs font-bold text-white">
                <Star size={14} fill="currentColor" className="text-amber-300" />
                Quiz zone!
              </span>
              <h2 className="text-3xl font-extrabold text-white md:text-4xl">
                Ready for a <span className="text-amber-300">fun</span> mock test?
              </h2>
              <p className="mx-auto max-w-md text-white/90 lg:mx-0">
                Practice with a timer, see your score right away, and try to beat your best! 💪
              </p>
              <div className="grid grid-cols-2 gap-2">
                {perks.map((p) => (
                  <div
                    key={p.label}
                    className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2"
                  >
                    <span>{p.emoji}</span>
                    <span className="text-left text-xs font-bold text-white">{p.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  href="/mock-tests"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-3.5 font-extrabold text-amber-950 shadow-lg hover:scale-[1.02]"
                >
                  <Gamepad2 size={20} />
                  Play free quiz!
                </Link>
                <Link
                  href="/mock-tests"
                  className="inline-flex items-center justify-center rounded-2xl border-2 border-white/40 px-6 py-3.5 font-bold text-white hover:bg-white/10"
                >
                  How it works
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl border-4 border-white/40 bg-white p-5 shadow-2xl"
              >
                <div className="mb-3 flex justify-between">
                  <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-black text-violet-700">
                    Quiz Lv.3 🌟
                  </span>
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-black text-rose-600">
                    02:45
                  </span>
                </div>
                <p className="mb-3 font-bold text-slate-800">12 × 8 = ? 🧮</p>
                <div className="space-y-1.5">
                  {["94", "96", "98"].map((opt, i) => (
                    <div
                      key={opt}
                      className={`rounded-lg border-2 px-3 py-2 text-sm font-bold ${
                        i === 1
                          ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                          : "border-slate-100 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-violet-500 to-sky-400" />
                </div>
              </motion.div>
              <div className="absolute -right-2 -top-3 rounded-xl border-2 border-amber-200 bg-amber-100 px-3 py-2 shadow-md">
                <p className="text-[10px] font-black text-amber-800">Nice!</p>
                <p className="font-extrabold text-amber-900">+50 XP ⭐</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
