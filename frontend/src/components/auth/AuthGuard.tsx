"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const publicPaths = ["/login", "/register", "/admin/login"];
    const isPublicPath = publicPaths.includes(pathname);

    if (!isLoading) {
      if (!user && !isPublicPath) {
        // Redirect to login if not authenticated and trying to access a protected route
        router.push("/login");
      } else if (user && isPublicPath && pathname !== "/admin/login") {
        // Redirect to home if authenticated and trying to access login/register
        router.push("/home");
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse text-sm">Validating session...</p>
        </div>
      </div>
    );
  }

  const publicPaths = ["/login", "/register", "/admin/login"];
  const isPublicPath = publicPaths.includes(pathname);

  // Prevent flash of content before redirect
  if (!user && !isPublicPath) return null;
  if (user && isPublicPath && pathname !== "/admin/login") return null;

  return <>{children}</>;
}
