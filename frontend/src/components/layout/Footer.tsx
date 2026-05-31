import React from "react";
import Link from "next/link";
import { Mail, Globe, MessageCircle, Share2, ArrowRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-20 pb-32 md:pb-12">
      <div className="container mx-auto px-4 md:px-6 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">b</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                bMaker<span className="text-brand-blue">StudyHub</span>
              </span>
            </Link>
            <p className="text-slate-500 leading-relaxed text-sm">
              Empowering students across India with premium study materials, mock tests, and real-time exam notifications. Join the smartest preparation community today.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageCircle, Share2].map((Icon, i) => (
                <Link key={i} href="#" className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Resources</h4>
            <ul className="space-y-4">
              {["Kerala PSC", "NEET / JEE", "SSLC / Plus Two", "UPSC / SSC", "Railway Exams"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 hover:text-brand-blue transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Support</h4>
            <ul className="space-y-4">
              {["Help Center", "Privacy Policy", "Terms of Service", "Contact Us", "FAQ"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 hover:text-brand-blue transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Stay Updated</h4>
            <p className="text-sm text-slate-500 mb-4">Subscribe to get the latest exam alerts and study tips.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 px-3 bg-brand-blue text-white rounded-lg hover:bg-brand-blue-deep transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© {currentYear} bMaker Educational Services. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-brand-blue transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-brand-blue transition-colors">Terms</Link>
            <Link href="#" className="hover:text-brand-blue transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
