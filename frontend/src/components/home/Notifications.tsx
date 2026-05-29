import React from "react";
import { Bell, Calendar, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

const notifications = [
  {
    title: "Kerala PSC LDC 2026 Notification Out",
    date: "May 25, 2026",
    expiry: "Jun 30, 2026",
    isNew: true,
    tag: "PSC"
  },
  {
    title: "SSC CGL Tier 1 Admit Card Released",
    date: "May 20, 2026",
    expiry: "Exam Starts Jul 5",
    isNew: false,
    tag: "SSC"
  },
  {
    title: "NEET UG 2026 Revised Exam Pattern",
    date: "May 18, 2026",
    expiry: "Check Details",
    isNew: true,
    tag: "NEET"
  }
];

const Notifications = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-xs font-bold mb-4">
              <Bell size={14} />
              LIVE UPDATES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
              Never Miss a <span className="text-brand-blue">Deadline</span>
            </h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Real-time notifications for Kerala PSC, SSC, UPSC and Board exams. We track the official portals so you don't have to.
            </p>
            <Link 
              href="/notifications" 
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-blue text-white font-bold rounded-2xl hover:bg-brand-blue-deep transition-all shadow-lg shadow-brand-blue/10"
            >
              See All Alerts
            </Link>
          </div>

          <div className="lg:w-2/3 w-full space-y-4">
            {notifications.map((notif, idx) => (
              <div 
                key={idx}
                className="group bg-white p-5 rounded-3xl border border-slate-100 hover:border-brand-blue/20 hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer flex items-center gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-blue-soft group-hover:text-brand-blue transition-colors flex-shrink-0">
                  <Bell size={24} />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-brand-blue tracking-[0.2em] bg-brand-blue/5 px-2 py-0.5 rounded uppercase">
                      {notif.tag}
                    </span>
                    {notif.isNew && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase">
                        <Sparkles size={10} /> New
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-brand-blue transition-colors truncate pr-4">
                    {notif.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Calendar size={14} /> {notif.date}
                    </div>
                    <div className="text-xs font-bold text-slate-900 border-l border-slate-200 pl-4 uppercase tracking-tighter">
                      Ends: {notif.expiry}
                    </div>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-slate-50 text-slate-300 group-hover:text-brand-blue group-hover:bg-brand-blue-soft transition-all hidden md:block">
                  <ChevronRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notifications;
