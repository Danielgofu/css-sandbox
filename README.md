# CSS Sandbox Pro

A professional, responsive, and accessible CSS visual editor. This tool allows developers and designers to visually configure design tokens and preview them in real-time across Bento Grids and Landing Pages.

## Features

- **Mobile-First Design**: Fully responsive interface that adapts from mobile (stacked) to desktop (multi-pane).
- **Real-time Preview**: See changes instantly on a responsive Bento Grid or a comprehensive Landing Page.
- **Visual Editor**: Controls for Colors, Typography, Layout, and Effects.
- **Accessibility First**: Built-in WCAG Contrast checker, semantic HTML, and ARIA attributes.
- **Export**: Generate production-ready CSS variables or JSON.
- **Preset Management**: Save/Load themes via LocalStorage.

## Getting Started

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## Mobile Testing

To test the responsive design:
1.  Open Chrome DevTools (`F12`).
2.  Toggle Device Toolbar (`Ctrl+Shift+M`).
3.  Select devices like "iPhone 12" or "Pixel 5".
4.  Verify that the layout stacks vertically (Header -> Preview -> Editor) and touch targets are accessible (min 44px).

## SEO & Security

### SEO
- **Meta Tags**: Included in `index.html` (Title, Description, Canonical).
- **Open Graph / Twitter**: Configured for social sharing.
- **Structured Data**: JSON-LD included for Organization/Application schema.
- **Files**: `sitemap.xml` and `robots.txt` provided in `public/`.

### Security Best Practices
- **CSP**: Content Security Policy meta tag added to `index.html`.
- **Headers**: Configurations included for Vercel (`vercel.json`) and Netlify (`public/_headers`) enabling HSTS, X-Frame-Options, and X-Content-Type-Options.
- **Input Hygiene**: All inputs in the preview form are sanitized or visual-only (no server submission).
- **Dependencies**: Run `npm audit` to check for vulnerabilities.

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS (Mobile-first utilities)
- Lucide React (Icons)
- Vite

## License

MIT