# @sculptor/paws 🐾
<!-- 
<img src="https://raw.githubusercontent.com/imprakhartripathi/Sculptor/main/assets/sculptor-full-bg.png" alt="SculptorTS"/> -->

A lightweight logger for SculptorTS featuring two logging experiences:

- 🐶 **Dog Mode** – expressive log messages from Bruno, Coki, and Dodie
- ⚙️ **Standard Mode** – clean and minimal system logs

---

## 📦 Version

Current package version: `1.0.3`

This package follows a backwards-conscious approach, and future updates are expected to remain additive whenever possible.

---

## ⚙️ Configuration

`@sculptor/paws` reads its configuration from `sculptor.json`.

```json
{
  "logging": {
    "enabled": true,
    "dogMode": true
  }
}
```

### Options

| Option | Type | Description |
|--------|------|-------------|
| `enabled` | `boolean` | Enables or disables logging entirely |
| `dogMode` | `boolean` | Toggles between Dog Mode and Standard Mode |

---

## 🚀 Usage

```ts
import { paws } from "@sculptor/paws";

paws.boot();

paws.log({ user: "Prakhar" });

paws.system(
    "Application is listening on http://localhost:3000"
);

paws.warn(
    "Unregistered Controller - UserController, please register it."
);

paws.error("DB NOT CONFIGURED");
```

---

## 🐕 Dog Mode Personalities

When `dogMode` is enabled, logs are brought to life by three canine companions.

### 🦮 Bruno

> Hello Developer, I am Bruno. I will help you by warning you about any unexpected thing that happens in the code.

Bruno watches over your application and speaks whenever something deserves attention.

### 🐕 Coki

> Hi Dev! I am Coki. I am your companion through this development journey. I will log everything that the system does.

Coki keeps track of your application's journey, faithfully reporting what happens along the way.

### 🐶 Dodie

> Sup Dudes! I'm your Dawg Dodie. I'll bark if something breaks. Woof!! 🐾

Dodie takes care of error reporting and makes sure failures never pass unnoticed.

---

## 📝 Behavior

### Logging Disabled

Setting:

```json
{
  "logging": {
    "enabled": false
  }
}
```

Disables every logger method.

---

### Dog Mode Enabled 🐾

Setting:

```json
{
  "logging": {
    "dogMode": true
  }
}
```

Enables Bruno, Coki, and Dodie's logging personalities.

---

### Standard Mode ⚙️

Setting:

```json
{
  "logging": {
    "dogMode": false
  }
}
```

Uses neutral logger labels:

- `[System]`
- `[Log]`
- `[Warning]`
- `[Error]`

---

## ❤️ A Small Dedication

> This package is dedicated to Bruno, Coki, and Dodie.
>
> They spent years growing up together, sharing life as companions and family. Though time eventually led them down different paths, they remain together here in code as a small gesture of love, gratitude, and remembrance for the bond they shared. 🐾