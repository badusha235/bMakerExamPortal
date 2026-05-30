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
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const STATS = [
  { label: "Total Question Papers", value: "142", icon: FileText, change: "+12 this week", color: "blue" },
  { label: "Total Downloads", value: "45.2K", icon: Download, change: "+5.4% growth", color: "emerald" },
  { label: "Active Subjects", value: "24", icon: BookOpen, change: "All 8 SSLC mapped", color: "violet" },
  { label: "Live Mock Tests", value: "1.2K", icon: Zap, change: "+86 new", color: "amber" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 ml-72 p-8 md:p-12">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Admin <span className="text-brand-blue">Overview</span></h1>
            <p className="text-slate-500">Manage your Kerala State SSLC content and analytics.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 shadow-sm flex items-center gap-2">
               <Clock size={16} /> Last updated: 2 mins ago
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-premium"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl bg-brand-${stat.color || 'blue'}/10 text-brand-${stat.color || 'blue'}`}>
                  <stat.icon size={24} />
                </div>
                <TrendingUp size={20} className="text-emerald-500" />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 mb-2">{stat.value}</h3>
              <p className="text-xs text-slate-400 font-medium">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-premium">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">Recent Uploads</h3>
                <button className="text-brand-blue text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Mathematics Annual 2024", sub: "SSLC - State", date: "2 hours ago" },
                  { name: "Physics Model Exam Paper", sub: "SSLC - CBSE", date: "5 hours ago" },
                  { name: "Chemistry Lab Guide V1", sub: "Plus Two", date: "Yesterday" },
                  { name: "English Grammar Mastery", sub: "All Grades", date: "2 days ago" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-100 rounded-xl text-slate-500">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{item.name}</h4>
                        <span className="text-xs text-slate-400 font-medium">{item.sub}</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium tracking-tight">{item.date}</span>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-gradient-to-br from-brand-blue to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FileText size={200} />
              </div>
              <h3 className="text-2xl font-black mb-4 relative z-10">Content <br/>Quick Action</h3>
              <p className="text-blue-100/80 text-sm mb-12 relative z-10">Directly add a new question paper to your repository with auto-tagging.</p>
              <Link 
                href="/admin/papers/add"
                className="w-full py-4 bg-white text-brand-blue font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 relative z-10 active:scale-95 transition-transform"
              >
                Upload New Paper <ChevronRight size={18} />
              </Link>
           </div>
        </div>
      </main>
    </div>
  );
}
