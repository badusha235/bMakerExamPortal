"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle, FileText } from "lucide-react";

function PDFViewerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const fileUrl = searchParams.get("file");
  const title = searchParams.get("title") || "Document Viewer";

  if (!fileUrl) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-6">
        <AlertCircle size={48} className="text-rose-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Invalid Document</h2>
        <p className="text-slate-400 mb-8">We couldn't locate the file you're trying to view.</p>
        <button onClick={() => router.back()} className="px-6 py-3 bg-blue-600 rounded-xl font-bold hover:scale-105 transition-all">
          Go Back
        </button>
      </div>
    );
  }

  const fullUrl = fileUrl.startsWith("http")
    ? fileUrl
    : `http://localhost:8000${fileUrl}`;

  const pdfDownloadUrl = fullUrl;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#1e293b",
      }}
    >
      {/* ── Header ─────────────────────────────────────── */}
      <header
        style={{
          height: "56px",
          minHeight: "56px",
          background: "#0f172a",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          flexShrink: 0,
        }}
      >
        {/* Left: Back + title */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => router.back()}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "8px",
              color: "#94a3b8",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <div
            style={{
              background: "#ef4444",
              borderRadius: "8px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FileText size={16} color="white" />
          </div>
          <span
            style={{
              color: "#e2e8f0",
              fontWeight: 700,
              fontSize: "14px",
              maxWidth: "500px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </span>
        </div>

        {/* Right: actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              color: "#475569",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "6px 14px",
              borderRadius: "8px",
            }}
          >
            🔒 Read Only
          </span>
        </div>
      </header>

      {/* ── PDF Iframe – takes ALL remaining height ───── */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {/* Overlay over Chrome's native PDF toolbar (~40px tall) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "44px",
            background: "#1e293b",
            zIndex: 10,
            pointerEvents: "all",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          <span style={{ color: "#334155", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            📄 {title}
          </span>
        </div>

        <iframe
          src={fullUrl}
          title={title}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
        />
      </div>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer
        style={{
          height: "36px",
          minHeight: "36px",
          background: "#0f172a",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: "#475569",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Protected by{" "}
          <span style={{ color: "#3b82f6" }}>bMakerStudyHub</span> Secure Engine
        </span>
      </footer>
    </div>
  );
}

export default function PDFViewerPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            background: "#0f172a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
          }}
        >
          Loading Viewer…
        </div>
      }
    >
      <PDFViewerContent />
    </Suspense>
  );
}
