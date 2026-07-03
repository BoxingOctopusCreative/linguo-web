# Quick start

This guide gets you from a fresh install to a pinned runtime in a few commands.

## Install a runtime

Install the latest stable version of a language (defaults vary by language: latest LTS for Node, latest stable for Rust, etc.):

```bash
linguo python install
linguo node install
linguo rust install
```

List what's installed or available:

```bash
linguo python list
linguo node list --available
```

## Pin a version

Pin a runtime for the current directory (writes `linguo.toml`):

```bash
linguo python use 3.12
linguo node use 24
```

Or set a global default:

```bash
linguo python use 3.12 --global
```

## Run commands

Run a command with the pinned toolchain on `PATH`:

```bash
linguo python run -- python --version
linguo node run -- node --version
```

## Initialize a project

For languages with a project layer, Linguo can scaffold a new project:

```bash
linguo python init
linguo node init
linguo rust init
```

Then add dependencies and sync:

```bash
linguo python add "requests>=2.31"
linguo node add typescript
linguo python sync
```

## Check status

See a cross-language overview of what's pinned and installed:

```bash
linguo status
```

## Sync a monorepo

In a monorepo, run `linguo sync` at the root to install pinned toolchains and sync every member project:

```bash
linguo sync
```

Next: read the full [usage guide](/docs/usage) and learn about [version pins](/docs/version-pins).
