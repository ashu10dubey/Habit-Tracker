import React, { useRef, useState } from 'react';
import { exportData, importData, clearAll } from '../utils/storage';

const DataManager = () => {
  const fileInputRef = useRef(null);
  const [statusMsg, setStatusMsg] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleExport = () => {
    try {
      const data = exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `habit-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatusMsg('Data exported successfully!');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (e) {
      setStatusMsg('Error exporting data.');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const success = importData(parsed);
        if (success) {
          setStatusMsg('Data imported successfully! Reloading...');
          setTimeout(() => window.location.reload(), 1500);
        } else {
          setStatusMsg('Invalid data format.');
        }
      } catch (err) {
        setStatusMsg('Error importing data.');
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const handleClear = () => {
    clearAll();
    window.location.reload();
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 max-w-md w-full mx-auto">
      <h2 className="text-xl font-bold text-slate-100 mb-6">Data Management</h2>
      
      {statusMsg && (
        <div className="mb-4 p-3 bg-slate-800 text-emerald-400 rounded-lg text-sm font-medium border border-emerald-900/50">
          {statusMsg}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleExport}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium transition-colors border border-slate-700"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export Backup
          </button>
          
          <button 
            onClick={handleImportClick}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium transition-colors border border-slate-700"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            Import Backup
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".json" 
            className="hidden" 
          />
        </div>

        <div className="pt-4 border-t border-slate-800">
          {!showConfirm ? (
            <button 
              onClick={() => setShowConfirm(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-rose-950/40 text-rose-500 rounded-xl font-medium transition-colors border border-rose-900/30"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Clear All Data
            </button>
          ) : (
            <div className="bg-rose-950/30 border border-rose-900/50 p-4 rounded-xl">
              <p className="text-sm text-rose-200 mb-3 text-center">Are you sure? This cannot be undone.</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-3 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleClear}
                  className="flex-1 px-3 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-500 transition-colors"
                >
                  Yes, Delete All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataManager;
