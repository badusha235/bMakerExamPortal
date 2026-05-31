"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Not logged in at all, go to login
        router.push("/login");
      } else if (!user.is_superuser && !user.is_staff) {
        // Logged in but not an admin, go home
        router.push("/");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse text-sm">Verifying Admin Privileges...</p>
        </div>
      </div>
    );
  }

  // If not admin, return null while redirecting
  if (!user || (!user.is_superuser && !user.is_staff)) {
    return null;
  }

  return <>{children}</>;
}
