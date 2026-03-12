import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut } from 'lucide-react';

export default function StudentNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 z-50 px-6 md:px-12 flex items-center justify-between transition-all">
      
      {/* 🌟 FIX: Removed the Link 'to' attribute because the dashboard needs a specific courseKey and ID */}
      <div className="flex items-center gap-2 group cursor-default">
        <div className="bg-amber-500/20 p-1.5 rounded-lg border border-amber-500/30 group-hover:bg-amber-500/30 transition">
          <GraduationCap className="w-5 h-5 text-amber-400" />
        </div>
        <span className="text-lg font-bold text-white">Talent<span className="text-amber-400">OS</span> Workspace</span>
      </div>
      
      <button 
        /* 🌟 UPDATED: Now points correctly to /student to log out */
        onClick={() => navigate('/student')}
        className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 px-3 py-2 rounded-lg transition"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </nav>
  );
}