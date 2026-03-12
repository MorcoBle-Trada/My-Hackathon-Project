import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import { ArrowLeft, Lock, Search, ShieldCheck } from "lucide-react";

import Card from "../../components/shared/Card";
import SkillBadge from "../../components/shared/SkillBadge";
import PerformanceBadge from "../../components/shared/PerformanceBadge";
import EmptyState from "../../components/shared/EmptyState";

export default function PublicCohortList() {
  const { courseKey } = useParams();
  const navigate = useNavigate();
  const { db } = useDatabase();
  const [searchQuery, setSearchQuery] = useState("");

  const course = db.courses[courseKey];

  if (!course)
    return (
      <div className="p-10 text-white text-center">Program not found.</div>
    );

  const publicStudents = course.students.filter(
    (student) => student.finalPerformanceScore !== null,
  );

  const filteredStudents = publicStudents.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.skills.some((skill) => skill.toLowerCase().includes(query)) ||
      student.bio.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6 md:p-12 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <button
          onClick={() => navigate("/public")}
          className="text-slate-400 hover:text-white flex items-center gap-2 transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Programs
        </button>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
              Hire from{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                {course.name}
              </span>
            </h1>
            <p className="text-slate-400 flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Verified
              Graduate Pool
            </p>
          </div>

          {publicStudents.length > 0 && (
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search skills, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500 transition shadow-inner"
              />
            </div>
          )}
        </div>

        {publicStudents.length === 0 ? (
          <EmptyState
            icon={Lock}
            title="Awaiting Graduates"
            message={`The ${course.name} cohort is currently undergoing final assessments. Check back soon.`}
          />
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed mt-8">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-white mb-2">
              No candidates found
            </h3>
            <p className="text-slate-400">
              We couldn't find anyone matching "{searchQuery}".
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-6 text-indigo-400 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 mt-8">
            {filteredStudents.map((student) => (
              <Link
                to={`/public/student/${courseKey}/${student.id}`}
                key={student.id}
                className="block h-full outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl"
              >
                <Card className="hover:-translate-y-1 hover:border-indigo-500/30 transition-all duration-300 h-full flex flex-col group cursor-pointer bg-slate-900/60 hover:bg-slate-900 relative mt-10 p-6 pt-0 overflow-visible">
                  {/* 🌟 NEW FLEX HEADER: Avatar + Name/ID */}
                  <div className="flex items-center -mt-8 mb-5 relative z-20 gap-5">
                    {/* Avatar Group */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-6 opacity-70 group-hover:rotate-12 transition-transform duration-300 z-10 shadow-lg blur-[1px]"></div>
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-24 h-24 rounded-2xl border-4 border-slate-900 object-cover object-center relative z-20 group-hover:-translate-y-1 group-hover:scale-[1.02] transition-transform duration-300 bg-slate-800 shadow-2xl"
                      />
                    </div>

                    {/* Name and ID Group */}
                    <div className="flex flex-col pt-8">
                      <h3 className="text-xl font-bold text-white leading-tight group-hover:text-indigo-400 transition-colors">
                        {student.name}
                      </h3>
                      <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">
                        {student.academyId}
                      </p>
                    </div>
                  </div>

                  {/* 🌟 SCORE BOX: Now sitting exactly where the name used to be */}
                  <div className="mb-4 relative z-10">
                    <PerformanceBadge score={student.finalPerformanceScore} />
                  </div>

                  {/* BIO */}
                  <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-grow leading-relaxed italic relative z-10">
                    "{student.bio}"
                  </p>

                  {/* SKILLS */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-800/50 relative z-10">
                    {student.skills.slice(0, 3).map((skill) => (
                      <SkillBadge key={skill} skill={skill} />
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
