"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ChevronRight, 
  ArrowLeft,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulating login
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <Link 
        href="/"
        className="fixed top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-brand-blue transition-colors font-semibold"
      >
        <ArrowLeft size={18} /> Back to Portal
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-brand-blue/20">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Admin <span className="text-brand-blue">Login</span></h1>
          <p className="text-slate-500 font-medium tracking-tight">Access the bMakerStudyHub management console.</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100">
           <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Administrator Email</label>
                 <div className="relative">
                    <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email" 
                      placeholder="admin@examvault.com"
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:bg-white focus:border-brand-blue transition-all font-semibold"
                      required
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Secure Password</label>
                    <button type="button" className="text-[10px] font-bold text-brand-blue hover:underline uppercase tracking-widest">Forgot?</button>
                 </div>
                 <div className="relative">
                    <ShieldCheck size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:bg-white focus:border-brand-blue transition-all font-semibold"
                      required
                    />
                 </div>
              </div>

              <div className="pt-4">
                 <button 
                   disabled={loading}
                   className="w-full py-5 bg-brand-blue text-white font-bold rounded-2xl shadow-xl shadow-brand-blue/20 hover:bg-brand-blue-deep transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                 >
                   {loading ? "Authenticating..." : "Sign in to Dashboard"}
                   {!loading && <ChevronRight size={18} />}
                 </button>
              </div>
           </form>

           <div className="mt-8 flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest justify-center">
              <AlertCircle size={14} className="text-amber-500" />
              Secure Encrypted Session
           </div>
        </div>

        <p className="text-center mt-12 text-slate-400 text-sm font-medium">
          Powered by <span className="text-slate-600 font-bold">bMakerStudyHub Core v2.0</span>
        </p>
      </motion.div>
    </div>
  );
}
