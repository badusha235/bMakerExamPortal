"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Search, Bell, User } from "lucide-react";
import { motion } from "framer-motion";

const MobileBottomNavigation = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Exams", href: "/exams", icon: Search },
    { name: "Store", href: "/study-materials", icon: BookOpen },
    { name: "Alerts", href: "/notifications", icon: Bell },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <nav className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl px-4 py-3 flex items-center justify-between shadow-2xl shadow-black/20">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center justify-center gap-1 group"
            >
              <div
                className={`p-2 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-brand-blue text-white"
                    : "text-slate-400 group-hover:text-slate-100"
                }`}
              >
                <item.icon size={22} />
              </div>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 w-1 h-1 bg-brand-blue rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileBottomNavigation;
