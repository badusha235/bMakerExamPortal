"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, Calendar, ChevronRight, PartyPopper } from "lucide-react";

const notifications = [
  {
    title: "Kerala PSC LDC 2026 — new notification!",
    date: "May 25, 2026",
    expiry: "Jun 30, 2026",
    isNew: true,
    tag: "PSC",
    emoji: "📋",
  },
  {
    title: "SSC CGL admit card is out!",
    date: "May 20, 2026",
    expiry: "Exam Jul 5",
    isNew: false,
    tag: "SSC",
    emoji: "🎫",
  },
  {
    title: "NEET 2026 — check the new pattern",
    date: "May 18, 2026",
    expiry: "See details",
    isNew: true,
    tag: "NEET",
    emoji: "🩺",
  },
];

export default function Notifications() {
  return (
    <section className="py-14 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:gap-12">
          <motion.div
            className="lg:w-2/5"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-rose-200 bg-rose-100 px-3 py-1.5 text-xs font-bold text-rose-700">
              <PartyPopper size={16} />
              Hot updates!
            </span>
            <h2 className="mb-3 text-3xl font-extrabold text-slate-800 md:text-4xl">
              Don&apos;t miss the <span className="text-rose-500">news</span> 🔔
            </h2>
            <p className="mb-6 text-slate-600">
              Fresh exam alerts — we watch the websites so you can keep learning!
            </p>
            <Link
              href="/notifications"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-400 to-orange-400 px-6 py-3 font-bold text-white shadow-md transition-transform hover:scale-[1.02]"
            >
              See all alerts <ChevronRight size={18} />
            </Link>
          </motion.div>

          <div className="w-full space-y-3 lg:w-3/5">
            {notifications.map((notif, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="group flex items-center gap-4 rounded-2xl border-2 border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-xl">
                  {notif.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-violet-100 px-2 py-0.5 text-[10px] font-black uppercase text-violet-700">
                      {notif.tag}
                    </span>
                    {notif.isNew && (
                      <span className="text-[10px] font-black uppercase text-emerald-600">✨ New</span>
                    )}
                  </div>
                  <h3 className="truncate font-bold text-slate-800 group-hover:text-violet-600">
                    {notif.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {notif.date}
                    </span>
                    <span className="text-rose-600">Ends: {notif.expiry}</span>
                  </div>
                </div>
                <Bell
                  size={18}
                  className="hidden shrink-0 text-slate-300 group-hover:text-violet-500 md:block"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
