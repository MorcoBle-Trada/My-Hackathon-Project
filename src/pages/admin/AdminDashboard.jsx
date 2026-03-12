import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import {
  Users,
  Clock,
  ChevronRight,
  FolderOpen,
  AlertCircle,
  Search,
  Download,
  RefreshCw,
  UserPlus
} from "lucide-react";
import Card from "../../components/shared/Card";
import PerformanceBadge from "../../components/shared/PerformanceBadge";

export default function AdminDashboard() {
  const { db } = useDatabase();
  const navigate = useNavigate();
  
  // NEW STATE: 'recent' (default) or 'pending'
  const [viewMode, setViewMode] = useState("recent"); 
  const [searchQuery, setSearchQuery] = useState("");
  const listRef = useRef(null);

  // RESET DATABASE FUNCTION
  const handleResetDatabase = () => {
    if (
      window.confirm(
        "⚠️ Are you sure? This will erase all newly registered students and completely reset the database back to your seedData.js file.",
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // Calculate Hub Stats across all courses
  let totalStudents = 0;
  let pendingReviews = 0;
  let newRegistrations = 0;
  const allStudents = [];

  Object.entries(db.courses).forEach(([courseKey, course]) => {
    totalStudents += course.students.length;
    course.students.forEach((student) => {
      const isPending = student.finalPerformanceScore === null || student.isNew;
      
      if (isPending) pendingReviews++;
      if (student.isNew) newRegistrations++;

      allStudents.push({
        ...student,
        courseKey,
        courseName: course.name,
        isPending,
      });
    });
  });

  // --- FILTERING & SORTING LOGIC ---
  let sortedStudents = [...allStudents].reverse(); // Reverse to get newest first
  let displayedStudents = [];

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    displayedStudents = sortedStudents.filter((student) => {
      const matchName = student.name?.toLowerCase().includes(query);
      const matchId = student.academyId?.toLowerCase().includes(query);
      const matchCourse = student.courseName?.toLowerCase().includes(query);
      const matchSkills = student.skills?.some((skill) =>
        skill.toLowerCase().includes(query),
      );
      return matchName || matchId || matchCourse || matchSkills;
    });
  } else if (viewMode === "pending") {
    // Bring pending to the top!
    const pending = sortedStudents.filter(s => s.isPending);
    const graded = sortedStudents.filter(s => !s.isPending);
    displayedStudents = [...pending, ...graded];
  } else {
    // Default view: just show recent registrations (limit to 15 to keep it clean)
    displayedStudents = sortedStudents.slice(0, 15);
  }

  // SCROLL FUNCTION
  const scrollDown = () => {
    setTimeout(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // CLICK HANDLERS FOR THE CARDS
  const handlePendingClick = () => {
    setViewMode("pending");
    setSearchQuery("");
    scrollDown();
  };

  const handleRecentClick = () => {
    setViewMode("recent");
    setSearchQuery("");
    scrollDown();
  };

  const handleDownloadReport = () => {
    let csvContent =
      "Academy ID,Name,Cohort,Email,Experience (Yrs),Exam Score,Projects,Soft Skills,Final Score\n";

    allStudents.forEach((student) => {
      const row = [
        student.academyId,
        student.name,
        student.courseName,
        student.email || "N/A",
        student.yearsOfExperience || 0,
        student.examScore || "Pending",
        student.assignmentScore || "Pending",
        student.behaviorScore || "Pending",
        student.finalPerformanceScore || "Pending",
      ].join(",");
      csvContent += row + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `TalentOS_Hub_Report_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Command Center
          </h1>
          <p className="text-slate-400 mt-2">
            Overview of hub performance and active cohorts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleResetDatabase}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 font-bold py-2.5 px-4 rounded-xl transition active:scale-95"
          >
            <RefreshCw className="w-5 h-5" /> Sync Database
          </button>

          <button
            onClick={handleDownloadReport}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-6 rounded-xl transition active:scale-95"
          >
            <Download className="w-5 h-5" /> Export Data
          </button>
        </div>
      </div>

      {/* STATS GRID - NOW 3 COLUMNS */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* BOX 1: Total Students (Not clickable) */}
        <Card className="p-6 border-indigo-500/20 bg-indigo-500/5">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-500/20 rounded-xl text-indigo-400">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Total Active
              </p>
              <h2 className="text-3xl font-black text-white">
                {totalStudents}
              </h2>
            </div>
          </div>
        </Card>

        {/* BOX 2: Pending Assessments (Clickable) */}
        <Card
          onClick={handlePendingClick}
          className={`p-6 cursor-pointer transition-all ${
            viewMode === "pending"
              ? "ring-2 ring-rose-500 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
              : "border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-rose-500/20 rounded-xl text-rose-400">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Pending Reviews
              </p>
              <h2 className="text-3xl font-black text-white">
                {pendingReviews}
              </h2>
            </div>
          </div>
        </Card>

        {/* BOX 3: Recent Registrations (Clickable) */}
        <Card
          onClick={handleRecentClick}
          className={`p-6 cursor-pointer transition-all ${
            viewMode === "recent"
              ? "ring-2 ring-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              : "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-500/20 rounded-xl text-emerald-400">
              <UserPlus className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                New (Unseen)
              </p>
              <h2 className="text-3xl font-black text-white">
                {newRegistrations}
              </h2>
            </div>
          </div>
        </Card>
      </div>

      {/* MANAGE COHORTS */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-indigo-400" /> Manage Cohorts
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(db.courses).map(([courseKey, course]) => (
            <Card
              key={courseKey}
              onClick={() => navigate(`/admin/database/${courseKey}`)}
              className="p-6 cursor-pointer hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all group"
            >
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition capitalize">
                {course.name}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {course.students.length} Enrolled Students
              </p>
              <div className="mt-4 flex items-center text-sm font-bold text-indigo-500 group-hover:text-indigo-400">
                Open Database <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ACTIVITY LIST */}
      <div ref={listRef} className="scroll-mt-6">
        <Card className={`p-6 transition-colors ${viewMode === "pending" ? "border-rose-500/30" : "border-emerald-500/30"}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {searchQuery ? (
                <><Search className="w-5 h-5 text-indigo-400" /> Search Results</>
              ) : viewMode === "pending" ? (
                <><AlertCircle className="w-5 h-5 text-rose-500" /> Prioritized for Grading</>
              ) : (
                <><Clock className="w-5 h-5 text-emerald-400" /> Recent Activity</>
              )}
            </h2>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search database..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2 outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-800/50">
            {displayedStudents.map((student) => (
              <div
                key={student.id}
                className={`py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 -mx-4 px-4 rounded-lg transition ${
                  student.isPending && viewMode === "pending"
                    ? "bg-rose-500/10 border-l-4 border-l-rose-500 border-y border-y-transparent border-r border-r-transparent" 
                    : "hover:bg-slate-800/20 border-l-4 border-l-transparent border-y border-y-transparent border-r border-r-transparent"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover object-center border-2 border-slate-700"
                    />
                    {student.isNew && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#1e293b]" title="New Registration"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{student.name}</h3>
                    <div className="flex items-center gap-2 text-xs font-mono mt-0.5">
                      <span className="text-indigo-400 capitalize">
                        {student.courseName}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">
                        {student.academyId}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <PerformanceBadge score={student.finalPerformanceScore} />
                  <button
                    onClick={() =>
                      navigate(`/admin/student/${student.courseKey}/${student.id}`)
                    }
                    className={`p-2 rounded-xl text-slate-300 hover:text-white transition ${
                      student.isPending && viewMode === "pending" 
                        ? "bg-rose-500/20 hover:bg-rose-600 text-rose-300" 
                        : "bg-slate-800 hover:bg-indigo-600"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            
            {/* HERE IS YOUR UPDATED EMPTY STATE MESSAGE */}
            {displayedStudents.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-sm">
                {viewMode === "pending" 
                  ? "🎉 Great job! All students have been graded." 
                  : "No students found matching your criteria."}
              </div>
            )}
            
          </div>
        </Card>
      </div>
    </div>
  );
}