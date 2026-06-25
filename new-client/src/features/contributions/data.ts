import type {
  ContributionItem,
  SculptorDocMapEntry,
  SculptorProductSpec,
} from './types'

export const npmProfileUrl = 'https://www.npmjs.com/~imprakhartripathi'
export const sculptorNpmOrgUrl = 'https://www.npmjs.com/org/sculptor'
export const sculptorRepoUrl = "https://github.com/imprakhartripathi/Sculptor";
export const apiUrl = ".netlify/functions/npm-stats?package=";
export const sculptorReleasesUrl = `${sculptorRepoUrl}/releases`
export const sculptorReleaseVersion = "v1.1-26.06";
export const sculptorStableVersion = "v1.1.4";


export const contributionItems: ContributionItem[] = [
  {
    id: "scafollder",
    slug: "scafollder",
    title: "@imprakhartripathi/scafollder",
    packageName: "@imprakhartripathi/scafollder",
    status: "Published",
    shortSummary:
      "CLI tool to scaffold a Node.js + Express + TypeScript + MongoDB backend with a Modified MVC structure.",
    description:
      "Scafollder is a production-focused bootstrap CLI that removes repetitive setup work for backend services. It copies a ready backend template, merges scripts and dependencies into package.json, and leaves you with a runnable service baseline.",
    features: [
      "Pre-configured Express + MongoDB backend",
      "TypeScript-ready development flow",
      "Nodemon + ts-node setup for local iteration",
      "Template merge for scripts and dependencies",
      "Auth-ready and environment-aware structure",
    ],
    techStack: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "MongoDB",
      "JWT",
      "Nodemailer",
      "Razorpay",
    ],
    quickStart: [
      "npx @imprakhartripathi/scafollder init",
      "npm install",
      "npm start",
    ],
    npmUrl: "https://www.npmjs.com/package/@imprakhartripathi/scafollder",
    keywords: ["scaffold", "backend", "express", "typescript", "cli"],
  },
  {
    id: "reactron",
    slug: "reactron",
    title: "@imprakhartripathi/reactron",
    packageName: "@imprakhartripathi/reactron",
    status: "Published",
    shortSummary:
      "CLI tool to bootstrap a custom-structured React + TypeScript + Vite app with component-page-service architecture.",
    description:
      "Reactron helps ship structured frontend projects faster by creating a consistent project foundation with TypeScript, routing, SCSS, linting, and theme service utilities already wired.",
    features: [
      "Vite-powered React + TypeScript setup",
      "Custom component-page-service structure",
      "Pre-configured React Router and strict mode",
      "SCSS/Sass support and theme service",
      "Package script and dependency auto-merge",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "React Router",
      "SCSS",
      "ESLint",
    ],
    quickStart: [
      "npx @imprakhartripathi/reactron init",
      "npm install",
      "npm run dev",
    ],
    npmUrl: "https://www.npmjs.com/package/@imprakhartripathi/reactron",
    keywords: ["react", "vite", "typescript", "cli", "scaffold"],
  },
  {
    id: "routesculpt",
    slug: "routesculpt",
    title: "RouteSculpt",
    packageName: "routesculpt",
    status: "Published",
    shortSummary:
      "Decorator-first routing layer for Express with automatic controller registration and framework-style ergonomics.",
    description:
      "RouteSculpt is a lightweight TypeScript library that introduces clean controller-based routing on top of Express. It supports controller decorators, HTTP method decorators, middleware decorators, and parameter extraction with minimal runtime overhead.",
    features: [
      "Controller decorators with base path support",
      "HTTP decorators: Get, Post, Put, Delete, Patch",
      "Class-level and method-level middleware decorators",
      "Body, Param, and Query parameter decorators",
      "Automatic controller registration with error forwarding",
      "ESM and CommonJS builds with TypeScript typings",
    ],
    techStack: [
      "Express",
      "TypeScript",
      "Decorators",
      "Middleware",
      "reflect-metadata",
    ],
    quickStart: [
      "npm install routesculpt express reflect-metadata",
      "Enable experimentalDecorators and emitDecoratorMetadata in tsconfig",
      "registerControllers(app, [YourController])",
    ],
    npmUrl: "https://www.npmjs.com/package/routesculpt",
    keywords: ["express", "routing", "decorators", "typescript", "controller"],
  },
  {
    id: "sculptor-ts",
    slug: "sculptor-ts",
    title: "SculptorTS",
    packageName: "@sculptor/*",
    status: "Stable",
    shortSummary:
      "A package-aware TypeScript-first Express framework supporting decorator, functional, and hybrid architectures with explicit dependency injection.",
    description:
      "SculptorTS is a modular Express framework built around package contracts, explicit dependency injection, registry-driven tooling, and code generation. It supports decorator, functional, and hybrid application styles while providing diagnostics, package-aware scaffolding, request context support, and unified runtime behavior.",
    features: [
      "Package-aware architecture with @Package()",
      "Decorator, functional, and hybrid application styles",
      "Explicit dependency injection with @AutoInject()",
      "sculptor.packages.json ownership tracking",
      "Package-aware generation and registry synchronization",
      "Request context support via req.ctx",
      "Framework diagnostics with sc doctor",
      "AGENTS.md generation with sc agents",
      "Unified framework error pipeline",
      "Single-command application lifecycle",
    ],
    techStack: [
      "Express",
      "TypeScript",
      "Dependency Injection",
      "CLI Tooling",
      "Decorators",
      "Configuration",
    ],
    quickStart: ["sc new demo-app", "cd demo-app", "sc dev"],
    npmUrl: sculptorNpmOrgUrl,
    keywords: [
      "express",
      "typescript",
      "backend",
      "framework",
      "dependency injection",
      "cli",
      "architecture",
    ],
    version: sculptorReleaseVersion,
  },
];

