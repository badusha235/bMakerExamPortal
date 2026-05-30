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
              className="group bg-white p-8 rounded-[2rem] border border-slate-200 hover:border-brand-blue/30 hover:shadow-2xl hover:shadow-brand-blue/10 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle background icon */}
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-125 transition-all duration-500">
                <cat.icon size={160} />
              </div>
              
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/5`}>
                <cat.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">{cat.name}</h3>
              <p className="text-sm text-slate-400 font-semibold tracking-tight">{cat.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExamCategories;
