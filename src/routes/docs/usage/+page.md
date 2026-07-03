# Usage

Every language gets the same runtime commands:

```bash
linguo <lang> install [version]   # sensible default: latest / latest LTS / latest stable
linguo <lang> list                # installed; --available for what's downloadable
linguo <lang> use 3.12            # pin for this directory (writes linguo.toml)
linguo <lang> use 3.12 --global   # default for everything else
linguo <lang> uninstall 3.12.4
linguo <lang> which [command]     # path a command resolves to
linguo <lang> run -- <command>    # run with the pinned toolchain on PATH
linguo status                     # cross-language overview (alias: linguo list)
```

## Upgrades

Upgrade to the newest release within the current pin, or bump the pin itself:

```bash
linguo node upgrade               # pin "22" -> installs the newest 22.x
linguo node upgrade --latest      # bumps the pin (22 -> 24) and installs it
linguo node upgrade --prune       # also uninstall the superseded toolchains
linguo upgrade                    # all languages pinned in this directory
```

## Project commands

Where a language has a project/package layer, Linguo provides uv-style project commands. Each drives the ecosystem's native tool rather than reimplementing it:

```bash
linguo python init
linguo python add "requests>=2.31"
linguo node add typescript && linguo node run -- tsc --version
linguo ruby add rails
linguo rust add serde && linguo rust run -- cargo build
linguo go add rsc.io/quote
linguo <lang> remove <pkg>
linguo <lang> sync
```

## Terraform and OpenTofu

Terraform and OpenTofu share one command (`linguo tf` works too). OpenTofu versions are spelled `opentofu@<version>` and resolve the `tofu` binary:

```bash
linguo tf install opentofu@1.12
linguo tf use opentofu@1.12       # writes terraform = "opentofu@1.12"
linguo tf run -- tofu plan
```

## Supported languages

| Language | Runtime source | Project layer |
| --- | --- | --- |
| Python | [python-build-standalone](https://github.com/astral-sh/python-build-standalone) | pyproject.toml + pip-backed .venv |
| Node.js | [nodejs.org/dist](https://nodejs.org/dist) | package.json via npm |
| Ruby | [rv-ruby](https://github.com/spinel-coop/rv-ruby) relocatable builds | Gemfile via bundler |
| Rust | [static.rust-lang.org](https://static.rust-lang.org) dist channels | Cargo.toml via cargo |
| Go | [go.dev/dl](https://go.dev/dl) | go.mod via the go tool |
| Terraform / OpenTofu | HashiCorp / OpenTofu releases | runtime-only |
