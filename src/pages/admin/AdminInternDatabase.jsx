// import React, { useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useDatabase } from "../../context/DatabaseContext";
// import { ArrowLeft, Search, Database } from "lucide-react";

// import Card from "../../components/shared/Card";
// import SkillBadge from "../../components/shared/SkillBadge";
// import PerformanceBadge from "../../components/shared/PerformanceBadge";
// import EmptyState from "../../components/shared/EmptyState";

// export default function AdminCourseDatabase() {
//   const { courseKey } = useParams();
//   const navigate = useNavigate();
//   const { db } = useDatabase();
//   const [searchQuery, setSearchQuery] = useState("");

//   const course = db.courses[courseKey];

//   if (!course) {
//     return (
//       <div className="p-8 max-w-6xl mx-auto pt-20">
//         <EmptyState
//           icon={Database}
//           title="Cohort Not Found"
//           message="The course database you are looking for does not exist."
//           actionButton={
//             <button
//               onClick={() => navigate("/admin")}
//               className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-xl text-white font-bold transition"
//             >
//               Back to Command Center
//             </button>
//           }
//         />
//       </div>
//     );
//   }

//   // AI Job Match Logic + Strict Performance Sorting
//   const filteredStudents = course.students
//     .filter((student) => {
//       const query = searchQuery.toLowerCase().trim();

//       // If the search bar is empty, show everyone (so the Admin can still see pending students to grade them)
//       if (!query) return true;

//       // 🚫 EXCLUDE UNGRADED STUDENTS: If they don't have a score, don't show them in search results!
//       if (student.finalPerformanceScore === null) return false;

//       // 1. EXACT MATCH
//       const exactMatch =
//         student.name.toLowerCase().includes(query) ||
//         student.bio.toLowerCase().includes(query) ||
//         student.skills.some((skill) => skill.toLowerCase().includes(query));

//       if (exactMatch) return true;

//       // 2. AI NLP SIMULATION
//       const stopWords = [
//         "the",
//         "student",
//         "must",
//         "have",
//         "a",
//         "an",
//         "with",
//         "skill",
//         "who",
//         "knows",
//         "can",
//         "i",
//         "need",
//         "want",
//         "looking",
//         "for",
//         "in",
//         "and",
//       ];
//       const keywords = query
//         .split(/[\s,]+/)
//         .filter((word) => !stopWords.includes(word) && word.length > 1);

//       if (keywords.length > 0) {
//         return keywords.some(
//           (keyword) =>
//             student.skills.some((skill) =>
//               skill.toLowerCase().includes(keyword),
//             ) || student.bio.toLowerCase().includes(keyword),
//         );
//       }

//       return false;
//     })
//     .sort((a, b) => {
//       // STRICT SORT LOGIC: Highest score first, lowest score last
//       // (We use || 0 just so the unrated students stay at the bottom when the search bar is empty)
//       const scoreA = a.finalPerformanceScore || 0;
//       const scoreB = b.finalPerformanceScore || 0;

//       return scoreB - scoreA;
//     });

//   return (
//     <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
//       {/* Header & Search */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
//         <div>
//           <button
//             onClick={() => navigate("/admin")}
//             className="text-slate-400 hover:text-white flex items-center gap-2 transition font-medium mb-4"
//           >
//             <ArrowLeft className="w-4 h-4" /> Command Center
//           </button>
//           <h1 className="text-3xl font-extrabold text-white tracking-tight">
//             {course.name} Cohort
//           </h1>
//           <p className="text-slate-400 mt-1">
//             Manage, assess, and search students in this track.
//           </p>
//         </div>

//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
//           <input
//             type="text"
//             placeholder="AI Job Match (Search skills, bio...)"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500 transition shadow-inner"
//           />
//         </div>
//       </div>

//       {/* Results Grid or Empty State */}
//       {filteredStudents.length > 0 ? (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredStudents.map((student) => (
//             <Link
//               to={`/admin/student/${courseKey}/${student.id}`}
//               key={student.id}
//               className="block h-full outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl"
//             >
//               <Card className="p-6 hover:border-indigo-500/50 transition-all h-full flex flex-col cursor-pointer group relative bg-slate-900/80 hover:bg-slate-800/80">
//                 {/* Notification Pulse for Pending Reviews */}
//                 {student.isNew && (
//                   <div className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 rounded-full animate-pulse border-2 border-[#1e293b] shadow-[0_0_10px_rgba(244,63,94,0.5)] z-10"></div>
//                 )}

