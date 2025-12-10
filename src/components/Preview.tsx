import React, { useState } from 'react';
import { PreviewMode, ThemeState } from '../../types';
import { generateCSS } from '../utils';
import { 
  CreditCard, Bell, CheckCircle, User, Settings, ArrowRight, Search, Menu, X, 
  Zap, Layout, Shield, Smartphone, ChevronDown, Mail, Globe, Github, Twitter,
  Tablet, Monitor, BarChart3, Users, Calendar, Star, Quote, Play, SkipForward, 
  SkipBack, MousePointerClick, Sliders, Download, HelpCircle,
  ArrowDown
} from 'lucide-react';

interface PreviewProps {
  mode: PreviewMode;
  theme: ThemeState;
}

type ViewportSize = 'mobile' | 'tablet' | 'desktop';

const Preview: React.FC<PreviewProps> = ({ mode, theme }) => {
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const css = generateCSS(theme);

  return (
    <div className="w-full h-full bg-gray-950 relative flex flex-col">
      {/* Viewport Toolbar */}
      <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-center gap-4 shrink-0 z-30 shadow-sm">
        <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
          <button 
            onClick={() => setViewport('mobile')}
            className={`p-2 rounded-md transition-all flex items-center gap-2 ${viewport === 'mobile' ? 'bg-gray-700 text-purple-400 shadow-sm' : 'text-gray-400 hover:text-white'}`}
            title="Mobile View (375px)"
          >
            <Smartphone size={18} />
            <span className="text-xs font-medium hidden sm:inline">Mobile</span>
          </button>
          <button 
            onClick={() => setViewport('tablet')}
            className={`p-2 rounded-md transition-all flex items-center gap-2 ${viewport === 'tablet' ? 'bg-gray-700 text-purple-400 shadow-sm' : 'text-gray-400 hover:text-white'}`}
            title="Tablet View (768px)"
          >
            <Tablet size={18} />
            <span className="text-xs font-medium hidden sm:inline">Tablet</span>
          </button>
          <button 
            onClick={() => setViewport('desktop')}
            className={`p-2 rounded-md transition-all flex items-center gap-2 ${viewport === 'desktop' ? 'bg-gray-700 text-purple-400 shadow-sm' : 'text-gray-400 hover:text-white'}`}
            title="Desktop View (Full Width)"
          >
            <Monitor size={18} />
            <span className="text-xs font-medium hidden sm:inline">Desktop</span>
          </button>
        </div>
      </div>

      {/* Dynamic Style Injection */}
      <style>{css}</style>
      <style>{`
        .preview-content {
          font-family: var(--font-family-base);
          background-color: var(--color-background);
          color: var(--color-text);
          font-size: var(--font-size-base);
          line-height: var(--line-height);
          font-weight: var(--font-weight);
          /* Smooth scrolling inside preview */
          scroll-behavior: smooth;
        }
        
        .preview-h1 {
          font-family: var(--font-family-heading);
          font-weight: 700;
          line-height: 1.1;
        }
        .preview-h2 {
          font-family: var(--font-family-heading);
          font-weight: 600;
          line-height: 1.2;
        }
        .preview-h3 {
          font-family: var(--font-family-heading);
          font-weight: 600;
        }

        .preview-card {
           background-color: var(--color-surface);
           border: var(--border-width) solid var(--color-border);
           border-radius: var(--radius);
           box-shadow: var(--shadow);
           padding: var(--spacing-base);
           transition: transform var(--hover-duration) var(--hover-easing), box-shadow var(--hover-duration) var(--hover-easing), opacity var(--hover-duration) var(--hover-easing);
        }
        .preview-card:hover {
           transform: translateY(var(--hover-shift)) scale(var(--hover-scale));
           opacity: var(--hover-opacity);
           z-index: 1;
        }

        .preview-btn-primary {
          background-color: var(--color-primary);
          color: white;
          padding: calc(var(--spacing-base) / 2) var(--spacing-base);
          border-radius: var(--radius);
          border: none;
          cursor: pointer;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px; /* Accessible touch target */
          transition: transform var(--hover-duration) var(--hover-easing), filter 0.2s ease, opacity var(--hover-duration) var(--hover-easing);
        }
        .preview-btn-primary:hover { 
          filter: brightness(1.1); 
          transform: translateY(var(--hover-shift)) scale(var(--hover-scale));
          opacity: var(--hover-opacity);
        }
        .preview-btn-primary:focus-visible { outline: 2px solid var(--color-text); outline-offset: 2px; }

        .preview-btn-secondary {
          background-color: var(--color-secondary);
          color: white;
          padding: calc(var(--spacing-base) / 2) var(--spacing-base;
          border-radius: var(--radius);
          border: none;
          cursor: pointer;
          font-weight: 500;
          min-height: 44px;
          transition: transform var(--hover-duration) var(--hover-easing), opacity var(--hover-duration) var(--hover-easing);
        }
        .preview-btn-secondary:hover {
          transform: translateY(var(--hover-shift)) scale(var(--hover-scale));
          opacity: var(--hover-opacity);
        }

        .preview-btn-outline {
          background-color: transparent;
          color: var(--color-text);
          border: var(--border-width) solid var(--color-border);
          padding: calc(var(--spacing-base) / 2) var(--spacing-base);
          border-radius: var(--radius);
          cursor: pointer;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform var(--hover-duration) var(--hover-easing), opacity var(--hover-duration) var(--hover-easing);
        }
        .preview-btn-outline:hover {
          transform: translateY(var(--hover-shift)) scale(var(--hover-scale));
          opacity: var(--hover-opacity);
        }

        .preview-input {
          width: 100%;
          padding: calc(var(--spacing-base) / 2);
          border: var(--border-width) solid var(--color-border);
          border-radius: var(--radius);
          background: var(--color-background);
          color: var(--color-text);
          margin-bottom: var(--spacing-base);
          min-height: 44px;
        }
        
        .preview-badge {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 0.8em;
          font-weight: 600;
          background-color: var(--color-primary);
          color: white;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }

        /* Scrollbar styles for the preview window itself */
        .preview-content::-webkit-scrollbar {
          width: 6px;
        }
        .preview-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .preview-content::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 20px;
        }
      `}</style>

      {/* Preview Container */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex items-start justify-center bg-gray-900 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]">
        <div 
          className={`relative transition-all duration-300 isolate bg-gray-950 shadow-2xl ${
            viewport === 'mobile' ? 'w-[375px] h-[750px] rounded-[3rem] border-[12px] border-gray-800 ring-1 ring-white/10' :
            viewport === 'tablet' ? 'w-[768px] h-[1024px] rounded-[2rem] border-[12px] border-gray-800 ring-1 ring-white/10' :
            'w-full max-w-7xl h-full rounded-xl border border-gray-800'
          }`}
        >
          {/* Device Camera/Notch Visuals for Mobile/Tablet */}
          {(viewport === 'mobile' || viewport === 'tablet') && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-gray-800 rounded-b-xl z-20 flex justify-center items-center">
                <div className="w-16 h-1 bg-gray-700 rounded-full"></div>
            </div>
          )}

          <div className={`w-full h-full overflow-y-auto overflow-x-hidden preview-content ${
            viewport === 'mobile' ? 'rounded-[2.2rem]' : viewport === 'tablet' ? 'rounded-[1.3rem]' : 'rounded-xl'
          }`}>
             {mode === 'bento' ? <BentoGrid viewport={viewport} /> : <LandingPage viewport={viewport} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// We use manual breakpoint logic because Tailwind media queries depend on the WINDOW width, 
// not the container width. To simulate mobile layout on a desktop screen, we must force classes.

const BentoGrid = ({ viewport }: { viewport: ViewportSize }) => {
  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';
  
  // Grid Cols Logic
  const gridClasses = isMobile 
    ? 'grid-cols-1' 
    : isTablet 
      ? 'grid-cols-2' 
      : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4';

  // Span Logic
  const colSpan2 = isMobile ? '' : 'col-span-2';
  
  return (
    <div className={`p-[var(--spacing-base)] w-full max-w-7xl mx-auto grid gap-[var(--gap)] ${gridClasses} auto-rows-min md:auto-rows-[minmax(180px,auto)]`}>
      
      {/* Welcome Card */}
      <div className={`preview-card flex flex-col justify-center ${colSpan2}`}>
        <h1 className="preview-h1 text-3xl md:text-4xl mb-2">Welcome Back!</h1>
        <p className="opacity-70 text-sm md:text-base">This is a responsive bento-style layout. We simulate the layout based on your selected viewport.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="preview-btn-primary">Get Started</button>
          <button className="preview-btn-outline">Documentation</button>
        </div>
      </div>

      {/* Stat Card */}
      <div className="preview-card flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] bg-opacity-10 text-[var(--color-primary)] flex items-center justify-center mb-2">
          <Bell size={24} />
        </div>
        <h3 className="preview-h2 text-2xl font-bold">12</h3>
        <span className="opacity-60 text-sm">Notifications</span>
      </div>

      {/* Music Player Card (New) */}
      <div className="preview-card flex flex-col justify-center gap-3">
         <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg flex items-center justify-center text-white">
               <Zap size={20} fill="currentColor" />
            </div>
            <div className="overflow-hidden">
               <div className="font-bold truncate">Daily Mix 1</div>
               <div className="text-xs opacity-60 truncate">Made for you</div>
            </div>
         </div>
         <div className="flex items-center justify-between mt-1">
            <SkipBack size={20} className="opacity-50 hover:opacity-100 cursor-pointer" />
            <div className="w-10 h-10 bg-[var(--color-text)] text-[var(--color-background)] rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
               <Play size={18} fill="currentColor" className="ml-0.5" />
            </div>
            <SkipForward size={20} className="opacity-50 hover:opacity-100 cursor-pointer" />
         </div>
         <div className="h-1 bg-[var(--color-border)] rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-[var(--color-primary)]"></div>
         </div>
      </div>

      {/* Team Card (New) */}
      <div className="preview-card flex flex-col justify-evenly">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="preview-h3 text-lg">Team 1</h3>
            <Users size={16} className="opacity-50" />
          </div>
          <div className="flex -space-x-3 overflow-hidden py-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-[var(--color-surface)] bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                U{i}
              </div>
            ))}
            <div className="h-10 w-10 rounded-full ring-2 ring-[var(--color-surface)] bg-[var(--color-primary)] flex items-center justify-center text-white text-xs">
              +5
            </div>
          </div>
        </div>
        <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="preview-h3 text-lg">Team 2</h3>
          <Users size={16} className="opacity-50" />
        </div>
        <div className="flex -space-x-3 overflow-hidden py-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-[var(--color-surface)] bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
              U{i}
            </div>
          ))}
          <div className="h-10 w-10 rounded-full ring-2 ring-[var(--color-surface)] bg-[var(--color-primary)] flex items-center justify-center text-white text-xs">
            +2
          </div>
        </div>
        </div>
        <button className="text-xs text-[var(--color-primary)] font-bold mt-2 hover:underline text-left">Manage Members</button>
      </div>

      {/* Form Card */}
      <div className="preview-card flex flex-col justify-between p-8">
  <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
  <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-1">
    <label className="block text-sm text-gray-600 mb-1">Full Name</label>
    <input
      type="text"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="John Doe"
    />

    <label className="block text-sm text-gray-600 mb-1">Email</label>
    <input
      type="email"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="john@example.com"
    />

    <label className="block text-sm text-gray-600 mb-1">Bio</label>
    <textarea
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      rows={3}
      placeholder="Tell us about yourself"
    ></textarea>

    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
      Save Changes
    </button>
  </form>
