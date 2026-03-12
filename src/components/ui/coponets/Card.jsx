import React from "react";
export default function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-black/10 transition-all duration-300 ${onClick ? "cursor-pointer hover:-translate-y-1 hover:shadow-indigo-500/10 hover:border-indigo-500/50" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
