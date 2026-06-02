"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { AUTH_BASE_URL } from "@/lib/api";

const examTags = ["Kerala PSC", "NEET", "JEE", "SSLC", "UPSC", "Mock Tests"];

const stats = [
  { value: "50K+", label: "Students" },
  { value: "120+", label: "Mock tests" },
  { value: "4.9", label: "Rating" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${AUTH_BASE_URL}/jwt/create/`, {
        username: email,
        password,
      });
      login(response.data.access);
      router.push("/home");
    } catch {
      setError("Invalid credentials. Please check your username/email and password.");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const response = await axios.post(`${AUTH_BASE_URL}/social/google-oauth2/`, {
          access_token: tokenResponse.access_token,
        });
        login(response.data.access);
        router.push("/home");
      } catch {
        setError("Google login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError("Google login failed."),
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-brand-blue/30 blur-[120px]" />
        <div className="absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-brand-indigo/25 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-brand-cyan/20 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Floating exam tags */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {examTags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            className="absolute rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/60 backdrop-blur-sm"
            style={{
              top: `${12 + (i % 3) * 28}%`,
              left: i % 2 === 0 ? `${4 + (i % 4) * 6}%` : undefined,
              right: i % 2 === 1 ? `${4 + (i % 4) * 5}%` : undefined,
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Top nav */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <Link
          href="/register"
          className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur-sm transition-colors hover:bg-white/10 sm:inline-flex"
        >
          Create account
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-[calc(100vh-88px)] items-center justify-center px-4 pb-12 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[440px]"
        >
          {/* Logo & headline */}
          <div className="mb-8 text-center">
            <Link href="/home" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-indigo shadow-lg shadow-brand-blue/30">
                <span className="text-xl font-bold text-white">b</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                bMaker<span className="text-brand-blue-light">StudyHub</span>
              </span>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8"
            >
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue-light">
                <Sparkles size={12} />
                Welcome back
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Sign in to your
                <span className="gradient-text block"> learning dashboard</span>
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
                Continue your exam prep with mock tests, notes, and personalized study paths.
              </p>
            </motion.div>
          </div>

          {/* Auth card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="rounded-[28px] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-8"
          >
            <button
              type="button"
              onClick={() => googleLogin()}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 active:scale-[0.98] disabled:opacity-60"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-transparent px-3 text-xs font-medium uppercase tracking-widest text-slate-500">
                  or sign in with email
                </span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold text-slate-400">
                  Email or username
                </label>
                <div className="group relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-brand-blue-light"
                  />
                  <input
                    id="email"
                    type="text"
                    required
                    autoComplete="username"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 transition-all focus:border-brand-blue/50 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-brand-blue/10"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-semibold text-slate-400">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-brand-blue-light transition-colors hover:text-white"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="group relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-brand-blue-light"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-12 text-sm text-white placeholder:text-slate-500 transition-all focus:border-brand-blue/50 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-brand-blue/10"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300"
                  role="alert"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-indigo py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/25 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-8 grid grid-cols-3 gap-3"
          >
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/5 bg-white/[0.04] px-3 py-4 text-center backdrop-blur-sm"
              >
                <p className="text-lg font-bold text-white">{value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Footer links */}
          <p className="mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-brand-blue-light hover:text-white">
              Join free
            </Link>
          </p>

          <div className="mt-6 flex items-center justify-center gap-6 text-[11px] font-medium uppercase tracking-wider text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-400" />
              Secure login
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap size={13} className="text-amber-400" />
              Instant access
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
