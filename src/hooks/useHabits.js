import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage';
import { getToday } from '../utils/dateUtils';
import { defaultHabits } from '../data/defaultHabits';

export default function useHabits() {
  const [habits, setHabits] = useState(() => {
    const saved = getItem(STORAGE_KEYS.HABITS);
    return saved ? saved : defaultHabits;
  });

  const [completions, setCompletions] = useState(() => {
    const saved = getItem(STORAGE_KEYS.COMPLETIONS);
    return saved ? saved : {};
  });

  useEffect(() => {
    setItem(STORAGE_KEYS.HABITS, habits);
  }, [habits]);

  useEffect(() => {
    setItem(STORAGE_KEYS.COMPLETIONS, completions);
  }, [completions]);

  const addHabit = useCallback((habit) => {
    const newHabit = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      createdAt: getToday(),
      ...habit
    };
    setHabits(prev => [...prev, newHabit]);
  }, []);

  const updateHabit = useCallback((id, updates) => {
    setHabits(prev => prev.map(h => (h.id === id ? { ...h, ...updates } : h)));
  }, []);

  const deleteHabit = useCallback((id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  }, []);

  const toggleCompletion = useCallback((habitId, dateStr) => {
    setCompletions(prev => {
      const dayCompletions = prev[dateStr] || {};
      return {
        ...prev,
        [dateStr]: {
          ...dayCompletions,
          [habitId]: !dayCompletions[habitId]
        }
      };
    });
  }, []);

  const isCompleted = useCallback((habitId, dateStr) => {
    return !!(completions[dateStr] && completions[dateStr][habitId]);
  }, [completions]);

  const getCompletionsForDate = useCallback((dateStr) => {
    return completions[dateStr] || {};
  }, [completions]);

  const getDailyProgress = useCallback((dateStr) => {
    const dayCompletions = completions[dateStr] || {};
    // Only count active habits that exist today
    const activeHabits = habits; // simplified, could filter by active dates if needed
    if (activeHabits.length === 0) return { completed: 0, total: 0, percentage: 0 };
    
    let completed = 0;
    activeHabits.forEach(h => {
      if (dayCompletions[h.id]) {
        completed++;
      }
    });
    
    return {
      completed,
      total: activeHabits.length,
      percentage: Math.round((completed / activeHabits.length) * 100)
    };
  }, [habits, completions]);

  const reorderHabits = useCallback((newOrder) => {
    setHabits(newOrder);
  }, []);

  return {
    habits,
    completions,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    isCompleted,
    getCompletionsForDate,
    getDailyProgress,
    reorderHabits
  };
}
