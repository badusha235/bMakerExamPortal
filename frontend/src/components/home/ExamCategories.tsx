"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "SSLC",
    label: "Class 10 — Kerala & CBSE",
    emoji: "🎒",
    gradient: "from-sky-400 to-blue-500",
    bg: "bg-sky-50",
    link: "/school/sslc",
    sticker: "Super start!",
  },
  {
    name: "Plus One",
    label: "Class 11 — All streams",
    emoji: "🔭",
    gradient: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    link: "/school/plus_one",
    sticker: "Level up!",
  },
  {
    name: "Plus Two",
    label: "Class 12 — Board ready",
    emoji: "🚀",
    gradient: "from-violet-400 to-purple-500",
    bg: "bg-violet-50",
    link: "/school/plus_two",
    sticker: "Go for it!",
  },
];

export default function ExamCategories() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 text-center">
          <span className="mb-2 inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-bold text-amber-800">
            Step 1 — Pick your class 🎯
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 md:text-4xl">
            Choose your <span className="text-violet-500">class adventure</span>
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-slate-600">
            Tap a card to open notes, question papers, and mock tests!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <Link
                href={cat.link}
                className={`group relative flex flex-col overflow-hidden rounded-[2rem] border-4 border-white ${cat.bg} p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
              >
                <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black text-slate-600 shadow-sm">
                  {cat.sticker}
                </span>
                <div
                  className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} text-3xl shadow-md transition-transform group-hover:scale-110 group-hover:rotate-3`}
                >
                  {cat.emoji}
                </div>
                <h3 className="mb-1 text-xl font-extrabold text-slate-800 group-hover:text-violet-600">
                  {cat.name}
                </h3>
                <p className="mb-5 text-sm font-semibold text-slate-500">{cat.label}</p>
                <span
                  className={`mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r ${cat.gradient} px-4 py-2 text-sm font-bold text-white shadow-sm`}
                >
                  Let&apos;s go! <ArrowRight size={14} className="group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
