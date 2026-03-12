import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-indigo-500/30">
      <PublicNavbar />
      <main>
        {/* The child pages (Brochure, Cohort List, Portfolio) will render here */}
        <Outlet />
      </main>
    </div>
  );
}