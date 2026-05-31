import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "bMakerStudyHub - Premium Exam Preparation Platform",
  description: "The ultimate destination for Kerala PSC, NEET, JEE, and competitive exam preparation. Smart search, mock tests, and study materials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
          <AuthProvider>
            {children}
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
