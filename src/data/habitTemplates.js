export const habitTemplates = {
  health: [
    {
      id: 'h1',
      name: 'Drink Water',
      emoji: '💧',
      category: 'health',
      description: 'Drink 8 glasses of water daily.',
      defaultTime: 'morning',
      scienceBacking: 'Proper hydration improves sleep quality, cognition, and mood.',
      suggestedCue: 'After waking up or before meals',
      suggestedReward: 'A refreshing feeling and clear skin'
    },
    {
      id: 'h2',
      name: 'Exercise 30 Min',
      emoji: '🏋️',
      category: 'health',
      description: 'Engage in moderate exercise for at least 30 minutes.',
      defaultTime: 'morning',
      scienceBacking: 'Regular exercise reduces risk of chronic disease and boosts mental health.',
      suggestedCue: 'Right after brushing teeth',
      suggestedReward: 'Endorphin rush and a healthy breakfast'
    },
    {
      id: 'h3',
      name: '10,000 Steps',
      emoji: '🚶',
      category: 'health',
      description: 'Walk 10,000 steps throughout the day.',
      defaultTime: 'afternoon',
      scienceBacking: 'Walking helps manage weight, reduces stress, and improves cardiovascular fitness.',
      suggestedCue: 'During lunch break or commuting',
      suggestedReward: 'Listen to a favorite podcast while walking'
    },
    {
      id: 'h4',
      name: 'Healthy Eating',
      emoji: '🥗',
      category: 'health',
      description: 'Eat at least one serving of vegetables with every meal.',
      defaultTime: 'afternoon',
      scienceBacking: 'A diet rich in vegetables reduces inflammation and provides essential nutrients.',
      suggestedCue: 'When preparing your plate',
      suggestedReward: 'Delicious and colorful meals'
    },
    {
      id: 'h5',
      name: '8 Hours Sleep',
      emoji: '🛌',
      category: 'health',
      description: 'Get at least 8 hours of sleep per night.',
      defaultTime: 'evening',
      scienceBacking: 'Sleep is critical for memory consolidation, immune function, and emotional regulation.',
      suggestedCue: 'Setting an alarm for bedtime',
      suggestedReward: 'Waking up energized'
    }
  ],
  productivity: [
    {
      id: 'p1',
      name: 'Deep Work',
      emoji: '🧠',
      category: 'productivity',
      description: 'Spend 90 minutes on a high-impact task without distractions.',
      defaultTime: 'morning',
      scienceBacking: 'Deep work improves cognitive abilities and significantly increases output quality.',
      suggestedCue: 'Turning on \'Do Not Disturb\' on phone',
      suggestedReward: 'A cup of premium coffee'
    },
    {
      id: 'p2',
      name: 'Task Planning',
      emoji: '📝',
      category: 'productivity',
      description: 'Plan the top 3 priorities for the next day.',
      defaultTime: 'evening',
      scienceBacking: 'Pre-planning reduces decision fatigue and improves focus the following day.',
      suggestedCue: 'Closing your laptop at the end of workday',
      suggestedReward: 'Peace of mind knowing what to do tomorrow'
    },
    {
      id: 'p3',
      name: 'No Phone Morning',
      emoji: '📵',
      category: 'productivity',
      description: 'Avoid checking phone for the first hour after waking up.',
      defaultTime: 'morning',
      scienceBacking: 'Avoiding screens early prevents dopamine spikes and reactive behaviors.',
      suggestedCue: 'Leaving phone in another room overnight',
      suggestedReward: 'A calm, focused start to the day'
    },
    {
      id: 'p4',
      name: 'Pomodoro Technique',
      emoji: '🍅',
      category: 'productivity',
      description: 'Work in 25-minute focused intervals.',
      defaultTime: 'afternoon',
      scienceBacking: 'Timeboxing reduces procrastination and maintains sustained concentration.',
      suggestedCue: 'Sitting at the desk to work',
      suggestedReward: 'A 5-minute stretching break'
    },
    {
      id: 'p5',
      name: 'Email Batching',
      emoji: '📧',
      category: 'productivity',
      description: 'Check and process emails only twice a day.',
      defaultTime: 'afternoon',
      scienceBacking: 'Context switching drains energy; batching saves up to 40% of cognitive resources.',
      suggestedCue: 'At 11 AM and 4 PM',
      suggestedReward: 'Empty inbox satisfaction'
    }
  ],
  learning: [
    {
      id: 'l1',
      name: 'Read 20 Pages',
      emoji: '📚',
      category: 'learning',
      description: 'Read 20 pages of a non-fiction or fiction book.',
      defaultTime: 'evening',
      scienceBacking: 'Reading improves neuroplasticity, vocabulary, and empathy.',
      suggestedCue: 'Getting into bed',
      suggestedReward: 'Relaxation and learning something new'
    },
    {
      id: 'l2',
      name: 'Journaling',
      emoji: '📓',
      category: 'learning',
      description: 'Write down thoughts, learnings, or daily reflections.',
      defaultTime: 'evening',
      scienceBacking: 'Expressive writing reduces stress and clarifies complex emotions.',
      suggestedCue: 'After dinner',
      suggestedReward: 'A clear mind ready for sleep'
    },
    {
      id: 'l3',
      name: 'Learn a New Skill',
      emoji: '🎸',
      category: 'learning',
      description: 'Spend 20 minutes practicing a new skill or language.',
      defaultTime: 'afternoon',
      scienceBacking: 'Continuous learning builds cognitive reserve and delays cognitive decline.',
      suggestedCue: 'After finishing work/school',
      suggestedReward: 'Seeing measurable progress'
    },
    {
      id: 'l4',
      name: 'Listen to a Podcast',
      emoji: '🎧',
      category: 'learning',
      description: 'Listen to an educational podcast episode.',
      defaultTime: 'morning',
      scienceBacking: 'Audio learning utilizes passive time effectively for knowledge acquisition.',
      suggestedCue: 'During morning commute',
      suggestedReward: 'Entertaining commute'
    },
    {
      id: 'l5',
      name: 'Writing',
      emoji: '✍️',
      category: 'learning',
      description: 'Write 500 words for a blog, book, or personal project.',
      defaultTime: 'morning',
      scienceBacking: 'Writing articulates thoughts and improves critical thinking.',
      suggestedCue: 'With morning coffee',
      suggestedReward: 'Creative fulfillment'
    }
  ],
  mindfulness: [
    {
      id: 'm1',
      name: 'Meditation',
      emoji: '🧘',
      category: 'mindfulness',
      description: 'Meditate for 10 minutes.',
      defaultTime: 'morning',
      scienceBacking: 'Meditation increases gray matter in the brain and reduces cortisol.',
      suggestedCue: 'After making the bed',
      suggestedReward: 'Inner calm and focus'
    },
    {
      id: 'm2',
      name: 'Gratitude Practice',
      emoji: '🙏',
      category: 'mindfulness',
      description: 'Write down 3 things you are grateful for.',
      defaultTime: 'evening',
      scienceBacking: 'Gratitude practice rewires the brain to notice positive events, boosting happiness.',
      suggestedCue: 'Opening the journal at night',
      suggestedReward: 'A warm, positive feeling before sleep'
    },
    {
      id: 'm3',
      name: 'Digital Detox',
      emoji: '🔌',
      category: 'mindfulness',
      description: 'Disconnect from all screens 1 hour before bed.',
      defaultTime: 'evening',
      scienceBacking: 'Reducing blue light exposure improves melatonin production and sleep quality.',
      suggestedCue: 'Setting a 9 PM alarm',
      suggestedReward: 'Better sleep and time for reading'
    },
    {
      id: 'm4',
      name: 'Nature Walk',
      emoji: '🌳',
      category: 'mindfulness',
      description: 'Spend 20 minutes walking in a park or natural environment.',
      defaultTime: 'afternoon',
      scienceBacking: 'Nature exposure reduces blood pressure, anxiety, and depression.',
      suggestedCue: 'Weekend mornings or post-lunch',
      suggestedReward: 'Fresh air and a mental reset'
    },
    {
      id: 'm5',
      name: 'Deep Breathing',
      emoji: '🌬️',
      category: 'mindfulness',
      description: 'Do 5 minutes of box breathing (4s in, 4s hold, 4s out, 4s hold).',
      defaultTime: 'afternoon',
      scienceBacking: 'Controlled breathing activates the parasympathetic nervous system.',
      suggestedCue: 'When feeling stressed or overwhelmed',
      suggestedReward: 'Immediate relaxation'
    }
  ]
};

export const getAllTemplates = () => {
  return Object.values(habitTemplates).flat();
};

export const getTemplatesByCategory = (category) => {
  return habitTemplates[category] || [];
};
