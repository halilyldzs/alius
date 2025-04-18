# Electron + React Application

A feature-based structured Electron and React application using TypeScript. This application is part of a monorepo managed with Turborepo.

## Features

- Electron for desktop application
- React for UI
- TypeScript for type safety
- Feature-based folder structure
- Vite for fast development and building
- Turborepo for monorepo management

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
├── dist/              # Build output
│   ├── electron/      # Compiled Electron main process
│   └── renderer/      # Compiled React app
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration for React
├── tsconfig.electron.json # TypeScript configuration for Electron
└── vite.config.ts     # Vite configuration
```

## Getting Started

### Within Monorepo

When working within the monorepo structure, you can use Turborepo commands from the root directory:

1. Install dependencies at the root:

   ```
   npm install
   ```

2. Start development server:

   ```
   npx turbo run electron:dev --filter=electron-app
   ```

3. Build for production:
   ```
   npx turbo run build --filter=electron-app
   npx turbo run electron:build --filter=electron-app
   ```

### Standalone

If you're working directly in the electron-app directory:

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
   npm run build
   npx tsc -p tsconfig.electron.json
   npm run electron:build
   ```

## Troubleshooting

- If you encounter an error related to the main process file not being found, ensure you've built both the React app and the Electron main process by running the appropriate build commands.
- Port 3000 is used by default. If it's already in use, Vite will automatically select another port.

## Development

- All component and style files use kebab-case naming
- React components are written using arrow functions
- Features are organized in their own directories
