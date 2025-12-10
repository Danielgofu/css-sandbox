import React, { useState, useEffect } from 'react';
import { ThemeState, Preset } from '../../types';
import { defaultTheme } from '../utils';
import { Save, Trash2, RotateCcw, FolderOpen, MoreHorizontal, Check, ChevronDown, ChevronUp, Layout } from 'lucide-react'; // Importamos el ícono de Layout

interface PresetsProps {
  currentTheme: ThemeState;
  onLoad: (theme: ThemeState) => void;
}

const DEFAULT_PRESETS: Preset[] = [
  {
    id: 'default',
    name: 'Modern Blue',
    timestamp: 0,
    theme: defaultTheme
  },
  {
    id: 'elegant-dark',
    name: 'Elegant Dark',
    timestamp: 0,
    theme: {
      ...defaultTheme,
      colors: {
        primary: '#6366f1',
        secondary: '#a855f7',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f8fafc',
        border: '#334155',
      },
      effects: {
        ...defaultTheme.effects,
        shadow: 'lg',
        hoverScale: 1.05,
      }
    }
  },
  {
    id: 'forest-calm',
    name: 'Forest Calm',
    timestamp: 0,
    theme: {
      ...defaultTheme,
      colors: {
        primary: '#059669',
        secondary: '#10b981',
        background: '#f0fdf4',
        surface: '#ffffff',
        text: '#064e3b',
        border: '#bbf7d0',
      },
      spacing: {
        base: 20,
        gap: 24,
        borderRadius: 12,
      },
      typography: {
        ...defaultTheme.typography,
        fontFamily: 'Playfair Display',
        headingFont: 'Playfair Display',
      }
    }
  }
];

const Presets: React.FC<PresetsProps> = ({ currentTheme, onLoad }) => {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [newPresetName, setNewPresetName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Estado para controlar la compresión

  // Load presets from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('css_sandbox_presets');
      if (saved) {
        setPresets(JSON.parse(saved));
      } else {
        setPresets(DEFAULT_PRESETS);
      }
    } catch (e) {
      console.warn("Error loading presets:", e);
      setPresets(DEFAULT_PRESETS);
    }
  }, []);

  const savePresetsToStorage = (updatedPresets: Preset[]) => {
    try {
      localStorage.setItem('css_sandbox_presets', JSON.stringify(updatedPresets));
      setPresets(updatedPresets);
    } catch (e) {
      console.error("Failed to save presets:", e);
    }
  };

  const handleSave = () => {
    if (!newPresetName.trim()) return;

    const newPreset: Preset = {
      id: Date.now().toString(),
      name: newPresetName,
      theme: currentTheme,
      timestamp: Date.now(),
    };

    const updated = [...presets, newPreset];
    savePresetsToStorage(updated);
    setNewPresetName('');
    setIsAdding(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this preset?')) {
      const updated = presets.filter(p => p.id !== id);
      savePresetsToStorage(updated);
    }
  };

  const handleReset = () => {
    if (confirm('Reset all presets to default? Custom presets will be lost.')) {
      savePresetsToStorage(DEFAULT_PRESETS);
    }
  };

  return (
    <div className={`flex flex-col bg-gray-900 border-t border-gray-800 transition-all duration-300 ${isCollapsed ? 'h-auto' : 'h-1/2'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900">
        <h3 className="text-gray-300 font-bold text-sm uppercase flex items-center gap-2">
          <FolderOpen size={20} className="text-purple-500" /> {/* Aumentamos el tamaño del ícono */}
          Presets
        </h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleReset}
            className="text-gray-500 hover:text-white transition-colors"
            title="Reset to defaults"
          >
            <RotateCcw size={20} /> {/* Aumentamos el tamaño del ícono */}
          </button>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="text-gray-500 hover:text-white transition-colors"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />} {/* Aumentamos el tamaño del ícono */}
          </button>
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {presets.map((preset) => (
              <div 
                key={preset.id}
                onClick={() => onLoad(preset.theme)}
                className="group flex items-center justify-between p-3 rounded bg-gray-800 hover:bg-gray-700 border border-transparent hover:border-gray-600 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-600 shadow-sm shrink-0" 
                    style={{ backgroundColor: preset.theme.colors.primary }} 
                  />
                  <span className="text-sm text-gray-200 truncate font-medium">{preset.name}</span>
                </div>
                
                {!DEFAULT_PRESETS.find(p => p.id === preset.id) && (
                  <button 
                    title="Delete"
                    onClick={(e) => handleDelete(preset.id, e)}
                    className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"
                  >
                    <Trash2 size={20} /> {/* Aumentamos el tamaño del ícono */}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-800 bg-gray-900">
            {isAdding ? (
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  placeholder="Preset Name"
                  className="flex-1 bg-gray-800 border border-gray-700 text-white text-sm rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                />
                <button 
                  title="Save"
                  onClick={handleSave} 
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                  <Check size={20} /> {/* Aumentamos el tamaño del ícono */}
                </button>
                <button
                  title="Cancel" 
                  onClick={() => setIsAdding(false)} 
                  className="bg-gray-800 text-gray-400 p-2 rounded hover:text-white"
                >
                  <MoreHorizontal size={20} /> {/* Aumentamos el tamaño del ícono */}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAdding(true)}
                className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded border border-gray-700 transition-colors text-sm font-medium"
              >
                <Save size={20} /> {/* Aumentamos el tamaño del ícono */}
                Save Current Theme
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Presets;
