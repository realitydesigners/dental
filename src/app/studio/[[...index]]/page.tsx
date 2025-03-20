"use client";

// Import Next Studio directly
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

// The most basic implementation that works
export default function StudioPage() {
  return (
    <div className="max-h-screen w-screen absolute fixed inset-0 z-100">
      <NextStudio config={config} />
    </div>
  );
}
