"use client";

import React from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { 
  FileText, 
  Eye, 
  Download, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  BookOpen,
  Zap,
  ChevronRight,
  Plus,
  Users
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import AdminGuard from "@/components/auth/AdminGuard";

const STATS = [
  { label: "Question Papers", value: "248", icon: FileText, change: "+12 new today", color: "blue" },
  { label: "Study Notes", value: "1,420", icon: BookOpen, change: "SSLC & Plus Two", color: "emerald" },
  { label: "Mock Tests", value: "64", icon: Zap, change: "Active sessions", color: "amber" },
  { label: "Total Students", value: "12,8K", icon: Users, change: "+1.2K this month", color: "indigo" },
];

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50 flex">
        <AdminSidebar />
        
        <main className="flex-1 ml-72 p-8 md:p-12">
          <header className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Vault <span className="text-brand-blue underline decoration-brand-blue/30 underline-offset-8">Dashboard</span></h1>
              <p className="text-slate-500 font-medium mt-1">Ready to manage content for the Academic Year 2024-25.</p>
            </div>
            <div className="flex items-center gap-4">
               <Link 
                 href="/admin/papers" 
                 className="bg-brand-blue text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-brand-blue/20 hover:-translate-y-0.5 transition-all text-sm"
               >
                 <Plus size={18} strokeWidth={3} /> Add Content
               </Link>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-7 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-slate-50 text-brand-${stat.color || 'blue'} group-hover:bg-brand-blue group-hover:text-white transition-all duration-300`}>
                    <stat.icon size={24} />
                  </div>
                  <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg text-[10px] font-black uppercase flex items-center gap-1">
                    <TrendingUp size={12} /> {stat.change.split(' ')[0]}
                  </div>
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">{stat.label}</p>
                <h3 className="text-4xl font-black text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-[11px] text-slate-400 font-semibold">{stat.change}</p>
              </motion.div>
            ))}
          </div>

          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 space-y-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-white shadow-xl shadow-slate-200/50">
                   <div className="flex items-center justify-between mb-8">
                     <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Content Updates</h3>
                     <button className="text-brand-blue text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                       Log Explorer <ArrowUpRight size={14} />
                     </button>
                   </div>
                   <div className="space-y-3">
                     {[
                       { name: "Mathematics QP 2024", type: "Question Paper", sub: "SSLC • STATE", date: "2 mins ago", color: "blue" },
                       { name: "Physics Chapter 4 Notes", type: "Study Note", sub: "PLUS TWO • CBSE", date: "45 mins ago", color: "emerald" },
                       { name: "Biology Mock Exam V3", type: "Mock Test", sub: "SSLC • STATE", date: "2 hours ago", color: "amber" },
                       { name: "Accountancy Summary", type: "Study Note", sub: "PLUS ONE • COMMERCE", date: "5 hours ago", color: "violet" },
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                         <div className="flex items-center gap-5">
                           <div className={`p-3.5 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-slate-900 transition-colors`}>
                             <FileText size={20} />
                           </div>
                           <div>
                             <div className="flex items-center gap-2 mb-0.5">
                               <h4 className="font-bold text-slate-900">{item.name}</h4>
                               <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">{item.type}</span>
                             </div>
                             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.sub}</span>
                           </div>
                         </div>
                         <div className="text-right">
                           <span className="text-xs text-slate-400 font-bold">{item.date}</span>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
             </div>

             <div className="space-y-8">
                {/* Quick Action Card */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                   <div className="relative z-10">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                        <Zap size={12} className="text-amber-400 fill-amber-400" /> System Status
                     </div>
                     <h3 className="text-2xl font-black mb-2 leading-tight">Sync All <br/>Subject Data</h3>
                     <p className="text-slate-400 text-sm mb-12">Manually refresh the academic hierarchy and link orphan content pieces.</p>
                     <button className="w-full py-4 bg-brand-blue text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:bg-blue-600 active:scale-95 transition-all">
                       Run Smart Sync <ChevronRight size={18} />
                     </button>
                   </div>
                   {/* Decorative background element */}
                   <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-brand-blue/20 rounded-full blur-3xl"></div>
                </div>

                {/* Quick Info */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50">
                   <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Storage Usage</h4>
                   <div className="space-y-6">
                      <div>
                         <div className="flex items-center justify-between text-xs font-bold mb-2">
                            <span className="text-slate-500">PDF Storage</span>
                            <span className="text-slate-900">12.4 GB / 50 GB</span>
                         </div>
                         <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-blue rounded-full w-[25%] shadow-[0_0_10px_rgba(37,99,235,0.3)]"></div>
                         </div>
                      </div>
                      <div>
                         <div className="flex items-center justify-between text-xs font-bold mb-2">
                            <span className="text-slate-500">Mock Data</span>
                            <span className="text-slate-900">4.2 GB / 10 GB</span>
                         </div>
                         <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full w-[42%] shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
