"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  Calendar,
  Layers,
  Zap
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPapersPage() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ board: "", class: "" });

  useEffect(() => {
    fetch("http://localhost:8000/api/exams/notes/")
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : data.results ?? [];
        setPapers(list);
      })
      .catch(() => setPapers([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredPapers = papers.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 ml-72 p-8 md:p-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Study <span className="text-brand-blue">Notes</span></h1>
            <p className="text-slate-500 font-medium">Manage and organize chapter-wise handwritten and digital notes.</p>
          </div>
          <Link 
            href="/admin/papers/add"
            className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/10 active:scale-95 transition-transform"
          >
            <Plus size={20} className="text-brand-blue" /> Create New Note
          </Link>
        </header>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
           <div className="lg:col-span-2 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-blue transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search question papers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4.5 bg-white border border-slate-200 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue shadow-sm transition-all text-sm font-bold"
              />
           </div>
           <div className="bg-white px-6 py-4 rounded-[1.5rem] border border-slate-200 flex items-center gap-3">
              <Layers size={18} className="text-slate-400" />
              <select className="bg-transparent text-xs font-black uppercase tracking-widest text-slate-800 outline-none w-full">
                 <option>All Boards</option>
                 <option>Kerala State</option>
                 <option>CBSE</option>
              </select>
           </div>
           <button className="bg-white rounded-[1.5rem] border border-slate-200 flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
              <Filter size={18} /> More Filters
           </button>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/40 overflow-hidden relative">
          {loading ? (
             <div className="py-40 flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-brand-blue mb-4" size={40} />
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Fetching Repository...</p>
             </div>
          ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="bg-slate-50/50">
                         <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Question Paper Detail</th>
                         <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Metadata</th>
                         <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {filteredPapers.map((paper) => (
                         <tr key={paper.id} className="group hover:bg-slate-50/40 transition-colors">
                            <td className="px-10 py-7">
                               <div className="flex items-center gap-5">
                                  <div className="h-14 w-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-brand-blue group-hover:text-white transition-all">
                                     <FileText size={24} />
                                  </div>
                                  <div>
                                     <h4 className="font-bold text-slate-900 group-hover:text-brand-blue transition-colors">{paper.title}</h4>
                                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Added on {new Date(paper.created_at).toLocaleDateString()}</span>
                                  </div>
                               </div>
                            </td>
                            <td className="px-10 py-7">
                               <div className="flex flex-col gap-1">
                                  <span className="text-xs font-black text-slate-800">{paper.year} Academic Year</span>
                                  <span className="text-[10px] font-black uppercase tracking-[0.1em] text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md inline-block self-start">Verified PDF</span>
                               </div>
                            </td>
                            <td className="px-10 py-7 text-right">
                               <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                  <button className="h-10 w-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl hover:bg-brand-blue hover:text-white transition-all"><Edit3 size={18} /></button>
                                  <button className="h-10 w-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                                  <a href={paper.pdf_file} target="_blank" className="h-10 w-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all"><ExternalLink size={18} /></a>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
                {filteredPapers.length === 0 && (
                   <div className="py-32 text-center">
                      <div className="h-20 w-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                        <Search size={32} className="text-slate-200" />
                      </div>
                      <h4 className="text-lg font-black text-slate-900 mb-1">No Papers Found</h4>
                      <p className="text-slate-400 text-sm font-medium">Try clearing your search or filters.</p>
                   </div>
                )}
            </div>
          )}
          
          <div className="px-10 py-6 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Page 1 of 12 <span className="mx-2 opacity-30">|</span> {papers.length} Records Total</p>
             <div className="flex gap-2">
                <button className="h-10 px-4 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-400 hover:text-slate-900 transition-all disabled:opacity-30">Previous</button>
                <button className="h-10 px-4 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-900 shadow-sm transition-all">Next</button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
