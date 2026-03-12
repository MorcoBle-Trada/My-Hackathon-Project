import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, ShieldCheck, Home, Bell, ChevronRight } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { db } = useDatabase();
  const [showNotifications, setShowNotifications] = useState(false);

  // Calculate new students across all courses
  const pendingStudents = [];
  Object.entries(db.courses).forEach(([courseKey, course]) => {
    course.students.forEach(student => {
      if (student.isNew) {
        pendingStudents.push({ ...student, courseKey, courseName: course.name });
      }
    });
  });

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
        : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`;

  return (
    <aside className="w-64 min-h-screen bg-[#1e293b] border-r border-slate-800 p-6 hidden md:flex flex-col fixed top-0 left-0 z-50">
      
      {/* HEADER & NOTIFICATION BELL */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="flex items-center gap-2 text-white">
          <ShieldCheck className="w-7 h-7 text-indigo-500" />
          <span className="text-lg font-extrabold tracking-tight">Admin Portal</span>
        </div>

        {/* The Notification Coupon/Badge */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition relative border border-slate-700"
          >
            <Bell className="w-5 h-5" />
            {pendingStudents.length > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[10px] font-bold text-white items-center justify-center">
                  {pendingStudents.length}
                </span>
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute top-full left-0 mt-3 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Pending Reviews</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {pendingStudents.length === 0 ? (
                  <p className="text-xs text-slate-500 p-4 text-center">No new students to review.</p>
                ) : (
                  pendingStudents.map(student => (
                    <div 
                      key={student.id} 
                      onClick={() => {
                        setShowNotifications(false);
                        navigate(`/admin/student/${student.courseKey}/${student.id}`);
                      }}
                      className="p-4 border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer transition flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition">{student.name}</p>
                        <p className="text-xs text-slate-500 truncate w-40">{student.courseName}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400" />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {/* 🌟 UPDATED: Now points to /admin/dashboard */}
        <NavLink to="/admin/dashboard" end className={navLinkClass}>
          <LayoutDashboard className="w-5 h-5" />
          Command Center
        </NavLink>
        <NavLink to="/public" className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-slate-400 hover:text-white hover:bg-slate-800">
          <Home className="w-5 h-5" />
          Public View
        </NavLink>
      </nav>

      <div className="mt-auto border-t border-slate-800 pt-6">
        {/* 🌟 UPDATED: Now points to /admin to logout */}
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-rose-400 font-medium hover:text-rose-300 hover:bg-rose-500/10 transition-all active:scale-95"
        >
          <LogOut className="w-5 h-5" />
          Secure Logout
        </button>
      </div>
    </aside>
  );
}