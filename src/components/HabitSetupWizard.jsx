import React, { useState } from 'react';
import { habitTemplates } from '../data/habitTemplates';

const categoryLabels = {
  health: '🏋️ Health & Fitness',
  productivity: '🧠 Productivity',
  learning: '📚 Learning & Growth',
  mindfulness: '🧘 Mindfulness & Wellbeing',
};

const HabitSetupWizard = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [customizedHabits, setCustomizedHabits] = useState([]);

  const categories = Object.entries(habitTemplates);

  const toggleTemplate = (templateId) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(templateId)) next.delete(templateId);
      else next.add(templateId);
      return next;
    });
  };

  const selectAllInCategory = (categoryKey) => {
    const catTemplates = habitTemplates[categoryKey] || [];
    const allSelected = catTemplates.every((t) => selectedIds.has(t.id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      catTemplates.forEach((t) => {
        if (allSelected) next.delete(t.id);
        else next.add(t.id);
      });
      return next;
    });
  };

  const handleNext = () => {
    if (step === 2) {
      // Build customized habits from selected templates
      const selected = [];
      categories.forEach(([, templates]) => {
        templates.forEach((t) => {
          if (selectedIds.has(t.id)) {
            selected.push({
              name: t.name,
              emoji: t.emoji,
              category: t.category,
              description: t.description,
              frequency: 'daily',
              timeOfDay: t.defaultTime || 'morning',
              implementationIntention: t.suggestedCue ? `I will ${t.name.toLowerCase()} ${t.suggestedCue.toLowerCase()}` : '',
              temptationBundle: t.suggestedReward || '',
              active: true,
            });
          }
        });
      });
      setCustomizedHabits(selected);
    }
    if (step === 4) {
      onComplete(customizedHabits);
      return;
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const updateHabit = (index, field, value) => {
    setCustomizedHabits((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 flex shrink-0">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-full flex-1 transition-colors duration-300 ${i <= step ? 'bg-emerald-500' : 'bg-transparent'}`} />
          ))}
        </div>

        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="flex flex-col items-center text-center space-y-6 justify-center min-h-[400px]">
              <div className="text-6xl mb-4">🧪</div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight">
                Build Better Habits<br />with Science
              </h1>
              <p className="text-lg text-slate-400 max-w-lg">
                Track your progress, build streaks, and use proven behavioral science to make habits stick. Let's pick your starting habits.
              </p>
            </div>
          )}

          {/* Step 2: Choose Templates */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-100">Choose Your Habits</h2>
              <p className="text-slate-400">Select habits to track. You can always add more later.</p>

              <div className="space-y-8">
                {categories.map(([categoryKey, templates]) => (
                  <div key={categoryKey} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-emerald-400">
                        {categoryLabels[categoryKey] || categoryKey}
                      </h3>
                      <button
                        onClick={() => selectAllInCategory(categoryKey)}
                        className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        {templates.every((t) => selectedIds.has(t.id)) ? 'Deselect All' : 'Select All'}
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {templates.map((template) => {
                        const isSelected = selectedIds.has(template.id);
                        return (
                          <div
                            key={template.id}
                            onClick={() => toggleTemplate(template.id)}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                              isSelected
                                ? 'border-emerald-500 bg-emerald-900/20'
                                : 'border-slate-800 bg-slate-800/50 hover:border-slate-600'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${isSelected ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'}`}>
                                {isSelected && '✓'}
                              </div>
                              <span className="text-lg">{template.emoji}</span>
                              <div>
                                <p className="font-medium text-slate-200">{template.name}</p>
                                <p className="text-xs text-slate-500">{template.description}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Customize */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-100">Customize Your Habits</h2>
              <p className="text-slate-400">
                Set when and where you'll do each habit. Implementation intentions boost success by 2-3x.
              </p>

              <div className="space-y-4 mt-4">
                {customizedHabits.length === 0 ? (
                  <p className="text-amber-500">No habits selected. Go back to choose some.</p>
                ) : (
                  customizedHabits.map((habit, idx) => (
                    <div key={idx} className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-slate-200">{habit.emoji} {habit.name}</h3>
                        <select
                          value={habit.timeOfDay}
                          onChange={(e) => updateHabit(idx, 'timeOfDay', e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-sm text-slate-300 focus:outline-none focus:border-emerald-500"
                        >
                          <option value="morning">Morning</option>
                          <option value="afternoon">Afternoon</option>
                          <option value="evening">Evening</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">
                          Implementation Intention
                        </label>
                        <input
                          type="text"
                          value={habit.implementationIntention}
                          onChange={(e) => updateHabit(idx, 'implementationIntention', e.target.value)}
                          placeholder="I will [habit] at [time] in [location]"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 placeholder-slate-600"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Step 4: Ready */}
          {step === 4 && (
            <div className="flex flex-col items-center text-center space-y-6 justify-center min-h-[400px]">
              <div className="text-6xl mb-2">🚀</div>
              <h2 className="text-3xl font-bold text-slate-100">You're All Set!</h2>
              <p className="text-slate-400 max-w-md">
                You've selected <strong className="text-emerald-400">{customizedHabits.length}</strong> habits to track.
                Remember: start small and focus on consistency over intensity.
              </p>
              <div className="grid gap-2 w-full max-w-md text-left">
                {customizedHabits.map((h, i) => (
                  <div key={i} className="bg-slate-800 px-4 py-3 rounded-lg flex items-center gap-3">
                    <span className="text-xl">{h.emoji}</span>
                    <span className="text-slate-200 font-medium">{h.name}</span>
                    <span className="text-slate-500 text-xs ml-auto">{h.timeOfDay}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 flex justify-between items-center shrink-0">
          {step > 1 ? (
            <button onClick={handleBack} className="px-6 py-2.5 text-slate-400 hover:text-slate-200 font-medium transition-colors">
              Back
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={handleNext}
            disabled={step === 2 && selectedIds.size === 0}
            className={`px-8 py-2.5 rounded-xl font-medium transition-all ${
              step === 2 && selectedIds.size === 0
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {step === 1 ? 'Get Started' : step === 4 ? 'Start Tracking 🎯' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitSetupWizard;
