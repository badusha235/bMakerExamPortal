"use client";

import AdminGuard from "@/components/auth/AdminGuard";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Allow the admin login page to be accessed without the guard
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <AdminGuard>{children}</AdminGuard>;
}
