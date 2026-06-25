# Changelog

This changelog documents the current Sculptor release line and the historical ranges that remain relevant for compatibility and support conversations.

All versions before `v1.0.0` are deprecated. Only the current `v1.1.4` release line is supported for active development and fixes.

Versions before `v1.0.0` are no longer actively maintained and will not receive future updates.

## v1.1.4

The `v1.1.4` release line tightens the native Express builder surface, cleans up CLI update messaging, and keeps the `v1.1.x` line fully synchronized.

Highlights:

- native Express builder support through `createApp()`
- strongly typed builder methods for `use()`, `set()`, `enable()`, `disable()`, and `locals()`
- automatic app root discovery through `findAppRoot()` and `resolveRootDir()`
- `startApp({ app })` support alongside the legacy `startApp({ rootDir })` path
- `sc update project` now upgrades each Sculptor package to its own latest version
- `sc report` adds a dedicated support and issue-reporting command
- `sc help` now renders as terminal-friendly help output with highlighted links
- `sc update` and `sc update project` now print their guidance once
- no migration required for `v1.0.x` apps
- scaffolded `src/main.ts` now uses the builder startup style for new `v1.1.x` projects
- legacy scaffold output is preserved for older version inputs
- middleware compatibility remains 100 percent Express-compatible
- documentation and scaffold templates now reflect the cleaner startup flow

This remains an additive release line, so existing apps continue to boot without changes.

The `v1.1.0` through `v1.1.3` release line is deprecated in favor of `v1.1.4`. `v1.1.4` is the intended stable release line to use.

## v1.1.0

The `v1.1.0` release line adds a native Express builder while keeping every `v1.0.x` startup path working unchanged.

Highlights:

- native Express builder support through `createApp()`
- automatic app root discovery through `findAppRoot()` and `resolveRootDir()`
- `startApp({ app })` support alongside the legacy `startApp({ rootDir })` path
- `sc update project` now upgrades each Sculptor package to its own latest version
- `sc report` adds a dedicated support and issue-reporting command
- `sc help` now renders as terminal-friendly help output with highlighted links
- no migration required for `v1.0.x` apps
- scaffolded `src/main.ts` now uses the builder startup style for new `v1.1.0` projects
- legacy scaffold output is preserved for older version inputs
- middleware compatibility remains 100 percent Express-compatible
- documentation and scaffold templates now reflect the cleaner startup flow

This remains an additive release line, so existing apps continue to boot without changes.

## v1.0.2

The `v1.0.2` release line was the package-aware Sculptor architecture that preceded v1.1.0.

Highlights:

- package indexes are now first-class via `@Package({...})`
- `sculptor.packages.json` tracks package ownership, registration state, and helper-tagged files
- explicit DI is available through `@sculptor/di`
- `req.ctx` is available by default in Sculptor-bootstrapped apps
- `sc doctor` provides calm diagnostics and compatibility checks
- `sc agents` and `sc agents refresh` generate `AGENTS.md`
- package-aware generation keeps package contracts and registry metadata aligned
- functional packages are supported alongside class-based and hybrid packages
- package generators emit functional services, repositories, handlers, and package factories when requested
- `sc reg pkg <name>`, `sc rm pkg <name>`, and exact file registration flows now align with package ownership
- `sc reg`, `sc ureg`, and `sc rm` resolve file paths exactly and keep the central registry in sync
- `sc update` now updates only the globally installed `@sculptor/cli`
- generated package indexes use deterministic marker blocks instead of full-file rewrites
- the CLI supports package aliases such as `pkg` / `package`, `ls` / `list`, `reg` / `register` / `r`, `ureg` / `unreg` / `unregister` / `ur`, and `rm` / `remove`
- package-target flags support `-p`, `--p`, `-pkg`, `--pkg`, `-package`, and `--package`
- CLI errors are surfaced cleanly without raw stack traces
- hybrid apps continue to support decorator, functional, and mixed composition

This was the stable release line, so future changes should stay additive and backwards-conscious.

Current stable package family:

- `@sculptor/core`
- `@sculptor/router`
- `@sculptor/config`
- `@sculptor/paws`
- `@sculptor/cli`
- `@sculptor/template-registry`
- `@sculptor/di` is now part of the stable `1.0.2` release line

## Legacy Compatibility Notes

The following ranges are retained as historical compatibility references.

### `@sculptor/router`

- Deprecated: `0.2.0` through `0.2.4`
- Historical stable line: `0.2.5`

Reason:

- earlier router releases predate the final `@Patch()` support, functional router ergonomics, and bootstrap-time route collision detection
- those versions are more likely to surface duplicate route registrations, stale generated output, and weaker route diagnostics

### `@sculptor/core`

- Deprecated: `0.2.0` through `0.2.2`
- Historical stable line: `0.2.3`

Reason:

- earlier core releases predate the stabilized request context, non-listening bootstrap mode, and centralized framework error hook
- those versions are more likely to expose bootstrap/runtime inconsistencies in generated apps

### `@sculptor/cli`

- Deprecated: `0.2.0`
- Historical stable line: `0.2.4`

Reason:

- the older CLI release predates the current config command set and the updated route/handler generation contract
- it also assumes the older template layout, which can break installs and scaffold output in current workspaces
- the historical line introduced runtime recovery for missing template-registry installs and the initial `sc install deps`, `sc update`, and scaffolded `.gitignore` flows

### `@sculptor/template-registry`

- Deprecated: `0.1.0` through `0.1.5`
- Historical stable line: `0.1.6`

Reason:

- earlier template-registry releases predate the registry split, the current template file layout, and the standardized route/handler scaffolds
- those versions can produce stale generated files or miss the files the CLI expects to load

## Historical Feature Summary

The older stable line documented:

- route collision detection with source labels
- `@Patch()` support
- Sculptor-native functional router scopes
- `.env` loading and recursive config interpolation
- config redaction helpers
- `bootstrapApp({ listen: false })`
- framework error hooks with request context
- controller-first scaffolding with explicit functional opt-in
- paired `*.route.ts` and `*.route.handler.ts` generation
- registry-backed template organization
- runtime recovery for missing CLI template-registry dependencies
- `sc install deps` and `sc i deps` for app dependency recovery
- `sc update` for global package refreshes outside app roots
- scaffolded `.gitignore` generation