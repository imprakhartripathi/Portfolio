# @sculptor/core

The SculptorTS core package boots the HTTP server and exposes the primary framework runtime API.

## What This Package Does

- Starts an Express server from a registry
- Loads runtime config and framework config
- Creates the app router from controllers and routes
- Exposes the shared registry shape used by scaffolded apps

## Public API

```ts
import { createRouter, startApp, registry } from "@sculptor/core";
```

### `startApp(options)`

Starts the app and returns the Node HTTP server.

Options:

- `registry`: the app registry
- `rootDir`: app root, defaults to `process.cwd()`
- `port`: optional explicit port override

### `registry`

The default empty registry shape exported by the package.

### Re-exports

`@sculptor/core` also re-exports the router decorators and config helpers:

- `Controller`
- `Get`
- `Post`
- `Put`
- `Delete`
- `Use`
- `createRouter`
- `loadConfig`
- `getConfig`

## Startup Behavior

When `startApp()` runs:

1. `sculptor.json` and `props.json` are loaded from the app root
2. The runtime chooses a port
3. Express middleware is attached
4. The registry is turned into an Express router
5. The server begins listening
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
| Use `loadConfig()` | Framework and runtime config are loaded and cached per root directory |
| Use `getConfig("app.port")` | The merged runtime value is returned if present |

## Package Scripts

- `npm run build` compiles the package
- `npm run prepack` builds before publish

## License

MIT
