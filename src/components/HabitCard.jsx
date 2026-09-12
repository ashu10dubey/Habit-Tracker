import React from 'react';

export default function HabitCard({ habit, isCompleted, streak, onToggle, onEdit, onDelete }) {
  return (
    <div className={`group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all duration-300 ${isCompleted ? 'bg-emerald-900/20 border-emerald-800/50' : 'bg-slate-800 border-slate-700'}`}>
      <div className="flex items-center flex-1 min-w-0">
        <div className="flex-shrink-0 text-3xl mr-4">{habit.emoji || '🎯'}</div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold truncate transition-all duration-300 ${isCompleted ? 'line-through text-slate-500' : 'text-slate-100'}`}>
            {habit.name}
          </h3>
          {habit.implementationIntention && (
            <p className="text-sm text-slate-400 mt-1 truncate">
              {habit.implementationIntention}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 sm:mt-0 sm:ml-4">
        <div className="flex items-center space-x-1 mr-6 bg-slate-900/50 px-2 py-1 rounded-md">
          <span className="text-sm">{streak?.emoji || '🔥'}</span>
          <span className="text-sm font-bold text-amber-500">{streak?.current || 0}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="opacity-0 group-hover:opacity-100 flex space-x-2 mr-2 transition-opacity duration-200">
            <button onClick={onEdit} className="p-1.5 text-slate-400 hover:text-blue-400 rounded-md hover:bg-slate-700" title="Edit">✏️</button>
            <button onClick={onDelete} className="p-1.5 text-slate-400 hover:text-rose-400 rounded-md hover:bg-slate-700" title="Delete">🗑️</button>
          </div>
          
          <button
            onClick={onToggle}
            className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-slate-900 ${isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-500 hover:border-emerald-500 text-transparent'}`}
          >
            ✓
          </button>
        </div>
      </div>
    </div>
  );
}
