
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import { Sparkles, ArrowRight, FolderOpen, ShieldCheck } from "lucide-react";
import Card from "../../components/shared/Card";

export default function PublicBrochure() {
  const navigate = useNavigate();
  const { db } = useDatabase();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-32">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium mb-8">
          <Sparkles className="w-4 h-4" /> Exclusive Talent Pool
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight max-w-4xl">
          Hire Verified{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Tech Professionals
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Access our exclusive pool of fully assessed, job-ready graduates.
          Every candidate comes with a verified performance score and a complete
          technical portfolio.
        </p>
      </div>

      {/* Cohort Selection Grid */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <FolderOpen className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">Browse by Program</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(db.courses).map(([courseKey, course]) => {
            // Count ONLY graduated students for public display
            const graduatedCount = course.students.filter(
              (s) => s.finalPerformanceScore !== null,
            ).length;

            return (
              <Card
                key={courseKey}
                onClick={() => navigate(`/public/cohort/${courseKey}`)}
                className="p-8 border-t-4 border-t-indigo-500 cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(79,70,229,0.15)] transition-all group"
              >
                <ShieldCheck className="w-10 h-10 text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {course.name}
                </h3>
                <p className="text-slate-400 mb-6">
                  {graduatedCount} Verified Graduates available for hire.
                </p>

                <div className="flex items-center text-sm font-bold text-indigo-400 group-hover:text-indigo-300 transition">
                  View Candidates <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
