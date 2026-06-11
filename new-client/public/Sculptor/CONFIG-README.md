# @sculptor/config

The SculptorTS config package loads framework and runtime config from the app root.

## Version Notes

This package is part of the `v1.0.2` release line. The docs below describe the merged config behavior used by the current runtime and CLI.

Current package version: `1.0.2`

Future changes should stay additive and backwards-conscious.

## What This Package Does

- Reads `sculptor.json`
- Reads `props.json`
- Reads `.env`
- Merges both files into one runtime shape
- Resolves `${VAR}` interpolation recursively
- Caches loaded config per root directory
- Exposes path-based config lookups

## Files It Reads

| File | Purpose |
| --- | --- |
| `sculptor.json` | Framework config |
| `props.json` | Runtime config |
| `.env` | Environment overrides and interpolated values |

## Public API

### `loadConfig(rootDir?)`

Returns the loaded config object with `framework`, `runtime`, and `merged` views.

### `getConfig(pathExpression, rootDir?)`

Returns a nested value from the merged config using dot notation.

Example:

```ts
getConfig("app.port");
```

### `redactConfig(config)`

Returns a deep copy of the config with sensitive keys redacted recursively.

Keys such as `password`, `token`, `secret`, `apiKey`, and `auth` are replaced with `***REDACTED***`.

## Config Shape

```json
{
  "project": {
    "srcRoot": "src",
    "entryFile": "main.ts",
    "devServer": "tsx"
  },
  "routing": {
    "style": "decorator"
  },
  "testing": {
    "generate": true,
    "framework": "vitest"
  },
  "frameworkLock": true
}
```

```json
{
  "app": {
    "port": 3000,
    "prefix": "/api"
  }
}
```

## Behavior Matrix

| If you do this | Then this happens |
| --- | --- |
| Leave `sculptor.json` missing | `loadConfig()` returns empty framework data |
| Leave `props.json` missing | `loadConfig()` returns empty runtime data |
| Leave `.env` missing | `.env` values are skipped and `process.env` is still used |
| Put `app.port` in `props.json` | The runtime uses that as the default port |
| Put `db.url = "${DATABASE_URL}"` in config | The interpolation resolves from `.env` or `process.env` |
| Put `testing.generate = false` in `sculptor.json` | The CLI does not generate spec files for new resources |
| Put `routing.style = "functional"` | The CLI scaffold uses functional routing paths |
| Put `routing.style = "hybrid"` | The scaffold supports both decorator and functional shapes |
| Call `getConfig("app.prefix")` | The nested merged value is returned if present |
| Call `getConfig("missing.path")` | `undefined` is returned |
| Call `redactConfig(config)` | Sensitive keys are replaced recursively |

## Merge Rules

The loader resolves config in this order:

1. framework defaults
2. `sculptor.json`
3. `props.json`
4. `.env`
5. runtime overrides

Values from later layers overwrite earlier layers. Nested objects are merged recursively.

If a config string contains `${VAR}` references, Sculptor resolves them against:

- `.env`
- existing process environment variables
- other config paths when a matching config key exists

Circular interpolation is detected and reported as a config error.

## Cache Behavior

Config is cached per root directory.

If the file contents change and you need fresh values in the same process, restart the process or clear the cache by reloading the module.

## Environment Support

Sculptor reads `.env` files in the app root before merging runtime config.

Supported behavior:

- quoted and unquoted values
- `export KEY=value` lines
- recursive `${VAR}` interpolation
- process environment overrides
- safe fallback to the unresolved string when a value cannot be resolved

Example:

```env
DATABASE_URL=postgres://localhost/dev
```

```json
{
  "db": {
    "url": "${DATABASE_URL}"
  }
}
```

The resolved value becomes `postgres://localhost/dev`.

## Example

```ts
import { getConfig, loadConfig } from "@sculptor/config";

const config = loadConfig("/path/to/app");
const port = getConfig("app.port", "/path/to/app");
```

## Package Scripts

- `npm run build` compiles the package
- `npm run prepack` builds before publish

## License

MIT