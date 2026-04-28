import type { ContributionItem, SculptorDocMapEntry, SculptorProductSpec } from './types'

export const npmProfileUrl = 'https://www.npmjs.com/~imprakhartripathi'
export const sculptorNpmOrgUrl = 'https://www.npmjs.com/org/sculptor'

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
    status: 'Beta',
    shortSummary:
      'A TypeScript-first Express framework split into core, router, config, and CLI packages with a disciplined app runtime.',
    description:
      'Sculptor TS is a framework for teams that want the ergonomics of a modern backend stack without abandoning Express. The current surface area centers on four packages, a shared config model, router decorators or functional routes, and a CLI that handles app creation, local dev, builds, linting, testing, and code generation.',
    features: [
      'Four-package surface: core, router, config, and CLI',
      'Decorator, functional, and hybrid routing styles',
      'Framework config in sculptor.json',
      'Runtime config in props.json',
      'Generated test harness support',
      'Single-command app lifecycle with sc',
    ],
    techStack: ['Express', 'TypeScript', 'CLI Tooling', 'Decorators', 'Configuration'],
    quickStart: [
      'sc new demo-app',
      'cd demo-app',
      'sc dev',
    ],
    npmUrl: sculptorNpmOrgUrl,
    keywords: ['express framework', 'typescript', 'backend product', 'cli', 'architecture'],
  },
]

export const spotlightContributionSlug = 'sculptor-ts'

