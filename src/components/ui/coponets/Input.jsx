import React from "react";
export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-slate-400">{label}</label>
      )}
      <input
        {...props}
        className="bg-slate-900/50 border border-slate-700 text-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600 w-full"
      />
    </div>
  );
}
