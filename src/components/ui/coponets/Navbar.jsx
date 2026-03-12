import React from "react";
import { Link } from "react-router-dom";
import { Network } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <Network className="w-6 h-6" />
          <span className="font-bold text-xl tracking-tight text-white">
            TalentSync Admin
          </span>
        </Link>
        <div className="flex gap-4">
          <span className="text-sm font-medium bg-slate-800 py-1.5 px-3 rounded-full border border-slate-700">
            Admin Portal
          </span>
        </div>
      </div>
    </nav>
  );
}
