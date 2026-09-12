import { useMemo } from 'react';
import { calculateOverallScore, getScoreLabel, getScoreColor, calculateLevel, calculateWeeklyScore } from '../utils/consistencyScore';
import { getToday } from '../utils/dateUtils';

export default function useAnalytics(completions, habits, streaks) {
  const { overallScore, scoreLabel, scoreColor, level } = useMemo(() => {
    const score = calculateOverallScore(completions, habits);
    return {
      overallScore: score,
      scoreLabel: getScoreLabel(score),
      scoreColor: getScoreColor(score),
      level: calculateLevel(score)
    };
  }, [completions, habits]);

  const weeklyData = useMemo(() => {
    const data = [];
    const today = new Date();
    for (let i = 4; i >= 0; i--) {
      const weekStart = new Date(today);
      weekStart.setDate(weekStart.getDate() - (i * 7) - today.getDay() + 1);
      const year = weekStart.getFullYear();
      const month = String(weekStart.getMonth() + 1).padStart(2, '0');
      const day = String(weekStart.getDate()).padStart(2, '0');
      const weekStartStr = `${year}-${month}-${day}`;
      data.push({
        week: `Week ${5 - i}`,
        score: calculateWeeklyScore(completions, habits, weekStartStr)
      });
    }
    return data;
  }, [completions, habits]);

  const habitSuccessRates = useMemo(() => {
    const rates = {};
    const totalDays = Object.keys(completions).length || 1;
    
    habits.forEach(habit => {
      let completedDays = 0;
      Object.keys(completions).forEach(date => {
        if (completions[date][habit.id]) completedDays++;
      });
      rates[habit.id] = Math.round((completedDays / totalDays) * 100);
    });
    
    return rates;
  }, [completions, habits]);

  const bestDay = useMemo(() => {
    // simplified best day logic
    const dayCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const dayTotals = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    
    Object.keys(completions).forEach(date => {
      const d = new Date(date).getDay();
      dayTotals[d]++;
      
      const dayComps = completions[date];
      habits.forEach(h => {
        if (dayComps[h.id]) {
          dayCounts[d]++;
        }
      });
    });
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let best = 0;
    let maxAvg = -1;
    
    for (let i = 0; i < 7; i++) {
      if (dayTotals[i] > 0) {
        const avg = dayCounts[i] / dayTotals[i];
        if (avg > maxAvg) {
          maxAvg = avg;
          best = i;
        }
      }
    }
    
    return days[best];
  }, [completions, habits]);

  const totalCompletions = useMemo(() => {
    let count = 0;
    Object.values(completions).forEach(dayComps => {
      count += Object.values(dayComps).filter(Boolean).length;
    });
    return count;
  }, [completions]);

  const perfectDays = useMemo(() => {
    if (habits.length === 0) return 0;
    
    let count = 0;
    Object.values(completions).forEach(dayComps => {
      let completedHabits = 0;
      habits.forEach(h => {
        if (dayComps[h.id]) completedHabits++;
      });
      if (completedHabits === habits.length) {
        count++;
      }
    });
    return count;
  }, [completions, habits]);

  const currentPerfectStreak = useMemo(() => {
    let streak = 0;
    // this would require sorting dates descending and walking backwards
    // For now returning a placeholder logic or 0
    return streak;
  }, [completions, habits]);

  return {
    overallScore,
    scoreLabel,
    scoreColor,
    level,
    weeklyData,
    habitSuccessRates,
    bestDay,
    totalCompletions,
    perfectDays,
    currentPerfectStreak
  };
}
