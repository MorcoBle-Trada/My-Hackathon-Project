import React, { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import { ArrowLeft, Lock, Search, Trophy, Building2 } from "lucide-react";

import Card from "../../components/shared/Card";
import SkillBadge from "../../components/shared/SkillBadge";
import PerformanceBadge from "../../components/shared/PerformanceBadge";
import EmptyState from "../../components/shared/EmptyState";

export default function GlobalCourseLeaderboard() {
  // We now pull the courseName from the URL instead of companyId
  const { courseName } = useParams();
  const navigate = useNavigate();
  const { db } = useDatabase();
  const [searchQuery, setSearchQuery] = useState("");

  const decodedCourseName = decodeURIComponent(courseName);

  // 💡 STRATEGY: Global Pooling & Ranking
  const rankedInterns = useMemo(() => {
    if (!db.companies) return [];

    let globalPool = [];

    // 1. Iterate through every company in the database
    Object.entries(db.companies).forEach(([companyId, company]) => {
      // 2. Get only the interns who have been graded
      const gradedInterns = (company.interns || []).filter(
        (intern) => intern.finalPerformanceScore !== null,
      );

      // 3. Filter for interns belonging to THIS specific course track
      gradedInterns.forEach((intern) => {
        const internTrack = intern.course || intern.role || "Uncategorized";

        if (internTrack.toLowerCase() === decodedCourseName.toLowerCase()) {
          globalPool.push({
            ...intern,
            sourceCompanyId: companyId, // Keep this for the profile link
            sourceCompanyName: company.companyName,
          });
        }
      });
    });

    // 4. Sort the entire global pool by score (Highest at the top)
    return globalPool.sort(
      (a, b) => b.finalPerformanceScore - a.finalPerformanceScore,
    );
  }, [db.companies, decodedCourseName]);

  // Handle searching within the ranked list
  const filteredInterns = rankedInterns.filter((intern) => {
    const query = searchQuery.toLowerCase();
    return (
      intern.name.toLowerCase().includes(query) ||
      intern.skills?.some((skill) => skill.toLowerCase().includes(query)) ||
      intern.sourceCompanyName.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6 md:p-12 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <button
          onClick={() => navigate("/public")}
          className="text-slate-400 hover:text-white flex items-center gap-2 transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tracks
        </button>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
              Top Talent:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                {decodedCourseName}
              </span>
            </h1>
            <p className="text-slate-400 flex items-center justify-center md:justify-start gap-2">
              <Trophy className="w-4 h-4 text-amber-500" /> Ranked Global
              Leaderboard
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search names, skills, or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {rankedInterns.length === 0 ? (
          <EmptyState
            icon={Lock}
            title="No Candidates Found"
            message={`There are currently no verified candidates in the ${decodedCourseName} track.`}
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 mt-10">
            {filteredInterns.map((intern, index) => (
              <Link
                to={`/public/intern/${intern.sourceCompanyId}/${intern.id}`}
                key={intern.id}
                className="group relative"
              >
                {/* RANK BADGE */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-indigo-600 text-white font-black text-xl rounded-2xl flex items-center justify-center z-30 shadow-xl border-4 border-slate-950 rotate-[-10deg] group-hover:rotate-0 transition-transform">
                  #{index + 1}
                </div>

                <Card className="h-full flex flex-col pt-0 bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-indigo-500/50 transition-all duration-300">
                  {/* AVATAR & INFO */}
                  <div className="flex items-center gap-4 -mt-6 mb-4 px-2">
                    <img
                      src={intern.avatar}
                      alt={intern.name}
                      className="w-20 h-20 rounded-2xl border-4 border-slate-900 object-cover shadow-2xl relative z-20"
                    />
                    <div className="pt-6">
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {intern.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 uppercase tracking-tighter">
                        <Building2 className="w-3 h-3" />{" "}
                        {intern.sourceCompanyName}
                      </p>
                    </div>
                  </div>

                  <div className="p-2 space-y-4 flex-grow">
                    <PerformanceBadge score={intern.finalPerformanceScore} />

                    <p className="text-sm text-slate-400 italic line-clamp-2">
                      "{intern.bio || "Candidate has not provided a bio yet."}"
                    </p>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/50">
                      {intern.skills?.slice(0, 3).map((skill) => (
                        <SkillBadge key={skill} skill={skill} />
                      ))}
                    </div>
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
