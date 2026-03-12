import React from 'react';
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaFigma, FaHtml5, FaDocker, FaVuejs } from 'react-icons/fa';

export default function SkillBadge({ skill }) {
  const s = skill.toLowerCase();
  let Icon = FaDatabase; // Default icon
  let color = "text-slate-400"; // Default color

  if (s.includes('react')) { Icon = FaReact; color = "text-cyan-400"; }
  else if (s.includes('node')) { Icon = FaNodeJs; color = "text-green-500"; }
  else if (s.includes('python')) { Icon = FaPython; color = "text-yellow-400"; }
  else if (s.includes('vue')) { Icon = FaVuejs; color = "text-emerald-400"; }
  else if (s.includes('docker')) { Icon = FaDocker; color = "text-blue-500"; }
  else if (s.includes('html') || s.includes('css')) { Icon = FaHtml5; color = "text-orange-500"; }
  else if (s.includes('figma') || s.includes('design')) { Icon = FaFigma; color = "text-pink-400"; }

  return (
    <span className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 text-slate-200 font-medium shadow-sm w-fit">
      <Icon className={color} /> {skill}
    </span>
  );
}