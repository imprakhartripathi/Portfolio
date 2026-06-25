# @sculptor/cli

The SculptorTS CLI is the user-facing command line for the framework.

It handles:

- new app scaffolding
- package-aware and unpackaged resource generation
- test generation and registry syncing
- dev and production startup paths
- package registry maintenance
- diagnostics and compatibility checks
- `AGENTS.md` generation
- app dependency recovery with `sc install deps`
- global CLI refresh with `sc update`
- project upgrade guidance with `sc update project`
- support and issue reporting with `sc report`
- scaffolded `.gitignore` generation
- exact file register/unregister/remove flows with clean prompts
- package registry commands for both package indexes and individual files

## Version Policy

- Release line: `v1.1.0`
- This release line keeps package-aware generation, functional package scaffolds, `sc doctor`, `sc agents`, `sculptor.packages.json`, and exact package/file alias commands while updating new app scaffolds to the Express builder startup template.
- Future changes should stay additive and backwards-conscious.

## Quick Command Sheet

| Command | What it does |
| --- | --- |
| `sc new <app>` | Creates a new app |
| `sc agents` | Generates `AGENTS.md` |
| `sc agents refresh` | Regenerates `AGENTS.md` |
| `sc dev` | Starts the app from source |
| `sc start` | Starts the app in production-style mode |
| `sc build` | Builds the app |
| `sc lint` | Lints the app |
| `sc test` | Runs the test suite |
| `sc sync` | Syncs and validates `sculptor.packages.json` |
| `sc ls` / `sc list` | Prints the tree and package diagnostics |
| `sc pkg` / `sc package` | Prints package diagnostics |
| `sc config get <path>` | Reads a config value |
| `sc config set <path=value>` | Writes a config value |
| `sc config list` | Lists the merged config |
| `sc reg` / `sc register` / `sc r` | Registers a file in the package registry |
| `sc ureg` / `sc unreg` / `sc unregister` / `sc ur` | Unregisters a file from the package registry |
| `sc rm` / `sc remove` | Deletes a file and syncs the registry |
| `sc install deps` | Replays app dependency installs inside a Sculptor app |
| `sc i deps` | Alias for `sc install deps` |
| `sc update` | Updates the globally installed Sculptor CLI only |
| `sc update project` | Upgrades the current Sculptor project dependencies with version guards |
| `sc doctor` | Runs project, registry, and compatibility diagnostics |
| `sc generate` / `sc g` | Generates framework resources |
| `sc g c user` | Generates a controller resource |
| `sc g r user` | Generates a functional route and handler pair |
| `sc g pkg user` | Generates a package index and package-local resources |
| `sc g c user --functional` | Generates paired functional route and handler output |
| `sc g c user in src/app/users` | Generates into a custom path |
| `sc g c in src/app/users` | Infers the name from the path and generates there |
| `sc g t user -e` | Generates an enum type file |
| `sc g t user -i` | Generates an interface type file |
| `sc g t user -c` | Generates a class type file |
| `sc v` / `sc --v` / `sc -v` | Prints version |
| `sc help` | Prints help |
| `sc report` | Prints support links and issue reporting details |

## Entry Points

- Primary Binary: `sc`
- Fallback Binary: `sculptor`
- Temporary Execution (via Package Runner): `npx sc` or `npx sculptor`
- Programmatic API: `runCli()`

If `sc` conflicts with another command on your system, use `sculptor` instead.

## Command Reference

### `sc new <app>`

What it does:

- creates a new Sculptor app in a sibling folder
- writes the initial framework files
- installs the package dependencies
- generates the new builder-based `src/main.ts` for `v1.1.0` scaffolds
- preserves the legacy startup template for older version inputs

How it is used:

```bash
sc new my-app
```

Flags:

| Flag | Meaning |
| --- | --- |
| `--name <value>` | Sets the app name |
| `--version <value>` | Sets the scaffolded app version (defaults to `0.1.0`) |
| `--style <decorator/functional/hybrid>` | Sets the routing mode |
| `--decorator` | Shortcut for decorator mode |
| `--functional` | Shortcut for functional mode |
| `--hybrid` | Shortcut for hybrid mode |
| `--frameworkLock <true/false>` | Sets framework lock |
| `--frameworklock <true/false>` | Alias for framework lock |
| `--framework-lock <true/false>` | Alias for framework lock |
| `--dev-server <tsx/nodemon>` | Selects the dev server |
| `--devserver <tsx/nodemon>` | Alias for dev server |
| `--tsx` | Shortcut for `tsx` dev server |
| `--nodemon` | Shortcut for `nodemon` dev server |

### `sc agents` and `sc agents refresh`

What they do:

- generate a concise `AGENTS.md`
- capture package-aware, registry-aware, DI-aware, and CLI-aware guidance for AI coding agents

Behavior:

- `sc agents` writes the file if it is missing
- `sc agents refresh` rewrites the file with the latest framework guidance
- both commands are safe to run repeatedly

### `sc dev`

What it does:

- starts the app from source
- prints the CLI banner

Behavior:

- uses `nodemon` when `project.devServer` is `nodemon`
- uses `tsx` when `project.devServer` is `tsx`
- refuses to run outside a Sculptor app root
- prints a clean one-line framework error instead of a raw stack trace when the command is not allowed in the current directory
- suppresses the runtime banner by setting `SCULPTOR_SUPPRESS_BANNER=1`

