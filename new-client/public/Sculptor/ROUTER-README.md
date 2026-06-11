# @sculptor/router

The SculptorTS router package provides decorators and router assembly for controller-based and hybrid app styles.

## Version Policy

- Release line: `v1.0.2`
- Current package version: `1.0.2`
- The router package keeps the controller, hybrid, and functional routing contract stable in the package-aware runtime line.
- Future changes should stay additive and backwards-conscious.

## What This Package Does

- Defines controller and method decorators
- Attaches middleware metadata to classes and methods
- Scans decorated controllers
- Builds an Express router from controller classes and router instances
- Exposes a Sculptor-style functional router builder
- Wraps controller routes and functional handlers so sync and async throws stay inside the framework pipeline

## Public API

```ts
import {
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Delete,
  Use,
  FunctionalRouter,
  createRouter
} from "@sculptor/router";
```

## Decorators

### `Controller(prefix)`

Marks a class as a controller and stores its route prefix.

If you omit the prefix, it defaults to `/`.

### `Get(path)`, `Post(path)`, `Put(path)`, `Delete(path)`

Attach HTTP method metadata to a controller method.

If you omit the path, it defaults to `/`.

### `Patch(path)`

Attach `PATCH` method metadata to a controller method.

### `Use(...middlewares)`

Attaches Express middleware.

If you use `Use()` on a class, the middleware applies to all routes in that controller.

If you use `Use()` on a method, the middleware applies only to that route.

### `FunctionalRouter(prefix)`

Creates a Sculptor-native functional router scope.

You usually do not need to annotate the returned value. Use it like Express:

```ts
const users = FunctionalRouter("/users");
```

- `users.get(handler)` registers `GET /users`
- `users.get("/verify-token", handler)` registers a child route under the same scope
- `users.at("/verify-token").patch(handler)` registers a nested scoped route
- `users.use(auth)` applies middleware to later routes in the same scope
- `users.use("/audit", auth)` mounts middleware at a scoped sub-path
- `users.use(errorHandler)` can mount an Express error handler for the scope
- the returned scope type is `FunctionalRouterScope`

Hybrid package scaffolds intentionally generate a functional route under `"/r/<package>"` so the generated route does not collide with the package controller route. That convention is deliberate and preserved by the package generator, and the prefix can be changed by the user if needed.

## Router Assembly

`createRouter()` accepts:

- `controllers`
- `routes`
- `prefix`

It returns an Express router.

It also detects duplicate registrations before the server starts. If two routes resolve to the same method and path, Sculptor throws a framework error with source labels when available.

### Controller Path Behavior

When you pass controller classes, the router:

1. Instantiates each controller
2. Scans its metadata
3. Registers all decorated routes

### Route Path Behavior

When you pass Express routers in `routes`, they are mounted directly onto the resulting router.

### Prefix Behavior

If you pass a prefix:

- it is normalized to a leading slash
- trailing slashes are removed
- the router is mounted under that prefix

If you do not pass a prefix, the router is returned unwrapped.

## Behavior Matrix

| If you do this | Then this happens |
| --- | --- |
| Add `@Controller("/health")` | The controller routes are grouped under `/health` |
| Add `@Get("/")` to a method | The method is registered for `GET /` relative to the controller prefix |
| Add `@Patch("/")` to a method | The method is registered for `PATCH /` relative to the controller prefix |
| Add `@Use(logger)` to a controller class | Every controller route uses `logger` |
| Add `@Use(auth)` to a single method | Only that route uses `auth` |
| Pass `prefix: "/api"` to `createRouter` | The mounted router appears under `/api` |
| Pass `prefix: "api"` | The prefix is normalized to `/api` |
| Pass `prefix: "/api/"` | The trailing slash is removed |
| Pass an error handler to `users.use(...)` | The router can surface scoped error middleware |
| Pass no controllers and no routes | An empty router is returned |
| Pass both controllers and routes | Both styles are mounted into one router |
| Register the same method and path twice | Bootstrap fails with a typed route-collision error |
| Generate a hybrid package scaffold | The functional route is generated under `/r/<package>` to avoid collisions with the controller |

## Example

```ts
import { Controller, FunctionalRouter, Get, createRouter } from "@sculptor/router";

@Controller("/health")
class HealthController {
  @Get("/")
  health() {
    return { status: "ok" };
  }
}

const router = createRouter({
  controllers: [HealthController],
  routes: [],
  prefix: "/api"
});

const users = FunctionalRouter("/users");
users.get((req, res) => res.json([]));
users.at("/verify-token").patch((req, res) => res.json({ ok: true }));
```

## Types

The package exports the core router types used by the framework:

- `ControllerClass`
- `ControllerMetadata`
- `CreateRouterOptions`
- `Err`
- `HttpMethod`
- `Nxt`
- `MethodRouteMetadata`
- `ParameterResolverContext`
- `Req`
- `Res`
- `RouteDefinition`
- `FunctionalRouterScope` as the public scoped-router type
- `FunctionalRouterLike` as a compatibility alias
- `RouterSource`

## Package Scripts

- `npm run build` compiles the package
- `npm run prepack` builds before publish

## License

MIT