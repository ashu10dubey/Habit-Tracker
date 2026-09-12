import { useMemo, useCallback } from 'react';
import { calculateAllStreaks, isStreakAtRisk, getStreakEmoji } from '../utils/streakCalculator';

export default function useStreaks(completions, habits) {
  const streaks = useMemo(() => {
    const habitIds = habits.map(h => h.id);
    return calculateAllStreaks(completions, habitIds);
  }, [completions, habits]);

  const atRiskHabits = useMemo(() => {
    const atRisk = [];
    habits.forEach(habit => {
      if (isStreakAtRisk(completions, habit.id)) {
        atRisk.push(habit.id);
      }
    });
    return atRisk;
  }, [habits, completions]);

  const getStreak = useCallback((habitId) => {
    const habitStreak = streaks[habitId] || { current: 0, longest: 0 };
    return {
      ...habitStreak,
      emoji: getStreakEmoji(habitStreak.current)
    };
  }, [streaks]);

  const getTotalStreakDays = useCallback(() => {
    return Object.values(streaks).reduce((sum, s) => sum + (s.current || 0), 0);
  }, [streaks]);

  const getBestStreak = useCallback(() => {
    let best = null;
    let maxStreak = -1;
    
    habits.forEach(habit => {
      const currentStreak = streaks[habit.id]?.current || 0;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
        best = habit;
      }
    });
    
    return best;
  }, [habits, streaks]);

  return {
    streaks,
    atRiskHabits,
    getStreak,
    getTotalStreakDays,
    getBestStreak
  };
}
