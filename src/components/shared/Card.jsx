import React from 'react';

export default function Card({ children, className = '', onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-slate-900 rounded-2xl border border-slate-800 ${className}`}
    >
      {children}
    </div>
  );
}