import React from 'react';

export default function HeatMap({ completions = {}, habits = [], month, year }) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const totalHabits = habits.length;

  const getDayColor = (date) => {
    if (totalHabits === 0) return 'bg-slate-800';
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    const completedCount = habits.filter(h => completions[dateStr]?.[h.id]).length;
    
    if (completedCount === 0) return 'bg-slate-800';
    
    const percentage = (completedCount / totalHabits) * 100;
    
    if (percentage <= 25) return 'bg-emerald-900';
    if (percentage <= 50) return 'bg-emerald-700';
    if (percentage <= 75) return 'bg-emerald-500';
    return 'bg-emerald-400';
  };

  const getTooltip = (date) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    const completedCount = habits.filter(h => completions[dateStr]?.[h.id]).length;
    return `${monthNames[month]} ${date}: ${completedCount}/${totalHabits} completed`;
  };

  const cells = [];
  
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-transparent"></div>);
  }
  
  for (let date = 1; date <= daysInMonth; date++) {
    cells.push(
      <div 
        key={`day-${date}`} 
        className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${getDayColor(date)} hover:ring-1 hover:ring-white transition-all cursor-default group relative`}
      >
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block w-max bg-slate-800 text-xs text-slate-200 px-2 py-1 rounded z-10">
          {getTooltip(date)}
        </div>
      </div>
    );
  }

  const columns = [];
  for (let i = 0; i < cells.length; i += 7) {
    columns.push(
      <div key={`col-${i}`} className="flex flex-col space-y-1">
        {cells.slice(i, i + 7)}
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto">
      <h3 className="text-sm font-semibold text-slate-300 mb-4">{monthNames[month]} {year}</h3>
      <div className="flex space-x-2 min-w-max">
        <div className="flex flex-col space-y-1 text-[10px] md:text-xs text-slate-500 mr-2 justify-between py-1">
          <span>Sun</span>
          <span>Tue</span>
          <span>Thu</span>
          <span>Sat</span>
        </div>
        <div className="flex space-x-1">
          {columns}
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mt-6 text-xs text-slate-400">
        <span>Less</span>
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-sm bg-slate-800"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-900"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-700"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-400"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
