import React from "react";
import { 
  BookText, 
  Code,
  GraduationCap,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "SSLC", label: "Kerala State & CBSE", icon: BookText, color: "bg-brand-blue", link: "/school/sslc" },
  { name: "Plus One", label: "Science, Commerce, Humanities", icon: Code, color: "bg-emerald-500", link: "/school/plus_one" },
  { name: "Plus Two", label: "Science, Commerce, Humanities", icon: GraduationCap, color: "bg-teal-500", link: "/school/plus_two" },
];

const ExamCategories = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Explore <span className="text-brand-blue">Classes</span>
            </h2>
            <p className="text-slate-500 max-w-xl text-sm md:text-base leading-relaxed">
              Find specialized study materials, mock tests, and question papers for SSLC, Plus One, and Plus Two.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.link}
              className="group bg-white p-4 rounded-3xl border border-slate-200 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle background icon */}
              <div className="absolute -right-2 -bottom-2 opacity-[0.02] group-hover:opacity-[0.06] transition-all duration-500">
                <cat.icon size={70} />
              </div>
              
              <div className={`w-8 h-8 ${cat.color} rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                <cat.icon size={16} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-brand-blue transition-colors">{cat.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{cat.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExamCategories;
