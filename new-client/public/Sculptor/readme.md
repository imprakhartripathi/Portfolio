# SculptorTS

SculptorTS is a TypeScript-first, Express-based framework for building APIs with decorators, functional routers, or both together.

The framework is split into small packages:

- `@sculptor/core` for runtime startup
- `@sculptor/router` for decorators and route assembly
- `@sculptor/config` for config loading
- `@sculptor/cli` for scaffolding, generation, and app commands

If you are new to the framework, read this file first, then move into the package docs linked below.

## Documentation Map

| Package | Purpose | Docs |
| --- | --- | --- |
| `@sculptor/cli` | Commands, scaffolding, generators, and test harness management | [packages/cli/README.md](packages/cli/README.md) |
| `@sculptor/core` | App bootstrap, registry wiring, and runtime server startup | [packages/core/README.md](packages/core/README.md) |
| `@sculptor/router` | Controller decorators, method decorators, and Express router assembly | [packages/router/README.md](packages/router/README.md) |
| `@sculptor/config` | Framework and runtime config loading | [packages/config/README.md](packages/config/README.md) |

## How The Framework Is Structured

### `@sculptor/core` This is the core runtime
What it does:
- Starts the Express server
- Loads config from `sculptor.json` and `props.json`
- Mounts controllers and routers from the registry
- Prints the listening port and a localhost URL

How it is used:
- `src/main.ts` imports `startApp()` from `@sculptor/core`
- The app imports `registry` from `src/registry.ts`
- The runtime starts from the app root

This solves:
- You do not need to hand-wire Express bootstrapping every time
- Startup behavior stays consistent across apps

You will find it here:
- [packages/core/README.md](packages/core/README.md)
- [packages/core/src/runtime.ts](packages/core/src/runtime.ts)
- [packages/core/src/index.ts](packages/core/src/index.ts)

### `@sculptor/router` This is the router layer
What it does:
- Provides `@Controller`, `@Get`, `@Post`, `@Put`, `@Delete`, and `@Use`
- Turns decorated classes into Express routes
- Supports controller-based and hybrid routing

How it is used:
- Decorate a class with `@Controller("/health")`
- Decorate methods with `@Get("/")` or other HTTP verbs
- Add `@Use()` at class or method level for middleware

This solves:
- You can write routes in a structured, class-based style
- Middleware stays colocated with the route it affects

You will find it here:
- [packages/router/README.md](packages/router/README.md)
- [packages/router/src/index.ts](packages/router/src/index.ts)
- [packages/router/src/router.ts](packages/router/src/router.ts)

### `@sculptor/config` This is the config system
What it does:
- Reads `sculptor.json` for framework behavior
- Reads `props.json` for runtime settings
- Merges both configs
- Exposes direct lookup helpers

How it is used:
- The runtime reads the port and prefix from config
- The CLI reads scaffolding and test-generation settings from config

This solves:
- Framework behavior is declared in files instead of hard-coded in source
- App-level overrides are easy to reason about

You will find it here:
- [packages/config/README.md](packages/config/README.md)
- [packages/config/src/config.ts](packages/config/src/config.ts)

### `@sculptor/cli` This is the CLI
What it does:
- Creates new apps
- Runs dev, build, lint, test, and generate commands
- Writes the scaffolded app files
- Generates matching test files when TDD generation is enabled

How it is used:
- Run `sc new <app>`
- Move into the app root
- Run `sc dev`, `sc build`, `sc test`, or `sc generate`

This solves:
- New apps start with a consistent file structure
- Generated code and generated tests stay aligned

You will find it here:
- [packages/cli/README.md](packages/cli/README.md)
- [packages/cli/src/cli.ts](packages/cli/src/cli.ts)
- [packages/cli/src/scaffold.ts](packages/cli/src/scaffold.ts)

### This is the test harness
What it does:
- Generates `src/tests/main.spec.ts`
- Generates resource specs such as `user.controller.spec.ts`
- Maintains `src/tests/registry.ts`
- Maintains `src/tests/runner.ts`

How it is used:
- Set `testing.generate: true` in `sculptor.json`
- Generate resources with `sc g ...`
- Run `sc test`

This solves:
- You get a predictable test layout
- Generated code has generated tests from the start

You will find it here:
- [packages/cli/README.md](packages/cli/README.md)
- [packages/cli/src/scaffold.ts](packages/cli/src/scaffold.ts)

## The App Files

### `sculptor.json`

What it does:
- Declares framework behavior

How it is used:
- Routing style, dev server, and test generation are read from here

This solves:
- The framework knows how the app should behave before it starts

You will find it here:
- [packages/config/README.md](packages/config/README.md)
- [packages/cli/src/scaffold.ts](packages/cli/src/scaffold.ts)

### `props.json`

What it does:
- Declares runtime settings like port and router prefix

How it is used:
- `app.port` and `app.prefix` are consumed by the runtime

This solves:
- You can change startup behavior without changing code

You will find it here:
- [packages/config/README.md](packages/config/README.md)
- [packages/core/src/runtime.ts](packages/core/src/runtime.ts)

### `src/registry.ts`

What it does:
- Registers controllers and routers for the app

How it is used:
- `startApp()` reads the registry

This solves:
- The runtime has one stable place to discover app routes

You will find it here:
- [packages/core/README.md](packages/core/README.md)
- [packages/cli/src/scaffold.ts](packages/cli/src/scaffold.ts)

### `src/main.ts`

What it does:
- Bootstraps the app

How it is used:
- Calls `startApp({ registry, rootDir })`

This solves:
- The app has a single executable entrypoint

You will find it here:
- [packages/core/README.md](packages/core/README.md)
- [packages/cli/src/scaffold.ts](packages/cli/src/scaffold.ts)

## Behavior Map

| If you do this | SculptorTS does this |
| --- | --- |
| Run `sc new <app>` | Creates a new scaffolded app and installs dependencies |
| Run `sc dev` inside an app root | Starts the app from source |
| Run `sc start` with a build present | Uses `dist/main.js` unless `--watch` is set |
| Run `sc start --watch` | Switches to the dev path |
| Run `sc build` | Compiles the app with the app-local TypeScript config |
| Run `sc lint` | Runs ESLint from the app root |
| Run `sc test` | Runs the generated test suite if present |
| Run `sc generate controller user` | Writes the controller or the functional equivalent depending on routing mode |
| Run `sc generate route user` in decorator mode | Refuses, because routes only make sense in functional or hybrid mode |
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
sc test
```

## Default Generated Layout

When TDD generation is enabled, a new scaffold includes:

- `src/tests/main.spec.ts`
- `src/tests/health.controller.spec.ts` in decorator or hybrid mode
- `src/tests/health.routes.spec.ts` in functional or hybrid mode
- `src/tests/registry.ts`
- `src/tests/runner.ts`

The test harness automatically rewrites itself when new generated specs are added.

## Runtime Output

The startup banner is no longer printed by the runtime.

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
- `sc help`
- `sc version`

### Allowed only inside a Sculptor app

- `sc start`
- `sc dev`
- `sc build`
- `sc lint`
- `sc test`
- `sc generate`

If a restricted command runs without `sculptor.json` in the current directory, the CLI stops immediately.

## Where To Go Next

If you want to learn the framework in depth:

1. Read [packages/cli/README.md](packages/cli/README.md) for every command and flag.
2. Read [packages/core/README.md](packages/core/README.md) for runtime behavior.
3. Read [packages/router/README.md](packages/router/README.md) for decorator and router behavior.
4. Read [packages/config/README.md](packages/config/README.md) for config semantics.

## License

MIT
