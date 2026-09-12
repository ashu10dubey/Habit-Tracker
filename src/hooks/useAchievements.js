import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage';
import { achievements, checkAchievement } from '../data/achievements';

export default function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    const saved = getItem(STORAGE_KEYS.ACHIEVEMENTS_UNLOCKED);
    return saved ? saved : [];
  });

  const [newUnlock, setNewUnlock] = useState(null);

  useEffect(() => {
    setItem(STORAGE_KEYS.ACHIEVEMENTS_UNLOCKED, unlockedAchievements);
  }, [unlockedAchievements]);

  const checkForNewAchievements = useCallback((stats) => {
    const newlyUnlocked = [];
    
    achievements.forEach(achievement => {
      // If not already unlocked
      if (!unlockedAchievements.some(u => u.achievementId === achievement.id)) {
        const isNowUnlocked = checkAchievement(achievement.id, stats);
        if (isNowUnlocked) {
          const unlockData = {
            achievementId: achievement.id,
            unlockedAt: new Date().toISOString()
          };
          newlyUnlocked.push(unlockData);
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newlyUnlocked]);
      // Set the first new unlock for the notification
      const newAchievement = achievements.find(a => a.id === newlyUnlocked[0].achievementId);
      setNewUnlock(newAchievement);
    }
  }, [unlockedAchievements]);

  const dismissNewUnlock = useCallback(() => {
    setNewUnlock(null);
  }, []);

  const isUnlocked = useCallback((achievementId) => {
    return unlockedAchievements.some(u => u.achievementId === achievementId);
  }, [unlockedAchievements]);

  const getProgress = useCallback((achievementId) => {
    if (isUnlocked(achievementId)) return 100;
    // Basic progress logic, could be expanded if checkAchievement returns partial progress
    return 0; 
  }, [isUnlocked]);

  return {
    unlockedAchievements,
    newUnlock,
    checkForNewAchievements,
    dismissNewUnlock,
    isUnlocked,
    getProgress
  };
}
