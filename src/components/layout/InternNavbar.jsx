import React from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, LogOut } from "lucide-react";

export default function InternNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/dashboard");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 z-50 px-6 md:px-12 flex items-center justify-between transition-all">
      {/* BRANDING SECTION */}
      <div className="flex items-center gap-2 group cursor-default">
        <div className="bg-amber-500/20 p-1.5 rounded-lg border border-amber-500/30 group-hover:bg-amber-500/30 transition">
          {/* Swapped GraduationCap for Briefcase for a more professional B2B feel */}
          <Briefcase className="w-5 h-5 text-amber-400" />
        </div>
        <span className="text-lg font-bold text-white">
          Track<span className="text-amber-400">MyStack</span> Workspace
        </span>
      </div>

      {/* ACTION SECTION */}
      <button
        /*  UPDATED: Now points correctly to /intern to log out */
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 px-3 py-2 rounded-lg transition"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </nav>
  );
}
