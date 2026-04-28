# @sculptor/config

The SculptorTS config package loads framework and runtime config from the app root.

## What This Package Does

- Reads `sculptor.json`
- Reads `props.json`
- Merges both files into one runtime shape
- Caches loaded config per root directory
- Exposes path-based config lookups

## Files It Reads

| File | Purpose |
| --- | --- |
| `sculptor.json` | Framework config |
| `props.json` | Runtime config |

## Public API

### `loadConfig(rootDir?)`

Returns the loaded config object with `framework`, `runtime`, and `merged` views.

### `getConfig(pathExpression, rootDir?)`

Returns a nested value from the merged config using dot notation.

Example:

```ts
getConfig("app.port");
```

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
| Put `app.port` in `props.json` | The runtime uses that as the default port |
| Put `testing.generate = false` in `sculptor.json` | The CLI does not generate spec files for new resources |
| Put `routing.style = "functional"` | The CLI scaffold uses functional routing paths |
| Put `routing.style = "hybrid"` | The scaffold supports both decorator and functional shapes |
| Call `getConfig("app.prefix")` | The nested merged value is returned if present |
| Call `getConfig("missing.path")` | `undefined` is returned |

## Merge Rules

The loader deep-merges `props.json` into `sculptor.json`.

If both files define the same nested object key, values from `props.json` overwrite or extend the framework object at that path.

## Cache Behavior

Config is cached per root directory.

If the file contents change and you need fresh values in the same process, restart the process or clear the cache by reloading the module.

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
