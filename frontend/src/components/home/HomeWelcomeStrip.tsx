"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function HomeWelcomeStrip() {
  return (
    <section className="pb-4 pt-2 md:pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-3xl rounded-[2rem] border-4 border-white bg-gradient-to-r from-violet-100 via-sky-100 to-amber-100 px-6 py-6 text-center shadow-lg md:px-10 md:py-8"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-violet-700 shadow-sm">
            <Sparkles size={16} className="text-amber-500" />
            Welcome to bMaker StudyHub!
          </span>
          <h1 className="text-2xl font-extrabold leading-snug text-slate-800 md:text-3xl">
            Learn, practice, and{" "}
            <span className="bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent">
              collect stars
            </span>{" "}
            along the way ⭐
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm font-medium text-slate-600 md:text-base">
            Pick your class below — question papers, notes, and fun quizzes are ready for you!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
