import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-black text-slate-100 font-sans">
        
        {/* Modern SaaS Üst Bar Navigasyonu */}
        <header className="max-w-7xl mx-auto border-b border-slate-900 p-6 flex justify-between items-center backdrop-blur-md sticky top-0 z-50">
          <div>
            <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-400">
              SaaS Core Panel
            </h1>
            <p className="text-[10px] text-slate-500 font-mono">v7.7-react-stable</p>
          </div>
          
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="text-slate-300 hover:text-indigo-400 transition-colors">
              🖥️ Telemetry Dashboard
            </Link>
            
            {/* Doğrudan Nginx /docs/ rotasına köprü kuran bağlantı */}
            <a href="/docs/" className="text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-1">
              📚 Academic Manual <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">External</span>
            </a>
            
            <Link to="/unknown-route-test" className="text-slate-500 hover:text-rose-400 text-xs transition-colors border border-dashed border-slate-800 px-2 py-1 rounded">
              ⚠️ Trigger 404 Test
            </Link>
          </nav>
        </header>

        {/* Rota Değişim Alanı */}
        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

