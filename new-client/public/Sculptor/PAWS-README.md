# @sculptor/paws

Lightweight SculptorTS logger with a standard mode and a more expressive dog mode.

## Version Notes

This package is on the current stable line. No deprecated range is called out here.

Current stable: `0.2.1`

## Config

The logger reads `logging` from `sculptor.json`:

```json
{
  "logging": {
    "enabled": true,
    "dogMode": true
  }
}
```

## Usage

```ts
import { paws } from "@sculptor/paws";

paws.boot();

paws.log({ user: "Prakhar" });
paws.system("Application is listening on http://localhost:3000");
paws.warn("Unregistered Controller - UserController, please register it.");
paws.error("DB NOT CONFIGURED");
```

## Behavior

- `logging.enabled = false` disables every method
- `dogMode = true` enables Bruno, Coki, and Dodie personalities
- `dogMode = false` uses neutral `[System]`, `[Log]`, `[Warning]`, and `[Error]` labels