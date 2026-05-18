# @sculptor/core

The SculptorTS core package boots the HTTP server and exposes the primary framework runtime API.

## Version Policy

- Deprecated range: `0.2.0` through `0.2.2`
- Current stable: `0.2.3`
- Reason: the earlier releases predate the stabilized request context, framework error hook, and non-listening bootstrap flow, so they are more likely to surface bootstrap and typing issues in generated apps.

## What This Package Does

- Starts an Express server from a registry
- Loads runtime config and framework config
- Creates the app router from controllers and routes
- Exposes the shared registry shape used by scaffolded apps
- Exposes `bootstrapApp({ listen: false })` for validation and CI flows
- Exposes request context and framework error hook support

## Public API

```ts
import {
  createRouter,
  FunctionalRouter,
  Req,
  Res,
  Nxt,
  Err,
  startApp,
  registry
} from "@sculptor/core";
```

### `startApp(options)`

Starts the app and returns the Node HTTP server.

Options:

- `registry`: the app registry
- `rootDir`: app root, defaults to `process.cwd()`
- `port`: optional explicit port override
- `listen`: set to `false` to bootstrap without binding a socket
- `onError`: optional framework-level error hook

### `registry`

The default empty registry shape exported by the package.

### Re-exports

`@sculptor/core` also re-exports the router decorators and config helpers:

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

1. `sculptor.json` and `props.json` are loaded from the app root
2. The runtime chooses a port
3. Express middleware is attached
4. The registry is turned into an Express router
5. The server begins listening, unless `listen: false` is requested
6. The runtime logs the port and localhost URL

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
| Controllers | Scans the controller metadata and registers decorator-based routes |
| Routes | Mounts the Express routers directly |
| Both controllers and routes | Combines both into one app router |
| No routes | Starts a server, but nothing is mounted beyond Express body parsing |
| `listen: false` | Bootstraps the app, validates the registry, and returns without binding a socket |
| `onError` provided | Framework errors are routed through the lightweight hook before Express handling continues |

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

This preserves Express compatibility while giving apps one central place to shape framework errors.

## Config Behavior

| If `props.json` says | Then the runtime does this |
| --- | --- |
| `app.port = 4000` | The app listens on `4000` unless `PORT` or `startApp({ port })` overrides it |
| `app.prefix = "/api"` | The router is mounted under `/api` |
| No `app.prefix` | The router is mounted at the root |

## Example

```ts
import { registry, startApp } from "@sculptor/core";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));

await startApp({
  registry,
  rootDir,
  port: 3000
});
```

## Behavior Matrix

| If you do this | Then this happens |
| --- | --- |
| Call `startApp()` with no port | The runtime uses environment and config defaults |
| Pass `port: 0` | The OS chooses a free port and the runtime reports the actual port |
| Pass a registry with controllers | Decorator metadata is scanned and registered |
| Pass a registry with routes | Route routers are mounted directly |
| Pass a registry with functional routers | Functional builders are converted to Express routers |
| Use `loadConfig()` | Framework and runtime config are loaded and cached per root directory |
| Use `getConfig("app.port")` | The merged runtime value is returned if present |

## Package Scripts

- `npm run build` compiles the package
- `npm run prepack` builds before publish

## License

MIT