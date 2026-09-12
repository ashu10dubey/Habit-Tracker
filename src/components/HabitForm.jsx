import React, { useState, useEffect } from 'react';

export default function HabitForm({ habit, onSave, onClose, categories = ['health', 'productivity', 'learning', 'mindfulness'] }) {
  const [formData, setFormData] = useState({
    name: '',
    emoji: '🎯',
    category: 'health',
    timeOfDay: 'morning',
    description: '',
    implementationIntention: '',
    temptationBundle: ''
  });

  useEffect(() => {
    if (habit) {
      setFormData({ ...habit });
    }
  }, [habit]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-100">{habit ? 'Edit Habit' : 'New Habit'}</h2>
            <button type="button" onClick={onClose} className="text-slate-400 hover:text-white text-xl">✕</button>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-20">
                <label className="block text-sm font-medium text-slate-300 mb-1">Emoji</label>
                <input
                  type="text"
                  name="emoji"
                  value={formData.emoji}
                  onChange={handleChange}
                  className="w-full text-center bg-slate-800 border border-slate-600 rounded-lg p-2 text-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-100"
                  maxLength="2"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300 mb-1">Habit Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Read for 30 mins"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-100"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Time of Day</label>
                <select
                  name="timeOfDay"
                  value={formData.timeOfDay}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-100"
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                  <option value="anytime">Anytime</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Implementation Intention</label>
              <input
                type="text"
                name="implementationIntention"
                value={formData.implementationIntention}
                onChange={handleChange}
                placeholder="I will [habit] at [time] in [location]"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Temptation Bundle</label>
              <input
                type="text"
                name="temptationBundle"
                value={formData.temptationBundle}
                onChange={handleChange}
                placeholder="I will only [guilty pleasure] while I [habit]"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-100 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="2"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-100 resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors font-medium"
            >
              {habit ? 'Save Changes' : 'Create Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
