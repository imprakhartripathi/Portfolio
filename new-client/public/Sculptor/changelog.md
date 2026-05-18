# Changelog

This changelog documents the version ranges that should be treated as deprecated and the current stable line for each published Sculptor package.

## Deprecated Versions

### `@sculptor/router`

- Deprecated: `0.2.0` through `0.2.4`
- Current stable: `0.2.5`

Reason:

- Earlier router releases predate the final `@Patch()` support, functional router ergonomics, and bootstrap-time route collision detection.
- Those versions are more likely to surface duplicate route registrations, stale generated output, and weaker route diagnostics.

### `@sculptor/core`

- Deprecated: `0.2.0` through `0.2.2`
- Current stable: `0.2.3`

Reason:

- Earlier core releases predate the stabilized request context, non-listening bootstrap mode, and centralized framework error hook.
- Those versions are more likely to expose bootstrap/runtime inconsistencies in generated apps.

### `@sculptor/cli`

- Deprecated: `0.2.0`
- Current stable: `0.2.4`

Reason:

- The older CLI release predates the current config command set and the updated route/handler generation contract.
- It also assumes the older template layout, which can break installs and scaffold output in current workspaces.
- The current release adds runtime recovery for missing template-registry installs and avoids exposing raw module-resolution failures.
- The current release also adds `sc install deps`, `sc i deps`, `sc update`, and scaffolded `.gitignore` generation.

### `@sculptor/template-registry`

- Deprecated: `0.1.0` through `0.1.5`
- Current stable: `0.1.6`

Reason:

- Earlier template-registry releases predate the registry split, the current template file layout, and the standardized route/handler scaffolds.
- Those versions can produce stale generated files or miss the files the CLI now expects to load.

## Stable Line Summary

- `@sculptor/config` `0.2.1` is the supported config line.
- `@sculptor/paws` `0.2.1` is the supported logger line.
- `@sculptor/router` `0.2.5` is the supported router line.
- `@sculptor/core` `0.2.3` is the supported runtime line.
- `@sculptor/cli` `0.2.4` is the supported CLI line.
- `@sculptor/template-registry` `0.1.6` is the supported template line.

## Notable Stable Features

- Route collision detection with source labels
- `@Patch()` support
- Sculptor-native functional router scopes
- `.env` loading and recursive config interpolation
- Config redaction helpers
- `bootstrapApp({ listen: false })`
- Framework error hooks with request context
- Controller-first scaffolding with explicit functional opt-in
- Paired `*.route.ts` and `*.route.handler.ts` generation
- Registry-backed template organization
- Runtime recovery for missing CLI template-registry dependencies
- `sc install deps` and `sc i deps` for app dependency recovery
- `sc update` for global package refreshes outside app roots
- Scaffolded `.gitignore` generation