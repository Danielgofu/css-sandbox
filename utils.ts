import { ThemeState } from './types';

// Helper to calculate luminance
const getLuminance = (hex: string): number => {
  const rgb = parseInt(hex.slice(1), 16);
  const r = ((rgb >> 16) & 0xff) / 255;
  const g = ((rgb >> 8) & 0xff) / 255;
  const b = (rgb & 0xff) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// Calculate WCAG Contrast Ratio
export const getContrastRatio = (color1: string, color2: string): number => {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

export const getWCAGRating = (ratio: number): { rating: string; color: string } => {
  if (ratio >= 7) return { rating: 'AAA', color: 'text-green-400' };
  if (ratio >= 4.5) return { rating: 'AA', color: 'text-green-300' };
  if (ratio >= 3) return { rating: 'AA Large', color: 'text-yellow-400' };
  return { rating: 'Fail', color: 'text-red-400' };
};

export const generateCSS = (theme: ThemeState): string => {
  const { colors, typography, spacing, effects } = theme;

  const shadowMap: Record<string, string> = {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    hard: '4px 4px 0px 0px rgba(0,0,0,1)',
  };

  return `:root {
  /* Colors */
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-background: ${colors.background};
  --color-surface: ${colors.surface};
  --color-text: ${colors.text};
  --color-border: ${colors.border};

  /* Typography */
  --font-family-base: ${typography.fontFamily}, sans-serif;
  --font-family-heading: ${typography.headingFont}, serif;
  --font-size-base: ${typography.baseSize}px;
  --line-height: ${typography.lineHeight};
  --font-weight: ${typography.fontWeight};

  /* Spacing & Layout */
  --spacing-base: ${spacing.base}px;
  --radius: ${spacing.borderRadius}px;
  --gap: ${spacing.gap}px;

  /* Effects */
  --shadow: ${shadowMap[effects.shadow]};
  --border-width: ${effects.borderWidth}px;
  --hover-scale: ${effects.hoverScale ?? 1.0};
  --hover-opacity: ${effects.hoverOpacity ?? 1.0};
  --hover-shift: -${effects.hoverShift ?? 0}px;
  --hover-duration: ${effects.hoverDuration ?? 0.2}s;
  --hover-easing: ${effects.hoverEasing ?? 'ease-out'};
}`;
};

export const downloadCSS = (content: string, filename: string) => {
  const element = document.createElement('a');
  const file = new Blob([content], { type: 'text/css' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const defaultTheme: ThemeState = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#ffffff',
    surface: '#f3f4f6',
    text: '#111827',
    border: '#e5e7eb',
  },
  typography: {
    fontFamily: 'Inter',
    headingFont: 'Inter',
    baseSize: 16,
    lineHeight: 1.5,
    fontWeight: 400,
  },
  spacing: {
    base: 16,
    borderRadius: 8,
    gap: 16,
  },
  effects: {
    shadow: 'sm',
    borderWidth: 1,
    hoverScale: 1.02,
    hoverOpacity: 0.95,
    hoverShift: 2,
    hoverDuration: 0.2,
    hoverEasing: 'ease-out',
  },
};