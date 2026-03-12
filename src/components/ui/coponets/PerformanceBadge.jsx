import { getPerformanceBadge } from '../context/StudentContext';

export default function PerformanceBadge({ rating }) {
  const badge = getPerformanceBadge(rating);
  if (!badge) return null;

  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badge.color} inline-flex items-center`}>
      {badge.label}
    </span>
  );
}