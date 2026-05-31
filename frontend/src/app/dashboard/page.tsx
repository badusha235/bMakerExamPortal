"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { BookOpen, Zap, Bell, ChevronRight, User, Settings, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col pt-32 pb-12">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 flex items-center justify-center">
          <p className="text-slate-400 font-bold animate-pulse">Loading your dashboard...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-32 pb-12 font-outfit">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <h1 className="text-4xl font-black text-slate-900 mb-2">Hello, <span className="text-brand-blue">{user?.username}!</span></h1>
              <p className="text-slate-500 font-medium">Welcome back to your StudyHub dashboard.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 text-amber-500 rounded-2xl flex items-center justify-center">
                  <Zap size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Streak</p>
                  <p className="text-xl font-bold text-slate-900">12 Days</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-500 rounded-2xl flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Verfied</p>
                  <p className="text-xl font-bold text-slate-900">Premium</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Continue Reading", icon: BookOpen, color: "bg-blue-500", desc: "Pick up where you left off" },
                { title: "Take a Mock Test", icon: Zap, color: "bg-amber-500", desc: "Test your knowledge" },
                { title: "Latest Alerts", icon: Bell, color: "bg-rose-500", desc: "3 new notifications" },
              ].map((item, i) => (
                <Link key={i} href="#" className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-premium transition-all hover:-translate-y-1">
                  <div className={`w-12 h-12 ${item.color} text-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                </Link>
              ))}
            </div>

            {/* Performance Card */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">Weekly Performance</h3>
                <Link href="#" className="text-sm font-bold text-brand-blue flex items-center gap-1 hover:underline">View Full Report <ChevronRight size={14} /></Link>
              </div>
              <div className="h-48 flex items-end justify-between px-4">
                {[65, 45, 85, 70, 90, 60, 75].map((h, i) => (
                  <div key={i} className="w-12 bg-slate-50 rounded-2xl flex flex-col items-center justify-end group cursor-pointer relative pt-2">
                    <div 
                      style={{ height: `${h}%` }} 
                      className={`w-full ${i === 4 ? 'bg-brand-blue' : 'bg-slate-200'} rounded-2xl group-hover:bg-brand-blue transition-all relative`}
                    >
                       <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{h}% Score</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between px-4 mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Zap size={120} />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-400 mb-2">Upgrade Pro</p>
              <h3 className="text-2xl font-black mb-4">Master Your Exams with Pro</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">Get access to 500+ premium mock tests, solved papers, and expert mentorship.</p>
              <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-blue-50 transition-colors uppercase tracking-widest">Upgrade Now</button>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Account Settings</h3>
              <div className="space-y-4">
                {[
                  { label: "Settings", icon: Settings },
                  { label: "Profile Info", icon: User },
                ].map((item, i) => (
                  <button key={i} className="w-full p-4 flex items-center justify-between bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-brand-blue transition-colors shadow-sm">
                        <item.icon size={20} />
                      </div>
                      <span className="font-bold text-slate-700 text-sm">{item.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-blue" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
