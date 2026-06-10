# @sculptor/di

<!-- <img src="https://raw.githubusercontent.com/imprakhartripathi/Sculptor/main/assets/sculptor-full-bg.png" alt="SculptorTS"/> -->

The SculptorTS DI package provides explicit, decorator-driven dependency injection and package metadata.

## Release Line

- Current package version: `1.0.2`
- This package is part of the `v1.0.2` package-aware architecture line.

## What This Package Does

- Defines `@Service()`, `@Repository()`, `@Middleware()`, `@Package()`, and `@AutoInject()`
- Resolves singleton dependencies lazily
- Supports constructor and property injection
- Detects circular dependencies
- Exposes package metadata for package-aware runtime composition
- Exposes functional package, service, repository, controller, and handler types for generator output

## Explicit Injection Rule

Injection only happens where `@AutoInject()` is present.

There is no implicit autowiring.

## Public API

```ts
import {
  AutoInject,
  Container,
  Package,
  SculptorFunctionalController,
  SculptorFunctionalHandler,
  SculptorFunctionalPackage,
  SculptorFunctionalRepository,
  SculptorFunctionalService,
  Repository,
  Service,
  Middleware,
  createContainer
} from "@sculptor/di";
```

## Package Metadata

`@Package({...})` marks a package index as the package contract.

Metadata includes:

- `name`
- `path`
- `imports`
- `exports`
- `controllers`
- `handlers`
- `services`
- `repositories`
- `middlewares`
- `routes`
- `customLinkedHelper`

Package metadata can be emitted as a class-based index or a functional package factory, depending on the scaffold mode.

Functional services and repositories are valid package metadata for generated output. The runtime only treats constructable tokens as DI providers.

## Container Behavior

- providers are singleton by default
- instances are created lazily on first resolve
- missing dependencies are detected during validation
- circular dependency chains are rejected

## License

MIT