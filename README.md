
  # TRENDE

  TRENDE is a React + Vite prototype for planning and producing short-form trend-driven video content.
  The original concept design is available on Figma:
  https://www.figma.com/design/FHABvSMPwYH91Mh9zqsqg9/TRENDE

  ## Overview

  The app simulates a creator workflow from onboarding to content execution:

  - Welcome and account setup flow
  - Home dashboard for creation entry points
  - Trend discovery experience
  - Analytics and success story views
  - Template selection for guided creation
  - Guided shoot flow with step-by-step shot instructions

  ## Tech Stack

  - React 18
  - Vite 6
  - TypeScript (TS/TSX source files)
  - Radix UI primitives and custom UI wrappers in src/components/ui
  - Lucide icons

  ## Prerequisites

  - Node.js 18+ (recommended)
  - npm 9+ (or compatible npm version)

  ## Getting Started

  1. Install dependencies:

    npm install

  2. Start the development server:

    npm run dev

  3. Open the app in your browser:

    http://localhost:3000

  Note: The Vite server is configured to open automatically on startup.

  ## Available Scripts

  - npm run dev
    Starts the local development server on port 3000.

  - npm run build
    Creates a production build in the build folder.

  ## Project Structure

  index.html                 Vite entry HTML
  src/main.tsx               React bootstrap
  src/App.tsx                App-level screen routing/state flow
  src/components/            Feature screens and shared UI components
  src/components/ui/         Reusable UI primitives
  src/styles/                Global style definitions
  src/guidelines/            Product/content guidance docs

  ## Build Output

  Production artifacts are emitted to:

  build/

  This output directory is set in vite.config.ts.

  ## Notes

  - This repository appears to be a product prototype bundle aligned with the linked Figma design.
  - If you want to add a preview script, you can include Vite's preview command in package.json.
  