import React from "react";
import { 
  BookText, 
  Dna, 
  FlaskConical, 
  Calculator, 
  Scale, 
  Train, 
  Building2, 
  Briefcase, 
  Monitor, 
  Code,
  GraduationCap,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Kerala PSC", icon: Scale, count: "1,200+ Packs", color: "bg-blue-500" },
  { name: "SSLC", icon: BookText, count: "Free Solutions", color: "bg-pink-500" },
  { name: "Plus One", icon: Code, count: "Science & Commerce", color: "bg-emerald-500" },
  { name: "Plus Two", icon: Code, count: "Engg & Med Prep", color: "bg-teal-500" },
  { name: "Degree", icon: GraduationCap, count: "Semester Notes", color: "bg-fuchsia-500" },
];

const ExamCategories = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Explore <span className="text-brand-blue">Exam Categories</span>
            </h2>
            <p className="text-slate-500 max-w-xl text-sm md:text-base leading-relaxed">
              Find specialized study materials and mock tests for SSLC, Plus One, Plus Two, Degree, and Kerala PSC exams.
            </p>
          </div>
          <Link href="/exams" className="hidden md:flex items-center gap-2 text-brand-blue font-bold hover:gap-3 transition-all">
            View All Exams <ArrowUpRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={`/exams/${cat.name.toLowerCase().replace(/ \/ /g, '-').replace(/ /g, '-')}`}
              className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-brand-blue/30 hover:shadow-2xl hover:shadow-brand-blue/10 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle background icon */}
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-125 transition-all duration-500">
                <cat.icon size={120} />
              </div>
              
              <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/5`}>
                <cat.icon size={24} />
              </div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-brand-blue transition-colors">{cat.name}</h3>
              <p className="text-xs text-slate-400 font-medium tracking-tight uppercase">{cat.count}</p>
            </Link>
          ))}
        </div>
        
        <Link href="/exams" className="flex md:hidden items-center justify-center gap-2 text-brand-blue font-bold mt-8 py-4 bg-white rounded-2xl border border-slate-200">
          View All Exams <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default ExamCategories;
