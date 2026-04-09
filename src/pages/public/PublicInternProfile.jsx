import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useDatabase } from "../../context/DatabaseContext";
import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  UserX,
  Phone,
  Linkedin,
  Twitter,
  X,
  Briefcase,
  Trophy,
  Building2,
} from "lucide-react";
import Card from "../../components/shared/Card";
import SkillBadge from "../../components/shared/SkillBadge";
import PerformanceBadge from "../../components/shared/PerformanceBadge";
import EmptyState from "../../components/shared/EmptyState";
import { useDatabase } from "../../context/DatabaseContext";

const formatUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
};

export default function PublicInternProfile() {
  const { companyId, id } = useParams();
  const navigate = useNavigate();
  const { db } = useDatabase();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const company = db.companies?.[companyId];
  const intern = company?.interns?.find((i) => i.id === id);

  const globalRankInfo = useMemo(() => {
    if (!intern || !db.companies) return null;

    const track = intern.course || intern.role;
    let pool = [];

    Object.values(db.companies).forEach((c) => {
      const filtered = (c.interns || []).filter(
        (i) =>
          i.finalPerformanceScore !== null &&
          (i.course === track || i.role === track),
      );
      pool.push(...filtered);
    });

    pool.sort((a, b) => b.finalPerformanceScore - a.finalPerformanceScore);
    const rank = pool.findIndex((i) => i.id === intern.id) + 1;

    return { rank, total: pool.length, track };
  }, [intern, db.companies]);

  if (!intern || intern.finalPerformanceScore === null) {
    return (
      <div className="p-8 max-w-3xl mx-auto pt-20 min-h-screen">
        <EmptyState
          icon={UserX}
          title="Profile Unavailable"
          message="This candidate profile does not exist or is currently restricted pending final assessment."
          actionButton={
            <button
              onClick={() => navigate("/public")}
              className="bg-indigo-600 px-6 py-2.5 rounded-xl text-white font-bold hover:bg-indigo-500 transition"
            >
              Back to Leaderboards
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 min-h-screen">
      <button
        onClick={() =>
          navigate(
            `/public/leaderboard/${encodeURIComponent(globalRankInfo?.track)}`,
          )
        }
        className="text-slate-400 hover:text-white flex items-center gap-2 transition font-medium group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to {globalRankInfo?.track} Leaderboard
      </button>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-1 mt-16 lg:mt-24">
          <Card className="px-6 pb-8 pt-0 flex flex-col items-center text-center relative h-fit border-slate-800">
            <div className="absolute -top-12 w-48 h-48 bg-linear-to-br from-indigo-500 to-purple-600 rounded-4xl rotate-6 opacity-70 blur-[1px]"></div>

            <div
              className="relative group cursor-pointer -mt-16 mb-6 shadow-2xl z-10 w-48 h-48"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                <span className="text-white text-xs font-bold bg-black/80 px-4 py-2 rounded-full">
                  View Image
                </span>
              </div>
              <img
                src={intern.avatar}
                alt={intern.name}
                className="w-full h-full rounded-2xl border-4 border-slate-900 object-cover relative z-10 transition-transform duration-300 group-hover:-translate-y-2"
              />
            </div>

            <div className="flex flex-col items-center w-full z-10 gap-6">
              {/* Block 1: Name & Company */}
              <div className="flex flex-col items-center gap-2 w-full">
                <h1 className="text-3xl font-black text-white leading-tight">
                  {intern.name}
                </h1>
                <p className="text-slate-400 font-medium flex items-center gap-1.5 justify-center">
                  <Building2 className="w-4 h-4 text-indigo-400" />
                  Trained at{" "}
                  <span className="text-indigo-400 font-bold">
                    {company.companyName}
                  </span>
                </p>
              </div>

              {/* Block 2: Stats - 💡 UPDATED: Stacked vertically in one column */}
              <div className="flex flex-col items-center gap-3 w-full">
                {/* Globally Ranked Badge (Icon on top) */}
                <div className="flex flex-col items-center justify-center gap-2 px-4 py-4 bg-amber-500/10 border border-amber-500/20 rounded-xl w-full shadow-inner text-center">
                  <Trophy className="w-6 h-6 text-amber-500 shrink-0" />
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-wider leading-tight">
                    Ranked #{globalRankInfo?.rank} Globally
                  </span>
                </div>

                {/* Experience Badge (Horizontal) */}
                <div className="flex items-center justify-center gap-2 px-4 py-3.5 text-slate-300 bg-slate-800/50 rounded-xl border border-slate-700/50 w-full shadow-inner text-center">
                  <Briefcase className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="font-medium text-xs uppercase tracking-wider">
                    {intern.yearsOfExperience || "1"} Yr Experience
                  </span>
                </div>
              </div>

              {/* Block 3: Actions & ID */}
              <div className="w-full pt-6 border-t border-slate-800/50 flex flex-col gap-5 text-left">
                <a
                  href={`mailto:${intern.email}?subject=Interview Request: ${intern.name} via TalentOS`}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-200 text-slate-900 font-bold py-3.5 px-6 rounded-xl transition shadow-xl active:scale-[0.98]"
                >
                  <Mail className="w-5 h-5" /> Request Interview
                </a>

                <div className="flex flex-col gap-2">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider text-center">
                    Verified Intern ID
                  </p>
                  <div className="flex items-center justify-center gap-2 text-white font-mono bg-slate-950 px-3 py-2.5 rounded-lg border border-slate-800 shadow-inner overflow-hidden">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="truncate tracking-widest font-semibold">
                      {intern.academyId || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-5 lg:mt-4">
          <Card className="p-6 border-indigo-500/20 bg-indigo-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-indigo-400" /> Verified
                Assessment
              </h2>
              <p className="text-slate-400 mt-1 text-sm">
                Officially verified by {company.companyName} Administrators.
              </p>
            </div>
            <PerformanceBadge score={intern.finalPerformanceScore} />
          </Card>

          <div className="pl-1 lg:pr-4 pt-1 pb-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-3">
              Top{" "}
              {Math.round((globalRankInfo?.rank / globalRankInfo?.total) * 100)}
              % Candidate
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tight">
              {intern.course}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
                Specialist
              </span>
            </h1>
          </div>

          <Card className="p-6 bg-slate-900/60 border-slate-800/60 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800/50 pb-2">
              Professional Summary
            </h2>
            <p className="text-slate-300 leading-relaxed text-base mb-6">
              {intern.bio || "No professional summary provided yet."}
            </p>

            <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800/50 pb-2">
              Technical Proficiency
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {intern.skills?.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              )) || (
                <span className="text-slate-500 italic">No skills listed</span>
              )}
            </div>
          </Card>

          {/* Contact Hub */}
          <Card className="p-6 border-slate-800/60 bg-slate-900/40 relative overflow-hidden shadow-xl">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-base font-bold text-white mb-4">
                Connect with this Talent
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={`https://wa.me/${intern.phone?.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3 hover:border-emerald-500/50 hover:bg-slate-800/80 transition group shadow-md"
                >
                  <div className="bg-emerald-500/10 p-2 rounded-lg group-hover:bg-emerald-500/20 transition group-hover:scale-110">
                    <Phone className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      WhatsApp
                    </p>
                    <p className="text-white font-medium truncate text-xs">
                      {intern.phone || "Not provided"}
                    </p>
                  </div>
                </a>

                {intern.socialHandles?.linkedin && (
                  <a
                    href={formatUrl(intern.socialHandles.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3 hover:border-blue-500/50 hover:bg-slate-800/80 transition group shadow-md"
                  >
                    <div className="bg-blue-500/10 p-2 rounded-lg group-hover:bg-blue-500/20 transition group-hover:scale-110">
                      <Linkedin className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        LinkedIn
                      </p>
                      <p className="text-white font-medium truncate text-xs">
                        View Profile
                      </p>
                    </div>
                  </a>
                )}

                {intern.socialHandles?.twitter && (
                  <a
                    href={formatUrl(intern.socialHandles.twitter)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3 hover:border-sky-500/50 hover:bg-slate-800/80 transition group shadow-md"
                  >
                    <div className="bg-sky-500/10 p-2 rounded-lg group-hover:bg-sky-500/20 transition group-hover:scale-110">
                      <Twitter className="w-4 h-4 text-sky-400" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        Twitter / X
                      </p>
                      <p className="text-white font-medium truncate text-xs">
                        View Profile
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white bg-slate-800/50 hover:bg-slate-800 p-2 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={intern.avatar}
              alt={intern.name}
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
