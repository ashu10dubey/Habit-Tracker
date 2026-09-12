export const achievements = [
  { id: 'first_check', name: 'First Check', emoji: '✅', description: 'Complete your first habit', criteria: { type: 'total_completions', value: 1 }, level: 'bronze' },
  { id: 'three_day_streak', name: 'Momentum Builder', emoji: '🔥', description: 'Achieve a 3-day streak on any habit', criteria: { type: 'streak', value: 3 }, level: 'bronze' },
  { id: 'seven_day_streak', name: 'Week Warrior', emoji: '📅', description: 'Achieve a 7-day streak on any habit', criteria: { type: 'streak', value: 7 }, level: 'silver' },
  { id: 'two_week_streak', name: 'Habit Forming', emoji: '🔄', description: 'Achieve a 14-day streak on any habit', criteria: { type: 'streak', value: 14 }, level: 'silver' },
  { id: 'month_streak', name: 'Unstoppable', emoji: '⭐', description: 'Achieve a 30-day streak on any habit', criteria: { type: 'streak', value: 30 }, level: 'gold' },
  { id: 'perfect_day', name: 'Perfect Day', emoji: '💯', description: 'Complete all active habits in a single day', criteria: { type: 'perfect_days', value: 1 }, level: 'bronze' },
  { id: 'perfect_week', name: 'Flawless Week', emoji: '🏆', description: 'Achieve 7 consecutive perfect days', criteria: { type: 'consecutive_perfect_days', value: 7 }, level: 'gold' },
  { id: 'early_bird', name: 'Early Bird', emoji: '🌅', description: 'Complete all morning habits before noon', criteria: { type: 'morning_completion', value: 1 }, level: 'bronze' },
  { id: 'night_owl', name: 'Night Owl', emoji: '🦉', description: 'Complete all evening habits', criteria: { type: 'evening_completion', value: 1 }, level: 'bronze' },
  { id: 'five_habits', name: 'Juggler', emoji: '🤹', description: 'Track 5 habits simultaneously', criteria: { type: 'active_habits', value: 5 }, level: 'bronze' },
  { id: 'ten_habits', name: 'Master Juggler', emoji: '🎪', description: 'Track 10 habits simultaneously', criteria: { type: 'active_habits', value: 10 }, level: 'silver' },
  { id: 'centurion', name: 'Centurion', emoji: '🛡️', description: '100 total habit completions', criteria: { type: 'total_completions', value: 100 }, level: 'silver' },
  { id: 'five_hundred', name: 'Marathoner', emoji: '🏃', description: '500 total habit completions', criteria: { type: 'total_completions', value: 500 }, level: 'gold' },
  { id: 'thousand', name: 'Grandmaster', emoji: '👑', description: '1000 total habit completions', criteria: { type: 'total_completions', value: 1000 }, level: 'platinum' },
  { id: 'comeback', name: 'The Comeback', emoji: 'phoenix', description: 'Resume a habit after a streak break', criteria: { type: 'comeback', value: 1 }, level: 'silver' },
  { id: 'consistency_king', name: 'Consistency King', emoji: '👑', description: 'Maintain a consistency score above 90%', criteria: { type: 'consistency_score', value: 90 }, level: 'gold' },
  { id: 'diversified', name: 'Renaissance Person', emoji: '🎨', description: 'Track habits in 3+ different categories', criteria: { type: 'categories_count', value: 3 }, level: 'silver' },
  { id: 'weekend_warrior', name: 'Weekend Warrior', emoji: '⚔️', description: 'Achieve a perfect Saturday and Sunday', criteria: { type: 'perfect_weekend', value: 1 }, level: 'silver' },
  { id: 'full_month', name: 'Month Champion', emoji: '🏅', description: 'Complete an entire 30-day challenge perfectly', criteria: { type: 'consecutive_perfect_days', value: 30 }, level: 'platinum' },
  { id: 'legend', name: 'Legend', emoji: '🐉', description: 'Reach the ultimate Legend status', criteria: { type: 'total_completions', value: 5000 }, level: 'platinum' }
];

// Helper to evaluate if a user has met criteria. 
// stats object must provide the necessary metrics.
export const checkAchievement = (achievementId, stats) => {
  const achievement = achievements.find(a => a.id === achievementId);
  if (!achievement) return false;

  const { type, value } = achievement.criteria;
  
  switch (type) {
    case 'total_completions':
      return (stats.totalCompletions || 0) >= value;
    case 'streak':
      return (stats.maxStreak || 0) >= value;
    case 'perfect_days':
      return (stats.perfectDays || 0) >= value;
    case 'consecutive_perfect_days':
      return (stats.maxConsecutivePerfectDays || 0) >= value;
    case 'active_habits':
      return (stats.activeHabitsCount || 0) >= value;
    case 'morning_completion':
      return (stats.earlyBirdCount || 0) >= value;
    case 'evening_completion':
      return (stats.nightOwlCount || 0) >= value;
    case 'comeback':
      return (stats.comebacks || 0) >= value;
    case 'consistency_score':
      return (stats.consistencyScore || 0) >= value;
    case 'categories_count':
      return (stats.categoriesCount || 0) >= value;
    case 'perfect_weekend':
      return (stats.perfectWeekends || 0) >= value;
    default:
      return false;
  }
};
