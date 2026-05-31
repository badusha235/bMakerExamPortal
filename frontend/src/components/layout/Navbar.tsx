"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Exams", href: "/exams" },
    { name: "Study Materials", href: "/study-materials" },
    { name: "Mock Tests", href: "/mock-tests" },
    { name: "Notifications", href: "/notifications" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/80 backdrop-blur-md shadow-premium border-b border-gray-100"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
            <span className="text-white font-bold text-xl">b</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">
            bMaker<span className="text-brand-blue">StudyHub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <Link
            href="/login"
            className="text-sm font-medium text-brand-blue hover:text-brand-blue-deep transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 bg-brand-blue text-white text-sm font-semibold rounded-full hover:bg-brand-blue-deep transition-all shadow-md shadow-brand-blue/10 active:scale-95"
          >
            Join Free
          </Link>
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden items-center gap-4">
          <button className="p-2 text-slate-600">
            <Search size={20} />
          </button>
          <button
            className="p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-slate-700 py-2 border-b border-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  href="/login"
                  className="w-full py-3 text-center text-brand-blue font-semibold border-2 border-brand-blue rounded-2xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-full py-3 text-center bg-brand-blue text-white font-semibold rounded-2xl shadow-lg shadow-brand-blue/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
