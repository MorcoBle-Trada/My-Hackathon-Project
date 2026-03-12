import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentNavbar from './StudentNavbar';

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <StudentNavbar />
      <main className="pt-20"> {/* pt-20 pushes content down so the fixed navbar doesn't hide it */}
        <Outlet />
      </main>
    </div>
  );
}