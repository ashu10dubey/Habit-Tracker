import React from 'react';

export default function QuoteCard({ quote }) {
  if (!quote) return null;
  
  return (
    <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-emerald-500 to-violet-500 animate-in fade-in duration-700">
      <div className="bg-slate-900 rounded-xl p-6 h-full w-full flex flex-col relative overflow-hidden">
        <span className="absolute top-2 left-4 text-6xl text-slate-800 font-serif leading-none opacity-50">"</span>
        
        <div className="relative z-10 flex flex-col h-full">
          {quote.category && (
            <span className="self-start text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded mb-3">
              {quote.category}
            </span>
          )}
          
          <p className="text-lg md:text-xl italic text-slate-200 mb-4 font-serif leading-relaxed">
            {quote.text}
          </p>
          
          <p className="text-slate-400 font-medium text-sm mt-auto text-right">
            — {quote.author}
          </p>
        </div>
      </div>
    </div>
  );
}
