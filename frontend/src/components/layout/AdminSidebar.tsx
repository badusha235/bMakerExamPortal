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
  Bell
} from "lucide-react";

const MENU_ITEMS = [
  { name: "Overview", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "Question Papers", icon: FileText, href: "/admin/papers" },
  { name: "Subjects", icon: BookOpen, href: "/admin/subjects" },
  { name: "Notifications", icon: Bell, href: "/admin/notifications" },
  { name: "User Access", icon: Users, href: "/admin/users" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col p-6 z-50">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center font-bold text-xl">V</div>
        <span className="text-xl font-bold tracking-tight">Vault<span className="text-brand-blue">Admin</span></span>
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
