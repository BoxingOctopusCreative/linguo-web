# Installation

Prebuilt binaries for macOS (arm64/x86_64), Linux (x64/arm64, glibc and fully static musl), and Windows (x64) are on the [releases page](https://github.com/BoxingOctopusCreative/linguo/releases).

On musl systems (Alpine and friends), Python, Ruby, Rust, and Terraform/OpenTofu work natively. Node.js and Go publish no official musl builds, so Linguo points you at the distro package instead. On Windows, Ruby comes from [RubyInstaller](https://rubyinstaller.org) archives (without the MSYS2 devkit, so gems with C extensions need a separate toolchain).

## Quick install

Four ways in, pick one:

```bash
# Homebrew (macOS/Linux)
brew tap boxingoctopuscreative/tap && brew install linguo

# curl install script (macOS/Linux, glibc or musl)
curl -fsSL https://raw.githubusercontent.com/BoxingOctopusCreative/linguo/main/install.sh | sh

# native packages: deb, rpm, and a Windows MSI on the releases page

# from source
cargo install --path .
```

The tap's formula is updated automatically by the release pipeline.

## curl install script

The install script detects your platform, downloads the latest release tarball, verifies its checksum, and installs the binary to `~/.local/bin`.

Override the destination with `LINGUO_INSTALL_DIR`, or pin a version with `LINGUO_VERSION=0.9.0` (or `sh install.sh 0.9.0`).

In CI or anywhere GitHub API rate limits bite, set `GITHUB_TOKEN` (or `LINGUO_GITHUB_TOKEN`). Linguo and the install script authenticate their `api.github.com` queries with it, and never send it anywhere else.

## macOS

### Release tarball (Intel or Apple silicon)

1. Open [GitHub Releases](https://github.com/BoxingOctopusCreative/linguo/releases) and download the tarball for your Mac:
   - Apple silicon: `linguo-<version>-aarch64-apple-darwin.tar.gz`
   - Intel: `linguo-<version>-x86_64-apple-darwin.tar.gz`
2. Extract the archive and move the `linguo` binary onto your `PATH`:

```bash
tar xzf linguo-*-apple-darwin.tar.gz
sudo install -m 755 linguo /usr/local/bin/linguo
```

## Linux

### Debian / Ubuntu (.deb)

1. Download the `.deb` for your architecture from [GitHub Releases](https://github.com/BoxingOctopusCreative/linguo/releases):
   - x64 (glibc): `linguo-<version>-x86_64-unknown-linux-gnu.deb`
   - arm64 (glibc): `linguo-<version>-aarch64-unknown-linux-gnu.deb`
2. Install the package:

```bash
sudo dpkg -i linguo-*-unknown-linux-gnu.deb
```

If `dpkg` reports missing dependencies, run `sudo apt-get install -f`.

### Fedora / RHEL (.rpm)

1. Download the `.rpm` for your architecture from [GitHub Releases](https://github.com/BoxingOctopusCreative/linguo/releases):
   - x64: `linguo-<version>-x86_64-unknown-linux-gnu.rpm`
   - arm64: `linguo-<version>-aarch64-unknown-linux-gnu.rpm`
2. Install the package:

```bash
sudo rpm -i linguo-*-unknown-linux-gnu.rpm
```

On Fedora, you can also use:

```bash
sudo dnf install ./linguo-*-unknown-linux-gnu.rpm
```

### Generic tarball (glibc or musl)

If your distro is not covered by the `.deb` or `.rpm` packages, use the tarball:

1. Download the matching archive from [GitHub Releases](https://github.com/BoxingOctopusCreative/linguo/releases):
   - glibc x64/arm64: `linguo-<version>-<arch>-unknown-linux-gnu.tar.gz`
   - musl x64/arm64: `linguo-<version>-<arch>-unknown-linux-musl.tar.gz`
2. Extract and install the binary:

```bash
tar xzf linguo-*-linux-*.tar.gz
sudo install -m 755 linguo /usr/local/bin/linguo
```

Each release asset has a matching `.sha256` file if you want to verify the download before installing.

## Windows

### MSI installer (recommended)

1. Download `linguo-<version>-x86_64-pc-windows-msvc.msi` from [GitHub Releases](https://github.com/BoxingOctopusCreative/linguo/releases).
2. Run the installer and follow the prompts. It adds `linguo` to your `PATH`.
3. Open a new terminal and confirm the install:

```powershell
linguo --version
```

### Zip archive

1. Download `linguo-<version>-x86_64-pc-windows-msvc.zip` from [GitHub Releases](https://github.com/BoxingOctopusCreative/linguo/releases).
2. Extract the archive to a permanent location, for example `C:\Tools\linguo`.
3. Add that folder to your user `PATH`:
   - Open **Settings → System → About → Advanced system settings → Environment Variables**
   - Under **User variables**, edit **Path** and add the folder containing `linguo.exe`
4. Open a new terminal and confirm the install:

```powershell
linguo --version
```

## Build from source

```bash
git clone https://github.com/BoxingOctopusCreative/linguo.git
cd linguo
cargo install --path .
```

On Windows, install [Rust](https://rustup.rs/) first, then run the same commands from PowerShell or Command Prompt.

## Shell hook

Add the shell hook to your rc file so pinned runtimes activate automatically when you `cd` into a project:

```bash
eval "$(linguo activate zsh)"   # or bash / fish
```

On Windows (PowerShell), add this to your `$PROFILE`:

```powershell
linguo activate powershell | Out-String | Invoke-Expression
```

## Auto-install (optional)

By default, the shell hook does not download missing toolchains. You can enable auto-install in your global config:

```toml
# ~/.linguo/config.toml
[settings]
auto-install = true
```

When enabled, `cd` into a project with unsatisfied pins and Linguo installs the required toolchains on the spot. Failed attempts back off for 5 minutes so an unreachable upstream never stalls your prompt.
