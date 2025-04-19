# 🚀 Alius

<div align="center">
  
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)

**A modern monorepo project with Electron, React, and TypeScript**

</div>

## 📋 Overview

Alius is a well-organized monorepo managed with Turborepo, designed to create scalable applications with a shared codebase. The project leverages TypeScript throughout to ensure type safety and provide a consistent development experience.

## 🏗️ Project Structure

```
alius/
├── apps/
│   └── electron-app/     # Electron desktop application with React
├── packages/
│   ├── ui/               # Shared React component library
│   ├── eslint-config/    # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
```

## ✨ Features

- **Monorepo Architecture**: Managed by Turborepo for efficient dependency management and build processes
- **Electron App**: Cross-platform desktop application powered by Electron and React
- **Shared Packages**: Reusable UI components, configurations, and utilities
- **Strong Typing**: 100% TypeScript for better developer experience and code reliability
- **Consistent Code Style**: Enforced through ESLint and Prettier
- **Git Hooks**: Automated checks using Husky to maintain code quality
- **Versioning**: Standardized release process with changelogs

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 10 or higher

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/yourusername/alius.git
   cd alius
   ```

2. Install dependencies
   ```sh
   npm install
   ```

### Development

Run all applications and packages in development mode:

```sh
npm run dev
```

Run the Electron application specifically:

```sh
npx turbo run electron:dev --filter=electron-app
```

### Building

Build all applications and packages:

```sh
npm run build
```

### Linting

Check code quality:

```sh
npm run lint
```

## 📝 Code Standards

### File Naming

We use `kebab-case` for all file names:

✅ `user-service.ts`, `button-component.tsx`  
❌ `UserService.ts`, `buttonComponent.tsx`

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code changes (no new features/fixes)
- `perf`: Performance improvements
- `test`: Test-related changes
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Routine tasks/maintenance
- `revert`: Revert previous commit
- `wip`: Work in progress

**Examples**:

- `feat(ui): add new button component`
- `fix(api): resolve authentication issue`
- `docs: update setup instructions`

## 🔄 Versioning

```sh
# Create a new release with version bump and changelog
npm run release

# Create a release manually
npm run release:manual

# Update changelog without bumping version or creating tags
npm run changelog-only
```

## 🛠️ Remote Caching

Enable Turborepo's [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching):

```sh
npx turbo login
npx turbo link
```

## 📚 Resources

- [Turborepo Documentation](https://turbo.build/docs)
- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev/learn)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
