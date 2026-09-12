import React from 'react';
import HeatMap from './HeatMap';
import QuoteCard from './QuoteCard';
import StreakCounter from './StreakCounter';

const Dashboard = ({
  habits = [],
  completions = {},
  streaks = {},
  getDailyProgress,
  overallScore = 0,
  scoreLabel = 'Needs Work',
  scoreColor = 'text-slate-400',
  level = { name: 'Beginner', emoji: '🌱' },
  atRiskHabits = [],
  quote,
  getStreak,
  totalCompletions = 0,
  getBestStreak,
}) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const bestStreakHabit = getBestStreak ? getBestStreak() : null;
  const bestStreakValue = bestStreakHabit ? (getStreak(bestStreakHabit.id)?.current || 0) : 0;

  // Resolve at-risk habit IDs to habit objects
  const atRiskHabitObjects = atRiskHabits
    .map((id) => habits.find((h) => h.id === id))
    .filter(Boolean);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 md:pb-0">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400 font-medium mb-1">Overall Score</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-bold ${scoreColor}`}>{Math.round(overallScore)}</span>
            <span className="text-sm font-semibold text-slate-400">{scoreLabel}</span>
          </div>
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400 font-medium mb-1">Current Level</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl">{level.emoji}</span>
            <span className="text-lg font-semibold text-emerald-400">{level.name}</span>
          </div>
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400 font-medium mb-1">Total Completions</p>
          <span className="text-3xl font-bold text-slate-100">{totalCompletions}</span>
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400 font-medium mb-1">Best Streak</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-100">{bestStreakValue}</span>
            <span className="text-sm font-semibold text-amber-500">🔥 days</span>
          </div>
        </div>
      </div>

      {/* Quote */}
      {quote && <QuoteCard quote={quote} />}

      {/* Streak Warnings */}
      {atRiskHabitObjects.length > 0 && (
        <div className="bg-rose-950/30 border border-rose-900 rounded-2xl p-5 space-y-3">
          <h3 className="text-lg font-semibold text-rose-400 flex items-center gap-2">
            ⚠️ Streaks at Risk
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            {atRiskHabitObjects.map((habit) => {
              const s = getStreak(habit.id);
              return (
                <div key={habit.id} className="bg-slate-900 rounded-xl p-4 border border-rose-900/50 flex justify-between items-center">
                  <span className="font-medium text-slate-200">
                    {habit.emoji} {habit.name}
                  </span>
                  <span className="text-amber-500 font-bold">{s.current} {s.emoji}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Heatmap */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-xl font-bold text-slate-100 mb-6">Activity Heatmap</h2>
        <HeatMap completions={completions} habits={habits} month={currentMonth} year={currentYear} />
      </div>

      {/* Habit Summaries */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-xl font-bold text-slate-100 mb-6">Habit Streaks</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit) => {
            const s = getStreak(habit.id);
            return (
              <div key={habit.id} className="bg-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{habit.emoji}</span>
                  <h3 className="font-semibold text-slate-200">{habit.name}</h3>
                </div>
                <StreakCounter current={s.current} longest={s.longest} emoji={s.emoji} />
              </div>
            );
          })}
          {habits.length === 0 && (
            <p className="text-slate-400 col-span-full text-center py-4">No habits added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
