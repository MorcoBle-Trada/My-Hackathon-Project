import React from "react";
import { Outlet } from "react-router-dom";
import InternNavbar from "./InternNavbar";

export default function InternLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <InternNavbar />
      <main className="pt-20">
        {" "}
        {/* pt-20 pushes content down so the fixed navbar doesn't hide it */}
        <Outlet />
      </main>
    </div>
  );
}
