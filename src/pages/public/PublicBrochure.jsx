import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import { ArrowRight, Trophy, Users } from "lucide-react";
import Card from "../../components/shared/Card";

export default function PublicBrochure() {
  const navigate = useNavigate();
  const { db } = useDatabase();

  // 💡 NEW: Extract a global pool of unique courses and rank interns within them
  const courseCategories = useMemo(() => {
    if (!db.companies) return [];

    const courseMap = {};

    // 1. Loop through all companies to find verified interns
    Object.values(db.companies).forEach((company) => {
      const verifiedInterns =
        company.interns?.filter((i) => i.finalPerformanceScore !== null) || [];

      // 2. Group them by their course/track
      verifiedInterns.forEach((intern) => {
        const courseName = intern.course || intern.role || "Uncategorized";

        if (!courseMap[courseName]) {
          courseMap[courseName] = {
            courseName,
            interns: [],
          };
        }

        // Attach the company name so we know where they trained!
        courseMap[courseName].interns.push({
          ...intern,
          companyName: company.companyName,
        });
      });
    });

    // 3. Sort interns within each category by score (Descending) and sort categories by size
    return Object.values(courseMap)
      .map((category) => {
        category.interns.sort(
          (a, b) => b.finalPerformanceScore - a.finalPerformanceScore,
        );
        return category;
      })
      .sort((a, b) => b.interns.length - a.interns.length); // Largest courses first
  }, [db.companies]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-32">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium mb-8">
          Global Talent Leaderboards
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight max-w-4xl">
          Hire Verified{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Tech Professionals
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Access our exclusive pool of fully assessed, job-ready interns from
          top companies. Every candidate is globally ranked by their verified
          performance score.
        </p>
      </div>

      {/* Course Categories Grid */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">
            Browse Global Leaderboards
          </h2>
        </div>

        {courseCategories.length === 0 ? (
          <div className="text-center py-12 border border-slate-800 rounded-2xl bg-slate-900/50">
            <p className="text-slate-400">
              No verified candidates are currently available on the
              leaderboards.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseCategories.map((category) => {
              const topScore = category.interns[0]?.finalPerformanceScore || 0;

              return (
                <Card
                  key={category.courseName}
                  // Navigate to a new course-specific leaderboard page
                  onClick={() =>
                    navigate(
                      `/public/leaderboard/${encodeURIComponent(category.courseName)}`,
                    )
                  }
                  className="p-8 border-t-4 border-t-indigo-500 cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(79,70,229,0.15)] transition-all group"
                >
                  <Users className="w-10 h-10 text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />

                  <h3 className="text-xl font-bold text-white mb-2">
                    {category.courseName}
                  </h3>

                  <div className="space-y-1 mb-6">
                    <p className="text-slate-400 text-sm">
                      <span className="font-bold text-white">
                        {category.interns.length}
                      </span>{" "}
                      Verified Candidates
                    </p>
                    <p className="text-emerald-400 text-sm font-medium">
                      Current High Score: {topScore}%
                    </p>
                  </div>

                  <div className="flex items-center text-sm font-bold text-indigo-400 group-hover:text-indigo-300 transition">
                    View Leaderboard <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
