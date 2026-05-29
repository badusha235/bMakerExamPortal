import React from "react";
import { PlayCircle, CheckCircle2, Clock, Users } from "lucide-react";
import Link from "next/link";

const MockTestBanner = () => {
  return (
    <section className="py-20 bg-white px-4 md:px-0">
      <div className="container mx-auto">
        <div className="relative bg-slate-900 rounded-[2.5rem] p-8 md:p-16 overflow-hidden">
          {/* Background Patterns */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-blue/20 to-transparent opacity-50" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px]" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/5 text-brand-blue-soft text-xs font-bold uppercase tracking-wider">
                <PlayCircle size={14} className="animate-pulse" />
                Adaptive Learning Engine
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                Practice Smarter with <br />
                <span className="text-brand-blue">Mock Exam Simulator</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                Experience the real exam environment with our AI-powered mock tests. Get instant analysis, state-wide ranking, and detailed solutions.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Clock, label: "Timed simulations" },
                  { icon: CheckCircle2, label: "Instant results" },
                  { icon: Users, label: "State-wide ranking" },
                  { icon: PlayCircle, label: "Video solutions" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-white/80">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-blue">
                      <item.icon size={18} />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/mock-tests" 
                  className="px-8 py-4 bg-brand-blue text-white font-bold rounded-2xl hover:bg-brand-blue-deep transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2"
                >
                  Start Free Mock Test
                </Link>
                <Link 
                  href="/how-it-works" 
                  className="px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
                >
                  Watch Demo
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              {/* Decorative Mock UI */}
              <div className="relative bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold">Q4</div>
                    <div className="h-4 w-32 bg-slate-700 rounded-full" />
                  </div>
                  <div className="px-4 py-2 bg-rose-500/20 text-rose-500 text-sm font-bold rounded-lg border border-rose-500/30">
                    14:52
                  </div>
                </div>
                <div className="space-y-4 mb-10">
                  <div className="h-4 w-full bg-slate-700 rounded-full" />
                  <div className="h-4 w-3/4 bg-slate-700 rounded-full" />
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`p-4 rounded-xl border ${i === 2 ? 'border-brand-blue bg-brand-blue/10' : 'border-slate-700 bg-slate-800/50'} flex items-center gap-4`}>
                      <div className={`w-5 h-5 rounded-full border-2 ${i === 2 ? 'border-brand-blue bg-brand-blue' : 'border-slate-600'}`} />
                      <div className={`h-3 ${i === 2 ? 'w-24 bg-brand-blue/50' : 'w-48 bg-slate-700'} rounded-full`} />
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <div className="h-10 w-28 bg-brand-blue rounded-xl" />
                </div>
              </div>
              
              {/* Floating element */}
              <div className="absolute -top-10 -right-10 bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 flex items-center gap-4 animate-bounce">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Score Analysis</div>
                  <div className="text-slate-900 font-extrabold text-xl">Top 2% Ranked</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockTestBanner;
