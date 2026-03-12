import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import { ArrowLeft, Search, Database } from "lucide-react";

import Card from "../../components/shared/Card";
import SkillBadge from "../../components/shared/SkillBadge";
import PerformanceBadge from "../../components/shared/PerformanceBadge";
import EmptyState from "../../components/shared/EmptyState";

export default function AdminCourseDatabase() {
  const { courseKey } = useParams();
  const navigate = useNavigate();
  const { db } = useDatabase();
  const [searchQuery, setSearchQuery] = useState("");

  const course = db.courses[courseKey];

  if (!course) {
    return (
      <div className="p-8 max-w-6xl mx-auto pt-20">
        <EmptyState
          icon={Database}
          title="Cohort Not Found"
          message="The course database you are looking for does not exist."
          actionButton={
            <button
              onClick={() => navigate("/admin")}
              className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-xl text-white font-bold transition"
            >
              Back to Command Center
            </button>
          }
        />
      </div>
    );
  }

  // AI Job Match Logic + Strict Performance Sorting
  const filteredStudents = course.students
    .filter((student) => {
      const query = searchQuery.toLowerCase().trim();

      // If the search bar is empty, show everyone (so the Admin can still see pending students to grade them)
      if (!query) return true;

      // 🚫 EXCLUDE UNGRADED STUDENTS: If they don't have a score, don't show them in search results!
      if (student.finalPerformanceScore === null) return false;

      // 1. EXACT MATCH
      const exactMatch =
        student.name.toLowerCase().includes(query) ||
        student.bio.toLowerCase().includes(query) ||
        student.skills.some((skill) => skill.toLowerCase().includes(query));

      if (exactMatch) return true;

      // 2. AI NLP SIMULATION
      const stopWords = [
        "the",
        "student",
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
            student.skills.some((skill) =>
              skill.toLowerCase().includes(keyword),
            ) || student.bio.toLowerCase().includes(keyword),
        );
      }

      return false;
    })
    .sort((a, b) => {
      // STRICT SORT LOGIC: Highest score first, lowest score last
      // (We use || 0 just so the unrated students stay at the bottom when the search bar is empty)
      const scoreA = a.finalPerformanceScore || 0;
      const scoreB = b.finalPerformanceScore || 0;

      return scoreB - scoreA;
    });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <button
            onClick={() => navigate("/admin")}
            className="text-slate-400 hover:text-white flex items-center gap-2 transition font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Command Center
          </button>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {course.name} Cohort
          </h1>
          <p className="text-slate-400 mt-1">
            Manage, assess, and search students in this track.
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="AI Job Match (Search skills, bio...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500 transition shadow-inner"
          />
        </div>
      </div>

      {/* Results Grid or Empty State */}
      {filteredStudents.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Link
              to={`/admin/student/${courseKey}/${student.id}`}
              key={student.id}
              className="block h-full outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl"
            >
              <Card className="p-6 hover:border-indigo-500/50 transition-all h-full flex flex-col cursor-pointer group relative bg-slate-900/80 hover:bg-slate-800/80">
                {/* Notification Pulse for Pending Reviews */}
                {student.isNew && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 rounded-full animate-pulse border-2 border-[#1e293b] shadow-[0_0_10px_rgba(244,63,94,0.5)] z-10"></div>
                )}

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {/* FIXED: Added object-top here! */}
                    <img
                      src={student.avatar}
                      alt="avatar"
                      className="w-12 h-12 rounded-full border-2 border-slate-700 object-cover object-center shadow-md"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition">
                        {student.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        ID: {student.academyId}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <PerformanceBadge score={student.finalPerformanceScore} />
                </div>

                <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-grow leading-relaxed italic">
                  "{student.bio}"
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-800/50">
                  {student.skills.slice(0, 3).map((skill) => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                  {student.skills.length > 3 && (
                    <span className="text-xs text-slate-500 font-medium self-center px-2 py-1 bg-slate-800 rounded-md">
                      +{student.skills.length - 3}
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
          title="No Match Found"
          message={`No fully-graded students match "${searchQuery}".`}
          actionButton={
            <button
              onClick={() => setSearchQuery("")}
              className="mt-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-bold transition"
            >
              Clear Search
            </button>
          }
        />
      )}
    </div>
  );
}