### `sc start`

What it does:

- starts the app in production-style mode

Behavior:

- if `dist/main.js` exists and `--watch` is not set, it runs the built app
- if `--watch` is set, it behaves like `sc dev`
- if no build output exists, it falls back to `tsx src/main.ts`

### `sc build`

What it does:

- runs TypeScript build for the current app
- runs package validation before TypeScript compile in the current release line

### `sc lint`

What it does:

- runs ESLint from the app root

### `sc test`

What it does:

- runs the app test suite

Behavior:

- if `src/tests/runner.spec.ts` exists, it runs that entrypoint
- otherwise it falls back to `vitest run`

### `sc sync`

What it does:

- validates and refreshes `sculptor.packages.json`
- checks package ownership, stale files, missing files, and registry consistency

Behavior:

- supports `-p`, `--p`, `-pkg`, `--pkg`, `-package`, and `--package`
- package targeting is exact and does not singularize or pluralize names
- package records track `registered` state and `tags` such as `helper`
- warnings do not block the build path unless metadata is malformed or irrecoverable

### `sc ls` / `sc list`

What they do:

- print package and tree diagnostics
- show registered files, missing files, and unregistered files

Behavior:

- `-t`, `--tree`, `-tree`, and `--t` enable tree output
- package targeting uses the same exact-name flags as `sc sync`

### `sc pkg` / `sc package`

What they do:

- print package diagnostics
- show package path, index path, and tracked files

### `sc reg` / `sc register` / `sc r`

What they do:

- register a file in `sculptor.packages.json`
- resolve exact file paths before prompting
- support package registration with `sc reg pkg <name>`

### `sc ureg` / `sc unreg` / `sc unregister` / `sc ur`

What they do:

- unregister a file from `sculptor.packages.json`
- resolve exact file paths before prompting
- support exact file-path matching only

### `sc rm` / `sc remove`

What they do:

- delete a file
- sync the registry after removal
- support `sc rm pkg <name>` for package removal
- refuse to delete package index files directly
- prompt before deleting the resolved file

### `sc config`

What it does:

- reads, writes, and lists app config

Behavior:

- `get` reads a dot-path from the merged config
- `set` writes a dot-path assignment while preserving JSON formatting when possible
- `list` prints the flattened merged config
- `sculptor` supports the same command set as `sc`

### `sc install deps` and `sc i deps`

What it does:

- replays the standard Sculptor app dependency installation sequence
- runs inside an existing Sculptor app root
- helps recover after an interrupted `npm i` during setup

Behavior:

- uses `npm i` for the app package.json dependencies first
- installs the Sculptor runtime dependencies next
- reinstalls the Sculptor CLI/config/router dev dependencies last
- refuses to run outside a Sculptor app root

### `sc help`

What it does:

- prints help in a terminal-friendly format
- highlights headings, inline code, and links for readability
- includes links to the GitHub wiki, npm org page, and public guide

### `sc update`

What it does:

- updates the globally installed Sculptor CLI package only

Behavior:

- only installs `@sculptor/cli`
- does not mutate runtime package dependencies globally
- remains separate from scaffold-time template-registry recovery

### `sc report`

What it does:

- prints support and reporting links
- shows the GitHub issues page, email contact, and learn-more page

How it is used:

```bash
sc report
```

It also links to the GitHub wiki, npm org page, and public guide.

### `sc update project`

What it does:

- upgrades the current Sculptor project dependencies to the latest published Sculptor version
- checks the latest available version before making changes
- warns before every update
- requires `--force` for major version jumps
- asks for `y/n` confirmation for minor and patch updates
- updates each Sculptor package to its own latest published version

How it is used:

```bash
sc update
sc update project
sc update project --force
```

Behavior:

- queries the latest published Sculptor version before applying changes
- queries each Sculptor package version individually before applying changes
- updates Sculptor package versions in the project `package.json`
- runs the project package manager install after the update
- requires `--force` for major version jumps
- prompts for confirmation on minor and patch updates

## Alias Notes

- `sc g` -> `sc generate`
- `pkg` -> `package`
- `ls` -> `list`
- `reg` -> `register`
- `ureg` -> `unreg` -> `unregister` -> `ur`
- `rm` -> `remove`

## Package Target Flags

Package-targeting flags accept either `=value` or separate `value` forms:

- `-p`
- `--p`
- `-pkg`
- `--pkg`
- `-package`
- `--package`

Examples:

```bash
sc g pkg user -p=user
sc g pkg user --pkg user
sc g pkg user -package=user
sc ls -t --package user
```

## App Root Rule

The CLI only allows certain commands outside a Sculptor app root:

- `sc new`
- `sc agents`
- `sc agents refresh`
- `sc help`
- `sc version`
- `sc doctor`
- `sc update`
- `sc report`

The runtime commands require `sculptor.json` in the current app root.

When a command is rejected by the app-root guard, Sculptor prints a user-facing message only. It does not expose the internal stack trace in normal CLI output.

Next:

- [packages/core/README.md](../core/README.md)
- [packages/di/README.md](../di/README.md)
- [packages/router/README.md](../router/README.md)
- [packages/template-registry/README.md](../template-registry/README.md)