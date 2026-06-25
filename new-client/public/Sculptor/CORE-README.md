# @sculptor/core

The SculptorTS core package boots the HTTP server and exposes the primary framework runtime API.

## Version Policy

- Release line: `v1.1.0`
- This release line adds a native Express builder, automatic app root discovery, and builder-aware startup while keeping the `v1.0.x` path intact.
- Future changes should stay additive and backwards-conscious.

## What This Package Does

- Starts an Express server from a registry
- Exposes a strongly typed Express builder through `createApp()`
- Loads runtime config and framework config
- Discovers the app root automatically when `rootDir` is omitted
- Creates the app router from packages, controllers, services, repositories, middlewares, and routes
- Flattens package composition internally while keeping the package index as the package contract
- Exposes the shared registry shape used by scaffolded apps
- Exposes `bootstrapApp({ listen: false })` for validation and CI flows
- Supports `startApp({ app })` for builder-based startup
- Exposes request context and a unified framework error pipeline
- Re-exports the package metadata, explicit DI decorators, and functional package types from `@sculptor/di`

## Public API

```ts
import {
  createApp,
  createRouter,
  FunctionalRouter,
  findAppRoot,
  Req,
  Res,
  Nxt,
  Err,
  resolveRootDir,
  startApp,
  registry
} from "@sculptor/core";
```

### `startApp(options)`

Starts the app and returns the Node HTTP server.

Options:

- `registry`: the app registry
- `rootDir`: app root. When omitted, the runtime uses `SCULPTOR_ROOT_DIR` or automatically discovers the nearest Sculptor root from `process.cwd()`
- `app`: optional Express builder created by `createApp()`
- `port`: optional explicit port override
- `listen`: set to `false` to bootstrap without binding a socket
- `onError`: optional framework-level error hook

### `createApp()`

Creates a chainable Express builder around the underlying Express instance.

Supported builder methods:

- `use()`
- `set()`
- `enable()`
- `disable()`
- `locals()`
- `engine()`

The builder also exposes:

- `instance`
- `getInstance()`

It intentionally does not expose Express startup methods such as `listen()`, `route()`, `render()`, or `param()`.

### `registry`

The default empty registry shape exported by the package.

The current registry shape supports both the legacy flat arrays and the package-aware form:

- `packages`
- `controllers`
- `services`
- `repositories`
- `middlewares`
- `routes`

Package metadata can describe class-based or functional package outputs, and helper-linked file metadata stays outside the runtime DI container.

### Re-exports

`@sculptor/core` also re-exports the router decorators and config helpers:

- `Package`
- `AutoInject`
- `Service`
- `Repository`
- `Middleware`
- `Controller`
- `Get`
- `Patch`
- `Post`
- `Put`
- `Delete`
- `Use`
- `FunctionalRouter`
- `createRouter`
- `loadConfig`
- `getConfig`
- `redactConfig`

It also re-exports the request typing helpers:

- `Req`
- `Res`
- `Nxt`
- `Err`

## Startup Behavior

When `startApp()` runs:

1. `rootDir` is resolved from the supplied option, `SCULPTOR_ROOT_DIR`, or automatic discovery
2. `sculptor.json` and `props.json` are loaded from the app root
3. The runtime chooses a port
4. Express middleware is attached
5. The registry is turned into an Express router
6. The server begins listening, unless `listen: false` is requested
7. The runtime logs the port and localhost URL

Startup output:

```text
SculptorTS listening on port X
Local: http://localhost:X
```

## Port Resolution

Port resolution uses this order:

1. `startApp({ port })`
2. `process.env.PORT`
3. `props.json` `app.port`
4. `3000`

If the resolved port is `0`, the runtime reads the actual bound port from the server address and prints that instead.

## Registry Behavior

| If the registry contains | Then the runtime does this |
| --- | --- |
| Packages | Flattens the package composition and registers the package-owned runtime pieces |
| Controllers | Scans the controller metadata and registers decorator-based routes |
| Routes | Mounts the Express routers directly |
| Both controllers and routes | Combines both into one app router |
| No routes | Starts a server, but nothing is mounted beyond Express body parsing |
| `app` provided | Uses the supplied builder instance and preserves its configuration |
| `listen: false` | Bootstraps the app, validates the registry, and returns without binding a socket |
| `onError` provided | Framework errors are routed through the lightweight hook before the JSON error response is sent |

## Request Context

Every request gets a lightweight `ctx` object on `req`:

- `requestId` is generated automatically or read from `x-request-id`
- `meta` is a request-scoped bag for middleware and handlers
- `user` is available for app-specific auth context

Middleware can extend this object without needing a DI container.

## Error Hooks

`startApp({ onError })` and `bootstrapApp({ onError })` pass framework-normalized errors to a lightweight hook.

The hook receives:

- `request`
- `response`
- `route` metadata when available
- `timestamp`
- optional controller info
- the request `context`

The framework still sends a consistent JSON response after the hook runs:

```json
{
  "error": {
    "code": "RUNTIME_ERROR",
    "message": "Something went wrong",
    "status": 500
  }
}
```

This preserves Express compatibility while preventing HTML error pages from leaking out of framework-owned routes.

## Config Behavior

| If `props.json` says | Then the runtime does this |
| --- | --- |
| `app.port = 4000` | The app listens on `4000` unless `PORT` or `startApp({ port })` overrides it |
| `app.prefix = "/api"` | The router is mounted under `/api` |
| No `app.prefix` | The router is mounted at the root |

## Example

```ts
import { createApp, registry, startApp } from "@sculptor/core";

const app = createApp();

app.disable("x-powered-by");

await startApp({
  registry,
  app,
  port: 3000
});
```

## Behavior Matrix

| If you do this | Then this happens |
| --- | --- |
| Call `startApp()` with no port | The runtime uses environment, config defaults, and automatic root discovery |
| Pass `port: 0` | The OS chooses a free port and the runtime reports the actual port |
| Pass a registry with controllers | Decorator metadata is scanned and registered |
| Pass a registry with routes | Route routers are mounted directly |
| Pass a registry with functional routers | Functional builders are converted to Express routers |
| Pass an Express builder through `app` | The runtime uses that builder instance instead of creating a new one |
| Use `loadConfig()` | Framework and runtime config are loaded and cached per root directory |
| Use `getConfig("app.port")` | The merged runtime value is returned if present |

## Package Scripts

- `npm run build` compiles the package
- `npm run prepack` builds before publish

## License

MIT