import React from 'react';

export default function EmptyState({ 
  icon: Icon, 
  title = "No Data Found", 
  message = "There is currently nothing to display here.", 
  actionButton = null 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-700/50 rounded-2xl bg-[#1e293b]/50">
      {Icon && (
        <div className="bg-slate-800 p-4 rounded-full mb-4 text-slate-400 shadow-inner">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">{message}</p>
      {actionButton}
    </div>
  );
}