//                 <div className="flex justify-between items-start mb-4">
//                   <div className="flex items-center gap-3">
//                     {/* FIXED: Added object-top here! */}
//                     <img
//                       src={student.avatar}
//                       alt="avatar"
//                       className="w-12 h-12 rounded-full border-2 border-slate-700 object-cover object-center shadow-md"
//                     />
//                     <div>
//                       <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition">
//                         {student.name}
//                       </h3>
//                       <p className="text-xs text-slate-500 font-mono mt-0.5">
//                         ID: {student.academyId}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <PerformanceBadge score={student.finalPerformanceScore} />
//                 </div>

//                 <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-grow leading-relaxed italic">
//                   "{student.bio}"
//                 </p>

//                 <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-800/50">
//                   {student.skills.slice(0, 3).map((skill) => (
//                     <SkillBadge key={skill} skill={skill} />
//                   ))}
//                   {student.skills.length > 3 && (
//                     <span className="text-xs text-slate-500 font-medium self-center px-2 py-1 bg-slate-800 rounded-md">
//                       +{student.skills.length - 3}
//                     </span>
//                   )}
//                 </div>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <EmptyState
//           icon={Search}
//           title="No Match Found"
//           message={`No fully-graded students match "${searchQuery}".`}
//           actionButton={
//             <button
//               onClick={() => setSearchQuery("")}
//               className="mt-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-bold transition"
//             >
//               Clear Search
//             </button>
//           }
//         />
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useDatabase } from "../../context/DatabaseContext";
// import { ArrowLeft, Search, Database, Briefcase, BookOpen } from "lucide-react"; // 🌟 NEW: Added BookOpen icon

// import Card from "../../components/shared/Card";
// import SkillBadge from "../../components/shared/SkillBadge";
// import PerformanceBadge from "../../components/shared/PerformanceBadge";
// import EmptyState from "../../components/shared/EmptyState";

// export default function AdminInternDatabase() {
//   const navigate = useNavigate();
//   const { db } = useDatabase();
//   const [searchQuery, setSearchQuery] = useState("");

//   // 1. GET ACTIVE COMPANY
//   const activeCompanyId = localStorage.getItem("activeAdminCompanyId");
//   const company = db.companies?.[activeCompanyId];

//   // Redirect if no session is found
//   useEffect(() => {
//     if (!company) {
//       navigate("/admin");
//     }
//   }, [company, navigate]);

//   if (!company) return null;

//   // AI Job Match Logic + Strict Performance Sorting
//   const filteredInterns = company.interns
//     .filter((intern) => {
//       const query = searchQuery.toLowerCase().trim();

//       // If the search bar is empty, show everyone (so the Admin can still see pending interns to grade them)
//       if (!query) return true;

//       // 🚫 EXCLUDE UNGRADED INTERNS: If they don't have a score, don't show them in search results!
//       if (intern.finalPerformanceScore === null) return false;

//       // 1. EXACT MATCH
//       const exactMatch =
//         intern.name.toLowerCase().includes(query) ||
//         (intern.bio && intern.bio.toLowerCase().includes(query)) ||
//         (intern.role && intern.role.toLowerCase().includes(query)) ||
//         (intern.course && intern.course.toLowerCase().includes(query)) || // 🌟 NEW: Added Course to exact match search
//         intern.skills.some((skill) => skill.toLowerCase().includes(query));

//       if (exactMatch) return true;

//       // 2. AI NLP SIMULATION
//       const stopWords = [
//         "the", "student", "intern", "must", "have", "a", "an", "with", "skill",
//         "who", "knows", "can", "i", "need", "want", "looking", "for", "in", "and",
//       ];
//       const keywords = query
//         .split(/[\s,]+/)
//         .filter((word) => !stopWords.includes(word) && word.length > 1);

//       if (keywords.length > 0) {
//         return keywords.some(
//           (keyword) =>
//             intern.skills.some((skill) =>
//               skill.toLowerCase().includes(keyword),
//             ) || (intern.bio && intern.bio.toLowerCase().includes(keyword)),
//         );
//       }

//       return false;
//     })
//     .sort((a, b) => {
//       // STRICT SORT LOGIC: Highest score first, lowest score last
//       const scoreA = a.finalPerformanceScore || 0;
//       const scoreB = b.finalPerformanceScore || 0;

//       return scoreB - scoreA;
//     });

//   return (
//     <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
//       {/* Header & Search */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
//         <div>
//           <button
//             onClick={() => navigate("/admin/dashboard")}
//             className="text-slate-400 hover:text-white flex items-center gap-2 transition font-medium mb-4"
//           >
//             <ArrowLeft className="w-4 h-4" /> Command Center
//           </button>
//           <h1 className="text-3xl font-extrabold text-white tracking-tight">
//             Intern Directory
//           </h1>
//           <p className="text-slate-400 mt-1">
//             Search, filter, and manage talent across {company.companyName}.
//           </p>
//         </div>

