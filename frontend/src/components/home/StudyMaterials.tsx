"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, FileText, Video, Headphones, Star } from "lucide-react";

const materials = [
  {
    title: "PSC Quick Rank File — easy notes",
    type: "PDF Note",
    icon: FileText,
    rating: 4.9,
    price: "Free",
    emoji: "📗",
    color: "from-sky-400 to-cyan-400",
  },
  {
    title: "NEET Physics formula sheet",
    type: "PDF Note",
    icon: FileText,
    rating: 4.8,
    price: "Free",
    emoji: "⚡",
    color: "from-violet-400 to-purple-400",
  },
  {
    title: "SSLC English video lessons",
    type: "Video",
    icon: Video,
    rating: 5.0,
    price: "Premium",
    emoji: "🎬",
    color: "from-rose-400 to-pink-400",
  },
  {
    title: "History audio summaries",
    type: "Audio",
    icon: Headphones,
    rating: 4.7,
    price: "Premium",
    emoji: "🎧",
    color: "from-amber-400 to-orange-400",
  },
];

export default function StudyMaterials() {
  return (
    <section className="py-14 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 text-center">
          <span className="mb-2 inline-block rounded-full bg-sky-100 px-4 py-1 text-sm font-bold text-sky-700">
            Study treasure 📦
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 md:text-4xl">
            Cool <span className="text-sky-500">study stuff</span>
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-slate-600">Notes, videos & audio — learn your way!</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="group flex flex-col overflow-hidden rounded-2xl border-2 border-slate-100 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${item.color}`}
              >
                <span className="text-5xl transition-transform group-hover:scale-110">{item.emoji}</span>
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-black ${
                    item.price === "Free" ? "bg-emerald-500 text-white" : "bg-white text-violet-600"
                  }`}
                >
                  {item.price === "Free" ? "🎁 Free" : "⭐ Premium"}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center gap-2">
                  <item.icon size={14} className="text-slate-400" />
                  <span className="text-[10px] font-bold uppercase text-slate-400">{item.type}</span>
                </div>
                <h3 className="mb-3 line-clamp-2 min-h-[2.5rem] font-bold text-slate-800 group-hover:text-violet-600">
                  {item.title}
                </h3>
                <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-3">
                  <span className="flex items-center gap-1 text-sm font-bold text-amber-500">
                    <Star size={14} fill="currentColor" /> {item.rating}
                  </span>
                  <span className="text-xs font-bold text-violet-600">View →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/study-materials"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-violet-200 bg-white px-6 py-3 font-bold text-violet-600 shadow-sm hover:bg-violet-50"
          >
            Open library <Download size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
