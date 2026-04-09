import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

import { DatabaseProvider } from "./context/DatabaseContext";

import AdminLayout from "./components/layout/AdminLayout";
import PublicLayout from "./components/layout/PublicLayout";
import InternLayout from "./components/layout/InternLayout";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminInternDatabase from "./pages/admin/AdminInternDatabase";
import AdminInternProfile from "./pages/admin/AdminInternProfile";
import AdminSettings from "./pages/admin/AdminSettings";

import InternLogin from "./pages/intern/InternLogin";
import InternDashboard from "./pages/intern/InternDashboard";

import PublicBrochure from "./pages/public/PublicBrochure";
import GlobalCourseLeaderboard from "./pages/public/GlobalCourseLeaderboard";
import PublicInternProfile from "./pages/public/PublicInternProfile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <DatabaseProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/public" element={<PublicBrochure />} />
            <Route
              path="/public/leaderboard/:courseName"
              element={<GlobalCourseLeaderboard />}
            />
            <Route
              path="/public/intern/:companyId/:id"
              element={<PublicInternProfile />}
            />
          </Route>

          <Route path="/intern" element={<InternLogin />} />
          <Route element={<InternLayout />}>
            <Route path="/intern/dashboard" element={<InternDashboard />} />
          </Route>

          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/database" element={<AdminInternDatabase />} />
            <Route
              path="/admin/database/:companyId"
              element={<AdminInternDatabase />}
            />
            <Route
              path="/admin/intern/:companyId/:id"
              element={<AdminInternProfile />}
            />
            <Route path="/admin/intern/:id" element={<AdminInternProfile />} />
          </Route>
          {/* <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-2xl font-bold">
                404 - Page Not Found
              </div>
            }
          /> */}
        </Routes>
      </DatabaseProvider>
    </>
  );
};

export default App;
