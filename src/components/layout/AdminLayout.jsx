import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar is fixed on the left (hidden on mobile) */}
      <AdminSidebar />
      
      {/* Main Content Area - Pushed right on desktop to account for the 64px (16rem) sidebar */}
      <main className="flex-1 md:ml-64 w-full min-h-screen bg-slate-950 text-white">
        <Outlet />
      </main>
    </div>
  );
}

