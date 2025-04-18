# Alius Turborepo

This Turborepo is a monorepo project containing multiple packages and applications.

## Contents

This Turborepo includes the following packages and applications:

### Apps and Packages

- `docs`: A [Next.js](https://nextjs.org/) based application
- `web`: A second [Next.js](https://nextjs.org/) based application
- `@repo/ui`: React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: Customized ESLint configurations
- `@repo/typescript-config`: `tsconfig.json` configurations used throughout the monorepo

All packages and applications are written in 100% [TypeScript](https://www.typescriptlang.org/).

### Code Standards

Our project includes the following code standards and configurations:

#### File Naming

- All file names must be in `kebab-case` format
  - Correct: `user-service.ts`, `button-component.tsx`
  - Incorrect: `UserService.ts`, `buttonComponent.tsx`

#### Linting and Formatting

- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Husky](https://typicode.github.io/husky/) for git hooks
- [Conventional Commits](https://www.conventionalcommits.org/) for commit messages

Before each commit:

- Lint check is performed (`npx turbo lint`)
- Code is automatically formatted (`npx prettier --write`)
- Commit message format is validated

#### Commit Message Format

We use the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

Supported types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Test-related changes
- `build`: Changes to the build system
- `ci`: Changes to CI configuration
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit
- `wip`: Work in progress

Examples:

- `feat(ui): add new button component`
- `fix(api): resolve authentication issue`
- `docs: update README with setup instructions`

#### ESLint Rules

- Using `console.log` will generate a warning (`console.warn`, `console.error`, and `console.info` are exempt)
- Return types must be specified in TypeScript functions
- React Hooks must be used according to the rules
- Using the `any` type will generate a warning

### Commands

#### Build

To build all applications and packages:

```sh
npm run build
```

#### Development

To run all applications and packages in development mode:

```sh
npm run dev
```

#### Linting

To lint check the code:

```sh
npm run lint
```

### Remote Caching

Turborepo can use [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching) to share cache artifacts across machines.

To enable Remote Caching:

```sh
npx turbo login
npx turbo link
```

### Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/docs/reference/configuration)
- [CLI Usage](https://turbo.build/docs/reference/command-line-reference)