</div>

      {/* Feature List */}
      <div className={`preview-card ${colSpan2} flex justify-center flex-col gap-4` }>
        <div className="flex items-center justify-between mb-4">
          <h3 className="preview-h3 text-lg">Recent Transactions</h3>
          <span className="preview-badge">New</span>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 border-b border-[var(--color-border)] pb-2 last:border-0 last:pb-0">
              <div className="w-10 h-10 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text)] shrink-0">
                <CreditCard size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">Subscription Payment</p>
                <p className="text-sm opacity-60">Today, 2:30 PM</p>
              </div>
              <span className="font-mono font-bold whitespace-nowrap">-$24.00</span>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Card (New) */}
      <div className="preview-card flex flex-col">
         <div className="flex items-center justify-between mb-4">
           <h3 className="preview-h3 text-lg">Analytics</h3>
           <BarChart3 size={16} className="opacity-50" />
         </div>
         <div className="flex-1 flex items-end justify-between gap-2 h-24">
           {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
             <div key={i} className="w-full bg-[var(--color-primary)] opacity-20 hover:opacity-100 transition-opacity rounded-t-sm relative group" style={{ height: `${h}%` }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">{h}%</div>
             </div>
           ))}
         </div>
         <div className="flex justify-between mt-2 text-xs opacity-50 font-mono">
           <span>Mon</span><span>Sun</span>
         </div>
      </div>

      {/* Image Card */}
      <div className="preview-card p-0 overflow-hidden relative min-h-[200px] flex items-end group">
         <img 
           src="https://picsum.photos/400/300" 
           srcSet="https://picsum.photos/400/300 1x, https://picsum.photos/800/600 2x"
           className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" 
           alt="Abstract" 
           loading="lazy"
         />
         <div className="relative z-10 p-[var(--spacing-base)] w-full bg-gradient-to-t from-[var(--color-text)] to-transparent">
           <p className="text-[var(--color-background)] font-medium">Dynamic Media</p>
         </div>
      </div>
      
       {/* Toggle Switch Demo */}
       <div className="preview-card flex flex-col justify-center gap-4">
         <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <div className="w-12 h-6 bg-[var(--color-primary)] rounded-full relative">
              <div className="absolute right-1 top-1 bottom-1 w-4 bg-white rounded-full transition-all"></div>
            </div>
         </div>
         <div className="flex items-center justify-between">
            <span>Notifications</span>
            <div className="w-12 h-6 bg-[var(--color-border)] rounded-full relative">
              <div className="absolute left-1 top-1 bottom-1 w-4 bg-white rounded-full shadow-sm transition-all"></div>
            </div>
         </div>
       </div>

       {/* Calendar Card (New) */}
       <div className="preview-card flex flex-col">
          <div className="flex items-center justify-between mb-4">
             <h3 className="preview-h3 text-lg">Schedule</h3>
             <Calendar size={16} className="opacity-50" />
          </div>
          <div className="space-y-3">
             <div className="flex gap-3 items-start">
                <div className="flex flex-col items-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded p-1 min-w-[3rem]">
                   <span className="text-xs uppercase font-bold text-[var(--color-secondary)]">Oct</span>
                   <span className="text-lg font-bold">24</span>
                </div>
                <div>
                   <h4 className="font-bold text-sm">Design Review</h4>
                   <p className="text-xs opacity-60">10:00 AM • Zoom</p>
                </div>
             </div>
             <div className="flex gap-3 items-start">
                <div className="flex flex-col items-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded p-1 min-w-[3rem]">
                   <span className="text-xs uppercase font-bold text-[var(--color-secondary)]">Oct</span>
                   <span className="text-lg font-bold">28</span>
                </div>
                <div>
                   <h4 className="font-bold text-sm">Sprint Planning</h4>
                   <p className="text-xs opacity-60">2:00 PM • Office</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