//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
//           <input
//             type="text"
//             placeholder="AI Search (Skills, track, bio...)"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500 transition shadow-inner"
//           />
//         </div>
//       </div>

//       {/* Results Grid or Empty State */}
//       {filteredInterns.length > 0 ? (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredInterns.map((intern) => (
//             <Link
//               to={`/admin/intern/${intern.id}`}
//               key={intern.id}
//               className="block h-full outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl"
//             >
//               <Card className="p-6 hover:border-indigo-500/50 transition-all h-full flex flex-col cursor-pointer group relative bg-slate-900/80 hover:bg-slate-800/80">
//                 {/* Notification Pulse for Pending Reviews */}
//                 {intern.isNew && (
//                   <div className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 rounded-full animate-pulse border-2 border-[#1e293b] shadow-[0_0_10px_rgba(244,63,94,0.5)] z-10"></div>
//                 )}

//                 <div className="flex justify-between items-start mb-4">
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={intern.avatar}
//                       alt="avatar"
//                       className="w-14 h-14 rounded-full border-2 border-slate-700 object-cover object-center shadow-md object-top shrink-0"
//                     />
//                     <div className="space-y-1">
//                       <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition leading-tight">
//                         {intern.name}
//                       </h3>
//                       {/* 🌟 NEW: Stacked Role and Course Track */}
//                       <div className="flex flex-col gap-0.5">
//                         <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5 capitalize">
//                           <Briefcase className="w-3 h-3" /> {intern.role || "Unassigned"}
//                         </p>
//                         <p className="text-[11px] font-medium text-indigo-300/80 flex items-center gap-1.5">
//                           <BookOpen className="w-3 h-3" /> {intern.course || "General Track"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <PerformanceBadge score={intern.finalPerformanceScore} />
//                 </div>

//                 <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-grow leading-relaxed italic">
//                   "{intern.bio}"
//                 </p>

//                 <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-800/50">
//                   {intern.skills.slice(0, 3).map((skill) => (
//                     <SkillBadge key={skill} skill={skill} />
//                   ))}
//                   {intern.skills.length > 3 && (
//                     <span className="text-xs text-slate-500 font-medium self-center px-2 py-1 bg-slate-800 rounded-md">
//                       +{intern.skills.length - 3}
//                     </span>
//                   )}
//                 </div>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <EmptyState
//           icon={Search}
//           title="No Match Found"
//           message={`No fully-graded interns match "${searchQuery}".`}
//           actionButton={
//             <button
//               onClick={() => setSearchQuery("")}
//               className="mt-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-bold transition"
//             >
//               Clear Search
//             </button>
//           }
//         />
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import {
  ArrowLeft,
  Search,
  Database,
  Briefcase,
  BookOpen,
  X,
} from "lucide-react";

import Card from "../../components/shared/Card";
import SkillBadge from "../../components/shared/SkillBadge";
import PerformanceBadge from "../../components/shared/PerformanceBadge";
import EmptyState from "../../components/shared/EmptyState";

