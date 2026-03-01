# TransitPulse Frontend

A vintage-themed desktop web application for PMPML bus scheduling optimization and driver rostering, featuring a revolutionary **Rotary Pavilion** navigation design with heritage aesthetics inspired by 1940s-1960s government control systems.

## Features

- **Rotary Hub Mode**: Central command clock, rotating preview cards, and cardinal pressure gauges
- **Full Page Mode**: Individual pages for data upload, optimization, reports, and settings
- **Vintage Aesthetic**: Heritage interface with brass accents, mahogany panels, and parchment backgrounds
- **Smooth Animations**: 60fps animations with mechanical timing functions
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation

## Tech Stack

- **React 18+** - Component library
- **Vite 5+** - Build tool and dev server
- **React Router v6** - Client-side routing
- **CSS Modules** - Component-scoped styling
- **Axios** - HTTP client for API calls

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── hub/             # Rotary hub components
│   └── pages/           # Full page components
├── layouts/             # Layout wrappers
├── styles/              # Global styles and design tokens
├── hooks/               # Custom React hooks
├── services/            # API services
├── context/             # React Context providers
├── utils/               # Helper functions
└── mock-data/           # Mock data for development
```

## Development Guidelines

- Use JavaScript (not TypeScript)
- Follow vintage aesthetic specifications exactly
- Ensure all animations run at 60fps
- Maintain WCAG 2.1 AA accessibility
- Build one module at a time to perfection

## Design Documentation

See the following files for detailed design specifications:
- `TRANSITPULSE_COMPLETE_ROTARY_DESIGN.md` - Complete rotary hub design
- `TRANSITPULSE_ENHANCED_VINTAGE_CLASSIC.md` - Component specifications
- `TRANSITPULSE_FLOW_GUIDE.md` - User flow guide
- `TRANSITPULSE_API_SPEC.md` - API specifications

## License

Proprietary - PMPML
