import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Home,
  Settings,
  Activity,
  X,
  UserPlus,
  CheckCircle,
  Clock,
  ChevronRight, // Added a tiny arrow for clickable items
} from "lucide-react";
import { useDatabase } from "../../context/DatabaseContext";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { db } = useDatabase();

  const [showActivityModal, setShowActivityModal] = useState(false);

  // 1. GET ACTIVE COMPANY
  const activeCompanyId = localStorage.getItem("activeAdminCompanyId");
  const company = db.companies?.[activeCompanyId];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
        : "text-slate-400 hover:text-white hover:bg-slate-800/50 group"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("activeAdminCompanyId");
    navigate("/dashboard");
  };

  // Dynamically generate activity logs
  const generateActivityLogs = () => {
    if (!company) return [];

    // Default starting log (Not clickable)
    const logs = [
      {
        id: "init",
        text: `Secure workspace for ${company.companyName} was initialized.`,
        time: "System Start",
        icon: ShieldCheck,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        internId: null, // No intern associated
      },
    ];

    if (company.interns && company.interns.length > 0) {
      const recentInterns = [...company.interns].reverse().slice(0, 10);

      recentInterns.forEach((intern) => {
        // Log grading activity
        if (intern.finalPerformanceScore) {
          logs.unshift({
            id: `grade-${intern.id}`,
            internId: intern.id, // STORE INTERN ID
            text: `Graded ${intern.name} with a score of ${intern.finalPerformanceScore}/100.`,
            time: "Recent",
            icon: CheckCircle,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
          });
        }

        // Log registration
        logs.unshift({
          id: `reg-${intern.id}`,
          internId: intern.id, // STORE INTERN ID
          text: `New registration: ${intern.name} joined ${intern.course || "the workspace"}.`,
          time: "Recent",
          icon: UserPlus,
          color: "text-emerald-400",
          bg: "bg-emerald-500/10",
        });
      });
    }

    return logs.slice(0, 15);
  };

  const handleLogClick = (internId) => {
    if (internId) {
      setShowActivityModal(false); // Close the modal
      navigate(`/admin/intern/${internId}`); // Navigate to the intern's profile
    }
  };

  return (
    <>
      <aside className="w-64 min-h-screen bg-slate-950 border-r border-slate-800/60 p-6 hidden md:flex flex-col fixed top-0 left-0 z-40 shadow-2xl shadow-black/50">
        {/* HEADER */}
        <div className="flex items-center gap-2 text-white mb-10">
          <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-indigo-500" />
          </div>
          <span className="text-xl font-black tracking-tight">
            Track<span className="text-indigo-500">MyStack</span>
          </span>
        </div>

        {/* MAIN NAVIGATION */}
        <nav className="flex-1 space-y-2.5">
          <NavLink to="/admin/dashboard" end className={navLinkClass}>
            <LayoutDashboard className="w-5 h-5" />
            Command Center
          </NavLink>

          <NavLink
            to="/public"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-slate-400 hover:text-white hover:bg-slate-800/50 group"
          >
            <Home className="w-5 h-5 group-hover:text-emerald-400 transition-colors" />
            Public Roster
          </NavLink>
        </nav>

        {/* BOTTOM ACTION SECTION */}
        <div className="mt-auto border-t border-slate-800/60 pt-6 space-y-2">
          {/* ACTIVITY LOGS */}
          <button
            onClick={() => setShowActivityModal(true)}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-slate-400 hover:text-white hover:bg-slate-800/50 group"
          >
            <Activity className="w-5 h-5 group-hover:text-emerald-400 transition-colors" />
            Activity Logs
          </button>

          {/* ROUTED SETTINGS PAGE */}
          <NavLink to="/admin/settings" className={navLinkClass}>
            <Settings className="w-5 h-5 group-hover:text-slate-300 transition-colors" />
            Settings
          </NavLink>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-3 mt-4 w-full rounded-xl text-slate-300 font-bold bg-slate-900 border border-slate-800 hover:text-white hover:bg-rose-600 hover:border-rose-500 shadow-lg transition-all active:scale-95 group"
          >
            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Secure Logout
          </button>
        </div>
      </aside>

      {/* --- ACTIVITY LOGS MODAL --- */}
      {showActivityModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="w-full max-w-md p-6 bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl relative max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" /> System
                Activity
              </h3>
              <button
                onClick={() => setShowActivityModal(false)}
                className="text-slate-500 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {generateActivityLogs().map((log) => {
                const Icon = log.icon;
                const isClickable = !!log.internId;

                return (
                  <div
                    key={log.id}
                    onClick={() => handleLogClick(log.internId)}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                      isClickable
                        ? "cursor-pointer hover:bg-slate-800 hover:shadow-md active:scale-[0.98]"
                        : "hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div
                        className={`p-2 rounded-lg h-max mt-1 ${log.bg} ${log.color}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-300 font-medium leading-relaxed">
                          {log.text}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {log.time}
                        </p>
                      </div>
                    </div>
                    {/* Add a tiny indicator so the user knows they can click it */}
                    {isClickable && (
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
