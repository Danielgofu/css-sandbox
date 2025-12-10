import React, { useState } from 'react';
import { ThemeState } from '../../types';
import { generateCSS, downloadFile } from '../utils';
import { Copy, Download, X, FileJson, FileType, FileCode } from 'lucide-react';

interface ExportPanelProps {
  theme: ThemeState;
  onClose: () => void;
}

type ExportFormat = 'css' | 'tailwind' | 'json';

const ExportPanel: React.FC<ExportPanelProps> = ({ theme, onClose }) => {
  const [format, setFormat] = useState<ExportFormat>('css');
  const [copied, setCopied] = useState(false);

  const getFormatContent = () => {
    switch (format) {
      case 'json':
        return JSON.stringify(theme, null, 2);
      case 'tailwind':
        return `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        base: ['var(--font-family-base)', 'sans-serif'],
        heading: ['var(--font-family-heading)', 'serif'],
      },
      fontSize: {
        base: 'var(--font-size-base)',
      },
      lineHeight: {
        base: 'var(--line-height)',
      },
      spacing: {
        base: 'var(--spacing-base)',
        gap: 'var(--gap)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
      boxShadow: {
        DEFAULT: 'var(--shadow)',
      },
      borderWidth: {
        DEFAULT: 'var(--border-width)',
      }
    }
  }
};`;
      case 'css':
      default:
        return generateCSS(theme);
    }
  };

  const content = getFormatContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extensions = {
      css: 'css',
      tailwind: 'js',
      json: 'json'
    };
    const mimeTypes = {
      css: 'text/css',
      tailwind: 'text/javascript',
      json: 'application/json'
    };
    downloadFile(content, `theme.${extensions[format]}`, mimeTypes[format]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Export Design System
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-gray-800" title='close'>
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 bg-gray-950/50 overflow-x-auto">
          <button
            onClick={() => setFormat('css')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              format === 'css'
                ? 'border-purple-500 text-purple-400 bg-gray-800/50'
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
            }`}
          >
            <FileType size={16} />
            CSS Variables
          </button>
          <button
            onClick={() => setFormat('tailwind')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              format === 'tailwind'
                ? 'border-purple-500 text-purple-400 bg-gray-800/50'
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
            }`}
          >
            <FileCode size={16} />
            Tailwind Config
          </button>
          <button
            onClick={() => setFormat('json')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              format === 'json'
                ? 'border-purple-500 text-purple-400 bg-gray-800/50'
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
            }`}
          >
            <FileJson size={16} />
            JSON Tokens
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative group bg-gray-950">
          <div className="absolute top-2 right-4 text-xs font-mono text-gray-600 bg-gray-900 px-2 py-1 rounded border border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {format === 'css' ? 'theme.css' : format === 'tailwind' ? 'tailwind.config.js' : 'theme.json'}
          </div>
          <pre className="h-full overflow-auto p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap select-all">
            {content}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-800 flex justify-between items-center bg-gray-900">
           <div className="text-xs text-gray-500 hidden sm:block">
             {format === 'css' && 'Paste this into your global styles or main.css.'}
             {format === 'tailwind' && 'Add this to your tailwind.config.js.'}
             {format === 'json' && 'Useful for JS/TS config or other tools.'}
           </div>
           <div className="flex gap-3 ml-auto">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md border border-gray-600 transition-colors text-sm font-medium"
            >
              <Copy size={16} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors font-medium text-sm shadow-lg shadow-purple-900/20"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;