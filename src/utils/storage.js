const PREFIX = 'habit_tracker_';

export const STORAGE_KEYS = {
  HABITS: PREFIX + 'habits',
  COMPLETIONS: PREFIX + 'completions',
  ACHIEVEMENTS_UNLOCKED: PREFIX + 'achievements_unlocked',
  SETTINGS: PREFIX + 'settings',
  FIRST_VISIT: PREFIX + 'first_visit'
};

const ALLOWED_KEYS = new Set(Object.values(STORAGE_KEYS));

export const getItem = (key) => {
  if (!ALLOWED_KEYS.has(key)) return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage`, error);
    return null;
  }
};

export const setItem = (key, value) => {
  if (!ALLOWED_KEYS.has(key)) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item ${key} to localStorage`, error);
  }
};

export const removeItem = (key) => {
  if (!ALLOWED_KEYS.has(key)) return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage`, error);
  }
};

export const exportData = () => {
  const data = {};
  Object.values(STORAGE_KEYS).forEach(key => {
    data[key] = getItem(key);
  });
  return data;
};

export const importData = (jsonData) => {
  try {
    if (!jsonData || typeof jsonData !== 'object' || Array.isArray(jsonData)) {
      return false;
    }
    
    // Strict allowlist validation against prototype pollution & rogue keys
    const validKeys = Object.values(STORAGE_KEYS);
    const keysToImport = Object.keys(jsonData).filter(k => 
      validKeys.includes(k) && k !== '__proto__' && k !== 'constructor' && k !== 'prototype'
    );

    if (keysToImport.length === 0) {
      return false;
    }

    keysToImport.forEach(key => {
      setItem(key, jsonData[key]);
    });
    return true;
  } catch (error) {
    console.error('Error importing data', error);
    return false;
  }
};

export const clearAll = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeItem(key);
  });
};
