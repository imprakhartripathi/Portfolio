# @sculptor/cli

The SculptorTS CLI is the user-facing command line for the framework.

It handles:

- New app scaffolding
- Resource generation
- Test generation and registry syncing
- Dev and production startup paths
- Help and version output

## Quick Command Sheet

| Command | What it does |
| --- | --- |
| `sc new <app>` | Creates a new app |
| `sc dev` | Starts the app from source |
| `sc start` | Starts the app in production-style mode |
| `sc build` | Builds the app |
| `sc lint` | Lints the app |
| `sc test` | Runs the test suite |
| `sc generate` / `sc g` | Generates framework resources |
| `sc g c user` | Generates a controller resource |
| `sc g c user in src/app/users` | Generates into a custom path |
| `sc g c in src/app/users` | Infers the name from the path and generates there |
| `sc g t user -e` | Generates an enum type file |
| `sc g t user -i` | Generates an interface type file |
| `sc g t user -c` | Generates a class type file |
| `sc v` / `sc --v` / `sc -v` | Prints version |
| `sc help` | Prints help |

## Entry Points

- Binary: `sc`
- Programmatic API: `runCli()`

## Command Reference

### `sc new <app>`

What it does:
- Creates a new Sculptor app in a sibling folder
- Writes the initial framework files
- Installs the package dependencies

How it is used:
```bash
sc new my-app
```

Flags:

| Flag | Meaning |
| --- | --- |
| `--name <value>` | Sets the app name |
| `--version <value>` | Sets the scaffolded app version |
| `--style <decorator|functional|hybrid>` | Sets the routing mode |
| `--decorator` | Shortcut for decorator mode |
| `--functional` | Shortcut for functional mode |
| `--hybrid` | Shortcut for hybrid mode |
| `--frameworkLock <true|false>` | Sets framework lock |
| `--frameworklock <true|false>` | Alias for framework lock |
| `--framework-lock <true|false>` | Alias for framework lock |
| `--dev-server <tsx|nodemon>` | Selects the dev server |
| `--devserver <tsx|nodemon>` | Alias for dev server |
| `--tsx` | Shortcut for `tsx` dev server |
| `--nodemon` | Shortcut for `nodemon` dev server |

Examples:
```bash
sc new api
sc new api --style=hybrid
sc new api --dev-server=nodemon
sc new api --framework-lock=false
```

What it solves:
- You get a ready-to-run app with the framework defaults already wired

You will find it here:
- [packages/cli/src/cli.ts](src/cli.ts)
- [packages/cli/src/scaffold.ts](src/scaffold.ts)

### `sc dev`

What it does:
- Starts the app from source
- Prints the CLI banner

How it is used:
```bash
sc dev
sc dev --port=4000
```

Flags:

| Flag | Meaning |
| --- | --- |
| `--port=<number>` | Sets `PORT` for the dev process |

What it solves:
- You can restart the app quickly while editing source files

Behavior:
- Uses `nodemon` when `project.devServer` is `nodemon`
- Uses `tsx` when `project.devServer` is `tsx`
- Refuses to run outside a Sculptor app root
- Suppresses the runtime banner by setting `SCULPTOR_SUPPRESS_BANNER=1`

### `sc start`

What it does:
- Starts the app in production-style mode

How it is used:
```bash
sc start
sc start --port=4000
sc start --watch
```

Flags:

| Flag | Meaning |
| --- | --- |
| `--port=<number>` | Sets `PORT` for the process |
| `--watch` | Forces the dev path instead of the built path |

Behavior:
- If `dist/main.js` exists and `--watch` is not set, it runs the built app
- If `--watch` is set, it behaves like `sc dev`
- If no build output exists, it falls back to `tsx src/main.ts`

What it solves:
- The same command can be used for production-style startup and local fallback startup

### `sc build`

What it does:
- Runs TypeScript build for the current app

How it is used:
```bash
sc build
```

What it solves:
- Creates production JavaScript output from app source

Behavior:
- Only works inside a Sculptor app root
- Uses the app-local `tsconfig.json`

### `sc lint`

What it does:
- Runs ESLint from the app root

How it is used:
```bash
sc lint
```

What it solves:
- Gives a single framework-aligned lint command

### `sc test`

What it does:
- Runs the app test suite

How it is used:
```bash
sc test
```

Behavior:
- If `src/tests/runner.spec.ts` exists, runs `vitest run src/tests/runner.spec.ts`
- If the runner does not exist, falls back to `vitest run`

What it solves:
- You can keep a generated test registry while still having a standard test command

### `sc generate` and `sc g`

What it does:
- Generates framework resources in the current app

How it is used:
```bash
sc generate controller user
sc g c user
```

Supported kinds:

| Kind | Aliases |
| --- | --- |
| controller | `c`, `controller` |
| service | `s`, `service` |
| module | `m`, `mo`, `module` |
| middleware | `mw`, `middleware` |
| type | `t`, `type` |
| route | `r`, `route`, `resource` |

Behavior:
- Refuses to run outside a Sculptor app root
- Refuses route generation in decorator mode
- Rewrites the test registry when test generation is enabled

What it solves:
- Your app stays consistent as it grows

### `sc help`

What it does:
- Prints help text

How it is used:
```bash
sc help
sc help generate
sc help controller
sc help module
sc help middleware
sc help type
sc help route
```

### `sc version`

What it does:
- Prints the CLI version and the banner

How it is used:
```bash
sc version
sc v
sc -v
sc --v
sc --version
```

