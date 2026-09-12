import { calculateStreak } from './streakCalculator';
import { getToday, daysBetween, getLastNDays } from './dateUtils';

export const calculateDailyScore = (completions, habits, dateStr) => {
  if (!habits || habits.length === 0) return 0;
  
  const completedCount = habits.filter(h => completions[dateStr] && completions[dateStr][h.id]).length;
  return Math.round((completedCount / habits.length) * 100);
};

export const calculateWeeklyScore = (completions, habits, weekStartDate) => {
  let totalScore = 0;
  const start = new Date(weekStartDate);
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    const dateStr = [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
    
    totalScore += calculateDailyScore(completions, habits, dateStr);
  }
  
  return Math.round(totalScore / 7);
};

export const calculateOverallScore = (completions, habits) => {
    if (!habits || habits.length === 0) return 0;

    let totalPossible = 0;
    let totalCompleted = 0;
    const today = new Date();

    habits.forEach(habit => {
        const createdDate = new Date(habit.createdAt || today);
        let daysActive = Math.max(1, Math.ceil((today - createdDate) / (1000 * 60 * 60 * 24)));
        totalPossible += daysActive;
        
        Object.keys(completions).forEach(date => {
           if(new Date(date) >= createdDate && completions[date][habit.id]){
               totalCompleted++;
           }
        });
    });
    
    const completionRate = totalPossible > 0 ? (totalCompleted / totalPossible) * 100 : 0;

    let totalStreak = 0;
    habits.forEach(habit => {
        totalStreak += calculateStreak(completions, habit.id);
    });
    const avgStreak = habits.length > 0 ? totalStreak / habits.length : 0;
    const streakBonus = Math.min(100, avgStreak * 5);

    const last30Days = getLastNDays(30);
    let consecutiveDaysCount = 0;
    let maxConsecutive = 0;
    
    last30Days.forEach(date => {
       const anyCompleted = habits.some(h => completions[date] && completions[date][h.id]);
       if(anyCompleted){
           consecutiveDaysCount++;
           maxConsecutive = Math.max(maxConsecutive, consecutiveDaysCount);
       } else {
           consecutiveDaysCount = 0;
       }
    });
    const consecutiveScore = (maxConsecutive / 30) * 100;

    let categories = new Set(habits.map(h => h.category));
    const varietyScore = Math.min(100, categories.size * 25);

    const score = (0.4 * completionRate) + (0.3 * streakBonus) + (0.2 * consecutiveScore) + (0.1 * varietyScore);
    
    return Math.round(score);
};

export const getScoreLabel = (score) => {
  if (score < 40) return 'Needs Work';
  if (score < 60) return 'Building';
  if (score < 80) return 'Good';
  if (score < 90) return 'Excellent';
  return 'Outstanding';
};

export const getScoreColor = (score) => {
  if (score < 40) return 'text-red-500';
  if (score < 60) return 'text-orange-500';
  if (score < 80) return 'text-blue-500';
  if (score < 90) return 'text-green-500';
  return 'text-purple-500';
};

export const calculateLevel = (score, totalCompletions) => {
    const levels = [
        { name: 'Beginner', emoji: '🌱', minScore: 0, nextLevel: 40 },
        { name: 'Committed', emoji: '📘', minScore: 40, nextLevel: 60 },
        { name: 'Dedicated', emoji: '🔥', minScore: 60, nextLevel: 80 },
        { name: 'Master', emoji: '⚡', minScore: 80, nextLevel: 90 },
        { name: 'Legend', emoji: '👑', minScore: 90, nextLevel: 101 }
    ];
    
    let currentLevel = levels[0];
    for(let i=levels.length-1; i>=0; i--){
        if(score >= levels[i].minScore){
            currentLevel = levels[i];
            break;
        }
    }
    
    return currentLevel;
};
