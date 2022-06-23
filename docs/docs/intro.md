---
sidebar_position: 1
---

# Reactli Introduction

Reactli is a CLI tool for react. This will _generate all the boilerplate code_ for you.

## Getting Started

Get started by **installing the cli**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/)
- NPM

## Install the CLI

To access the commands you need to install the cli globally.

```bash
npm install reactli -g
```

You can type this command into Command Prompt, PowerShell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Reactli CLI.

## Generate `reactli.config.json`

Run the following command:

```bash
cd <to_the_root_of_your_react_project>
```

```bash
rc init
```

The `cd` command changes the current working directory to the root of your react project.
Reactli config need to be in the **root** of the react project.

The `rc init` will ask few questions about your tech stack. Then it will create the `reactli.config.json` file.

:::tip

You can also use `reactli` instead of `rc` if you like the long syntax.

```bash title=Example
reactli <command>
```
