import React from 'react';
import { achievements as achievementDefs } from '../data/achievements';

const levelColors = {
  bronze: 'bg-amber-900/30 border-amber-700 text-amber-400 shadow-[0_0_10px_rgba(217,119,6,0.3)]',
  silver: 'bg-slate-300/10 border-slate-400 text-slate-300 shadow-[0_0_10px_rgba(148,163,184,0.3)]',
  gold: 'bg-yellow-900/30 border-yellow-600 text-yellow-400 shadow-[0_0_10px_rgba(202,138,4,0.3)]',
  platinum: 'bg-violet-900/30 border-violet-500 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.5)]',
};

const Achievements = ({
  unlockedAchievements = [],
  getProgress,
  isUnlocked,
  level = { name: 'Beginner', emoji: '🌱' },
  totalCompletions = 0,
}) => {
  const allAchievements = achievementDefs || [];
  const unlockedCount = allAchievements.filter((a) => isUnlocked(a.id)).length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-slate-900 p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center gap-6 justify-between text-center md:text-left">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 flex items-center justify-center bg-slate-800 rounded-full text-5xl border-4 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            {level.emoji}
          </div>
          <div>
            <p className="text-slate-400 font-medium mb-1">Current Level</p>
            <h1 className="text-3xl font-bold text-slate-100">{level.name}</h1>
            <p className="text-amber-400 text-sm mt-1">Total completions: {totalCompletions}</p>
          </div>
        </div>
        <div className="bg-slate-800 py-3 px-6 rounded-xl border border-slate-700">
          <p className="text-sm text-slate-400 font-medium mb-1">Achievements Unlocked</p>
          <div className="text-2xl font-bold text-slate-100">
            <span className="text-emerald-400">{unlockedCount}</span> / {allAchievements.length}
          </div>
        </div>
      </header>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allAchievements.map((achievement) => {
          const unlocked = isUnlocked(achievement.id);
          const progress = getProgress(achievement.id) || 0;
          const badgeColor = unlocked
            ? levelColors[achievement.level] || levelColors.bronze
            : 'bg-slate-900/50 border-slate-800';

          return (
            <div
              key={achievement.id}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 ${badgeColor} ${!unlocked ? 'grayscale opacity-70' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{achievement.emoji}</div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg mb-1 ${unlocked ? 'text-slate-100' : 'text-slate-400'}`}>
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">{achievement.description}</p>

                  {!unlocked && (
                    <div className="w-full bg-slate-800 rounded-full h-2 mt-2 border border-slate-700 overflow-hidden">
                      <div
                        className="bg-slate-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                  {unlocked && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/50 text-emerald-400 border border-emerald-800">
                      ✓ Unlocked
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
