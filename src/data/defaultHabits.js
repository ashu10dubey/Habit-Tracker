// Pre-built UUID-like random strings for initial deterministic IDs
export const defaultHabits = [
  {
    id: 'habit-default-1',
    name: 'Drink Water',
    emoji: '💧',
    category: 'health',
    description: 'Drink 8 glasses of water.',
    frequency: 'daily',
    timeOfDay: 'morning',
    implementationIntention: 'I will drink a glass of water right after I wake up in the kitchen.',
    temptationBundle: 'Listening to my favorite morning playlist while hydrating.',
    createdAt: new Date().toISOString(),
    active: true
  },
  {
    id: 'habit-default-2',
    name: 'Read 20 Pages',
    emoji: '📖',
    category: 'learning',
    description: 'Read a non-fiction or fiction book.',
    frequency: 'daily',
    timeOfDay: 'evening',
    implementationIntention: 'I will read 20 pages in bed before going to sleep.',
    temptationBundle: 'Enjoying a cup of chamomile tea while reading.',
    createdAt: new Date().toISOString(),
    active: true
  },
  {
    id: 'habit-default-3',
    name: 'Meditate 10 min',
    emoji: '🧘',
    category: 'mindfulness',
    description: 'Practice mindfulness meditation.',
    frequency: 'daily',
    timeOfDay: 'morning',
    implementationIntention: 'I will sit and meditate in the living room after making my bed.',
    temptationBundle: 'Enjoying the quiet morning atmosphere.',
    createdAt: new Date().toISOString(),
    active: true
  },
  {
    id: 'habit-default-4',
    name: 'Exercise 30 min',
    emoji: '🏃',
    category: 'health',
    description: 'Engage in moderate to vigorous physical activity.',
    frequency: 'daily',
    timeOfDay: 'morning',
    implementationIntention: 'I will exercise in the home gym right after finishing meditation.',
    temptationBundle: 'Watching an episode of my favorite show while on the treadmill.',
    createdAt: new Date().toISOString(),
    active: true
  },
  {
    id: 'habit-default-5',
    name: 'Journal',
    emoji: '📝',
    category: 'mindfulness',
    description: 'Write down thoughts and reflections.',
    frequency: 'daily',
    timeOfDay: 'evening',
    implementationIntention: 'I will write in my journal at my desk after dinner.',
    temptationBundle: 'Listening to lo-fi beats while journaling.',
    createdAt: new Date().toISOString(),
    active: true
  }
];
