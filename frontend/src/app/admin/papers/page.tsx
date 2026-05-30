"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar,
  Layers
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_PAPERS = [
  { id: 1, title: "Mathematics Annual 2024", subject: "Mathematics", year: 2024, type: "Annual Exam", date: "2024-05-15" },
  { id: 2, title: "Physics Model Exam Paper", subject: "Physics", year: 2024, type: "Model Exam", date: "2024-05-10" },
  { id: 3, title: "Chemistry Annual 2023", subject: "Chemistry", year: 2023, type: "Annual Exam", date: "2023-05-20" },
  { id: 4, title: "English Communicative 2024", subject: "English", year: 2024, type: "Annual Exam", date: "2024-05-18" },
  { id: 5, title: "Biology Unit Test Paper", subject: "Biology", year: 2024, type: "Model Exam", date: "2024-05-01" },
];

export default function AdminPapersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 ml-72 p-8 md:p-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Manage <span className="text-brand-blue">Question Papers</span></h1>
            <p className="text-slate-500">Edit, delete, and organize your question paper repository.</p>
          </div>
          <Link 
            href="/admin/papers/add"
            className="flex items-center gap-2 px-6 py-4 bg-brand-blue text-white font-bold rounded-2xl shadow-lg shadow-brand-blue/20 active:scale-95 transition-transform"
          >
            <Plus size={20} /> Create New Paper
          </Link>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
           <div className="flex-1 relative group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-blue transition-colors" size={20} />
             <input 
               type="text" 
               placeholder="Search by title, subject or year..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue shadow-sm transition-all text-sm"
             />
           </div>
           <div className="flex gap-4">
              <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 px-4 min-w-[180px]">
                <Layers size={18} className="text-slate-400" />
                <select 
                  className="bg-transparent text-sm font-bold text-slate-700 outline-none w-full"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option>All Subjects</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>Social Science</option>
                  <option>IT</option>
                </select>
              </div>
              <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-700 flex items-center gap-2 font-bold shadow-sm hover:bg-slate-50 transition-colors">
                 <Filter size={20} />
              </button>
           </div>
        </div>

        {/* Papers Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Question Paper Name</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Year / Type</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_PAPERS.map((paper) => (
                  <tr key={paper.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-brand-blue/5 rounded-xl text-brand-blue">
                          <FileText size={20} />
                        </div>
                        <span className="font-bold text-slate-800">{paper.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-semibold text-slate-500">{paper.subject}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col mt-1">
                        <span className="text-sm font-bold text-slate-800">{paper.year}</span>
                        <span className={`text-[10px] font-black uppercase tracking-wider ${
                          paper.type === "Annual Exam" ? "text-amber-600" : "text-indigo-600"
                        }`}>{paper.type}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-brand-blue transition-colors">
                             <Edit3 size={18} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                             <Trash2 size={18} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                             <ExternalLink size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
             <span className="text-xs font-bold text-slate-400">Showing 5 of 142 Question Papers</span>
             <div className="flex gap-2">
                <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 transition-colors">
                  <ChevronRight size={18} />
                </button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