export const spotlightContributionSlug = 'sculptor-ts'

export const sculptorProductSpec: SculptorProductSpec = {
  brand: "SculptorTS",
  namespace: "@sculptor/*",
  cli: "'sc' and 'sculptor' (on Windows)",
  version: sculptorReleaseVersion,

  positioning:
    "A package-aware TypeScript-first Express framework with explicit dependency injection, registry-driven tooling, and support for decorator, functional, and hybrid architectures.",

  overview:
    "SculptorTS is a modular Express framework built around package contracts, explicit dependency injection, request context support, package-aware code generation, and unified runtime behavior. Applications can be structured using controllers, functional routers, or a hybrid approach while maintaining clear ownership boundaries, predictable startup behavior, and registry-aware tooling.",

  packageSections: [
    {
      name: "@sculptor/cli",
      summary:
        "Scaffolding, generation, diagnostics, package management, and application lifecycle tooling.",
      responsibilities: [
        "Scaffolding, generation, diagnostics, and package lifecycle tooling",
        "Maintains sculptor.packages.json and generated package indexes",
        "Provides AGENTS.md generation and framework-aware sync commands",
      ],
      guideAnchor: "sculptor-cli",
      readmePath: "/Sculptor/CLI-README.md",
      npmPackage: "@sculptor/cli",
      npmUrl: "https://npmjs.com/package/@sculptor/cli",
    },
    {
      name: "@sculptor/core",
      summary:
        "Runtime bootstrap, package composition, request context, and server startup.",
      responsibilities: [
        "Loads framework and runtime configuration",
        "Flattens package composition into runtime registries",
        "Provides request context through req.ctx",
      ],
      guideAnchor: "sculptor-core",
      readmePath: "/Sculptor/CORE-README.md",
      npmPackage: "@sculptor/core",
      npmUrl: "https://npmjs.com/package/@sculptor/core",
    },
    {
      name: "@sculptor/router",
      summary:
        "Decorators, functional routers, middleware metadata, and route assembly.",
      responsibilities: [
        "Controller and HTTP method decorators",
        "Functional router scopes",
        "Middleware metadata and registration",
        "Hybrid routing support",
      ],
      guideAnchor: "sculptor-router",
      readmePath: "/Sculptor/ROUTER-README.md",
      npmPackage: "@sculptor/router",
      npmUrl: "https://npmjs.com/package/@sculptor/router",
    },
    {
      name: "@sculptor/di",
      summary:
        "Explicit dependency injection, package metadata, and package contracts.",
      responsibilities: [
        "Provides @Service(), @Repository(), and @Middleware()",
        "Provides @Package() package metadata",
        "Provides @AutoInject() explicit injection",
        "Detects circular dependencies",
      ],
      guideAnchor: "sculptor-di",
      readmePath: "/Sculptor/DI-README.md",
      npmPackage: "@sculptor/di",
      npmUrl: "https://npmjs.com/package/@sculptor/di",
    },
    {
      name: "@sculptor/config",
      summary:
        "Configuration loading, interpolation, redaction, and path-based lookups.",
      responsibilities: [
        "Reads sculptor.json, props.json, and .env",
        "Resolves recursive variable interpolation",
        "Provides getConfig() lookups",
        "Caches configuration per root directory",
      ],
      guideAnchor: "sculptor-config",
      readmePath: "/Sculptor/CONFIG-README.md",
      npmPackage: "@sculptor/config",
      npmUrl: "https://npmjs.com/package/@sculptor/config",
    },

    {
      name: "@sculptor/paws",
      summary: "Structured logging with standard and dog-mode output.",
      responsibilities: [
        "Provides framework logging",
        "Supports dog-mode personalities",
        "Reads logging settings from configuration",
      ],
      guideAnchor: "sculptor-paws",
      readmePath: "/Sculptor/PAWS-README.md",
      npmPackage: "@sculptor/paws",
      npmUrl: "https://npmjs.com/package/@sculptor/paws",
    },
    {
      name: "@sculptor/template-registry",
      summary:
        "Scaffold and generator templates used by the CLI and package-aware generation.",
      responsibilities: [
        "Hosts scaffold templates",
        "Hosts generator templates",
        "Supports package-aware generation",
        "Supplies template assets to the CLI",
      ],
      guideAnchor: "sculptor-template-registry",
      readmePath: "/Sculptor/TEMPLATE-REGISTRY-README.md",
      npmPackage: "@sculptor/template-registry",
      npmUrl: "https://npmjs.com/package/@sculptor/template-registry",
    },
  ],

  routingModes: [
    {
      name: "Class-based Controller Mode",
      summary:
        "Decorator-driven controllers for applications that prefer structured modules and grouped routes.",
      filename: "user.controller.ts",
      example: [
        "@Controller('/users')",
        "class UserController {",
        '  @Get("/")',
        "  getAll() { return [] }",
        "}",
      ],
    },
    {
      name: "Functional Route Mode",
      summary:
        "Lightweight router composition with explicit route registration and handler separation.",
      filename: "health.route.ts",
      example: [
        "export const health = FunctionalRouter('/health');",
        "health.get(healthHandler);",
        'health.at("/ping").get(healthHandler);',
        "health.use(healthErrorHandler);",
      ],
    },
    {
      name: "Hybrid Mode",
      summary:
        "Combine controller-based and functional routing styles within the same application.",
      filename: "main.ts",
      example: [
        "createRouter({",
        "  controllers: [UserController],",
        "  routes: [userRoutes],",
        '  prefix: "/api"',
        "})",
      ],
    },
    {
      name: "Package-Aware Architecture",
      summary:
        "Organize applications into first-class packages using package metadata and ownership tracking.",
      filename: "users/index.ts",
      example: [
        "@Package({",
        "  name: 'users',",
        "  controllers: [UserController],",
        "  services: [UserService]",
        "})",
      ],
    },
  ],

  configuration: [
    {
      file: "sculptor.json",
      purpose:
        "Framework behavior, source layout, generation defaults, and runtime preferences.",
      highlights: [
        "Project metadata and source root",
        "Routing style: decorator, functional, or hybrid",
        "Testing generation and framework lock",
      ],
      snippet: [
        "{",
        '  "project": { "srcRoot": "src", "entryFile": "main.ts", "devServer": "tsx" },',
        '  "routing": { "style": "hybrid" },',
        '  "testing": { "generate": true }',
        "}",
      ],
    },
    {
      file: "props.json",
      purpose:
        "Runtime settings such as ports, prefixes, and deploy-time configuration.",
      highlights: [
        "App port and router prefix",
        "Runtime defaults",
        "Environment-specific values",
      ],
      snippet: [
        "{",
        '  "app": {',
        '    "port": 3000,',
        '    "prefix": "/api"',
        "  }",
        "}",
      ],
    },
  ],

  runtimeFlow: [
    "Load sculptor.json, props.json, and .env from the app root.",
    "Resolve configuration values and interpolation.",
    "Flatten package composition into runtime registries.",
    "Attach middleware and request context.",
    "Build routers from controllers and functional routes.",
    "Start listening and route errors through the framework pipeline.",
  ],

  commandSheet: [
    {
      command: "sc new demo-app",
      summary: "Create a new application with the current framework defaults.",
    },
    {
      command: "sc dev",
      summary: "Run the application directly from source.",
    },
    {
      command: "sc start",
      summary: "Start the application using production-style startup behavior.",
    },
    {
      command: "sc build",
      summary: "Validate packages and compile the application.",
    },
    {
      command: "sc lint",
      summary: "Run ESLint from the application root.",
    },
    {
      command: "sc test",
      summary: "Run the generated or configured test suite.",
    },
    {
      command: "sc sync",
      summary: "Validate and synchronize sculptor.packages.json.",
    },
    {
      command: "sc doctor",
      summary: "Run project, registry, and compatibility diagnostics.",
    },
    {
      command: "sc g pkg users",
      summary: "Generate a package index and package-local resources.",
    },
    {
      command: "sc config get app.port",
      summary: "Read a configuration value by dot path.",
    },
    {
      command: "sc agents",
      summary: "Generate AGENTS.md for AI coding assistants.",
    },
    {
      command: "sc report",
      summary: "Simplifies reporting Bugs and issues with a single command.",
    },
  ],

  platformCapabilities: [
    "Package-aware architecture",
    "Explicit dependency injection",
    "Request context support",
    "Package ownership tracking",
    "Registry synchronization",
    "AGENTS.md generation",
    "Framework diagnostics",
    "Exact file registration flows",
    "Hybrid routing support",
    "Unified framework error pipeline",
  ],

  successCriteria: [
    "Applications can scale through package-based organization.",
    "Routing style remains explicit as applications grow.",
    "Dependency wiring stays predictable and intentional.",
    "Runtime behavior is declared through configuration.",
    "Package ownership and generation remain synchronized.",
    "Framework documentation is sufficient to understand the runtime model.",
  ],

  releaseNotes: [
    `Current stable runtime line: ${sculptorStableVersion}`,
    `Combined framework release: ${sculptorReleaseVersion}`,
    "Versions before v1.0.0 are deprecated",
    "Future changes are expected to remain additive and backwards-conscious",
  ],
};