const LandingPage = ({ viewport }: { viewport: ViewportSize }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const isMobile = viewport === 'mobile';
  
  // Reset menu if viewport changes to desktop
  React.useEffect(() => {
    if (!isMobile) setMobileMenu(false);
  }, [isMobile]);

  // Handle smooth scroll and focus management
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Accessibility: move focus to the section for keyboard users
      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });
    }
    setMobileMenu(false);
  };

  return (
    <div className="min-h-full flex flex-col bg-[var(--color-background)]">
      {/* Navbar */}
      <nav className="border-b border-[var(--color-border)] p-[var(--spacing-base)] sticky top-0 bg-[var(--color-background)] z-50 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="font-bold text-xl tracking-tight text-[var(--color-primary)] flex items-center gap-2">
            <Layout size={24} /> Brand.io
          </a>
          
          <div className={`${isMobile ? 'hidden' : 'flex'} gap-[var(--gap)] items-center`}>
            <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className="opacity-70 hover:opacity-100 font-medium hover:text-[var(--color-primary)] transition-colors">How it works</a>
            <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="opacity-70 hover:opacity-100 font-medium hover:text-[var(--color-primary)] transition-colors">Features</a>
            <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')} className="opacity-70 hover:opacity-100 font-medium hover:text-[var(--color-primary)] transition-colors">Stories</a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="opacity-70 hover:opacity-100 font-medium hover:text-[var(--color-primary)] transition-colors">Pricing</a>
            <button className="preview-btn-primary">Sign Up</button>
          </div>

          <button 
            className={`${isMobile ? 'block' : 'hidden'} p-2 text-[var(--color-text)]`} 
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenu && (
          <div className="flex flex-col gap-2 pb-4 border-t border-[var(--color-border)] pt-4 animate-fade-in">
             <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className="block p-3 rounded hover:bg-[var(--color-surface)] font-medium">How it works</a>
             <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="block p-3 rounded hover:bg-[var(--color-surface)] font-medium">Features</a>
             <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')} className="block p-3 rounded hover:bg-[var(--color-surface)] font-medium">Stories</a>
             <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="block p-3 rounded hover:bg-[var(--color-surface)] font-medium">Pricing</a>
             <button className="preview-btn-primary w-full mt-2">Sign Up Now</button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="py-20 px-[var(--spacing-base)] text-center max-w-5xl mx-auto">
        <span className="preview-badge mb-4">v2.0 Released</span>
        <h1 className="preview-h1 text-6xl md:text-5xl mb-4">Build faster with accessible styles.</h1>
        <p className="text-xl opacity-70 mb-8 max-w-2xl mx-auto">
          Generate beautiful, consistent, and compliant design systems in seconds. Export directly to CSS or JSON.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-[var(--spacing-base)]">
          <button className="preview-btn-primary text-lg px-8 py-4">Start Building Free</button>
          <button className="preview-btn-outline text-lg px-8 py-4 flex items-center gap-2 justify-center">
            View Demo <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Trusted By Section (New) */}
<section className="py-10 px-[var(--spacing-base)] border-y border-[var(--color-border)] bg-[var(--color-surface)]/30">
  <p className="text-center text-sm font-bold uppercase tracking-widest opacity-40 mb-8">
    Trusted by teams at
  </p>
  <div
    className={`max-w-6xl mx-auto grid ${
      viewport === 'mobile' ? 'grid-cols-1 gap-4' : 'grid-cols-3 md:grid-cols-5 gap-8'
    } items-center`}
  >
    {/* Placeholder Logos */}
    <div className="flex items-center gap-2 font-bold text-xl justify-center opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100">
      <Globe size={24} /> Acme Corp
    </div>
    <div className="flex items-center gap-2 font-bold text-xl justify-center opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100">
      <Github size={24} /> DevTools
    </div>
    <div className="flex items-center gap-2 font-bold text-xl justify-center opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100">
      <Twitter size={24} /> Twitter
    </div>
    <div className="flex items-center gap-2 font-bold text-xl justify-center opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100">
      <Layout size={24} /> DesignIo
    </div>
    <div className="flex items-center gap-2 font-bold text-xl justify-center opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100">
      <Shield size={24} /> SecureNet
    </div>
  </div>
</section>

      {/* How it Works (New) */}
      <section id="how-it-works" className="py-20 px-[var(--spacing-base)] bg-[var(--color-background)]">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="preview-h2 text-3xl md:text-5xl mb-4">How it works</h2>
      <p className="text-xl opacity-60 max-w-2xl mx-auto">
        Create your dream design system in three simple steps.
      </p>
    </div>

    <div
      className={`grid ${
        viewport === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
      } gap-[var(--gap)]`}
    >
      {/* Configure Card */}
      <div className="preview-card flex flex-col items-center text-center p-8">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
          <Sliders size={32} />
        </div>
        <h3 className="preview-h3 text-xl mb-3">1. Configure</h3>
        <p className="opacity-70">
          Adjust colors, typography, and spacing using the visual editor
          controls.
        </p>
      </div>

      {/* Preview Card */}
      <div className="preview-card flex flex-col items-center text-center p-8">
        <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
          <Layout size={32} />
        </div>
        <h3 className="preview-h3 text-xl mb-3">2. Preview</h3>
        <p className="opacity-70">
          See your changes instantly applied to real-world components and
          layouts.
        </p>
      </div>

      {/* Export Card */}
      <div className="preview-card flex flex-col items-center text-center p-8">
        <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-6">
          <Download size={32} />
        </div>
        <h3 className="preview-h3 text-xl mb-3">3. Export</h3>
        <p className="opacity-70">
          Copy the generated CSS variables or download a JSON token file.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Features Grid */}
      <section id="features" className="bg-[var(--color-surface)] py-20 px-[var(--spacing-base)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="preview-h2 text-3xl md:text-4xl mb-4">Everything you need</h2>
            <p className="opacity-60 max-w-2xl mx-auto">
              Built for developers who care about accessibility and design tokens.
            </p>
          </div>
          
          <div
            className={`grid ${
              viewport === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
            } gap-[var(--gap)]`}
          >
            {[
              {
                icon: CheckCircle,
                title: 'Accessible',
                text: 'WCAG AA & AAA compliant contrast ratios automatically calculated.',
              },
              {
                icon: Settings,
                title: 'Configurable',
                text: 'Fine-tune every aspect: typography, spacing, shadows, and borders.',
              },
              {
                icon: User,
                title: 'User First',
                text: 'Designed for developers and designers who care about UX.',
              },
              {
                icon: Smartphone,
                title: 'Responsive',
                text: 'Preview your designs on Mobile, Tablet, and Desktop viewports.',
              },
              {
                icon: Zap,
                title: 'Fast',
                text: 'Zero-latency preview. See changes as you type or slide.',
              },
              {
                icon: Shield,
                title: 'Type Safe',
                text: 'Generated TypeScript interfaces and JSON schemas available.',
              },
            ].map((feature, i) => (
              <div key={i} className="preview-card bg-[var(--color-background)]">
                <div className="w-12 h-12 rounded bg-[var(--color-surface)] text-[var(--color-primary)] flex items-center justify-center mb-4">
                  <feature.icon />
                </div>
                <h3 className="preview-h3 text-xl mb-2">{feature.title}</h3>
                <p className="opacity-70">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (New) */}
      <section id="testimonials" className="py-20 px-[var(--spacing-base)] bg-[var(--color-background)]">
  <div className="max-w-6xl mx-auto">
    <h2 className="preview-h2 text-3xl md:text-4xl mb-12 text-center">Loved by Designers</h2>
    <div
      className={`grid ${
        viewport === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
      } gap-[var(--gap)]`}
    >
      {[
        {
          name: "Sarah J.",
          role: "Frontend Dev",
          text: "This tool saved me hours setting up my design tokens. The contrast checker is a lifesaver.",
        },
        {
          name: "Mike T.",
          role: "UI Designer",
          text: "I love the bento grid preview. It helps me visualize how components sit together in a real layout.",
        },
        {
          name: "Alex R.",
          role: "CTO",
          text: "The export feature is perfect. We drop the JSON straight into our build pipeline.",
        },
      ].map((t, i) => (
        <div key={i} className="preview-card relative">
          <Quote
            size={48}
            className="absolute top-4 right-4 opacity-5 text-[var(--color-text)]"
          />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div>
              <div className="font-bold">{t.name}</div>
              <div className="text-xs opacity-60">{t.role}</div>
            </div>
          </div>
          <p className="opacity-80 italic">"{t.text}"</p>
          <div className="flex text-[var(--color-primary)] mt-4">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Pricing Section (New) */}
      <section id="pricing" className="py-20 px-[var(--spacing-base)] bg-[var(--color-surface)]">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="preview-h2 text-3xl md:text-4xl mb-6">Simple Pricing</h2>
    <p className="opacity-60 mb-12">Start for free, upgrade when you need more power.</p>

    <div
      className={`grid ${
        viewport === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
      } gap-8 items-start`}
    >
      {/* Free Tier */}
      <div className="preview-card bg-[var(--color-background)] p-8">
        <h3 className="text-xl font-bold mb-2">Hobby</h3>
        <div className="text-4xl font-bold mb-6">
          $0<span className="text-base font-normal opacity-50">/mo</span>
        </div>
        <ul className="text-left space-y-3 mb-8 opacity-80">
          <li className="flex gap-2">
            <CheckCircle size={18} className="text-[var(--color-primary)]" />{" "}
            Unlimited Projects
          </li>
          <li className="flex gap-2">
            <CheckCircle size={18} className="text-[var(--color-primary)]" />{" "}
            Basic Export
          </li>
          <li className="flex gap-2">
            <CheckCircle size={18} className="text-[var(--color-primary)]" />{" "}
            Community Support
          </li>
        </ul>
        <button className="preview-btn-outline w-full">Get Started</button>
      </div>

      {/* Pro Tier */}
      <div className="preview-card bg-[var(--color-background)] p-8 border-[var(--color-primary)] border-2 relative transform md:-translate-y-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
          Most Popular
        </div>
        <h3 className="text-xl font-bold mb-2">Pro</h3>
        <div className="text-4xl font-bold mb-6">
          $29<span className="text-base font-normal opacity-50">/mo</span>
        </div>
        <ul className="text-left space-y-3 mb-8 opacity-80">
          <li className="flex gap-2">
            <CheckCircle size={18} className="text-[var(--color-primary)]" />{" "}
            Everything in Hobby
          </li>
          <li className="flex gap-2">
            <CheckCircle size={18} className="text-[var(--color-primary)]" />{" "}
            Advanced Export (JSON/TS)
          </li>
          <li className="flex gap-2">
            <CheckCircle size={18} className="text-[var(--color-primary)]" />{" "}
            Team Collaboration
          </li>
        </ul>
        <button className="preview-btn-primary w-full">Start Free Trial</button>
      </div>

      {/* Enterprise Tier */}
      <div className="preview-card bg-[var(--color-background)] p-8">
        <h3 className="text-xl font-bold mb-2">Enterprise</h3>
        <div className="text-4xl font-bold mb-6">Custom</div>
        <ul className="text-left space-y-3 mb-8 opacity-80">
          <li className="flex gap-2">
            <CheckCircle size={18} className="text-[var(--color-primary)]" />{" "}
            SSO & Security
          </li>
          <li className="flex gap-2">
            <CheckCircle size={18} className="text-[var(--color-primary)]" />{" "}
            Dedicated Support
          </li>
          <li className="flex gap-2">
            <CheckCircle size={18} className="text-[var(--color-primary)]" />{" "}
            Custom SLA
          </li>
        </ul>
        <button className="preview-btn-outline w-full">Contact Sales</button>
      </div>
    </div>
  </div>
</section>

      {/* FAQ Section (New) */}
      <section className="py-20 px-[var(--spacing-base)] bg-[var(--color-background)]">
         <div className="max-w-3xl mx-auto">
            <h2 className="preview-h2 text-3xl mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
               {[
                  { q: "Is this free to use?", a: "Yes, the basic version is completely free for personal and commercial projects." },
                  { q: "Can I export to Tailwind CSS?", a: "Absolutely. You can export a `tailwind.config.js` file directly from the export panel." },
                  { q: "Does it support Dark Mode?", a: "Currently we support a single theme mode, but you can create a separate preset for dark mode and switch between them." }
               ].map((item, i) => (
                  <details key={i} className="preview-card group cursor-pointer">
                     <summary className="flex items-center justify-between font-bold list-none">
                        {item.q}
                        <ChevronDown className="transition-transform group-open:rotate-180" />
                     </summary>
                     <p className="mt-4 opacity-70 leading-relaxed">{item.a}</p>
                  </details>
               ))}
            </div>
         </div>
      </section>

      {/* Contact / Newsletter */}
      <section className="py-20 px-[var(--spacing-base)] bg-[var(--color-primary)] text-white">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="font-bold text-3xl mb-4">Ready to streamline your design workflow?</h2>
    <p className="mb-8 opacity-90">Join 10,000+ developers building better UIs today.</p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`flex flex-col ${
        viewport === 'mobile' ? 'gap-4' : 'sm:flex-row gap-4 justify-center'
      } max-w-lg mx-auto`}
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white flex-1"
        required
      />
      <button className="bg-white text-[var(--color-primary)] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
        Get Started
      </button>
    </form>
  </div>
</section>

       {/* Footer */}
       <footer className="mt-auto border-t border-[var(--color-border)] py-12 px-[var(--spacing-base)] bg-[var(--color-background)]">
  <div
    className={`max-w-7xl mx-auto ${
      viewport === 'mobile' ? 'flex flex-col gap-8' : 'grid grid-cols-1 md:grid-cols-2 gap-8'
    }`}
  >
    <div>
      <div className="text-[var(--color-primary)] font-bold text-xl mb-4 flex items-center gap-2">
        <Layout size={20} /> Brand.io
      </div>
      <p className="text-sm opacity-60 max-w-xs">
        Making the web more beautiful and accessible, one token at a time.
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
      <div>
        <h4 className="font-bold mb-3">Product</h4>
        <ul className="space-y-2 opacity-70">
          <li>
            <a href="#" className="hover:underline">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Changelog
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-3">Resources</h4>
        <ul className="space-y-2 opacity-70">
          <li>
            <a href="#" className="hover:underline">
              Documentation
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Community
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Blog
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-3">Company</h4>
        <ul className="space-y-2 opacity-70">
          <li>
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Careers
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Legal
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-50">
    <div>&copy; 2024 Brand.io Inc. All rights reserved.</div>
    <div className="flex gap-4">
      <Twitter size={16} />
      <Github size={16} />
      <Globe size={16} />
    </div>
  </div>
</footer>
    </div>
  );
};

export default Preview;