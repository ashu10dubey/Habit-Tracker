import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = ({
  habits = [],
  weeklyData = [],
  habitSuccessRates = {},
  bestDay = 'Monday',
  totalCompletions = 0,
  perfectDays = 0,
  overallScore = 0,
  scoreLabel = 'Needs Work',
  level = { name: 'Beginner', emoji: '🌱' },
}) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#f1f5f9' } },
    },
    scales: {
      x: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } },
      y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' }, min: 0, max: 100 },
    },
  };

  // Weekly completion chart
  const weeklyChartData = {
    labels: weeklyData.map((d) => d.week),
    datasets: [
      {
        label: 'Completion Score (%)',
        data: weeklyData.map((d) => d.score),
        backgroundColor: '#10b981',
        borderRadius: 6,
      },
    ],
  };

  // Habit success rates — convert {habitId: %} object to chart data
  const successHabits = habits.map((h) => ({
    name: `${h.emoji} ${h.name}`,
    rate: habitSuccessRates[h.id] || 0,
  }));

  const successRatesChartData = {
    labels: successHabits.map((h) => h.name),
    datasets: [
      {
        label: 'Success Rate (%)',
        data: successHabits.map((h) => h.rate),
        backgroundColor: '#6366f1',
        borderRadius: 6,
      },
    ],
  };

  const successRatesOptions = {
    ...chartOptions,
    indexAxis: 'y',
    scales: {
      x: { ...chartOptions.scales.x, min: 0, max: 100 },
      y: { ...chartOptions.scales.y, max: undefined },
    },
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 md:pb-0">
      <header className="mb-2">
        <h1 className="text-2xl font-bold text-slate-100">Analytics & Insights</h1>
        <p className="text-slate-400">Deep dive into your habit performance.</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400 font-medium mb-1">Total Completions</p>
          <span className="text-3xl font-bold text-slate-100">{totalCompletions}</span>
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400 font-medium mb-1">Perfect Days</p>
          <span className="text-3xl font-bold text-emerald-400">{perfectDays}</span>
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400 font-medium mb-1">Overall Score</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-100">{Math.round(overallScore)}</span>
            <span className="text-sm font-semibold text-emerald-400">{scoreLabel}</span>
          </div>
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400 font-medium mb-1">Level</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl">{level.emoji}</span>
            <span className="text-xl font-bold text-amber-400">{level.name}</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Weekly Completion Score</h2>
          <div className="h-64">
            {weeklyData.length > 0 ? (
              <Bar data={weeklyChartData} options={chartOptions} />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500">Not enough data</div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Habit Success Rates</h2>
          <div className="h-64">
            {successHabits.length > 0 ? (
              <Bar data={successRatesChartData} options={successRatesOptions} />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500">Not enough data</div>
            )}
          </div>
        </div>
      </div>

      {/* Best Day */}
      <div className="bg-emerald-900/30 p-6 rounded-2xl border border-emerald-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-emerald-400 mb-1">Most Productive Day</h2>
          <p className="text-emerald-200/70">Your highest completion rates happen on this day.</p>
        </div>
        <div className="text-3xl font-black text-emerald-300 bg-emerald-900/50 px-6 py-4 rounded-xl border border-emerald-700/50">
          {bestDay}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
