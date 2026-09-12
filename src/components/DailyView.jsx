import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import ProgressRing from './ProgressRing';
import QuoteCard from './QuoteCard';
import HabitCard from './HabitCard';
import { getToday, formatFullDate } from '../utils/dateUtils';

const DailyView = ({
  habits = [],
  completions = {},
  streaks = {},
  onToggle,
  isCompleted,
  getDailyProgress,
  onAddHabit,
  onEditHabit,
  onDeleteHabit,
  quote,
  triggerContextQuote,
  getStreak,
}) => {
  const today = getToday();
  const displayDate = formatFullDate(today);
  const progress = getDailyProgress(today);
  const prevCompletedRef = useRef(progress.completed);

  useEffect(() => {
    const prev = prevCompletedRef.current;
    const curr = progress.completed;

    if (curr > prev) {
      // First check of the day
      if (prev === 0 && curr === 1 && habits.length > 1 && triggerContextQuote) {
        triggerContextQuote('first_check');
      }
      // All habits completed
      if (curr === progress.total && progress.total > 0) {
        if (triggerContextQuote) triggerContextQuote('perfect_day');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#f59e0b', '#6366f1', '#8b5cf6'],
        });
      }
    }
    prevCompletedRef.current = curr;
  }, [progress.completed, progress.total, habits.length, triggerContextQuote]);

  const timeGroups = {
    morning: { label: 'Morning 🌅', habits: [] },
    afternoon: { label: 'Afternoon ☀️', habits: [] },
    evening: { label: 'Evening 🌙', habits: [] },
    anytime: { label: 'Anytime 🕒', habits: [] },
  };

  habits.forEach((habit) => {
    const time = (habit.timeOfDay || 'anytime').toLowerCase();
    if (timeGroups[time]) timeGroups[time].habits.push(habit);
    else timeGroups.anytime.habits.push(habit);
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 md:pb-0">
      {/* Header */}
      <header className="flex items-center justify-between bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Today</h1>
          <p className="text-slate-400">{displayDate}</p>
        </div>
        <ProgressRing percentage={progress.percentage} size={80} strokeWidth={8} />
      </header>

      {/* Quote */}
      {quote && <QuoteCard quote={quote} />}

      {/* Empty State */}
      {habits.length === 0 ? (
        <div className="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800">
          <h3 className="text-xl font-medium text-slate-300 mb-2">No habits yet</h3>
          <p className="text-slate-400 mb-6">Start building better habits today.</p>
          <button
            onClick={onAddHabit}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-colors"
          >
            Add Your First Habit
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(timeGroups).map(([key, group]) => {
            if (group.habits.length === 0) return null;
            return (
              <section key={key} className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-300">{group.label}</h2>
                <div className="space-y-3">
                  {group.habits.map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      isCompleted={isCompleted(habit.id, today)}
                      streak={getStreak(habit.id)}
                      onToggle={() => onToggle(habit.id, today)}
                      onEdit={() => onEditHabit(habit)}
                      onDelete={() => onDeleteHabit(habit.id)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Add Habit Button */}
      {habits.length > 0 && (
        <button
          onClick={onAddHabit}
          className="w-full py-4 border-2 border-dashed border-slate-700 text-slate-400 hover:border-emerald-500 hover:text-emerald-500 rounded-2xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span>
          Add Habit
        </button>
      )}
    </div>
  );
};

export default DailyView;
