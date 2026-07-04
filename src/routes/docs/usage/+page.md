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
linguo node upgrade --latest      # bumps the pin (22 -> 24) and installs it,
                                  # rewriting whichever file held the pin
linguo node upgrade --prune       # also uninstall the superseded toolchains
linguo upgrade                    # all languages pinned in this directory
```

## Project commands

Where a language has a project/package layer, Linguo provides uv-style project commands. Each drives the ecosystem's native tool rather than reimplementing it:

```bash
linguo python init                # pyproject.toml + linguo.toml pin + .venv
linguo python add "requests>=2.31"
linguo node add typescript && linguo node run -- tsc --version
linguo ruby add rails
linguo php add monolog/monolog    # composer, bundled with every php toolchain
linguo rust add serde && linguo rust run -- cargo build
linguo go add rsc.io/quote
linguo <lang> remove <pkg>
linguo <lang> sync                # install everything the manifest declares
```

## Monorepo sync

Monorepos sync in one shot. `linguo sync` at the top level finds every member project (or honors `[workspace] members = ["services/*", "web"]` in the root `linguo.toml`, globs allowed), installs any missing pinned toolchains, and runs each member's dependency sync. Directories holding `.tf` files count as toolchain-only members:

```bash
linguo sync                       # fresh clone -> every member runnable
```

## Terraform and OpenTofu

Terraform and OpenTofu share one command (`linguo tf` works too). OpenTofu versions are spelled `opentofu@<version>` and resolve the `tofu` binary:

```bash
linguo tf install opentofu@1.12
linguo tf use opentofu@1.12       # writes terraform = "opentofu@1.12"
linguo tf run -- tofu plan
```

## Rust channels, components, and targets

Rust additionally understands rustup-style channels, components, and targets. A project's `rust-toolchain.toml` `components`/`targets` arrays are honored automatically at install time:

```bash
linguo rust install nightly            # today's; nightly-2026-07-01 for a date
linguo rust use nightly                # activates the newest installed nightly
linguo rust component add rust-analyzer rust-src
linguo rust target add wasm32-unknown-unknown
```

## JVM stack

The JVM stack layers: JDKs (Eclipse Temurin) install and pin like any runtime and own `JAVA_HOME`. Kotlin, Groovy, and Scala are toolchains that run against the directory's JVM pin, or against a per-language binding when you need mixed JDKs in one place:

```bash
linguo jvm install 21             # latest LTS if no version is given
linguo jvm use 21                 # every JVM language here uses it...
linguo kotlin install && linguo kotlin use 2.4
linguo groovy set-jvm 17          # ...except groovy, now bound to 17
linguo kotlin run -- kotlinc app.kt -include-runtime -d app.jar
```

## Zig projects

Zig projects work the same way (`linguo zig init/sync/run/which`). `add` wraps `zig fetch --save`, which takes archive URLs or paths rather than registry names:

```bash
linguo zig init
linguo zig add https://example.com/some-zig-lib.tar.gz
linguo zig sync
linguo zig run -- zig build
```

## Supported languages

| Language | Runtime source | Project layer |
| --- | --- | --- |
| Python | [python-build-standalone](https://github.com/astral-sh/python-build-standalone) | pyproject.toml + pip-backed `.venv` |
| Node.js | [nodejs.org/dist](https://nodejs.org/dist) | package.json via npm |
| Ruby | [rv-ruby](https://github.com/spinel-coop/rv-ruby) relocatable builds; [RubyInstaller](https://rubyinstaller.org) on Windows | Gemfile via bundler (shared per-toolchain gems) |
| Rust | [static.rust-lang.org](https://static.rust-lang.org) dist channels | Cargo.toml via cargo |
| Go | [go.dev/dl](https://go.dev/dl) | go.mod via the go tool |
| Zig | [ziglang.org](https://ziglang.org/download) (static, musl-friendly) | build.zig.zon via the zig tool |
| PHP | [static-php-cli](https://dl.static-php.dev) builds (static); [windows.php.net](https://windows.php.net) on Windows | composer.json via bundled Composer |
| JVM (Temurin JDKs) | [Adoptium API](https://adoptium.net) (incl. Alpine builds) | runtime-only; owns `JAVA_HOME` |
| Kotlin / Groovy / Scala | JetBrains and Scala GitHub releases; Apache dist | runtime-only, layered on a JVM via `set-jvm` |
| Terraform / OpenTofu | [releases.hashicorp.com](https://releases.hashicorp.com) / [get.opentofu.org](https://get.opentofu.org) | runtime-only (providers stay terraform's job) |
