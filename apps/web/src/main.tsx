// apps/web/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'; // ESM kuralı: relative .js uzantısı
import './index.css';

// Seçiciyi 'root' elementine çekerek tüm sayfa yönetimini React'e veriyoruz
const container = document.getElementById('root') || document.body;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

