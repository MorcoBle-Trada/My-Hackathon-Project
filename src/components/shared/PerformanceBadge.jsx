import React from "react";
import { Award, Star, Shield, Medal, Clock } from "lucide-react";

export default function PerformanceBadge({ score }) {
  // 1. Handling the "No Score" (Pending) state
  if (!score || score === null) {
    return (
      <div className="flex items-center gap-2 bg-slate-800 text-slate-400 border border-slate-700 px-4 py-2 rounded-full font-bold shadow-sm w-fit">
        <Clock className="w-4 h-4 animate-pulse" />
        Pending Score
      </div>
    );
  }

  const numScore = parseFloat(score);

  let Icon = Star;
  let colorClass = "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";

  if (numScore >= 90) {
    // ELITE PERFORMANCE (90-100)
    Icon = Award;
    colorClass =
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]";
  } else if (numScore >= 80) {
    // HIGH PERFORMANCE (80-89)
    Icon = Shield;
    colorClass = "bg-blue-500/10 text-blue-400 border-blue-500/20";
  } else if (numScore >= 70) {
    // STANDARD PERFORMANCE (70-79)
    Icon = Medal;
    colorClass = "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
  } else {
    // NEEDS IMPROVEMENT (< 70)
    Icon = Star;
    colorClass = "bg-rose-500/10 text-rose-400 border-rose-500/20";
  }

  return (
    <div
      className={`flex items-center gap-2 border px-4 py-2 rounded-full font-bold shadow-lg transition-all duration-300 w-fit ${colorClass}`}
    >
      <Icon className="w-4 h-4 fill-current" />
      <span className="tracking-wide">Score: {score}</span>
    </div>
  );
}