export const sculptorGuideDocs: SculptorDocMapEntry[] = [
  {
    title: "Framework Overview",
    url: "/Sculptor/readme.md",
    summary:
      "Start here for the package map, runtime behavior, startup output, and app root rules.",
  },
  {
    title: "Changelog",
    url: "/Sculptor/changelog.md",
    summary:
      "Changelog with versioned entries for new features, improvements, and fixes across all packages.",
  },
  {
    title: "@sculptor/cli",
    url: "/Sculptor/CLI-README.md",
    summary:
      "Command reference for scaffolding, dev, start, build, lint, test, and generators.",
  },
  {
    title: "@sculptor/core",
    url: "/Sculptor/CORE-README.md",
    summary:
      "Runtime startup, config resolution, port handling, and registry behavior.",
  },
  {
    title: "@sculptor/config",
    url: "/Sculptor/CONFIG-README.md",
    summary:
      "Config file format, merge rules, cache behavior, and runtime lookup helpers.",
  },
  {
    title: "@sculptor/router",
    url: "/Sculptor/ROUTER-README.md",
    summary: "Decorator API, prefix handling, and Express router assembly.",
  },
  {
    title: "@sculptor/di",
    url: "/Sculptor/DI-README.md",
    summary: "Dependency injection container for managing and resolving dependencies.",
  },
  {
    title: "@sculptor/paws",
    url: "/Sculptor/PAWS-README.md",
    summary:
      "Lightweight logger with a standard mode and a more expressive dog mode.",
  },
  {
    title: "@sculptor/template-registry",
    url: "/Sculptor/TEMPLATE-REGISTRY-README.md",
    summary:
      "Template registry for managing and resolving templates in the app.",
  },
];

export function getContributionBySlug(slug: string) {
  return contributionItems.find((item) => item.slug === slug) ?? null
}
