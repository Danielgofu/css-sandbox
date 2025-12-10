export type PreviewMode = 'bento' | 'landing';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  border: string;
}

export interface ThemeTypography {
  fontFamily: string;
  headingFont: string;
  baseSize: number;
  lineHeight: number;
  fontWeight: number;
}

export interface ThemeSpacing {
  base: number; // padding/margin multiplier
  borderRadius: number;
  gap: number;
}

export interface ThemeEffects {
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'hard';
  borderWidth: number;
  // Hover Animation Properties
  hoverScale: number;
  hoverOpacity: number;
  hoverShift: number; // Y-axis translation (pixels)
  hoverDuration: number; // seconds
  hoverEasing: string;
}

export interface ThemeState {
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  effects: ThemeEffects;
}

export interface Preset {
  id: string;
  name: string;
  theme: ThemeState;
  timestamp: number;
}