"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  ArrowLeft,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  Save,
  BookOpen,
  Calendar,
  Layers,
  Loader2,
  ChevronRight,
  Zap,
  Tag,
  Star
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ─── Constants ──────────────────────────────────────────────────────────────
const BOARDS = [
  { id: "kerala_state", name: "Kerala State Syllabus", icon: "🏫" },
  { id: "cbse", name: "CBSE / NCERT", icon: "📜" },
];

const CLASSES = [
  { id: "sslc", name: "SSLC (10th)", icon: "🎓" },
  { id: "plus_one", name: "Plus One (11th)", icon: "🔭" },
  { id: "plus_two", name: "Plus Two (12th)", icon: "🚀" },
];

const STREAMS = [
  { id: "general", name: "General / All", icon: "📚" },
  { id: "science", name: "Science", icon: "🧪" },
  { id: "commerce", name: "Commerce", icon: "📊" },
  { id: "humanities", name: "Humanities", icon: "🌍" },
];

const CONTENT_TYPES = [
  { id: "papers", name: "Question Paper", icon: FileText, endpoint: "question-papers" },
  { id: "notes", name: "Study Note", icon: BookOpen, endpoint: "notes" },
  { id: "mock_test", name: "Mock Test", icon: Zap, endpoint: "mock-tests" },
  { id: "material", name: "Study Material", icon: Layers, endpoint: "study-materials" },
  { id: "topic", name: "Important Topic", icon: Star, endpoint: "important-topics" },
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function AdminContentWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form State
  const [selection, setSelection] = useState({
    board: "",
    class: "",
    stream: "",
    subject: "",
    type: "",
  });

  const [subjects, setSubjects] = useState<any[]>([]);
  const [details, setDetails] = useState({
    title: "",
    year: String(new Date().getFullYear()),
    file: null as File | null,
    link: "",
    description: "",
    weightage: "0"
  });

  // Fetch subjects whenever hierarchy selection changes
  useEffect(() => {
    if (selection.board && selection.class && selection.stream) {
      fetch(`http://localhost:8000/api/exams/subjects/?board=${selection.board}&class_level=${selection.class}&stream=${selection.stream}`)
        .then(res => res.json())
        .then(data => {
            const list = Array.isArray(data) ? data : data.results ?? [];
            setSubjects(list);
        })
        .catch(() => setSubjects([]));
    }
  }, [selection.board, selection.class, selection.stream]);

  const handleNext = () => {
    if (step === 1 && !selection.board) return;
    if (step === 2 && !selection.class) return;
    if (step === 3 && selection.class !== 'sslc' && !selection.stream) return;
    // Auto-skip stream for SSLC
    if (step === 2 && selection.class === 'sslc') {
        setSelection(prev => ({ ...prev, stream: 'general' }));
        setStep(4);
        return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 4 && selection.class === 'sslc') {
        setStep(2);
        return;
    }
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const typeConfig = CONTENT_TYPES.find(t => t.id === selection.type);
    if (!typeConfig) return;

    const formData = new FormData();
    formData.append("subject", selection.subject);
    formData.append("title", details.title);
    
    if (selection.type === 'papers') {
        formData.append("year", details.year);
    }
    if (selection.type === 'mock_test') {
        formData.append("link", details.link);
    }
    if (selection.type === 'material') {
        formData.append("material_type", "PDF");
        formData.append("url", details.link);
    }
    if (selection.type === 'topic') {
        formData.append("description", details.description);
        formData.append("weightage_marks", details.weightage);
    }
    if (details.file) {
        formData.append("pdf_file", details.file);
    }

    try {
      const res = await fetch(`http://localhost:8000/api/exams/${typeConfig.endpoint}/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        setError(JSON.stringify(err));
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />

      <main className="flex-1 ml-72 p-8 md:p-12">
        <header className="mb-12 flex justify-between items-start">
          <div>
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-brand-blue transition-colors font-semibold mb-4 text-sm">
                <ArrowLeft size={16} /> Dashboard
            </Link>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Content <span className="text-brand-blue">Wizard</span></h1>
            <p className="text-slate-500 font-medium mt-1">Step {step}: {
                step === 1 ? "Choose Board" : 
                step === 2 ? "Select Grade" : 
                step === 3 ? "Pick Stream" : 
                step === 4 ? "Select Subject" : 
                step === 5 ? "Content Type" : "Finalize Details"
            }</p>
          </div>
          
          <div className="flex gap-2">
             {[1,2,3,4,5,6].map(i => (
                 <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step >= i ? "bg-brand-blue shadow-[0_0_8px_rgba(37,99,235,0.4)]" : "bg-slate-200"}`}></div>
             ))}
          </div>
        </header>

        <div className="max-w-5xl">
          <AnimatePresence mode="wait">
            {/* Step 1: Board */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BOARDS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => { setSelection({ ...selection, board: b.id }); handleNext(); }}
                    className={`group p-10 rounded-[3rem] border-4 transition-all text-center relative overflow-hidden ${
                         selection.board === b.id ? "bg-white border-brand-blue shadow-2xl" : "bg-white border-white hover:border-slate-200"
                    }`}
                  >
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{b.icon}</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{b.name}</h3>
                    <p className="text-slate-400 font-bold uppercase text-[11px] tracking-widest">Select Curriculum</p>
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 2: Class */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CLASSES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setSelection({ ...selection, class: c.id }); handleNext(); }}
                    className={`group p-8 rounded-[2.5rem] border-4 transition-all text-center ${
                         selection.class === c.id ? "bg-white border-emerald-500 shadow-2xl" : "bg-white border-white hover:border-slate-200"
                    }`}
                  >
                    <div className="text-5xl mb-6">{c.icon}</div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{c.name}</h3>
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 3: Stream */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STREAMS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setSelection({ ...selection, stream: s.id }); handleNext(); }}
                    className={`group p-8 rounded-[2rem] border-4 transition-all text-center ${
                         selection.stream === s.id ? "bg-white border-violet-500 shadow-2xl" : "bg-white border-white hover:border-slate-200"
                    }`}
                  >
                    <div className="text-4xl mb-4">{s.icon}</div>
                    <h3 className="text-lg font-black text-slate-900">{s.name}</h3>
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 4: Subject */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white p-10 rounded-[3rem] shadow-xl border border-white">
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
                    <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center font-bold text-slate-400">#</div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900">Which Subject?</h3>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{selection.board} • {selection.class} • {selection.stream}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {subjects.map(sub => (
                        <button
                            key={sub.id}
                            onClick={() => { setSelection({...selection, subject: sub.id}); handleNext(); }}
                            className={`p-4 rounded-2xl border-2 font-bold text-left transition-all ${
                                selection.subject === sub.id ? "bg-brand-blue text-white border-brand-blue" : "bg-slate-50 border-slate-50 hover:border-brand-blue/30 text-slate-600"
                            }`}
                        >
                            {sub.name}
                        </button>
                    ))}
                    {subjects.length === 0 && <p className="col-span-full py-10 text-center text-slate-400 font-bold italic">No subjects found for this selection.</p>}
                </div>
              </motion.div>
            )}

            {/* Step 5: Type */}
            {step === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CONTENT_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setSelection({ ...selection, type: t.id }); handleNext(); }}
                    className={`group p-8 rounded-[2.5rem] border-4 transition-all text-center flex flex-col items-center ${
                         selection.type === t.id ? "bg-white border-brand-blue shadow-2xl scale-105" : "bg-white border-white hover:border-slate-200"
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-3xl ${selection.type === t.id ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-400'} flex items-center justify-center mb-6`}>
                        <t.icon size={32} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">{t.name}</h3>
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 6: Final Form */}
            {step === 6 && (
              <motion.div key="s6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-white relative overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-100">
                        <div>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Post Details</h3>
                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Finalizing upload to {subjects.find(s=>s.id == selection.subject)?.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">{CONTENT_TYPES.find(t=>t.id==selection.type)?.name}</div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Entry Title</label>
                            <input 
                                type="text"
                                required
                                value={details.title}
                                onChange={e => setDetails({...details, title: e.target.value})}
                                placeholder="e.g. 2025 Physics Annual Question Paper"
                                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-blue/5 focus:bg-white focus:border-brand-blue transition-all font-bold"
                            />
                        </div>

                        {selection.type === 'papers' && (
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Question Paper Year</label>
                                <select 
                                    className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold appearance-none"
                                    value={details.year}
                                    onChange={e => setDetails({...details, year: e.target.value})}
                                >
                                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                             </div>
                        )}

                        {(selection.type === 'notes' || selection.type === 'papers') && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Upload PDF Document</label>
                                <div className={`relative h-40 border-4 border-dashed rounded-[2rem] flex flex-col items-center justify-center transition-all ${details.file ? 'border-brand-blue bg-blue-50/30' : 'border-slate-100'}`}>
                                    {details.file ? (
                                        <div className="flex items-center gap-4">
                                            <FileText size={32} className="text-brand-blue" />
                                            <p className="font-bold text-slate-800">{details.file.name}</p>
                                            <button onClick={() => setDetails({...details, file: null})} className="text-rose-500 hover:scale-110"><X size={20}/></button>
                                        </div>
                                    ) : (
                                        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                            <Upload size={24} className="text-slate-300 mb-2" />
                                            <span className="text-sm font-bold text-slate-400">Click to upload PDF</span>
                                            <input type="file" accept=".pdf" className="hidden" onChange={e => e.target.files && setDetails({...details, file: e.target.files[0]})} />
                                        </label>
                                    )}
                                </div>
                            </div>
                        )}

                        {(selection.type === 'mock_test' || selection.type === 'material') && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Resource URL / Link</label>
                                <input 
                                    type="url"
                                    value={details.link}
                                    onChange={e => setDetails({...details, link: e.target.value})}
                                    placeholder="https://example.com/test-link"
                                    className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-brand-blue/5 focus:bg-white focus:border-brand-blue transition-all font-bold"
                                />
                            </div>
                        )}

                        {selection.type === 'topic' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Topic Description</label>
                                    <textarea 
                                        rows={4}
                                        value={details.description}
                                        onChange={e => setDetails({...details, description: e.target.value})}
                                        className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                                        placeholder="Explain why this topic is important..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Weightage Marks</label>
                                    <input 
                                        type="number"
                                        value={details.weightage}
                                        onChange={e => setDetails({...details, weightage: e.target.value})}
                                        className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {error && <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl text-xs font-bold border border-rose-100">{error}</div>}

                    <div className="flex items-center justify-between pt-10 border-t border-slate-100">
                        <button type="button" onClick={handleBack} className="text-slate-400 font-bold text-sm flex items-center gap-2 px-6 py-4 rounded-2xl hover:bg-slate-50 transition-all">
                            <ArrowLeft size={16} /> Previous Step
                        </button>
                        <button 
                            disabled={loading}
                            className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-900/10 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                            {loading ? "Publishing..." : "Finalize & Publish"}
                        </button>
                    </div>
                </form>
                <div className="absolute top-0 right-0 h-40 w-40 bg-brand-blue/5 rounded-full blur-[100px] -mr-20 -mt-20"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Persistent Navigator */}
          {step > 1 && step < 6 && (
             <div className="mt-12 flex items-center justify-between bg-white/60 backdrop-blur-md border border-white p-4 rounded-3xl sticky bottom-8 shadow-xl shadow-slate-200/50">
                 <button onClick={handleBack} className="flex items-center gap-2 px-6 py-3 text-slate-500 font-bold text-sm hover:text-slate-900 transition-colors">
                     <ArrowLeft size={18} /> Back
                 </button>
                 <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Selection: <b>{selection.board || "-"} › {selection.class || "-"} › {selection.stream || "-"} › {subjects.find(s=>s.id == selection.subject)?.name || "-"}</b></span>
                 </div>
                 {/* Next button only if valid */}
                 <button 
                    onClick={handleNext}
                    disabled={(step === 4 && !selection.subject) || (step === 5 && !selection.type)}
                    className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-bold text-sm rounded-2xl shadow-lg disabled:opacity-50 transition-all active:scale-95"
                 >
                     Continue <ChevronRight size={18} />
                 </button>
             </div>
          )}
        </div>
      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="bg-white p-12 rounded-[4rem] shadow-2xl max-w-md w-full text-center border-8 border-slate-50">
                <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/30">
                    <CheckCircle2 size={48} strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Success!</h2>
                <p className="text-slate-500 mb-10 font-bold">New content has been successfully added to the academic repository.</p>
                <div className="flex flex-col gap-3">
                    <button onClick={() => window.location.reload()} className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all">Add More Content</button>
                    <Link href="/admin/dashboard" className="w-full py-5 bg-slate-50 text-slate-400 font-bold rounded-2xl hover:text-slate-600 transition-all">Return to Dashboard</Link>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
