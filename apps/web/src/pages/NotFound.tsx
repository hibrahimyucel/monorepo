import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Arka Plan Glow Efekti */}
      <div className="absolute w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="font-mono text-xs text-rose-500 border border-rose-500/30 bg-rose-500/10 px-3 py-1 rounded-full mb-4 uppercase tracking-widest animate-pulse">
        Error 404
      </div>
      
      <h2 className="text-4xl font-black text-white tracking-tight mb-2">
        Requested Route Terminated
      </h2>
      
      <p className="text-sm text-slate-400 max-w-md mb-8">
        Aradığınız sayfa monorepo workspace yönlendirme kuralları dışında kalıyor veya taşınmış olabilir.
      </p>
      
      <Link to="/" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02]">
        Back to Live Dashboard
      </Link>
    </div>
  );
}

