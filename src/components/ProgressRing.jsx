import React, { useEffect, useState } from 'react';

export default function ProgressRing({
  percentage = 0,
  size = 120,
  strokeWidth = 8,
  color = '#10b981'
}) {
  const [animatedPct, setAnimatedPct] = useState(0);
  
  useEffect(() => {
    setAnimatedPct(percentage);
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedPct / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          className="text-slate-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-slate-100">
        <span className="text-xl font-bold">{Math.round(animatedPct)}%</span>
      </div>
    </div>
  );
}