export default function AdminInternDatabase() {
  const navigate = useNavigate();
  const location = useLocation();
  const { db } = useDatabase();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCourseFilter, setActiveCourseFilter] = useState(
    location.state?.courseFilter || null,
  );

  // 1. GET ACTIVE COMPANY
  const activeCompanyId = localStorage.getItem("activeAdminCompanyId");
  const company = db.companies?.[activeCompanyId];

  // Redirect if no session is found
  useEffect(() => {
    if (!company) {
      navigate("/admin");
    }
  }, [company, navigate]);

  // AI Job Match Logic + Strict Performance Sorting (Optimized with useMemo)
  const filteredInterns = useMemo(() => {
    if (!company?.interns) return [];

    return company.interns
      .filter((intern) => {
        // Safe fallbacks to prevent crashes if data is missing
        const skills = intern.skills || [];
        const name = (intern.name || "").toLowerCase();
        const email = (intern.email || "").toLowerCase();
        const bio = (intern.bio || "").toLowerCase();
        const role = (intern.role || "").toLowerCase();
        const course = (intern.course || "").toLowerCase();
        const query = searchQuery.toLowerCase().trim();

        // 🌟 COURSE FILTER OVERRIDE
        if (activeCourseFilter) {
          const internCourse = intern.course || intern.role || "Unassigned";
          if (internCourse !== activeCourseFilter) return false;

          // If searching WHILE inside a course filter
          if (query) {
            return (
              name.includes(query) ||
              email.includes(query) ||
              skills.some((skill) => skill.toLowerCase().includes(query))
            );
          }
          return true;
        }

        // --- NORMAL DATABASE SEARCH LOGIC ---

        // If the search bar is empty, show everyone (so Admin can see pending interns)
        if (!query) return true;

        // 🚫 EXCLUDE UNGRADED INTERNS from general search results
        if (intern.finalPerformanceScore == null) return false;

        // 1. EXACT MATCH
        const exactMatch =
          name.includes(query) ||
          bio.includes(query) ||
          role.includes(query) ||
          course.includes(query) ||
          skills.some((skill) => skill.toLowerCase().includes(query));

        if (exactMatch) return true;

        // 2. AI NLP SIMULATION
        const stopWords = [
          "the",
          "student",
          "intern",
          "must",
          "have",
          "a",
          "an",
          "with",
          "skill",
          "who",
          "knows",
          "can",
          "i",
          "need",
          "want",
          "looking",
          "for",
          "in",
          "and",
        ];

        const keywords = query
          .split(/[\s,]+/)
          .filter((word) => !stopWords.includes(word) && word.length > 1);

        if (keywords.length > 0) {
          return keywords.some(
            (keyword) =>
              skills.some((skill) => skill.toLowerCase().includes(keyword)) ||
              bio.includes(keyword),
          );
        }

        return false;
      })
      .sort((a, b) => {
        // STRICT SORT LOGIC: Highest score first, lowest score last
        const scoreA = a.finalPerformanceScore || 0;
        const scoreB = b.finalPerformanceScore || 0;
        return scoreB - scoreA;
      });
    // 👇 FIXED: Changed 'company?.interns' to 'company' to resolve React Compiler error
  }, [company, activeCourseFilter, searchQuery]);

  if (!company) return null;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-slate-400 hover:text-white flex items-center gap-2 transition font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Command Center
          </button>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {activeCourseFilter
              ? `${activeCourseFilter} Interns`
              : "Intern Directory"}
          </h1>
          <p className="text-slate-400 mt-1">
            {activeCourseFilter
              ? `Showing all students enrolled in ${activeCourseFilter}.`
              : `Search, filter, and manage talent across ${company.companyName}.`}
          </p>
        </div>

        <div className="w-full md:w-auto flex flex-col gap-3">
          {/* 🌟 Clear Course Filter Badge */}
          {activeCourseFilter && (
            <button
              onClick={() => setActiveCourseFilter(null)}
              className="self-start md:self-end flex items-center gap-2 text-xs font-bold bg-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-lg hover:bg-rose-500/20 hover:text-rose-400 transition"
            >
              Viewing: {activeCourseFilter} <X className="w-3 h-3" />
            </button>
          )}

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder={
                activeCourseFilter
                  ? "Search inside this course..."
                  : "AI Search (Skills, track, bio...)"
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500 transition shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Results Grid or Empty State */}
      {filteredInterns.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInterns.map((intern) => (
            <Link
              to={`/admin/intern/${activeCompanyId}/${intern.id}`}
              key={intern.id}
              className="block h-full outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl"
            >
              <Card className="p-6 hover:border-indigo-500/50 transition-all h-full flex flex-col cursor-pointer group relative bg-slate-900/80 hover:bg-slate-800/80">
                {/* Notification Pulse for Pending Reviews */}
                {intern.isNew && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 rounded-full animate-pulse border-2 border-[#1e293b] shadow-[0_0_10px_rgba(244,63,94,0.5)] z-10"></div>
                )}

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={intern.avatar}
                      alt={intern.name}
                      className="w-14 h-14 rounded-full border-2 border-slate-700 object-cover object-center shadow-md object-top shrink-0 bg-slate-800"
                    />
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition leading-tight">
                        {intern.name}
                      </h3>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5 capitalize">
                          <Briefcase className="w-3 h-3" />{" "}
                          {intern.role || "Unassigned"}
                        </p>
                        <p className="text-[11px] font-medium text-indigo-300/80 flex items-center gap-1.5">
                          <BookOpen className="w-3 h-3" />{" "}
                          {intern.course || "General Track"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <PerformanceBadge score={intern.finalPerformanceScore} />
                </div>

                <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-grow leading-relaxed italic">
                  "{intern.bio || "No bio provided."}"
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-800/50">
                  {(intern.skills || []).slice(0, 3).map((skill) => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                  {(intern.skills || []).length > 3 && (
                    <span className="text-xs text-slate-500 font-medium self-center px-2 py-1 bg-slate-800 rounded-md">
                      +{(intern.skills || []).length - 3}
                    </span>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title={activeCourseFilter ? "Course Empty" : "No Match Found"}
          message={
            activeCourseFilter
              ? `No interns match your search in ${activeCourseFilter}.`
              : `No fully-graded interns match "${searchQuery}".`
          }
          actionButton={
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCourseFilter(null);
              }}
              className="mt-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-bold transition"
            >
              Clear All Filters
            </button>
          }
        />
      )}
    </div>
  );
}

// import React, { useState, useRef, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDatabase } from "../../context/DatabaseContext";
// import {
//   Users,
//   Clock,
//   ChevronRight,
//   Briefcase,
//   AlertCircle,
//   Search,
//   Download,
//   RefreshCw,
//   UserPlus,
//   Key,
//   Copy,
//   CheckCircle,
//   Settings,
//   Plus,
//   X,
//   ShieldCheck,
//   AlertTriangle,
//   Loader2
// } from "lucide-react";
// import Card from "../../components/shared/Card";
// import PerformanceBadge from "../../components/shared/PerformanceBadge";

// export default function AdminDashboard() {
//   const { db, regenerateCompanyCode, addDepartment } = useDatabase();
//   const navigate = useNavigate();

//   const [viewMode, setViewMode] = useState("recent");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [copied, setCopied] = useState(false);
//   const listRef = useRef(null);

//   // UI States
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showRevokeModal, setShowRevokeModal] = useState(false);
//   const [newDeptName, setNewDeptName] = useState("");

//   // 1. GET ACTIVE COMPANY
//   const activeCompanyId = localStorage.getItem("activeAdminCompanyId");
//   const company = db.companies?.[activeCompanyId];

//   // Majestic Entry & Redirect
//   useEffect(() => {
//     if (!company) {
//       navigate("/admin");
//     } else {
//       // Simulate network request for the majestic entrance
//       const timer = setTimeout(() => setIsPageLoading(false), 800);
//       return () => clearTimeout(timer);
//     }
//   }, [company, navigate]);

//   // 2. REGENERATE CODE FUNCTION (Now triggered via custom modal)
//   const confirmRegenerateCode = () => {
//     regenerateCompanyCode(activeCompanyId);
//     setCopied(false);
//     setShowRevokeModal(false);
//   };

//   // 3. COPY TO CLIPBOARD
//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(company.inviteCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // 4. ADD NEW DEPARTMENT FUNCTION
//   const handleAddNewDepartment = (e) => {
//     e.preventDefault();
//     if (!newDeptName.trim()) return;

//     if (addDepartment) {
//       addDepartment(activeCompanyId, newDeptName.trim());
//     } else {
//       alert("Please ensure addDepartment is implemented in DatabaseContext!");
//     }

//     setNewDeptName("");
//     setShowAddModal(false);
//   };

//   // DYNAMIC STATS & GROUPING
//   const { totalInterns, pendingReviews, newRegistrations, departmentsMap, allInterns } = useMemo(() => {
//     if (!company || !company.interns) {
//       return { totalInterns: 0, pendingReviews: 0, newRegistrations: 0, departmentsMap: {}, allInterns: [] };
//     }

//     let pending = 0;
//     let newReg = 0;
//     const depts = {};

//     const adminCourses = company.offeredCourses || company.courses || company.courseTracks || company.departments || [];

//     adminCourses.forEach(course => {
//       const courseName = typeof course === 'string' ? course : (course.name || "Unknown Course");
//       depts[courseName] = { active: 0, pending: 0, total: 0 };
//     });

//     const internsList = company.interns.map((intern) => {
//       const isPending = intern.finalPerformanceScore === null || intern.finalPerformanceScore === undefined || intern.isNew;
//       if (isPending) pending++;
//       if (intern.isNew) newReg++;

//       const deptName = intern.course || intern.role || "Unassigned";

//       if (!depts[deptName]) depts[deptName] = { active: 0, pending: 0, total: 0 };

//       depts[deptName].total++;
//       if (isPending) {
//         depts[deptName].pending++;
//       } else {
//         depts[deptName].active++;
//       }

//       return { ...intern, isPending, deptName };
//     });

//     return {
//       totalInterns: internsList.length,
//       pendingReviews: pending,
//       newRegistrations: newReg,
//       departmentsMap: depts,
//       allInterns: internsList
//     };
//   }, [company]);

//   const scrollDown = () => {
//     setTimeout(() => {
//       listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }, 100);
//   };

//   const displayedInterns = useMemo(() => {
//     let filtered = [...allInterns].reverse();

//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       return filtered.filter((intern) => {
//         const matchName = intern.name?.toLowerCase().includes(query);
//         const matchEmail = intern.email?.toLowerCase().includes(query);
//         const matchCourse = intern.course?.toLowerCase().includes(query);
//         const matchSkills = intern.skills?.some((skill) => skill.toLowerCase().includes(query));
//         return matchName || matchEmail || matchCourse || matchSkills;
//       });
//     } else if (viewMode === "pending") {
//       const pending = filtered.filter(s => s.isPending);
//       const graded = filtered.filter(s => !s.isPending);
//       return [...pending, ...graded];
//     } else {
//       return filtered.slice(0, 15);
//     }
//   }, [allInterns, searchQuery, viewMode]);

//   const handleDownloadReport = () => {
//     let csvContent = "Name,Email,Course Track,Role,GitHub,Experience (Yrs),Exam Score,Assignment Score,Soft Skills,Final Score\n";
//     const escapeCSV = (str) => `"${String(str).replace(/"/g, '""')}"`;

//     allInterns.forEach((intern) => {
//       const row = [
//         escapeCSV(intern.name), escapeCSV(intern.email || "N/A"), escapeCSV(intern.course || "N/A"),
//         escapeCSV(intern.role || "N/A"), escapeCSV(intern.githubUsername || "N/A"),
//         intern.yearsOfExperience || 0, intern.examScore ?? "Pending",
//         intern.assignmentScore ?? "Pending", intern.behaviorScore ?? "Pending", intern.finalPerformanceScore ?? "Pending",
//       ].join(",");
//       csvContent += row + "\n";
//     });

//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `${company.companyName.replace(/\s+/g, '_')}_Interns_${new Date().toISOString().split("T")[0]}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   if (isPageLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-[80vh] w-full">
//         <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
//         <h2 className="text-xl font-bold text-white tracking-widest uppercase mb-2">TalentOS</h2>
//         <p className="text-slate-400 font-medium animate-pulse">Initializing your secure workspace...</p>
//       </div>
//     );
//   }

//   if (!company) return null;

//   // DYNAMIC HEADER VARIABLES
//   const fullName = company.fullName || "Administrator";
//   const role = company.role || "Admin";
//   const orgType = company.industry || company.companyType || "Organization";
//   const borderColors = ['border-t-indigo-500', 'border-t-emerald-500', 'border-t-amber-500', 'border-t-rose-500', 'border-t-cyan-500'];
//   const adminAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=4f46e5&color=fff&bold=true`;

//   return (
//     <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 relative animate-in fade-in duration-700">

//       {/* 🌟 PREMIUM DYNAMIC HEADER */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800/60">
//         <div className="flex items-center gap-5">
//           <img src={adminAvatar} alt="Admin" className="w-16 h-16 rounded-2xl border-2 border-slate-700 shadow-xl shadow-indigo-500/10" />
//           <div>
//             <div className="flex items-center gap-3 mb-1">
//               <h1 className="text-3xl font-black text-white tracking-tight">
//                 {company.companyName}
//               </h1>
//               <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-md">
//                 <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
//                 <span className="text-indigo-300 text-xs font-bold tracking-wide uppercase">{orgType}</span>
//               </div>
//             </div>
//             <p className="text-slate-400 text-lg">
//               Welcome back, <span className="text-white font-semibold">{fullName}</span> <span className="text-indigo-400/80 text-sm">({role})</span>
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
//           <button
//             onClick={handleDownloadReport}
//             className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 font-bold py-2.5 px-6 rounded-xl transition active:scale-95"
//           >
//             <Download className="w-5 h-5" /> Export Data
//           </button>
//         </div>
//       </div>

//       {/* INVITE CODE BANNER */}
//       <Card className="p-6 border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-transparent flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(99,102,241,0.05)] relative overflow-hidden">
//         <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>

//         <div className="flex items-center gap-5 relative z-10">
//           <div className="p-4 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl text-indigo-400 shrink-0">
//             <Key className="w-8 h-8" />
//           </div>
//           <div>
//             <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
//               Secret Intern Invite Code
//             </p>
//             <div className="flex items-center gap-4">
//               <h2 className="text-3xl sm:text-4xl font-black text-white tracking-[0.2em] font-mono drop-shadow-md">
//                 {company.inviteCode}
//               </h2>
//               <button
//                 onClick={handleCopyCode}
//                 title="Copy Code"
//                 className="p-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-indigo-500/50 rounded-lg text-slate-300 transition"
//               >
//                 {copied ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
//               </button>
//             </div>
//             <p className="text-sm text-indigo-200/60 mt-2 max-w-lg">
//               Share this secure code privately with your incoming cohort so they can register under your organization.
//             </p>
//           </div>
//         </div>
//         <button
//           onClick={() => setShowRevokeModal(true)}
//           className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold py-3 px-5 rounded-xl transition active:scale-95 shrink-0 relative z-10"
//         >
//           <RefreshCw className="w-4 h-4" /> Revoke & Regenerate
//         </button>
//       </Card>

//       {/* STATS GRID */}
//       <div className="grid md:grid-cols-3 gap-6">
//         <Card className="p-6 border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
//           <div className="flex items-center gap-4">
//             <div className="p-4 bg-slate-700/50 rounded-xl text-slate-300 border border-slate-600/50">
//               <Users className="w-8 h-8" />
//             </div>
//             <div>
//               <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Interns</p>
//               <h2 className="text-3xl font-black text-white">{totalInterns}</h2>
//             </div>
//           </div>
//         </Card>

//         <Card
//           onClick={() => { setViewMode("pending"); setSearchQuery(""); scrollDown(); }}
//           className={`p-6 cursor-pointer transition-all backdrop-blur-sm ${
//             viewMode === "pending"
//               ? "ring-2 ring-rose-500 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
//               : "border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10"
//           }`}
//         >
//           <div className="flex items-center gap-4">
//             <div className="p-4 bg-rose-500/20 rounded-xl text-rose-400 border border-rose-500/20">
//               <AlertCircle className="w-8 h-8" />
//             </div>
//             <div>
//               <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Pending Reviews</p>
//               <h2 className="text-3xl font-black text-white">{pendingReviews}</h2>
//             </div>
//           </div>
//         </Card>

//         <Card
//           onClick={() => { setViewMode("recent"); setSearchQuery(""); scrollDown(); }}
//           className={`p-6 cursor-pointer transition-all backdrop-blur-sm ${
//             viewMode === "recent"
//               ? "ring-2 ring-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
//               : "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10"
//           }`}
//         >
//           <div className="flex items-center gap-4">
//             <div className="p-4 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/20">
//               <UserPlus className="w-8 h-8" />
//             </div>
//             <div>
//               <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">New Additions</p>
//               <h2 className="text-3xl font-black text-white">{newRegistrations}</h2>
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* MANAGE DEPARTMENTS */}
//       <div>
//         <div className="flex items-center justify-between mb-5 mt-2">
//           <h2 className="text-xl font-bold text-white flex items-center gap-2">
//             <Briefcase className="w-5 h-5 text-indigo-400" /> Active Departments & Tracks
//           </h2>
//         </div>

