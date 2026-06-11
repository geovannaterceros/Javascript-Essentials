# Library WebApp - SPA Project Setup

This is a modern Single Page Application (SPA) built with Vite and styled with Tailwind CSS.

## Project Overview
- **Framework**: Vanilla JavaScript with Vite
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: npm
- **Testing**: Vitest (configured)

## Setup Checklist

- [x] Create project directory structure
- [x] Initialize package.json with dependencies
- [ ] Install dependencies
- [ ] Configure Tailwind CSS
- [ ] Set up development server
- [ ] Create initial pages and routing
- [ ] Configure build and development tasks

## Development Instructions

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure
```
library-webapp/
├── src/
│   ├── app.js          # Main application entry
│   ├── router.js       # Client-side routing
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # CSS and Tailwind config
│   └── utils/          # Utility functions
├── public/             # Static assets
├── index.html          # Entry HTML file
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind configuration
└── vite.config.js      # Vite configuration
```
