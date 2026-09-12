import React from 'react';

export default function StreakCounter({ current = 0, longest = 0, emoji = '🔥' }) {
  const isHot = current >= 3;

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-800 border border-slate-700">
      <div className={`flex items-center space-x-2 text-lg font-bold text-amber-500 ${isHot ? 'animate-pulse drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : ''}`}>
        <span>{emoji}</span>
        <span>{current} day streak</span>
      </div>
      <div className="text-xs text-slate-400 mt-1">
        Best: {longest} days
      </div>
    </div>
  );
}
