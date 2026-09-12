import { getToday, daysBetween, formatDate } from './dateUtils';

export const calculateStreak = (completions, habitId, referenceDate = getToday()) => {
  let streak = 0;
  let currentDate = new Date(referenceDate);
  
  if (referenceDate === getToday()) {
      if (!completions[referenceDate] || !completions[referenceDate][habitId]) {
          currentDate.setDate(currentDate.getDate() - 1);
      }
  }

  while (true) {
    const dateStr = formatDate(currentDate);
    if (completions[dateStr] && completions[dateStr][habitId]) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
};

export const calculateLongestStreak = (completions, habitId) => {
  const dates = Object.keys(completions).sort();
  let longestStreak = 0;
  let currentStreak = 0;
  let lastDate = null;

  for (const date of dates) {
    if (completions[date][habitId]) {
      if (!lastDate) {
        currentStreak = 1;
      } else {
        const diff = daysBetween(lastDate, date);
        if (diff === 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      }
      lastDate = date;
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
    }
  }
  return longestStreak;
};

export const calculateAllStreaks = (completions, habitIds) => {
  const streaks = {};
  habitIds.forEach(id => {
    streaks[id] = {
      current: calculateStreak(completions, id),
      longest: calculateLongestStreak(completions, id)
    };
  });
  return streaks;
};

export const isStreakAtRisk = (completions, habitId) => {
  const today = getToday();
  const currentStreak = calculateStreak(completions, habitId);
  const completedToday = completions[today] && completions[today][habitId];
  
  return currentStreak > 0 && !completedToday;
};

export const getStreakEmoji = (streakLength) => {
  if (streakLength === 0) return '❄️';
  if (streakLength <= 2) return '🌱';
  if (streakLength <= 6) return '🔥';
  if (streakLength <= 13) return '💪';
  if (streakLength <= 29) return '⚡';
  return '👑';
};
