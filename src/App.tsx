import React, { useState, useEffect } from 'react';
import Controls from './components/Controls';
import Preview from './components/Preview';
import ExportPanel from './components/ExportPanel';
import Presets from './components/Presets';
import { ThemeState, PreviewMode } from './../types';
import { defaultTheme } from './utils';
import { LayoutGrid, AppWindow, Code } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeState>(defaultTheme);
  const [mode, setMode] = useState<PreviewMode>('bento');
  const [showExport, setShowExport] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('css_sandbox_current');
      if (saved) {
        setTheme(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to restore session from localStorage:", e);
    } finally {
      // Always set loaded to true to prevent blocking the UI
      setLoaded(true);
    }
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem('css_sandbox_current', JSON.stringify(theme));
      } catch (e) {
        console.warn("Failed to save session to localStorage:", e);
      }
    }
  }, [theme, loaded]);

  if (!loaded) return <div className="bg-gray-950 h-screen w-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row bg-gray-950 text-white overflow-hidden font-sans">
      {/* Accessibility Skip Link */}
      <a href="#main-preview" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded font-bold">
        Skip to Preview
      </a>
      
      {/* 
          Layout Strategy:
          Mobile: Vertical Stack (Header -> Preview -> Controls -> Presets)
          Desktop: Sidebar (Controls/Presets) | Main (Header + Preview)
      */}

      {/* Sidebar Controls */}
      <div className="order-2 md:order-1 flex flex-col h-[45vh] md:h-full border-t md:border-t-0 md:border-r border-gray-800 z-10 shadow-xl bg-gray-900 w-full md:w-80 shrink-0">
        <Controls theme={theme} setTheme={setTheme} />
        <Presets currentTheme={theme} onLoad={setTheme} />
      </div>

      {/* Main Content Area */}
      <div className="order-1 md:order-2 flex-1 flex flex-col relative h-[55vh] md:h-full overflow-hidden">
        {/* Top Toolbar */}
        <header className="h-14 border-b border-gray-800 bg-gray-900 flex items-center justify-between px-4 shrink-0 z-20">
          <div className="flex items-center gap-2 bg-gray-800 rounded p-1">
            <button
              onClick={() => setMode('bento')}
              aria-label="Switch to Bento Grid view"
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors min-h-[36px] touch-target ${
                mode === 'bento' ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <LayoutGrid size={16} />
              <span className="hidden sm:inline">Bento</span>
            </button>
            <button
              onClick={() => setMode('landing')}
              aria-label="Switch to Landing Page view"
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors min-h-[36px] touch-target ${
                mode === 'landing' ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <AppWindow size={16} />
              <span className="hidden sm:inline">Landing</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden lg:inline text-xs text-gray-500 mr-2">
              v1.0.0
            </span>
            <button
              onClick={() => setShowExport(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded transition-colors shadow-lg shadow-purple-900/20 min-h-[36px]"
            >
              <Code size={16} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </header>

        <main id="main-preview" className="flex-1 overflow-hidden relative">
          <Preview mode={mode} theme={theme} />
        </main>
      </div>

      {/* Modals */}
      {showExport && <ExportPanel theme={theme} onClose={() => setShowExport(false)} />}
    </div>
  );
};

export default App;