//         <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {Object.entries(departmentsMap).map(([dept, stats], index) => {
//             const bColor = borderColors[index % borderColors.length];
//             return (
//               <Card key={dept} className={`p-6 border-t-4 ${bColor} bg-slate-900 border-x-slate-800/60 border-b-slate-800/60 hover:bg-slate-800/80 transition-all flex flex-col justify-between shadow-lg h-40 group`}>
//                 <div>
//                   <h3 className="text-lg font-bold text-white mb-2 truncate group-hover:text-indigo-400 transition" title={dept}>{dept}</h3>
//                   <p className="text-slate-400 text-sm flex items-center gap-2 font-medium">
//                     <Users className="w-4 h-4 text-slate-500" />
//                     {stats.total === 0 ? "0 Enrolled" : `${stats.total} Enrolled`}
//                   </p>
//                 </div>
//                 <button onClick={() => navigate("/admin/database", { state: { courseFilter: dept } })} className="mt-auto text-indigo-400 hover:text-indigo-300 font-bold text-sm flex items-center gap-1 w-max transition-colors">
//                   View Roster <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </Card>
//             );
//           })}

//           <button onClick={() => setShowAddModal(true)} className="p-6 border-2 border-dashed border-slate-700/60 bg-slate-900/20 hover:bg-slate-800/60 hover:border-indigo-500/50 transition-all rounded-2xl flex flex-col items-center justify-center h-40 text-slate-500 hover:text-indigo-400 group">
//             <div className="w-10 h-10 rounded-full bg-slate-800/80 group-hover:bg-indigo-500/20 flex items-center justify-center mb-2 transition-colors">
//               <Plus className="w-5 h-5" />
//             </div>
//             <span className="font-bold text-sm">Add Department</span>
//           </button>
//         </div>
//       </div>

