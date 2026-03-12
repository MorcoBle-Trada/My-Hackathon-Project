import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrainCircuit } from "lucide-react";

export default function PublicNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-[#0f172a]/80 backdrop-blur-lg border-b border-slate-800 z-50 px-6 md:px-12 flex items-center justify-between transition-all">
      <Link to="/public" className="flex items-center gap-3 group">
        <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30 group-hover:bg-indigo-500/30 transition">
          <BrainCircuit className="w-6 h-6 text-indigo-400" />
        </div>
        <span className="text-xl font-extrabold text-white tracking-tight">
          TalentOS
        </span>
      </Link>

      <div className="flex items-center gap-4 sm:gap-6">
        <Link
          to="/public"
          className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition"
        >
          Programs
        </Link>
        <button
          /* 🌟 UPDATED: Now points correctly to /student */
          onClick={() => navigate("/student")}
          className="text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg border border-slate-700 transition"
        >
          Student Portal
        </button>
        <button
          /* 🌟 UPDATED: Now points correctly to /admin */
          onClick={() => navigate("/admin")}
          className="text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg shadow-lg shadow-indigo-500/20 transition active:scale-95"
        >
          Admin Login
        </button>
      </div>
    </nav>
  );
}
