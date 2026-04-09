import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import {
  Users,
  Clock,
  ChevronRight,
  Briefcase,
  AlertCircle,
  Search,
  UserPlus,
  Key,
  Copy,
  CheckCircle,
  ShieldCheck,
  Loader2,
  Bell,
  ChevronDown,
  Settings,
  RefreshCw,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import Card from "../../components/shared/Card";
import PerformanceBadge from "../../components/shared/PerformanceBadge";

export default function AdminDashboard() {
  const { db, updateCompany } = useDatabase();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const listRef = useRef(null);

  // UI States
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // 1. GET ACTIVE COMPANY
  const activeCompanyId = localStorage.getItem("activeAdminCompanyId");
  const company = db.companies?.[activeCompanyId];

  // DYNAMIC HEADER VARIABLES
  const fullName = company?.adminName || company?.fullName || "Administrator";
  const firstName = fullName.split(" ")[0];

  // Expanded database keys to ensure we catch whatever the input was saved as
  const role =
    company?.role ||
    company?.adminRole ||
    company?.position ||
    company?.adminPosition ||
    company?.jobRole ||
    company?.title;

  const companyName = company?.companyName || "Organization";
  const adminAvatar =
    company?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=4f46e5&color=fff&bold=true`;

  useEffect(() => {
    if (!company) {
      navigate("/admin");
    } else {
      const timer = setTimeout(() => setIsPageLoading(false), 800);

      const visitedKey = `visited_${activeCompanyId}`;
      if (!localStorage.getItem(visitedKey)) {
        setIsFirstVisit(true);
        localStorage.setItem(visitedKey, "true");
      }

      return () => clearTimeout(timer);
    }
  }, [company, navigate, activeCompanyId]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(company?.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateCode = async () => {
    setIsRegenerating(true);
    const newCode = `TALENT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    try {
      if (updateCompany) {
        await updateCompany(activeCompanyId, { inviteCode: newCode });
      } else {
        company.inviteCode = newCode;
      }
      setShowRevokeModal(false);
    } catch (error) {
      console.error("Failed to regenerate code:", error);
    } finally {
      setTimeout(() => setIsRegenerating(false), 600);
    }
  };

  // DYNAMIC STATS & GROUPING
  const {
    totalInterns,
    pendingReviews,
    departmentsMap,
    allInterns,
    newInterns,
  } = useMemo(() => {
    if (!company || !company.interns) {
      return {
        totalInterns: 0,
        pendingReviews: 0,
        newRegistrations: 0,
        departmentsMap: {},
        allInterns: [],
        newInterns: [],
      };
    }

    let pending = 0;
    let newReg = 0;
    const depts = {};
    const newlyAdded = [];

    const adminCourses =
      company.offeredCourses ||
      company.courses ||
      company.courseTracks ||
      company.departments ||
      [];

    adminCourses.forEach((course) => {
      const courseName =
        typeof course === "string" ? course : course.name || "Unknown Course";
      depts[courseName] = { active: 0, pending: 0, total: 0 };
    });

    const internsList = company.interns.map((intern) => {
      const isPending =
        intern.finalPerformanceScore === null ||
        intern.finalPerformanceScore === undefined ||
        intern.isNew;
      if (isPending) pending++;
      if (intern.isNew) {
        newReg++;
        newlyAdded.push(intern);
      }
      const deptName = intern.course || intern.role || "Unassigned";
      if (!depts[deptName])
        depts[deptName] = { active: 0, pending: 0, total: 0 };
      depts[deptName].total++;
      isPending ? depts[deptName].pending++ : depts[deptName].active++;

      return { ...intern, isPending, deptName };
    });

    return {
      totalInterns: internsList.length,
      pendingReviews: pending,
      newRegistrations: newReg,
      departmentsMap: depts,
      allInterns: internsList,
      newInterns: newlyAdded,
    };
  }, [company]);

  const scrollDown = () => {
    setTimeout(
      () =>
        listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      100,
    );
  };

  const displayedInterns = useMemo(() => {
    let filtered = [...allInterns].reverse(); // Reverses to show newest first
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return filtered.filter(
        (intern) =>
          intern.name?.toLowerCase().includes(query) ||
          intern.email?.toLowerCase().includes(query) ||
          intern.course?.toLowerCase().includes(query) ||
          intern.skills?.some((s) => s.toLowerCase().includes(query)),
      );
    } else if (viewMode === "pending") {
      return filtered.filter((s) => s.isPending);
    } else if (viewMode === "top") {
      return [...filtered]
        .sort(
          (a, b) =>
            (b.finalPerformanceScore || 0) - (a.finalPerformanceScore || 0),
        )
        .slice(0, 10);
    } else if (viewMode === "new") {
      // UPDATED LOGIC: Always return the top 10 most recently added
      // instead of strictly returning only items where 'isNew' is true.
      return filtered.slice(0, 10);
    } else {
      return filtered.slice(0, 15);
    }
  }, [allInterns, searchQuery, viewMode]);

  if (isPageLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] w-full">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-white tracking-widest uppercase mb-2">
          TalentOS
        </h2>
        <p className="text-slate-400 font-medium animate-pulse">
          Initializing your secure workspace...
        </p>
      </div>
    );
  }

  if (!company) return null;

  const borderColors = [
    "border-t-indigo-500",
    "border-t-emerald-500",
    "border-t-amber-500",
    "border-t-rose-500",
    "border-t-cyan-500",
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 relative animate-in fade-in duration-700">
      {/* HEADER WITH PROFILE DROPDOWN */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-800/60">
        <div className="max-w-2xl w-full flex flex-col items-center md:items-start">
          <h1 className="text-3xl md:text-4xl font-black bg-linear-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight leading-tight text-center md:text-left">
            Manage & Showcase Your Organization's Top Tech Talent to the World.
          </h1>
          <p className="text-slate-400 text-lg mt-2 text-center w-full md:text-left">
            {isFirstVisit ? "Welcome to the " : "Welcome back to the "}
            <span className="text-indigo-400 font-bold">
              {companyName}
            </span>{" "}
            workspace.
          </p>
        </div>

        <div className="flex items-center gap-4 z-50">
          {/* NOTIFICATION BELL */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 transition relative border border-slate-700 shadow-lg"
            >
              <Bell className="w-5 h-5" />
              {newInterns.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-500 text-xs font-bold text-white items-center justify-center">
                    {newInterns.length}
                  </span>
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute top-full right-0 mt-3 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white">New Sign-Ups</h3>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-800/50">
                  {newInterns.length === 0 ? (
                    <p className="text-xs text-slate-500 p-6 text-center">
                      No new interns to review.
                    </p>
                  ) : (
                    newInterns.map((intern) => (
                      <div
                        key={intern.id}
                        onClick={() =>
                          navigate(
                            `/admin/intern/${activeCompanyId}/${intern.id}`,
                          )
                        }
                        className="p-4 hover:bg-slate-800/50 cursor-pointer flex justify-between group"
                      >
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-indigo-400">
                            {intern.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {intern.course || "Unassigned"}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 p-2 bg-transparent border-none hover:bg-slate-800/50 rounded-xl transition-all"
            >
              <img
                src={adminAvatar}
                alt="Admin"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover object-top ring-2 ring-indigo-500/30 ring-offset-2 ring-offset-slate-900 shadow-sm transition-all"
              />
              <div className="text-left hidden sm:block">
                <p className="text-base font-bold text-white leading-tight">
                  {firstName}
                </p>
                <p className="text-sm text-indigo-400 font-bold mt-0.5">
                  {role || "N/A"}
                </p>
              </div>
              <ChevronDown className="w-5 h-5 text-slate-400 ml-1" />
            </button>

            {showProfileMenu && (
              <div className="absolute top-full right-0 mt-3 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 p-6 animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                    Profile Bio
                  </h3>
                </div>

                <div className="flex flex-col items-center mb-6 pb-6 border-b border-slate-800">
                  <img
                    src={adminAvatar}
                    alt="Admin Large"
                    className="w-36 h-36 rounded-full object-cover object-top ring-4 ring-slate-800 ring-offset-4 ring-offset-slate-900 shadow-2xl mb-2"
                  />
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Full Name</p>
                    <p className="text-sm font-bold text-white">{fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Role</p>
                    <p className="text-sm font-bold text-white">
                      {role || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Organization</p>
                    <p className="text-sm font-bold text-white">
                      {companyName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/admin/settings")}
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition"
                >
                  <Settings className="w-4 h-4" /> Go to Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* INVITE CODE CARD */}
      <Card className="p-6 border-indigo-500/30 bg-linear-to-br from-indigo-500/10 to-transparent flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(99,102,241,0.05)] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10 w-full justify-between">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl text-indigo-400 shrink-0">
              <Key className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                Secret Intern Invite Code
              </p>
              <div className="flex items-center gap-4">
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-[0.2em] font-mono drop-shadow-md">
                  {company.inviteCode}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    title="Copy Code"
                    className="p-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-indigo-500/50 rounded-lg text-slate-300 transition"
                  >
                    {copied ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={handleRegenerateCode}
                    disabled={isRegenerating}
                    title="Regenerate Code"
                    className="p-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-indigo-500/50 rounded-lg text-slate-300 transition disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`w-5 h-5 ${isRegenerating ? "animate-spin text-indigo-400" : ""}`}
                    />
                  </button>
                </div>
              </div>
              <p className="text-sm text-indigo-200/60 mt-2 max-w-lg">
                Share this secure code privately with your incoming cohort so
                they can register under your organization.
              </p>
            </div>
          </div>

          {/* Revoke Button */}
          <button
            onClick={() => setShowRevokeModal(true)}
            className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg font-bold transition flex items-center gap-2 mt-4 sm:mt-0"
          >
            <XCircle className="w-5 h-5" /> Regenerate Code
          </button>
        </div>
      </Card>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card
          onClick={() => {
            setViewMode("top");
            setSearchQuery("");
            scrollDown();
          }}
          className={`p-6 cursor-pointer transition-all backdrop-blur-sm ${viewMode === "top" ? "ring-2 ring-indigo-500 bg-slate-800" : "border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50"}`}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-slate-700/50 rounded-xl text-slate-300 border border-slate-600/50">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Total Interns
              </p>
              <h2 className="text-3xl font-black text-white">{totalInterns}</h2>
            </div>
          </div>
        </Card>
        <Card
          onClick={() => {
            setViewMode("pending");
            setSearchQuery("");
            scrollDown();
          }}
          className={`p-6 cursor-pointer transition-all backdrop-blur-sm ${viewMode === "pending" ? "ring-2 ring-rose-500 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.15)]" : "border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10"}`}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-rose-500/20 rounded-xl text-rose-400 border border-rose-500/20">
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
        <Card
          onClick={() => {
            setViewMode("new");
            setSearchQuery("");
            scrollDown();
          }}
          className={`p-6 cursor-pointer transition-all backdrop-blur-sm ${viewMode === "new" ? "ring-2 ring-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]" : "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10"}`}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/20">
              <UserPlus className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                New Additions
              </p>
              <h2 className="text-3xl font-black text-white">
                {/* This will now show the actual count of recent interns in the list, capping at 10 */}
                {Math.min(totalInterns, 10)}
              </h2>
            </div>
          </div>
        </Card>
      </div>

      {/* ACTIVE TRACKS */}
      <div>
        <div className="flex items-center justify-between mb-5 mt-2">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400" /> Active Departments
            & Tracks
          </h2>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(departmentsMap).map(([dept, stats], index) => {
            const bColor = borderColors[index % borderColors.length];
            return (
              <Card
                key={dept}
                className={`p-6 border-t-4 ${bColor} bg-slate-900 border-x-slate-800/60 border-b-slate-800/60 hover:bg-slate-800/80 transition-all flex flex-col justify-between shadow-lg h-40 group`}
              >
                <div>
                  <h3
                    className="text-lg font-bold text-white mb-2 truncate group-hover:text-indigo-400 transition"
                    title={dept}
                  >
                    {dept}
                  </h3>
                  <p className="text-slate-400 text-sm flex items-center gap-2 font-medium">
                    <Users className="w-4 h-4 text-slate-500" />{" "}
                    {stats.total === 0
                      ? "0 Enrolled"
                      : `${stats.total} Enrolled`}
                  </p>
                </div>
                <button
                  onClick={() =>
                    navigate("/admin/database", {
                      state: { courseFilter: dept },
                    })
                  }
                  className="mt-auto text-indigo-400 hover:text-indigo-300 font-bold text-sm flex items-center gap-1 w-max transition-colors"
                >
                  View Roster{" "}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ACTIVITY LOGS (Fully Clickable Rows) */}
      <div ref={listRef} className="scroll-mt-6">
        <Card
          className={`p-6 transition-colors ${viewMode === "pending" ? "border-rose-500/30" : viewMode === "new" ? "border-emerald-500/30" : ""}`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {searchQuery ? (
                <>
                  <Search className="w-5 h-5 text-indigo-400" /> Search Results
                </>
              ) : viewMode === "pending" ? (
                <>
                  <AlertCircle className="w-5 h-5 text-rose-500" /> Prioritized
                  for Grading
                </>
              ) : viewMode === "top" ? (
                <>
                  <ShieldCheck className="w-5 h-5 text-indigo-400" /> Top
                  Performing Interns
                </>
              ) : viewMode === "new" ? (
                <>
                  <UserPlus className="w-5 h-5 text-emerald-500" /> Recent
                  Additions
                </>
              ) : (
                <>
                  <Clock className="w-5 h-5 text-emerald-400" /> Recent Activity
                  Log
                </>
              )}
            </h2>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2 outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-800/50">
            {displayedInterns.map((intern) => (
              <div
                key={intern.id}
                onClick={() =>
                  navigate(`/admin/intern/${activeCompanyId}/${intern.id}`)
                }
                className={`py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 -mx-4 px-4 rounded-lg cursor-pointer transition ${intern.isPending && viewMode === "pending" ? "bg-rose-500/10 border-l-4 border-l-rose-500" : "hover:bg-slate-800/50 border-l-4 border-l-transparent"}`}
              >
                <div className="flex items-center gap-4 pointer-events-none">
                  <div className="relative">
                    <img
                      src={
                        intern.avatar ||
                        `https://ui-avatars.com/api/?name=${intern.name}&background=random`
                      }
                      alt={intern.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-slate-700"
                    />
                    {intern.isNew && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#1e293b]"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{intern.name}</h3>
                    <div className="flex items-center gap-2 text-xs font-mono mt-0.5">
                      <span className="text-indigo-400 capitalize">
                        {intern.course || intern.role || "Intern"}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">{intern.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="pointer-events-none">
                    <PerformanceBadge score={intern.finalPerformanceScore} />
                  </div>
                  <button
                    className={`p-2 rounded-xl text-slate-300 hover:text-white transition ${intern.isPending && viewMode === "pending" ? "bg-rose-500/20 hover:bg-rose-600 text-rose-100" : "bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600"}`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {displayedInterns.length === 0 && (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                {viewMode === "pending" ? (
                  totalInterns === 0 ? (
                    <>
                      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <Users className="w-8 h-8 text-slate-500" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        Waiting for Students
                      </h3>
                      <p className="text-slate-500 text-sm">
                        No students have registered yet. Share your invite code
                        to get started.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        Incredible job!
                      </h3>
                      <p className="text-slate-500 text-sm">
                        All interns have been successfully evaluated and graded.
                        The board is clear.
                      </p>
                    </>
                  )
                ) : viewMode === "new" && totalInterns === 0 ? (
                  <p className="text-slate-500 text-sm">
                    No interns have registered with your organization yet. Share
                    your invite code to get started.
                  </p>
                ) : (
                  <p className="text-slate-500 text-sm">
                    No interns found matching your criteria.
                  </p>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* REVOKE MODAL */}
      {showRevokeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-md p-6 bg-slate-900 border-slate-700 shadow-2xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/20 mb-4 mx-auto">
              <AlertTriangle className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">
              Revoke Current Invite Code?
            </h3>
            <p className="text-slate-400 text-sm text-center mb-6">
              This will permanently invalidate{" "}
              <span className="text-white font-mono">{company.inviteCode}</span>
              . Interns attempting to use it will be blocked. A new secure code
              will be generated automatically.
            </p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => setShowRevokeModal(false)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleRegenerateCode}
                disabled={isRegenerating}
                className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-bold transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isRegenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Yes, Revoke Code"
                )}
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
