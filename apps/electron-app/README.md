# Electron + React Application

A feature-based structured Electron and React application using TypeScript.

## Features

- Electron for desktop application
- React for UI
- TypeScript for type safety
- Feature-based folder structure
- Vite for fast development and building

## Project Structure

```
electron-app/
├── electron/
│   ├── main.ts        # Main Electron process
│   └── preload.ts     # Preload script
├── src/
│   ├── components/    # Shared components
│   │   ├── header/
│   │   └── footer/
│   ├── features/      # Feature-based modules
│   │   └── home/
│   ├── styles/        # Global styles
│   ├── utils/         # Utility functions
│   ├── app.tsx        # Main app component
│   └── main.tsx       # React entry point
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## Getting Started

1. Install dependencies:

   ```
   npm install
   ```

2. Start development server:

   ```
   npm run electron:dev
   ```

3. Build for production:
   ```
   npm run electron:build
   ```

## Development

- All component and style files use kebab-case naming
- React components are written using arrow functions
- Features are organized in their own directories
