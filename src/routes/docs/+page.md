# Introduction

Linguo is a cross-platform, multi-language runtime, package, and project manager. Think [uv](https://docs.astral.sh/uv/), but for **Python, Node.js, Ruby, Rust, Go, and Terraform/OpenTofu**.

One binary manages runtime versions, per-project pins, and project workflows for every language, with the same command shape everywhere:

```bash
linguo <language> <command>
```

## Why Linguo?

Modern projects rarely stick to one language. You might have a Python backend, a Node frontend, infrastructure in Terraform, and a Rust CLI tool, each with its own version manager and conventions.

Linguo unifies that experience:

- **One CLI** for every supported language
- **Verified downloads:** every toolchain is sha256-checked against upstream checksums
- **Automatic activation:** shell hooks activate pinned runtimes when you `cd` into a project
- **Native project tools:** Linguo drives pip, npm, bundler, cargo, and go rather than reimplementing them

## What's next?

- [Install Linguo](/docs/install) on your platform
- Follow the [quick start](/docs/quick-start) to pin a runtime and run your first command
- Read the [usage guide](/docs/usage) for the full command reference