## Full Flag Reference

### Global flags and aliases

| Input | Meaning |
| --- | --- |
| `-v` | Print version |
| `--v` | Print version |
| `--version` | Print version |
| `version` | Print version |
| `v` | Print version |
| `-h` | Print help |
| `--help` | Print help |

### `sc new` flags

| Flag | Meaning |
| --- | --- |
| `--name` | App name |
| `--version` | Scaffold version |
| `--style` | Routing style |
| `--decorator` | Decorator routing shortcut |
| `--functional` | Functional routing shortcut |
| `--hybrid` | Hybrid routing shortcut |
| `--frameworkLock` | Framework lock |
| `--frameworklock` | Framework lock |
| `--framework-lock` | Framework lock |
| `--dev-server` | Dev server selection |
| `--devserver` | Dev server selection |
| `--tsx` | Dev server shortcut |
| `--nodemon` | Dev server shortcut |

### `sc dev` / `sc start` flags

| Flag | Meaning |
| --- | --- |
| `--port` | Sets the process port |
| `--watch` | Only used by `sc start` |

### `sc generate` flags

| Flag | Meaning |
| --- | --- |
| `--functional` | Use functional routing mode |
| `--decorator` | Use decorator routing mode |
| `--hybrid` | Use hybrid routing mode |
| `--style` | Explicitly set routing mode |
| `in <path>` | Write files into a custom directory |
| `-i` | Type generator creates `*.interface.ts` |
| `-interface` | Type generator creates `*.interface.ts` |
| `-c` | Type generator creates `*.class.ts` |
| `-class` | Type generator creates `*.class.ts` |
| `-e` | Type generator creates `*.enum.ts` |
| `-enum` | Type generator creates `*.enum.ts` |

## Generator Behavior

### Controller generation

What it does:
- In decorator mode, writes `*.controller.ts`
- In functional mode, writes `*.routes.ts` and `*.handler.ts`
- In hybrid mode, writes both controller and functional files

Examples:
```bash
sc g c user
sc g c user in src/app/users
sc g c in src/app/users
```

If you use `in <path>`:
- the file location changes to that path
- the file name still follows the generator suffix
- if you do not provide a name, the CLI infers it from the last path segment
- the generated test file, when enabled, is written under `src/tests`

### Service generation

What it does:
- Writes `*.service.ts`

Examples:
```bash
sc g s user
sc g s user in src/app/services
```

### Module generation

What it does:
- Writes `*.module.ts`

Examples:
```bash
sc g m user
sc g mo user
```

### Middleware generation

What it does:
- Writes `*.middleware.ts`

Examples:
```bash
sc g mw auth
sc g mw auth in src/app/middlewares
```

### Type generation

What it does:
- Writes one of:
  - `*.type.ts`
  - `*.interface.ts`
  - `*.class.ts`
  - `*.enum.ts`

Examples:
```bash
sc g t user
sc g t
sc g t user -i
sc g t user -interface
sc g t user -c
sc g t user -class
sc g t user -e
sc g t user -enum
```

If you omit the name, the CLI falls back to `index` unless a custom output path lets it infer a name from the directory.

### Route generation

What it does:
- Writes `*.routes.ts` in functional or hybrid mode

Examples:
```bash
sc g r user
sc g r user in src/app/routes
```

Decorator mode behavior:
- The CLI refuses route generation

## Test Generation

Test generation is controlled by `testing.generate` in `sculptor.json`.

| Setting | Result |
| --- | --- |
| `true` | Matching `*.spec.ts` files are generated |
| `false` | No new spec files are generated |

Generated spec names:

- `user.controller.spec.ts`
- `user.service.spec.ts`
- `user.routes.spec.ts`
- `auth.middleware.spec.ts`

Default scaffold test files:

- `src/tests/main.spec.ts`
- `src/tests/health.controller.spec.ts`
- `src/tests/health.routes.spec.ts`
- `src/tests/registry.ts`
- `src/tests/runner.ts`
- `src/tests/runner.spec.ts`

## Test Harness Behavior

What it does:
- Discovers every `*.spec.ts` file under `src/tests`
- Writes `src/tests/registry.ts`
- Writes `src/tests/runner.ts`
- Writes `src/tests/runner.spec.ts`

How it is used:
- `sc test` runs the registry runner when it exists

What it solves:
- You do not have to manually keep your test suite entrypoint updated

## App Root Rules

Only these commands work from outside a Sculptor app root:

- `sc new`
- `sc help`
- `sc version`

Everything else requires `sculptor.json` in the current directory.

If you try to run a restricted command outside an app root, the CLI stops with a clear error.

## CLI Banner Behavior

The version line in the banner is automatic.

If the package version changes, the banner version changes too.

## Programmatic Use

```ts
import { runCli } from "@sculptor/cli";

await runCli(["node", "sc", "help"]);
```

## Exports

`@sculptor/cli` re-exports:

- `runCli`
- `resolveProjectMetadata`
- `scaffoldProject`
- `generateResourceFiles`
- `writeGeneratedFiles`
- `syncTestHarness`
- the scaffold help strings

## Package Scripts

- `npm run cli` runs the CLI source with `tsx`
- `npm run build` compiles the package
- `npm run prepack` builds before packaging

## If You Only Remember One Thing

If you are inside a Sculptor app root, use:

```bash
sc dev
sc g c user
sc test
```

If you are outside an app root, only use:

```bash
sc new
sc help
sc version
```

## License

MIT