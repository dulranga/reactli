---
sidebar_position: 1
slug: /commands/generate
sidebar_label: Generate
---

# Generate Command

Generates boilerplate code snippets.

## Syntax

```bash
rc g <snippet> <name>
```

Examples:

- `rc g c Component` - To generate Component
- `rc g h Hook` - To generate Hook

## Description

Generate boilerplate code snippets with standard structure. You can create your own snippets in the future as well.

## Arguments

| Argument  | Description                                              | Value Type |
| --------- | -------------------------------------------------------- | ---------- |
| `snippet` | The snippet you need to generate. Hooks, components etc. | `string`   |
| `name`    | Name of the snippet. (Component Names, Hook names)       | `string`   |
