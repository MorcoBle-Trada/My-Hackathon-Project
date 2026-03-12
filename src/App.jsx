import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from "./pages/Dashboard";

import { DatabaseProvider } from "./context/DatabaseContext";

import AdminLayout from "./components/layout/AdminLayout";
import PublicLayout from "./components/layout/PublicLayout";
import StudentLayout from "./components/layout/StudentLayout";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourseDatabase from "./pages/admin/AdminCourseDatabase";
import AdminStudentProfile from "./pages/admin/AdminStudentProfile";

import StudentLogin from "./pages/student/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";

import PublicBrochure from "./pages/public/PublicBrochure";
import PublicCohortList from "./pages/public/PublicCohortList";
import PublicPortfolio from "./pages/public/PublicPortfolio";

const App = () => {
  return (
      <>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <DatabaseProvider>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/public" element={<PublicBrochure />} />
              <Route
                path="/public/cohort/:courseKey"
                element={<PublicCohortList />}
              />
              <Route
                path="/public/student/:courseKey/:id"
                element={<PublicPortfolio />}
              />
            </Route>

            <Route path="/student" element={<StudentLogin />} />
            <Route element={<StudentLayout />}>
              <Route
                path="/student/:courseKey/:id"
                element={<StudentDashboard />}
              />
            </Route>

            <Route path="/admin" element={<AdminLogin />} />
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route
                path="/admin/database/:courseKey"
                element={<AdminCourseDatabase />}
              />
              <Route
                path="/admin/student/:courseKey/:id"
                element={<AdminStudentProfile />}
              />
            </Route>
          </Routes>
        </DatabaseProvider>
      </BrowserRouter>
        
      </>
  );
};

export default App;
