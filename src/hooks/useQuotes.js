import { useState, useEffect, useCallback } from 'react';
import { getDailyQuote, getContextQuote } from '../data/quotes';
import { getToday } from '../utils/dateUtils';

export default function useQuotes() {
  const [dailyQuote, setDailyQuote] = useState(() => getDailyQuote(getToday()));
  const [contextQuote, setContextQuote] = useState(null);

  useEffect(() => {
    const today = getToday();
    setDailyQuote(getDailyQuote(today));
    
    // Set up a checker to refresh quote at midnight if app is kept open
    const checkDate = setInterval(() => {
      if (getToday() !== today) {
        setDailyQuote(getDailyQuote(getToday()));
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(checkDate);
  }, []);

  const triggerContextQuote = useCallback((trigger) => {
    setContextQuote(getContextQuote(trigger));
  }, []);

  const refreshQuote = useCallback(() => {
    setDailyQuote(getDailyQuote(getToday(), true)); // Pass true or similar flag to force random if supported by getDailyQuote
  }, []);

  return {
    dailyQuote,
    contextQuote,
    triggerContextQuote,
    refreshQuote
  };
}
