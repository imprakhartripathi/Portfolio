# @sculptor/router

The SculptorTS router package provides decorators and router assembly for controller-based and hybrid app styles.

## What This Package Does

- Defines controller and method decorators
- Attaches middleware metadata to classes and methods
- Scans decorated controllers
- Builds an Express router from controller classes and router instances

## Public API

```ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Use,
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

### `Use(...middlewares)`

Attaches Express middleware.

If you use `Use()` on a class, the middleware applies to all routes in that controller.

If you use `Use()` on a method, the middleware applies only to that route.

## Router Assembly

`createRouter()` accepts:

- `controllers`
- `routes`
- `prefix`

It returns an Express router.

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
| Add `@Use(logger)` to a controller class | Every controller route uses `logger` |
| Add `@Use(auth)` to a single method | Only that route uses `auth` |
| Pass `prefix: "/api"` to `createRouter` | The mounted router appears under `/api` |
| Pass `prefix: "api"` | The prefix is normalized to `/api` |
| Pass `prefix: "/api/"` | The trailing slash is removed |
| Pass no controllers and no routes | An empty router is returned |
| Pass both controllers and routes | Both styles are mounted into one router |

## Example

```ts
import { Controller, Get, createRouter } from "@sculptor/router";

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
```

## Types

The package exports the core router types used by the framework:

- `ControllerClass`
- `ControllerMetadata`
- `CreateRouterOptions`
- `HttpMethod`
- `MethodRouteMetadata`
- `ParameterResolverContext`
- `RouteDefinition`

## Package Scripts

- `npm run build` compiles the package
- `npm run prepack` builds before publish

## License

MIT
