import React from 'react';
import { ThemeState } from '../../types';
import { getContrastRatio, getWCAGRating } from '../utils';
import { Palette, Type, Layout, MousePointer2 } from 'lucide-react';

interface ControlsProps {
  theme: ThemeState;
  setTheme: React.Dispatch<React.SetStateAction<ThemeState>>;
}

const Controls: React.FC<ControlsProps> = ({ theme, setTheme }) => {
  const [activeTab, setActiveTab] = React.useState<'colors' | 'type' | 'layout' | 'effects'>('colors');

  const updateColor = (key: keyof ThemeState['colors'], value: string) => {
    setTheme(prev => ({ ...prev, colors: { ...prev.colors, [key]: value } }));
  };

  const updateType = (key: keyof ThemeState['typography'], value: string | number) => {
    setTheme(prev => ({ ...prev, typography: { ...prev.typography, [key]: value } }));
  };

  const updateSpacing = (key: keyof ThemeState['spacing'], value: number) => {
    setTheme(prev => ({ ...prev, spacing: { ...prev.spacing, [key]: value } }));
  };
  
  const updateEffects = (key: keyof ThemeState['effects'], value: any) => {
    setTheme(prev => ({ ...prev, effects: { ...prev.effects, [key]: value } }));
  };

  const contrastRatio = getContrastRatio(theme.colors.background, theme.colors.text);
  const wcag = getWCAGRating(contrastRatio);
  const primaryContrast = getContrastRatio(theme.colors.primary, '#ffffff');
  const primaryWcag = getWCAGRating(primaryContrast);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-sm overflow-hidden w-full">
      <div className="p-4 border-b border-gray-800 flex-shrink-0">
        <h2 className="text-white font-bold flex items-center gap-2 text-base">
          <Palette size={18} className="text-purple-500" />
          Editor
        </h2>
      </div>

      <div className="flex border-b border-gray-800 flex-shrink-0 overflow-x-auto">
        {[
          { id: 'colors', icon: Palette, label: 'Color' },
          { id: 'type', icon: Type, label: 'Type' },
          { id: 'layout', icon: Layout, label: 'Layout' },
          { id: 'effects', icon: MousePointer2, label: 'FX' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 p-3 flex flex-col sm:flex-colum items-center justify-center gap-1 sm:gap-2 hover:bg-gray-800 transition-colors min-h-[48px] touch-target ${
              activeTab === tab.id ? 'text-purple-400 border-b-2 border-purple-400 bg-gray-800' : 'text-gray-400'
            }`}
          >
            <tab.icon size={18} />
            <span className="text-xs uppercase font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
        {activeTab === 'colors' && (
          <div className="space-y-4">
            <h3 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2">Palette</h3>
            
            <ColorInput label="Primary" value={theme.colors.primary} onChange={(v) => updateColor('primary', v)} />
            <ColorInput label="Secondary" value={theme.colors.secondary} onChange={(v) => updateColor('secondary', v)} />
            <ColorInput label="Background" value={theme.colors.background} onChange={(v) => updateColor('background', v)} />
            <ColorInput label="Surface" value={theme.colors.surface} onChange={(v) => updateColor('surface', v)} />
            <ColorInput label="Text" value={theme.colors.text} onChange={(v) => updateColor('text', v)} />
            <ColorInput label="Border" value={theme.colors.border} onChange={(v) => updateColor('border', v)} />

            <div className="mt-6 p-3 bg-gray-800 rounded border border-gray-700">
              <h4 className="text-gray-300 font-semibold mb-2 text-xs uppercase">Contrast Check</h4>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-400">Text on Bg</span>
                <span className={`font-mono font-bold ${wcag.color}`}>{contrastRatio.toFixed(2)} ({wcag.rating})</span>
              </div>
               <div className="flex justify-between items-center">
                <span className="text-gray-400">Text on Primary</span>
                <span className={`font-mono font-bold ${primaryWcag.color}`}>{primaryContrast.toFixed(2)} ({primaryWcag.rating})</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'type' && (
          <div className="space-y-4">
            <h3 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2">Typography</h3>
            
            <SelectInput 
              label="Font Family" 
              value={theme.typography.fontFamily} 
              options={['Inter', 'Roboto', 'Playfair Display', 'JetBrains Mono', 'System-UI']} 
              onChange={(v) => updateType('fontFamily', v)} 
            />
            
            <RangeInput 
              label="Base Size (px)" 
              value={theme.typography.baseSize} 
              min={12} max={24} 
              onChange={(v) => updateType('baseSize', v)} 
            />
            
            <RangeInput 
              label="Line Height" 
              value={theme.typography.lineHeight} 
              min={1} max={2} step={0.1} 
              onChange={(v) => updateType('lineHeight', v)} 
            />
             <RangeInput 
              label="Font Weight" 
              value={theme.typography.fontWeight} 
              min={100} max={900} step={100} 
              onChange={(v) => updateType('fontWeight', v)} 
            />
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-4">
            <h3 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2">Spacing</h3>
            <RangeInput 
              label="Base Spacing (px)" 
              value={theme.spacing.base} 
              min={4} max={32} step={4}
              onChange={(v) => updateSpacing('base', v)} 
            />
            <RangeInput 
              label="Gap (px)" 
              value={theme.spacing.gap} 
              min={0} max={64} step={4}
              onChange={(v) => updateSpacing('gap', v)} 
            />
            <RangeInput 
              label="Border Radius (px)" 
              value={theme.spacing.borderRadius} 
              min={0} max={32}
              onChange={(v) => updateSpacing('borderRadius', v)} 
            />
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="space-y-4">
            <h3 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2">Visuals</h3>
            <SelectInput 
              label="Shadow" 
              value={theme.effects.shadow} 
              options={['none', 'sm', 'md', 'lg', 'xl', 'hard']} 
              onChange={(v) => updateEffects('shadow', v)} 
            />
             <RangeInput 
              label="Border Width (px)" 
              value={theme.effects.borderWidth} 
              min={0} max={8}
              onChange={(v) => updateEffects('borderWidth', v)} 
            />

            <hr className="border-gray-800 my-4" />
            
            <h3 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2">Hover Animations</h3>
            <RangeInput 
              label="Scale" 
              value={theme.effects.hoverScale ?? 1.0} 
              min={1.00} max={1.15} step={0.01}
              onChange={(v) => updateEffects('hoverScale', v)} 
            />
            <RangeInput 
              label="Opacity" 
              value={theme.effects.hoverOpacity ?? 1.0} 
              min={0.5} max={1.0} step={0.05}
              onChange={(v) => updateEffects('hoverOpacity', v)} 
            />
            <RangeInput 
              label="Lift (px)" 
              value={theme.effects.hoverShift ?? 0} 
              min={0} max={16} step={1}
              onChange={(v) => updateEffects('hoverShift', v)} 
            />
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <RangeInput 
                label="Duration (s)" 
                value={theme.effects.hoverDuration ?? 0.2} 
                min={0} max={1} step={0.05}
                onChange={(v) => updateEffects('hoverDuration', v)} 
              />
              <SelectInput 
                label="Easing" 
                value={theme.effects.hoverEasing ?? 'ease-out'} 
                options={['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']} 
                onChange={(v) => updateEffects('hoverEasing', v)} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
  <div className="flex items-center justify-between">
    <label className="text-gray-300">{label}</label>
    <div className="flex items-center gap-2">
      <span className="text-gray-500 font-mono text-xs uppercase">{value}</span>
      <input 
        type="color" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
        aria-label={`Select ${label} color`}
      />
    </div>
  </div>
);

const RangeInput = ({ label, value, min, max, step = 1, onChange }: { label: string, value: number, min: number, max: number, step?: number, onChange: (v: number) => void }) => (
  <div>
    <div className="flex justify-between mb-1">
      <label className="text-gray-300">{label}</label>
      <span className="text-gray-500 text-xs font-mono">{value}</span>
    </div>
    <input 
      type="range" 
      min={min} max={max} step={step} 
      value={value} 
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 min-h-[8px]"
      aria-label={label}
    />
  </div>
);

const SelectInput = ({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) => (
  <div>
    <label className="text-gray-300 block mb-1">{label}</label>
    <select 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2 text-sm focus:border-purple-500 focus:outline-none min-h-[44px]"
      aria-label={label}
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default Controls;