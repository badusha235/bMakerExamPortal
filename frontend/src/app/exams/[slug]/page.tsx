"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  GraduationCap,
  ShieldCheck,
  ArrowLeft,
  Building2,
  Stethoscope,
  Scale,
  BookText,
  Landmark,
  Briefcase,
  Users,
  Cpu,
  Truck,
  Leaf,
  HeartPulse,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ── Data types ──────────────────────────────────────────
interface SubCategory {
  id: string;
  name: string;
  desc: string;
  features: string[];
  color: string;
  icon: LucideIcon;
}

interface ExamConfig {
  title: string;
  subtitle: string;
  description: string;
  items: SubCategory[];
  gridCols: string; // tailwind grid class
}

// ── Per-exam configuration ──────────────────────────────
const examData: Record<string, ExamConfig> = {
  /* ─── SSLC ─── */
  sslc: {
    title: "Choose your",
    subtitle: "Syllabus",
    description:
      "Select the board for SSLC to access specialized study materials, question banks, and mock tests.",
    gridCols: "md:grid-cols-2",
    items: [
      {
        id: "state",
        name: "Kerala State Syllabus",
        desc: "Complete resources for SCERT Kerala State Board.",
        features: ["Textbook Solutions", "SCERT Notes", "Previous Question Papers"],
        color: "from-emerald-500 to-teal-600",
        icon: ShieldCheck,
      },
      {
        id: "cbse",
        name: "CBSE / NCERT",
        desc: "Comprehensive study materials for Central Board students.",
        features: ["NCERT Solutions", "Exemplar Problems", "Case-based Qs"],
        color: "from-blue-500 to-indigo-600",
        icon: GraduationCap,
      },
    ],
  },

  /* ─── Plus One ─── */
  "plus-one": {
    title: "Choose your",
    subtitle: "Syllabus",
    description:
      "Select the board for Plus One to access specialized study materials, question banks, and mock tests.",
    gridCols: "md:grid-cols-2",
    items: [
      {
        id: "state",
        name: "Kerala State Syllabus",
        desc: "Complete resources for SCERT Kerala State Board.",
        features: ["Textbook Solutions", "SCERT Notes", "Previous Question Papers"],
        color: "from-emerald-500 to-teal-600",
        icon: ShieldCheck,
      },
      {
        id: "cbse",
        name: "CBSE / NCERT",
        desc: "Comprehensive study materials for Central Board students.",
        features: ["NCERT Solutions", "Exemplar Problems", "Case-based Qs"],
        color: "from-blue-500 to-indigo-600",
        icon: GraduationCap,
      },
    ],
  },

  /* ─── Plus Two ─── */
  "plus-two": {
    title: "Choose your",
    subtitle: "Syllabus",
    description:
      "Select the board for Plus Two to access specialized study materials, question banks, and mock tests.",
    gridCols: "md:grid-cols-2",
    items: [
      {
        id: "state",
        name: "Kerala State Syllabus",
        desc: "Complete resources for SCERT Kerala State Board.",
        features: ["Textbook Solutions", "SCERT Notes", "Previous Question Papers"],
        color: "from-emerald-500 to-teal-600",
        icon: ShieldCheck,
      },
      {
        id: "cbse",
        name: "CBSE / NCERT",
        desc: "Comprehensive study materials for Central Board students.",
        features: ["NCERT Solutions", "Exemplar Problems", "Case-based Qs"],
        color: "from-blue-500 to-indigo-600",
        icon: GraduationCap,
      },
    ],
  },

  /* ─── Degree ─── */
  degree: {
    title: "Choose your",
    subtitle: "Syllabus",
    description:
      "Select the university for your Degree programme to access semester-wise notes, model papers, and study guides.",
    gridCols: "md:grid-cols-2",
    items: [
      {
        id: "ku",
        name: "Kerala University",
        desc: "Resources aligned with University of Kerala syllabus.",
        features: ["Semester Notes", "Model Question Papers", "Solved Question Papers"],
        color: "from-violet-500 to-purple-600",
        icon: Landmark,
      },
      {
        id: "mg",
        name: "MG University",
        desc: "Resources aligned with Mahatma Gandhi University syllabus.",
        features: ["Semester Notes", "Model Question Papers", "Solved Question Papers"],
        color: "from-amber-500 to-orange-600",
        icon: GraduationCap,
      },
    ],
  },

  /* ─── Kerala PSC — Departments ─── */
  "kerala-psc": {
    title: "Explore",
    subtitle: "Departments",
    description:
      "Choose a Kerala PSC department to access targeted study materials, previous-year questions, and mock tests.",
    gridCols: "md:grid-cols-2 lg:grid-cols-3",
    items: [
      {
        id: "ldc",
        name: "LDC (Lower Division Clerk)",
        desc: "Village Office, Secretariat, and various departments.",
        features: ["GK & Current Affairs", "Mental Ability", "English / Malayalam"],
        color: "from-blue-500 to-indigo-600",
        icon: BookText,
      },
      {
        id: "lgs",
        name: "LGS (Last Grade Servant)",
        desc: "Attender, Peon, and other last grade posts.",
        features: ["GK Compendium", "Previous Question Papers", "Daily Tests"],
        color: "from-emerald-500 to-teal-600",
        icon: Users,
      },
      {
        id: "police",
        name: "Police & Excise",
        desc: "Police Constable, SI, Excise Inspector, and Guard posts.",
        features: ["Physical Test Guide", "Law & Acts", "Mock Tests"],
        color: "from-slate-600 to-slate-800",
        icon: ShieldCheck,
      },
      {
        id: "health",
        name: "Health Services",
        desc: "Staff Nurse, Lab Technician, Pharmacist, and Paramedical.",
        features: ["Clinical Subjects", "MCQ Banks", "Solved Papers"],
        color: "from-rose-500 to-pink-600",
        icon: HeartPulse,
      },
      {
        id: "education",
        name: "Education Department",
        desc: "HSA, UP School Teacher, LP School Teacher, and HSST.",
        features: ["Pedagogy", "Subject Mastery", "Rank Files"],
        color: "from-amber-500 to-orange-600",
        icon: GraduationCap,
      },
      {
        id: "revenue",
        name: "Revenue Department",
        desc: "Village Officer, Tahsildar, and Revenue Inspector.",
        features: ["Land Laws", "Kerala History", "Administrative Qs"],
        color: "from-violet-500 to-purple-600",
        icon: Landmark,
      },
      {
        id: "agriculture",
        name: "Agriculture Department",
        desc: "Agricultural Officer, Farm Assistant, and related posts.",
        features: ["Agri Science", "Soil & Crop", "Solved Papers"],
        color: "from-lime-500 to-green-600",
        icon: Leaf,
      },
      {
        id: "secretariat",
        name: "Secretariat / Typist",
        desc: "Secretariat Assistant, Auditor, Accountant, and Typist posts.",
        features: ["Quantitative Aptitude", "Reasoning", "Typing Tests"],
        color: "from-cyan-500 to-sky-600",
        icon: Building2,
      },
      {
        id: "engineering",
        name: "Engineering & Technical",
        desc: "Overseer, Draftsman, AE, and other technical PSC posts.",
        features: ["Civil / Mechanical / EE", "Technical MCQs", "Previous Question Papers"],
        color: "from-orange-500 to-red-600",
        icon: Wrench,
      },
      {
        id: "medical",
        name: "Medical Officer / Doctor",
        desc: "Civil Surgeon, Dental Surgeon, and Ayurveda Medical Officer.",
        features: ["Clinical Medicine", "Community Health", "PSC Specials"],
        color: "from-teal-500 to-emerald-600",
        icon: Stethoscope,
      },
      {
        id: "judicial",
        name: "Judicial Department",
        desc: "Munsiff, Process Server, Bailiff, and Court posts.",
        features: ["CPC / CrPC", "Kerala Court Rules", "Law Question Papers"],
        color: "from-indigo-500 to-blue-700",
        icon: Scale,
      },
      {
        id: "transport",
        name: "Transport / KSRTC",
        desc: "Driver, Conductor, Mechanic, and Ministerial posts in KSRTC.",
        features: ["Motor Vehicle Act", "GK Capsules", "Practical Tests"],
        color: "from-fuchsia-500 to-pink-600",
        icon: Truck,
      },
    ],
  },
};

// ── Component ───────────────────────────────────────────
const ExamSelectionPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const config = examData[slug];

  // Fallback for unknown slugs
  if (!config) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Category Not Found
            </h1>
            <p className="text-slate-500 mb-8">
              We couldn&apos;t find the exam category you&apos;re looking for.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-bold rounded-2xl"
            >
              <ArrowLeft size={18} /> Back to Home
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-brand-blue transition-colors group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Home
            </Link>
          </div>

          {/* Heading */}
          <div className="max-w-4xl mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              {config.title}{" "}
              <span className="text-brand-blue">{config.subtitle}</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
              {config.description}
            </p>
          </div>

          {/* Cards grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 ${config.gridCols} gap-4 md:gap-6 max-w-7xl`}>
            {config.items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
              >
                <Link
                  href={`/exams/${slug}/${item.id}`}
                  className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-brand-blue/30 hover:shadow-2xl hover:shadow-brand-blue/10 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden block h-full"
                >
                  {/* Subtle background icon */}
                  <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-125 transition-all duration-500">
                    <item.icon size={120} />
                  </div>

                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/5`}
                  >
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-brand-blue transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Help section */}
          <div className="mt-20 p-8 md:p-12 bg-white rounded-[2.5rem] border border-dashed border-slate-200 text-center max-w-5xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Not sure which one to pick?
            </h3>
            <p className="text-slate-500 mb-6">
              Our academic counselors are here to help you choose the right
              learning path.
            </p>
            <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors">
              Chat with Counselor
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ExamSelectionPage;
