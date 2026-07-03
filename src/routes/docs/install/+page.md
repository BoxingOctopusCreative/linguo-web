# Installation

Prebuilt binaries for macOS (arm64/x86_64), Linux (x64/arm64, glibc and fully static musl), and Windows (x64) are on the [releases page](https://github.com/BoxingOctopusCreative/linguo/releases).

On musl systems (Alpine and friends), Python, Ruby, Rust, and Terraform/OpenTofu work natively. Node.js and Go publish no official musl builds, so Linguo points you at the distro package instead. On Windows, Ruby comes from [RubyInstaller](https://rubyinstaller.org) archives (without the MSYS2 devkit, so gems with C extensions need a separate toolchain).

## Pick your channel

### Quick Install via Curl (macOS/Linux)

```bash
curl -fsSL https://raw.githubusercontent.com/BoxingOctopusCreative/linguo/main/install.sh | sh
```

> The install script detects your platform, downloads the latest release tarball, verifies its checksum, and installs the binary to `~/.local/bin`. Override the destination with `LINGUO_INSTALL_DIR`, or pin a version with `LINGUO_VERSION=1.2.0` (or `sh install.sh 1.2.0`).

### Cargo (Native Rust Package Manager)

```bash
cargo install linguo
```

### macOS

#### Homebrew

```bash
brew tap boxingoctopuscreative/tap && brew install linguo
```

### Linux

#### Debian / Ubuntu (Standalone Package Installation)

1. Download the `.deb` for your architecture from [GitHub Releases](https://github.com/BoxingOctopusCreative/linguo/releases):
   - x64 (glibc): `linguo-<version>-x86_64-unknown-linux-gnu.deb`
   - arm64 (glibc): `linguo-<version>-aarch64-unknown-linux-gnu.deb`
2. Install the package:

```bash
sudo dpkg -i linguo-*-unknown-linux-gnu.deb
```

> If `dpkg` reports missing dependencies, run `sudo apt-get install -f`.

#### Ubuntu (Via the BOC Engineering PPA)

```bash
sudo add-apt-repository ppa:boxingoctopuscreative/ppa
sudo apt install linguo
```

> **PPA support is still rolling out**

#### Fedora / RHEL (.rpm)

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

### Windows

#### MSI installer (recommended)

1. Download `linguo-<version>-x86_64-pc-windows-msvc.msi` from [GitHub Releases](https://github.com/BoxingOctopusCreative/linguo/releases).
2. Run the installer and follow the prompts. It adds `linguo` to your `PATH`.
3. Open a new terminal and confirm the install:

```powershell
linguo --version
```

#### Chocolatey (rolling out; live once the first submission clears moderation)

```bash
choco install linguo
```

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
