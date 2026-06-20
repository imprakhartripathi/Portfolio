# SculptorTS

![SculptorTS](https://raw.githubusercontent.com/imprakhartripathi/Sculptor/main/assets/sculptor-full-bg.png)

<p align="center">
  <img src="https://img.shields.io/npm/d18m/%40sculptor%2Fcli?style=for-the-badge&label=CLI&labelColor=1e1e2e&color=4F46E5" />
  <img src="https://img.shields.io/npm/d18m/%40sculptor%2Fcore?style=for-the-badge&label=CORE&labelColor=1e1e2e&color=4F46E5" />
  <img src="https://img.shields.io/npm/d18m/%40sculptor%2Frouter?style=for-the-badge&label=ROUTER&labelColor=1e1e2e&color=4F46E5" />
  <img src="https://img.shields.io/npm/d18m/%40sculptor%2Fdi?style=for-the-badge&label=DI&labelColor=1e1e2e&color=4F46E5" />
  <img src="https://img.shields.io/npm/d18m/%40sculptor%2Fconfig?style=for-the-badge&label=CONFIG&labelColor=1e1e2e&color=4F46E5" />
  <img src="https://img.shields.io/npm/d18m/%40sculptor%2Fpaws?style=for-the-badge&label=PAWS&labelColor=1e1e2e&color=4F46E5" />
  <img src="https://img.shields.io/npm/d18m/%40sculptor%2Ftemplate-registry?style=for-the-badge&label=TEMPLATES&labelColor=1e1e2e&color=4F46E5" />
</p>

SculptorTS is a TypeScript-first, Express-based framework for building APIs with decorator controllers, functional routers, or both together.

The `v1.0.2` release line introduces a package-aware architecture that is:

- explicit
- registry-aware
- scanner-aware
- AI-aware
- DI-enabled
- hybrid-friendly

The framework is split into focused packages:

- `@sculptor/core` for runtime startup, request context, registry flattening, and server bootstrapping
- `@sculptor/di` for explicit dependency injection and package metadata
- `@sculptor/router` for decorators and route assembly
- `@sculptor/config` for config loading
- `@sculptor/template-registry` for scaffold templates and generator assets
- `@sculptor/paws` for logging with dog mode personalities
- `@sculptor/cli` for scaffolding, generation, diagnostics, sync, and app commands


If you are new to the framework, read this file first, then move into the package docs linked below.

## Release Notes

Current release line: `v1.0.2`

- `@sculptor/core` `1.0.2`
- `@sculptor/router` `1.0.2`
- `@sculptor/config` `1.0.2`
- `@sculptor/paws` `1.0.2`
- `@sculptor/template-registry` `1.0.2`
- `@sculptor/cli` `1.0.2`
- `@sculptor/di` `1.0.2`

This line adds:

- `@Package(...)` package indexes and functional package factories
- `sculptor.packages.json` as a tracked framework artifact with ownership, registration, and helper tagging
- explicit DI with `@Service()`, `@Repository()`, `@Middleware()`, and `@AutoInject()`
- class, functional, and hybrid generation modes
- package-aware generators and registry commands
- exact package naming with no hidden singular/plural normalization
- exact file resolution for `sc reg`, `sc ureg`, and `sc rm`
- `sc reg pkg <name>` and `sc rm pkg <name>` for package registry management
- safer generated marker blocks for package index updates
- `sc doctor` for calm diagnostics
- `sc agents` and `sc agents refresh` for `AGENTS.md`
- `sc update` restricted to the globally installed `@sculptor/cli`
- clean CLI errors without raw stack traces
- `req.ctx` as the default request context on Sculptor-bootstrapped apps

This is the stable `v1.0.2` line. Future changes should stay additive and backwards-conscious.

Versions before `v1.0.0` are no longer actively maintained and will not receive future updates.

Historical package ranges remain documented in [CHANGELOG.md](CHANGELOG.md).

## Read Next

If you want the full runtime story, read these in order:

1. [docs/framework-lifecycle.md](docs/framework-lifecycle.md)
2. [docs/error-handling.md](docs/error-handling.md)
3. [docs/architecture.md](docs/architecture.md)
4. [docs/application-patterns.md](docs/application-patterns.md)

## Documentation Map

| Package | Purpose | Docs |
| --- | --- | --- |
| `@sculptor/cli` | Commands, scaffolding, generators, diagnostics, sync, and test harness management | [packages/cli/README.md](packages/cli/README.md) |
| `@sculptor/core` | App bootstrap, registry wiring, request context, and runtime server startup | [packages/core/README.md](packages/core/README.md) |
| `@sculptor/di` | Explicit DI, package metadata, and the package composition contract | [packages/di/README.md](packages/di/README.md) |
| `@sculptor/router` | Controller decorators, hybrid routing, and Express router assembly | [packages/router/README.md](packages/router/README.md) |
| `@sculptor/config` | Framework and runtime config loading, `.env` interpolation, and redaction | [packages/config/README.md](packages/config/README.md) |
| `@sculptor/template-registry` | Template metadata, registry-backed templates, and generator assets | [packages/template-registry/README.md](packages/template-registry/README.md) |
| `@sculptor/paws` | Logger utility with standard and dog mode output | [packages/paws/README.md](packages/paws/README.md) |

## Hidden Behavior Worth Knowing

- Hybrid package scaffolds intentionally generate the functional route under `"/r/<package>"` to avoid route collisions with the package controller.
- The runtime converts thrown values into JSON error responses instead of leaving Express to render HTML error pages.
- `req.ctx` is attached by the framework bootstrap before routes run.
- Functional, class-based, and middleware errors all follow the same framework error pipeline.

## Package-First Architecture

Package indexes are the primary composition contract in SculptorTS.

Each package owns:

- exports
- runtime composition
- scanner metadata
- package metadata
- rebuild metadata
- helper-linked file metadata

The package index lives at `src/<package>/index.ts` and is decorated with `@Package({...})`.

Sculptor keeps runtime ownership lightweight:

- `src/registry.ts` composes the app globally
- `sculptor.packages.json` records package ownership and file tracking
- the runtime flattens package registrations internally
- generators update only the generated regions in package indexes

The supported app styles remain:

- functional
- decorator
- hybrid

Packages are first-class, but they are still optional. Functional and unpackaged code continue to work.

Generation defaults are mode-aware:

- class mode stays class-based by default
- functional mode emits functional services, repositories, routes, and package factories
- hybrid mode keeps class-based defaults unless `--functional`, `-f`, `-fun`, or `--fun` is requested

## How The Framework Is Structured

### `@sculptor/core`

This is the runtime entrypoint.

What it does:

- starts the Express server
- loads config from `sculptor.json`, `props.json`, and `.env`
- flattens package and registry composition into runtime arrays
- exposes `req.ctx` as the default request context
- exposes framework error hooks
- supports `startApp({ listen: false })` for validation-only startup

How it is used:

- `src/main.ts` imports `startApp()` from `@sculptor/core`
- the app imports `registry` from `src/registry.ts`
- the runtime starts from the app root

You will find it here:

- [packages/core/README.md](packages/core/README.md)
- [packages/core/src/runtime.ts](packages/core/src/runtime.ts)
- [packages/core/src/index.ts](packages/core/src/index.ts)

### `@sculptor/di`

This is the explicit DI layer.

What it does:

- defines `@Service()`, `@Repository()`, `@Middleware()`, `@Package()`, and `@AutoInject()`
- resolves singleton dependencies lazily
- supports constructor and property injection
- detects circular dependencies
- exposes package metadata for package-aware runtime composition
- exposes functional package and handler types for generator output and hybrid packages

How it is used:

- decorate injectables with `@Service()` or `@Repository()`
- mark package index classes with `@Package({...})`
- inject dependencies only where `@AutoInject(...)` is present

You will find it here:

- [packages/di/README.md](packages/di/README.md)
- [packages/di/src/index.ts](packages/di/src/index.ts)

### `@sculptor/router`

This is the router layer.

What it does:

- provides `@Controller`, `@Get`, `@Patch`, `@Post`, `@Put`, `@Delete`, and `@Use`
- turns decorated classes into Express routes
- supports controller-based, hybrid, and Sculptor-native functional routing

How it is used:

- decorate a class with `@Controller("/health")`
- decorate methods with `@Get("/")` or other HTTP verbs
- add `@Use()` at class or method level for middleware

You will find it here:

- [packages/router/README.md](packages/router/README.md)
- [packages/router/src/index.ts](packages/router/src/index.ts)
- [packages/router/src/router.ts](packages/router/src/router.ts)

### `@sculptor/config`

This is the config system.

What it does:

- reads `sculptor.json` for framework behavior
- reads `props.json` for runtime settings
- loads `.env` values, resolves `${VAR}` interpolation, and redacts sensitive config when needed
- merges framework defaults, project config, runtime config, and overrides in a predictable order
- exposes direct lookup helpers

You will find it here:

- [packages/config/README.md](packages/config/README.md)
- [packages/config/src/config.ts](packages/config/src/config.ts)

### `@sculptor/paws`

This is the logger.

What it does:

- prints standard logs, system logs, warnings, and errors
- supports dog mode with Bruno, Coki, and Dodie personalities
- reads `logging.enabled` and `logging.dogMode` from `sculptor.json`

You will find it here:

- [packages/paws/README.md](packages/paws/README.md)
- [packages/paws/src/paws.ts](packages/paws/src/paws.ts)

### `@sculptor/cli`

This is the CLI.

What it does:

- creates new apps
- generates package-aware and unpackaged resources
- runs dev, build, lint, test, sync, doctor, and package commands
- maintains `sculptor.packages.json`
- generates `AGENTS.md`
- updates only the globally installed `@sculptor/cli` with `sc update`
- recovers missing template-registry installs when global installs are incomplete
- resolves files exactly for register/unregister/remove workflows
- supports `sc reg pkg`, `sc rm pkg`, and package diagnostics with exact package names
- keeps CLI errors concise and user-facing

Core command families:

- `sc new`
- `sc agents` / `sc agents refresh`
- `sc g` / `sc generate`
- `sc pkg` / `sc package`
- `sc ls` / `sc list`
- `sc reg` / `sc register` / `sc r`
- `sc ureg` / `sc unreg` / `sc unregister` / `sc ur`
- `sc rm` / `sc remove`
- `sc doctor`
- `sc update`

Useful generator flags:

- `--functional`
- `-f`
- `-fun`
- `--fun`
- `-p`
- `--p`
- `-pkg`
- `--pkg`
- `-package`
- `--package`
- `sc reg` / `sc register` / `sc r`
- `sc ureg` / `sc unreg` / `sc unregister` / `sc ur`
- `sc rm` / `sc remove`
- `sc sync`
- `sc doctor`
- `sc update`

Package targeting flags:

- `-p`
- `--p`
- `-pkg`
- `--pkg`
- `-package`
- `--package`

How it is used:

- run `sc new <app>`
- move into the app root
- run `sc dev`, `sc build`, `sc test`, `sc sync`, or `sc doctor`

You will find it here:

- [packages/cli/README.md](packages/cli/README.md)
- [packages/cli/src/cli.ts](packages/cli/src/cli.ts)
- [packages/cli/src/scaffold.ts](packages/cli/src/scaffold.ts)

### Test Harness

What it does:

- generates `src/tests/main.spec.ts`
- generates resource specs such as `user.controller.spec.ts`
- maintains `src/tests/registry.ts`
- maintains `src/tests/runner.ts`

How it is used:

- set `testing.generate: true` in `sculptor.json`
- generate resources with `sc g ...`
- run `sc test`

You will find it here:

- [packages/cli/README.md](packages/cli/README.md)
- [packages/cli/src/scaffold.ts](packages/cli/src/scaffold.ts)

## The App Files

### `sculptor.json`

What it does:

- declares framework behavior

How it is used:

- routing style, dev server, and test generation are read from here

You will find it here:

- [packages/config/README.md](packages/config/README.md)
- [packages/cli/src/scaffold.ts](packages/cli/src/scaffold.ts)

### `props.json`

What it does:

- declares runtime settings like port and router prefix

How it is used:

- `app.port` and `app.prefix` are consumed by the runtime

You will find it here:

- [packages/config/README.md](packages/config/README.md)
- [packages/core/src/runtime.ts](packages/core/src/runtime.ts)

### `src/registry.ts`

What it does:

- composes packages, controllers, services, repositories, middlewares, and routers for the app

How it is used:

- `startApp()` reads the registry

You will find it here:

- [packages/core/README.md](packages/core/README.md)
- [packages/cli/src/scaffold.ts](packages/cli/src/scaffold.ts)

### `src/<package>/index.ts`

What it does:

- owns the package contract
- exports package-local symbols
- declares `@Package({...})`
- describes the package for scanners, generators, rebuilds, and runtime composition

How it is used:

- the CLI updates generated regions in this file
- the scanner reads package metadata from this file
- the runtime consumes package composition through the registry

### `sculptor.packages.json`

What it does:

- tracks package names, paths, index paths, and owned files

How it is used:

- generated and synced by the CLI
- used for package validation, listing, and rebuild-ready metadata

### `AGENTS.md`

What it does:

- gives AI coding agents a concise framework briefing

How it is used:

- generated by `sc agents`
- refreshed by `sc agents refresh`

### `src/main.ts`

What it does:

- bootstraps the app

How it is used:

- calls `startApp({ registry, rootDir })`

You will find it here:

- [packages/core/README.md](packages/core/README.md)
- [packages/cli/src/scaffold.ts](packages/cli/src/scaffold.ts)

## Behavior Map

| If you do this | SculptorTS does this |
| --- | --- |
| Run `sc new <app>` | Creates a new scaffolded app and installs dependencies |
| Run `sc agents` | Generates `AGENTS.md` |
| Run `sc agents refresh` | Regenerates `AGENTS.md` |
| Run `sc update` outside an app | Updates the globally installed `@sculptor/cli` only |
| Run `sc doctor` inside or outside an app | Prints diagnostics and compatibility guidance |
| Run `sc sync` | Validates and refreshes package registry metadata |
| Run `sc ls` or `sc list` | Prints package and tree diagnostics |
| Run `sc pkg <name>` or `sc package <name>` | Prints package diagnostics |
| Run `sc reg` / `sc register` / `sc r` | Registers a file in the package registry |
| Run `sc ureg` / `sc unreg` / `sc unregister` / `sc ur` | Unregisters a file from the package registry |
| Run `sc rm` / `sc remove` | Deletes a file and syncs the registry |
| Run `sc dev` inside an app root | Starts the app from source |
| Run `sc start` with a build present | Uses `dist/main.js` unless `--watch` is set |
| Run `sc build` | Validates the package registry, then compiles the app with the app-local TypeScript config |
| Run `sc lint` | Runs ESLint from the app root |
| Run `sc test` | Runs the generated test suite if present |
| Run `sc g c user` | Writes a controller by default and can opt into paired functional files with `--functional` |
| Run `sc g r user` | Writes paired `*.route.ts` and `*.route.handler.ts` files |
| Run `sc g pkg user` | Writes a package index and package-local resources |
| Run `sc g c user in src/app/users` | Writes into a custom path |
| Run `sc config get logging` | Prints a config value |
| Run `sc config set logging.dogMode=false` | Updates the app config while preserving formatting when possible |
| Run `sc config list` | Prints the flattened merged config |
| Set `testing.generate` to `true` | New generated resources also get test files |
| Set `testing.generate` to `false` | New generated resources only get source files |
| Set `PORT=4000` | The runtime uses `4000` unless you override it explicitly |
| Set `app.prefix="/api"` | The router is mounted under `/api` |

## Quick Start

```bash
sc new demo-app
cd demo-app
sc dev
```

Then:

```bash
sc g c user
sc sync
sc test
```

## Default Generated Layout

When TDD generation is enabled, a new scaffold includes:

- `src/tests/main.spec.ts`
- `src/tests/health.controller.spec.ts` in decorator or hybrid mode
- `src/tests/health.route.spec.ts` in functional or hybrid mode
- `src/tests/registry.ts`
- `src/tests/runner.ts`

The test harness automatically rewrites itself when new generated specs are added.

## Runtime Output

The runtime prints:

```text
SculptorTS listening on port X
Local: http://localhost:X
```

If the server binds to `0`, the runtime prints the actual bound port.

## App Root Rule

The CLI has two groups of commands:

### Allowed from outside a Sculptor app

- `sc new`
- `sc agents`
- `sc agents refresh`
- `sc help`
- `sc version`
- `sc doctor`
- `sc update`

### Allowed only inside a Sculptor app

- `sc start`
- `sc dev`
- `sc build`
- `sc lint`
- `sc test`
- `sc generate`
- `sc g`
- `sc sync`
- `sc ls`
- `sc pkg`
- `sc package`
- `sc reg`
- `sc ureg`
- `sc rm`

If a restricted command runs without `sculptor.json` in the current directory, the CLI stops immediately.

## Where To Go Next

If you want to learn the framework in depth:

1. Read [packages/cli/README.md](packages/cli/README.md) for every command and flag.
2. Read [packages/core/README.md](packages/core/README.md) for runtime behavior.
3. Read [packages/router/README.md](packages/router/README.md) for decorator and router behavior.
4. Read [packages/config/README.md](packages/config/README.md) for config semantics.
5. Read [packages/di/README.md](packages/di/README.md) for explicit DI and package contracts.
6. Read [packages/paws/README.md](packages/paws/README.md) for logger behavior and dog mode output.

## License

MIT