//       {/* ACTIVITY LIST */}
//       <div ref={listRef} className="scroll-mt-6">
//         <Card className={`p-6 transition-colors ${viewMode === "pending" ? "border-rose-500/30" : "border-emerald-500/30"}`}>
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//             <h2 className="text-xl font-bold text-white flex items-center gap-2">
//               {searchQuery ? <><Search className="w-5 h-5 text-indigo-400" /> Search Results</>
//               : viewMode === "pending" ? <><AlertCircle className="w-5 h-5 text-rose-500" /> Prioritized for Grading</>
//               : <><Clock className="w-5 h-5 text-emerald-400" /> Recent Activity</>}
//             </h2>

//             <div className="relative w-full md:w-72">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="Search by name, email, course..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2 outline-none focus:border-indigo-500 transition"
//               />
//             </div>
//           </div>

//           <div className="divide-y divide-slate-800/50">
//             {displayedInterns.map((intern) => (
//               <div key={intern.id} className={`py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 -mx-4 px-4 rounded-lg transition ${intern.isPending && viewMode === "pending" ? "bg-rose-500/10 border-l-4 border-l-rose-500 border-y border-y-transparent border-r border-r-transparent" : "hover:bg-slate-800/20 border-l-4 border-l-transparent border-y border-y-transparent border-r border-r-transparent"}`}>
//                 <div className="flex items-center gap-4">
//                   <div className="relative">
//                     <img src={intern.avatar} alt={intern.name} className="w-10 h-10 rounded-full object-cover object-center border-2 border-slate-700" />
//                     {intern.isNew && <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#1e293b]"></div>}
//                   </div>
//                   <div>
//                     <h3 className="text-white font-bold">{intern.name}</h3>
//                     <div className="flex items-center gap-2 text-xs font-mono mt-0.5">
//                       <span className="text-indigo-400 capitalize">{intern.course || intern.role || "Intern"}</span>
//                       <span className="text-slate-600">•</span>
//                       <span className="text-slate-400">{intern.email}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <PerformanceBadge score={intern.finalPerformanceScore} />
//                   <button onClick={() => navigate(`/admin/intern/${activeCompanyId}/${intern.id}`)} className={`p-2 rounded-xl text-slate-300 hover:text-white transition ${intern.isPending && viewMode === "pending" ? "bg-rose-500/20 hover:bg-rose-600 text-rose-100" : "bg-slate-800 hover:bg-indigo-600"}`}>
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {displayedInterns.length === 0 && (
//               <div className="text-center py-8 text-slate-500 text-sm">
//                 {viewMode === "pending" ? "🎉 Great job! All interns in this view have been reviewed." : "No interns found matching your criteria."}
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>

//       {/* 🌟 CUSTOM REVOKE MODAL */}
//       {showRevokeModal && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
//           <Card className="w-full max-w-md p-6 bg-slate-900 border-rose-500/30 shadow-2xl shadow-rose-500/10 relative">
//             <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center mb-4 border border-rose-500/30">
//               <AlertTriangle className="w-6 h-6 text-rose-500" />
//             </div>
//             <h3 className="text-xl font-bold text-white mb-2">Revoke Invite Code?</h3>
//             <p className="text-sm text-slate-400 mb-6 leading-relaxed">
//               Are you sure? Your current code (<span className="text-white font-mono">{company.inviteCode}</span>) will stop working immediately. Any students trying to register with it will be blocked until you share the new one.
//             </p>

//             <div className="flex items-center gap-3">
//               <button onClick={() => setShowRevokeModal(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl transition">
//                 Cancel
//               </button>
//               <button onClick={confirmRegenerateCode} className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-xl transition shadow-lg shadow-rose-500/20">
//                 Yes, Revoke It
//               </button>
//             </div>
//           </Card>
//         </div>
//       )}

//       {/* NEW DEPARTMENT MODAL */}
//       {showAddModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
//           <Card className="w-full max-w-md p-6 bg-slate-900 border-slate-700 shadow-2xl relative">
//             <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1">
//               <X className="w-5 h-5" />
//             </button>
//             <h3 className="text-xl font-bold text-white mb-2">Create New Department</h3>
//             <p className="text-sm text-slate-400 mb-6">Add a new track or department for interns to enroll in.</p>

//             <form onSubmit={handleAddNewDepartment}>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-bold text-slate-300 mb-2">Department Name</label>
//                   <input type="text" value={newDeptName} onChange={(e) => setNewDeptName(e.target.value)} placeholder="e.g. Product Design" className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition" autoFocus />
//                 </div>
//                 <button type="submit" disabled={!newDeptName.trim()} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-500/20">
//                   Create Department
//                 </button>
//               </div>
//             </form>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }
