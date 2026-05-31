"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  BookOpen,
  Bell,
  Zap
} from "lucide-react";

const MENU_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "Question Papers", icon: FileText, href: "/admin/papers" },
  { name: "Study Notes", icon: BookOpen, href: "/admin/notes" },
  { name: "Mock Tests", icon: Zap, href: "/admin/mock-tests" },
  { name: "Study Materials", icon: LayoutDashboard, href: "/admin/materials" },
  { name: "Important Topics", icon: Bell, href: "/admin/important-topics" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col p-6 z-50">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center font-bold text-xl text-white">b</div>
        <span className="text-xl font-bold tracking-tight text-white">bMaker<span className="text-blue-400">StudyHub</span></span>
      </div>

      <nav className="flex-1 space-y-2">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive 
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-all">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
