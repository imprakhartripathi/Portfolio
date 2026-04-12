import type { ContributionItem, SculptorProductSpec } from './types'

export const npmProfileUrl = 'https://www.npmjs.com/~imprakhartripathi'

export const contributionItems: ContributionItem[] = [
  {
    id: 'scafollder',
    slug: 'scafollder',
    title: '@imprakhartripathi/scafollder',
    packageName: '@imprakhartripathi/scafollder',
    status: 'Published',
    shortSummary:
      'CLI tool to scaffold a Node.js + Express + TypeScript + MongoDB backend with a Modified MVC structure.',
    description:
      'Scafollder is a production-focused bootstrap CLI that removes repetitive setup work for backend services. It copies a ready backend template, merges scripts and dependencies into package.json, and leaves you with a runnable service baseline.',
    features: [
      'Pre-configured Express + MongoDB backend',
      'TypeScript-ready development flow',
      'Nodemon + ts-node setup for local iteration',
      'Template merge for scripts and dependencies',
      'Auth-ready and environment-aware structure',
    ],
    techStack: ['Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'JWT', 'Nodemailer', 'Razorpay'],
    quickStart: [
      'npx @imprakhartripathi/scafollder init',
      'npm install',
      'npm start',
    ],
    npmUrl: 'https://www.npmjs.com/package/@imprakhartripathi/scafollder',
    keywords: ['scaffold', 'backend', 'express', 'typescript', 'cli'],
  },
  {
    id: 'reactron',
    slug: 'reactron',
    title: '@imprakhartripathi/reactron',
    packageName: '@imprakhartripathi/reactron',
    status: 'Published',
    shortSummary:
      'CLI tool to bootstrap a custom-structured React + TypeScript + Vite app with component-page-service architecture.',
    description:
      'Reactron helps ship structured frontend projects faster by creating a consistent project foundation with TypeScript, routing, SCSS, linting, and theme service utilities already wired.',
    features: [
      'Vite-powered React + TypeScript setup',
      'Custom component-page-service structure',
      'Pre-configured React Router and strict mode',
      'SCSS/Sass support and theme service',
      'Package script and dependency auto-merge',
    ],
    techStack: ['React', 'TypeScript', 'Vite', 'React Router', 'SCSS', 'ESLint'],
    quickStart: [
      'npx @imprakhartripathi/reactron init',
      'npm install',
      'npm run dev',
    ],
    npmUrl: 'https://www.npmjs.com/package/@imprakhartripathi/reactron',
    keywords: ['react', 'vite', 'typescript', 'cli', 'scaffold'],
  },
  {
    id: 'routesculpt',
    slug: 'routesculpt',
    title: 'RouteSculpt',
    packageName: 'routesculpt',
    status: 'Published',
    shortSummary:
      'Decorator-first routing layer for Express with automatic controller registration and framework-style ergonomics.',
    description:
      'RouteSculpt is a lightweight TypeScript library that introduces clean controller-based routing on top of Express. It supports controller decorators, HTTP method decorators, middleware decorators, and parameter extraction with minimal runtime overhead.',
    features: [
      'Controller decorators with base path support',
      'HTTP decorators: Get, Post, Put, Delete, Patch',
      'Class-level and method-level middleware decorators',
      'Body, Param, and Query parameter decorators',
      'Automatic controller registration with error forwarding',
      'ESM and CommonJS builds with TypeScript typings',
    ],
    techStack: ['Express', 'TypeScript', 'Decorators', 'Middleware', 'reflect-metadata'],
    quickStart: [
      'npm install routesculpt express reflect-metadata',
      'Enable experimentalDecorators and emitDecoratorMetadata in tsconfig',
      'registerControllers(app, [YourController])',
    ],
    npmUrl: 'https://www.npmjs.com/package/routesculpt',
    keywords: ['express', 'routing', 'decorators', 'typescript', 'controller'],
  },
  {
    id: 'sculptor-ts',
    slug: 'sculptor-ts',
    title: 'Sculptor TS',
    packageName: '@sculptor/*',
    status: 'Coming Soon',
    shortSummary:
      'A productized framework layer over Express: architecture discipline, CLI ergonomics, and configuration-driven backend workflows.',
    description:
      'Sculptor TS builds on the RouteSculpt foundation into a broader product experience with structured app architecture, generated conventions, extensible modules, and runtime configuration for backend systems at scale.',
    features: [
      'Framework CLI for project bootstrapping and generators',
      'Controller + functional routing as first-class options',
      'Config-driven runtime behavior through props.json',
      'Auth, guards, validation, and docs modules',
      'Gateway and discovery roadmap for infra workflows',
      'TypeScript-first architecture with convention + flexibility',
    ],
    techStack: ['Express', 'TypeScript', 'CLI Tooling', 'Modular Architecture', 'Config-driven Runtime'],
    quickStart: [
      'sc new my-api',
      'sc g r user',
      'Configure runtime behavior in props.json',
    ],
    keywords: ['express framework', 'typescript', 'backend product', 'cli', 'architecture'],
  },
]

export const spotlightContributionSlug = 'sculptor-ts'

export const sculptorProductSpec: SculptorProductSpec = {
  brand: "Sculptor TS",
  namespace: "@sculptor/*",
  cli: "sc",
  philosophy: "Convention where helpful, flexibility where necessary.",
  vision: [
    "Spring-style architecture discipline with Express runtime flexibility.",
    "TypeScript-first developer experience with strong CLI ergonomics.",
    "Configuration-driven backend workflows that scale without heavy rewrites.",
  ],
  packageModules: [
    {
      name: "@sculptor/core",
      responsibilities: [
        "Boot lifecycle",
        "Module system",
        "Service container",
        "Config bootstrap",
        "Shared decorators",
      ],
    },
    {
      name: "@sculptor/router",
      responsibilities: [
        "Controllers",
        "Functional routes",
        "Route decorators",
        "Middleware decorators",
        "Auto registration",
      ],
    },
    {
      name: "@sculptor/auth",
      responsibilities: [
        "JWT verification",
        "Auth guards",
        "RBAC primitives",
        "Auth middleware helpers",
      ],
    },
    {
      name: "@sculptor/config",
      responsibilities: [
        "props.json parsing",
        "Env injection",
        "Typed config access",
        "Schema validation",
      ],
    },
    {
      name: "@sculptor/cli",
      responsibilities: [
        "sc runtime",
        "Project creation",
        "Generators",
        "Config updates",
      ],
    },
    {
      name: "@sculptor/validate",
      responsibilities: ["Zod integration", "DTO parsing", "Schema pipes"],
    },
    {
      name: "@sculptor/docs",
      responsibilities: ["OpenAPI generation", "Swagger UI mounting"],
    },
  ],
  routingModes: [
    {
      name: "Class-based Controller Mode",
      summary:
        "Decorator-driven controllers for structured module-oriented APIs.",
      example: [
        "@Controller('/users')",
        "class UserController {",
        "  @Get('/')",
        "  getAll() { return [] }",
        "}",
      ],
    },
    {
      name: "Functional Route Mode",
      summary:
        "Direct handler registration for explicit low-overhead route control.",
      example: [
        "export const userRoutes = (router) => {",
        '  router.get(" / ", getUsers)',
        "}",
        " ",
        " "
      ],
    },
  ],
  configuration: [
    {
      file: "sculptor.json",
      purpose: "CLI + workspace behavior and generation paths.",
      highlights: [
        "Project metadata and source roots",
        "Generation defaults for controllers/services/modules/guards",
        "Route style defaults and plugin registry",
      ],
      snippet: [
        "{",
        '  "project": { "name": "my-api", "srcRoot": "src", "entryFile": "main.ts" },',
        '  "routing": { "style": "decorator" }',
        "}",
      ],
    },
    {
      file: "props.json",
      purpose:
        "Runtime behavior, auth defaults, docs toggles, and infra orchestration.",
      highlights: [
        "Typed app/runtime configuration",
        "Environment variable injection support",
        "Gateway/discovery style runtime options",
      ],
      snippet: [
        "{",
        '  "app": { "name": "my-api", "port": 3000, "prefix": "/api" },',
        '  "auth": { "jwt": true, "secret": "${JWT_SECRET}", "expiry": "1h" }',
        "}",
      ],
    },
  ],
  platformCapabilities: [
    "Route guards for auth, RBAC, feature flags, and API key validation",
    "Controller/service/module boundaries for architecture consistency",
    "Docs generation from controllers and route metadata",
    "Gateway-ready routing via declarative config",
    "Discovery and load-balancing oriented runtime model",
    "Starter modules for web/auth/gateway/discovery flows",
  ],
  successCriteria: [
    "Bootstrap services quickly with sc new",
    "Generate features quickly with sc g generators",
    "Enable auth and docs through config rather than repetitive boilerplate",
    "Scale from local API services to infra-aware systems without structural rewrites",
  ],
};

export function getContributionBySlug(slug: string) {
  return contributionItems.find((item) => item.slug === slug) ?? null
}
