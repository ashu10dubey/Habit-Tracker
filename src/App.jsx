import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DailyView from './components/DailyView';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Achievements from './components/Achievements';
import HabitSetupWizard from './components/HabitSetupWizard';
import HabitForm from './components/HabitForm';
import DataManager from './components/DataManager';
import useHabits from './hooks/useHabits';
import useStreaks from './hooks/useStreaks';
import useQuotes from './hooks/useQuotes';
import useAchievements from './hooks/useAchievements';
import useAnalytics from './hooks/useAnalytics';
import { getItem, setItem, STORAGE_KEYS } from './utils/storage';
import { achievements } from './data/achievements';

export default function App() {
  // First visit detection
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return getItem(STORAGE_KEYS.FIRST_VISIT) === null;
  });

  // Habit form modal state
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  // Core hooks
  const {
    habits, completions, addHabit, updateHabit, deleteHabit,
    toggleCompletion, isCompleted, getCompletionsForDate, getDailyProgress
  } = useHabits();

  const { streaks, atRiskHabits, getStreak, getTotalStreakDays, getBestStreak } = useStreaks(completions, habits);
  const { dailyQuote, contextQuote, triggerContextQuote, refreshQuote } = useQuotes();
  const { unlockedAchievements, newUnlock, checkForNewAchievements, dismissNewUnlock, isUnlocked, getProgress } = useAchievements();
  const { overallScore, scoreLabel, scoreColor, level, weeklyData, habitSuccessRates, bestDay, totalCompletions, perfectDays, currentPerfectStreak } = useAnalytics(completions, habits, streaks);

  // Check achievements whenever completions or habits change
  useEffect(() => {
    const maxStreak = habits.reduce((max, h) => {
      const s = getStreak(h.id);
      return Math.max(max, s.current, s.longest);
    }, 0);

    const categoriesCount = new Set(habits.map(h => h.category)).size;

    checkForNewAchievements({
      totalCompletions,
      maxStreak,
      perfectDays,
      maxConsecutivePerfectDays: currentPerfectStreak,
      activeHabitsCount: habits.length,
      comebacks: 0,
      consistencyScore: overallScore,
      categoriesCount,
      perfectWeekends: 0,
      earlyBirdCount: 0,
      nightOwlCount: 0,
    });
  }, [completions, habits]);

  // Wizard completion
  const handleWizardComplete = useCallback((selectedHabits) => {
    selectedHabits.forEach(habit => addHabit(habit));
    setIsFirstVisit(false);
    setItem(STORAGE_KEYS.FIRST_VISIT, false);
  }, [addHabit]);

  // Habit form handlers
  const handleAddHabit = useCallback(() => {
    setEditingHabit(null);
    setShowHabitForm(true);
  }, []);

  const handleEditHabit = useCallback((habit) => {
    setEditingHabit(habit);
    setShowHabitForm(true);
  }, []);

  const handleSaveHabit = useCallback((habitData) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, habitData);
    } else {
      addHabit(habitData);
    }
    setShowHabitForm(false);
    setEditingHabit(null);
  }, [editingHabit, addHabit, updateHabit]);

  const handleDeleteHabit = useCallback((habitId) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      deleteHabit(habitId);
    }
  }, [deleteHabit]);

  // Show wizard on first visit
  if (isFirstVisit) {
    return <HabitSetupWizard onComplete={handleWizardComplete} />;
  }

  return (
    <Layout>
      {/* Achievement unlock notification */}
      {newUnlock && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 px-6 py-4 rounded-xl shadow-2xl animate-bounce max-w-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">{newUnlock.emoji} Achievement Unlocked!</p>
              <p className="font-semibold">{newUnlock.name}</p>
              <p className="text-sm opacity-80">{newUnlock.description}</p>
            </div>
            <button onClick={dismissNewUnlock} className="ml-4 text-2xl font-bold hover:opacity-70">✕</button>
          </div>
        </div>
      )}

      {/* Habit Form Modal */}
      {showHabitForm && (
        <HabitForm
          habit={editingHabit}
          onSave={handleSaveHabit}
          onClose={() => { setShowHabitForm(false); setEditingHabit(null); }}
          categories={['health', 'productivity', 'learning', 'mindfulness']}
        />
      )}

      <Routes>
        <Route path="/" element={
          <DailyView
            habits={habits}
            completions={completions}
            streaks={streaks}
            onToggle={toggleCompletion}
            isCompleted={isCompleted}
            getDailyProgress={getDailyProgress}
            onAddHabit={handleAddHabit}
            onEditHabit={handleEditHabit}
            onDeleteHabit={handleDeleteHabit}
            quote={contextQuote || dailyQuote}
            triggerContextQuote={triggerContextQuote}
            getStreak={getStreak}
          />
        } />
        <Route path="/dashboard" element={
          <Dashboard
            habits={habits}
            completions={completions}
            streaks={streaks}
            getDailyProgress={getDailyProgress}
            overallScore={overallScore}
            scoreLabel={scoreLabel}
            scoreColor={scoreColor}
            level={level}
            atRiskHabits={atRiskHabits}
            quote={dailyQuote}
            getStreak={getStreak}
            totalCompletions={totalCompletions}
            getBestStreak={getBestStreak}
          />
        } />
        <Route path="/analytics" element={
          <Analytics
            habits={habits}
            weeklyData={weeklyData}
            habitSuccessRates={habitSuccessRates}
            bestDay={bestDay}
            totalCompletions={totalCompletions}
            perfectDays={perfectDays}
            overallScore={overallScore}
            scoreLabel={scoreLabel}
            level={level}
          />
        } />
        <Route path="/achievements" element={
          <Achievements
            achievements={achievements}
            unlockedAchievements={unlockedAchievements}
            getProgress={getProgress}
            isUnlocked={isUnlocked}
            level={level}
            totalCompletions={totalCompletions}
          />
        } />
        <Route path="/data" element={<DataManager />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
