# Version pins

Pins live in `linguo.toml`, resolved from the nearest file up the directory tree, then the global config (`~/.linguo/config.toml`):

```toml
[runtimes]
python = "3.12"
node = "24"
rust = "1.96"
terraform = "opentofu@1.12"
```

## Pin formats

Requests can be a major (`24`), minor (`3.12`), or exact (`1.96.1`) version. The highest installed match wins.

Rust pins may also be channels: `stable`, `nightly`, `beta`, or dated builds like `nightly-2026-07-01`. Bare channel pins resolve to the newest *installed* build of that kind, so activation stays offline and deterministic. `linguo rust upgrade` is what moves them forward.

## Resolution order

When Linguo needs a runtime version, it checks in this order:

1. **Project `linguo.toml`:** nearest file walking up the directory tree
2. **Ecosystem pin file:** when no `linguo.toml` covers a language:
   - `.python-version`
   - `.nvmrc` / `.node-version`
   - `.ruby-version`
   - `go.mod` `toolchain` / `go` directives
   - `rust-toolchain(.toml)`
   - `.zigversion`
   - `build.zig.zon` `minimum_zig_version`
   - `.php-version`
   - `.java-version`
3. **Global config:** `~/.linguo/config.toml`

Precedence: project `linguo.toml`, then the ecosystem pin file, then the global config.

Ecosystem pin files are honored when they hold a plain version (or, for Rust, a channel). Node aliases like `lts/*` are still ignored.

## Toolchain storage

Every download is sha256-verified against its upstream's published checksums. Toolchains live under:

```
~/.linguo/toolchains/<language>/<version>
```

Override the root directory with the `$LINGUO_ROOT` environment variable.

## Existing projects

Existing projects work without a `linguo.toml`. When none covers a language, Linguo honors the ecosystem's own pin file as long as it holds a plain version number or Rust channel.

To adopt Linguo explicitly, run `linguo <lang> use <version>` in your project directory. This writes a `linguo.toml` with your chosen pin.