export const sculptorProductSpec: SculptorProductSpec = {
  brand: 'Sculptor TS',
  namespace: '@sculptor/*',
  cli: 'sc',
  betaNote: 'Beta',
  positioning: 'A TypeScript-first Express framework with disciplined runtime startup, config-driven behavior, and a CLI that keeps the app lifecycle predictable.',
  overview:
    'Sculptor TS is designed to make Express feel structured instead of ad hoc. The framework keeps the moving parts small, names the responsibilities clearly, and lets you choose between class-based decorators, functional routers, or a hybrid of both.',
  packageDocs: [
    {
      title: '@sculptor/core',
      path: 'packages/core/README.md',
      summary: 'Boot the app, resolve config, and mount the registry into a running HTTP server.',
    },
    {
      title: '@sculptor/router',
      path: 'packages/router/README.md',
      summary: 'Decorators and router assembly for controller-based, functional, or hybrid route styles.',
    },
    {
      title: '@sculptor/config',
      path: 'packages/config/README.md',
      summary: 'Load sculptor.json and props.json, merge them, and expose path-based lookups.',
    },
    {
      title: '@sculptor/cli',
      path: 'packages/cli/README.md',
      summary: 'Create apps, run them, generate resources, and keep generated tests in sync.',
    },
  ],
  packageModules: [
    {
      name: '@sculptor/core',
      summary: 'Runtime bootstrap and server startup.',
      responsibilities: [
        'Loads framework and runtime config',
        'Starts the Express server from the registry',
        'Prints the listening port and localhost URL',
      ],
    },
    {
      name: '@sculptor/router',
      summary: 'Decorators and router assembly.',
      responsibilities: [
        'Controller decorators and HTTP method decorators',
        'Middleware attachment at class or method level',
        'Controller and route registration into one router',
      ],
    },
    {
      name: '@sculptor/config',
      summary: 'Framework and runtime config loading.',
      responsibilities: [
        'Reads sculptor.json and props.json',
        'Deep-merges runtime values into framework config',
        'Provides getConfig() lookups by dot path',
      ],
    },
    {
      name: '@sculptor/cli',
      summary: 'App creation and command orchestration.',
      responsibilities: [
        'Creates new apps with the framework defaults',
        'Runs dev, build, lint, test, and generate commands',
        'Generates source files and test harness updates',
      ],
    },
  ],
  routingModes: [
    {
      name: 'Class-based Controller Mode',
      summary: 'Decorator-driven controllers when you want module-oriented structure and explicit route groupings.',
      example: [
        "@Controller('/users')",
        'class UserController {',
        '  @Get("/")',
        '  getAll() { return [] }',
        '}',
      ],
    },
    {
      name: 'Functional Route Mode',
      summary: 'Direct router registration when you want the route map to stay explicit and lightweight.',
      example: [
        'export const userRoutes = (router) => {',
        '  router.get("/", getUsers)',
        '  router.post("/", createUser)',
        '}',
      ],
    },
    {
      name: 'Hybrid Mode',
      summary: 'Mix controllers and direct routers when one feature set benefits from each style.',
      example: [
        'createRouter({',
        '  controllers: [UserController],',
        '  routes: [userRoutes],',
        '  prefix: "/api"',
        '})',
      ],
    },
  ],
  configuration: [
    {
      file: 'sculptor.json',
      purpose: 'Framework behavior, source layout, and generation defaults.',
      highlights: [
        'Project metadata and source root',
        'Routing style: decorator, functional, or hybrid',
        'Testing generation and framework lock',
      ],
      snippet: [
        '{',
        '  "project": { "srcRoot": "src", "entryFile": "main.ts", "devServer": "tsx" },',
        '  "routing": { "style": "hybrid" },',
        '  "testing": { "generate": true }',
        '}',
      ],
    },
    {
      file: 'props.json',
      purpose: 'Runtime settings such as port, prefix, and deploy-time overrides.',
      highlights: [
        'App port and router prefix',
        'Runtime defaults that can be overridden at startup',
        'Values the runtime reads without touching source code',
      ],
      snippet: [
        '{',
        '  "app": { "port": 3000, "prefix": "/api" }',
        '}',
      ],
    },
  ],
  runtimeFlow: [
    'Load sculptor.json and props.json from the app root.',
    'Resolve the port from startApp(), PORT, props.json, or the 3000 default.',
    'Attach Express middleware and build the router from the registry.',
    'Mount controllers and routes under the configured prefix.',
    'Start listening and print the port plus localhost URL.',
  ],
  commandSheet: [
    {
      command: 'sc new demo-app',
      summary: 'Create a new app with the current framework defaults.',
    },
    {
      command: 'sc dev',
      summary: 'Run the app from source with the CLI banner suppressed in the runtime.',
    },
    {
      command: 'sc start',
      summary: 'Start production-style mode from dist/ when the build output exists.',
    },
    {
      command: 'sc build',
      summary: 'Compile the app with the app-local TypeScript config.',
    },
    {
      command: 'sc lint',
      summary: 'Run ESLint from the app root.',
    },
    {
      command: 'sc test',
      summary: 'Run the generated or standard test suite.',
    },
    {
      command: 'sc generate controller user',
      summary: 'Create a controller resource and refresh the generated test registry.',
    },
  ],
  platformCapabilities: [
    'Startup banner suppression in dev',
    'App-root guardrails for lifecycle commands',
    'Generated spec registry when testing is enabled',
    'Config caching by root directory',
    'Controller and router coexistence',
    'Prefix normalization for mounted routers',
  ],
  successCriteria: [
    'A new app can be created, run, and built with one command family.',
    'Routing style stays explicit even as the app grows.',
    'Runtime behavior is declared in config instead of scattered through code.',
    'Generated tests stay aligned with generated resources.',
    'The framework stays understandable from the README and package docs alone.',
  ],
  betaCautions: [
    'Expect small API shifts before v1.',
    'Treat the README and package docs as the current source of truth.',
    'Prefer the guide page when you need the practical workflow, not just the package names.',
  ],
};

export const sculptorGuideDocs: SculptorDocMapEntry[] = [
  {
    title: 'Framework Overview',
    path: '/Sculptor/readme.md',
    summary: 'Start here for the package map, runtime behavior, startup output, and app root rules.',
  },
  {
    title: '@sculptor/cli',
    path: '/Sculptor/CLI-README.md',
    summary: 'Command reference for scaffolding, dev, start, build, lint, test, and generators.',
  },
  {
    title: '@sculptor/core',
    path: '/Sculptor/CORE-README.md',
    summary: 'Runtime startup, config resolution, port handling, and registry behavior.',
  },
  {
    title: '@sculptor/config',
    path: '/Sculptor/CONFIG-README.md',
    summary: 'Config file format, merge rules, cache behavior, and runtime lookup helpers.',
  },
  {
    title: '@sculptor/router',
    path: '/Sculptor/ROUTER-README.md',
    summary: 'Decorator API, prefix handling, and Express router assembly.',
  },
]

export function getContributionBySlug(slug: string) {
  return contributionItems.find((item) => item.slug === slug) ?? null
}
