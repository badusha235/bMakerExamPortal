import React from "react";
import { Download, FileText, Video, Headphones, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const materials = [
  {
    title: "PSC Quick Rank File - 2026 Edition",
    type: "PDF Note",
    icon: FileText,
    rating: 4.9,
    price: "Free",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200&h=250"
  },
  {
    title: "NEET Physics Formula Cheat Sheet",
    type: "PDF Note",
    icon: FileText,
    rating: 4.8,
    price: "Free",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=200&h=250"
  },
  {
    title: "SSLC English Grammar Video Course",
    type: "Video",
    icon: Video,
    rating: 5.0,
    price: "Premium",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=200&h=250"
  },
  {
    title: "UPSC History Audio Summaries",
    type: "Audio",
    icon: Headphones,
    rating: 4.7,
    price: "Premium",
    image: "https://images.unsplash.com/photo-1491843342375-17144fa1bc18?auto=format&fit=crop&q=80&w=200&h=250"
  }
];

const StudyMaterials = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Curated <span className="text-brand-blue">Study Materials</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Download high-quality notes, watch expert video lessons, and listen to rank-boosting audio summaries curated by top educators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {materials.map((item, idx) => (
            <div 
              key={idx}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-brand-blue/30 hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.price === 'Free' ? 'bg-emerald-500 text-white' : 'bg-brand-blue text-white'
                  }`}>
                    {item.price}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <button className="w-full py-3 bg-white text-brand-blue font-bold rounded-xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Download size={18} /> Download Now
                  </button>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
                    <item.icon size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.type}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-4 line-clamp-2 min-h-[3rem] group-hover:text-brand-blue transition-colors">
                  {item.title}
                </h3>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    <Star size={16} fill="currentColor" /> {item.rating}
                  </div>
                  <button className="text-xs font-bold text-brand-blue hover:underline uppercase tracking-widest">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/study-materials" 
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:border-brand-blue hover:text-brand-blue transition-all"
          >
            Explore Library <Download size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StudyMaterials;
